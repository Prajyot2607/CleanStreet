// src/pages/register/index.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Input, { Textarea } from 'components/ui/Input';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Location Information
    address: '',
    city: '',
    zipCode: '',
    neighborhood: '',
    // Step 3: Preferences
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  const totalSteps = 3;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^\w\s]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very Weak';
        break;
      case 2:
        feedback = 'Weak';
        break;
      case 3:
        feedback = 'Fair';
        break;
      case 4:
        feedback = 'Strong';
        break;
      case 5:
        feedback = 'Very Strong';
        break;
      default:
        feedback = '';
    }

    setPasswordStrength({ score, feedback });
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }else if(!/^([a-zA-Z]+[ \-']{0,1}){1,3}$/.test(formData.firstName)){
          newErrors.firstName='Please enter a valid firstName';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'last name is required';
      }else if(!/^([a-zA-Z]+[ \-']{0,1}){1,3}$/.test(formData.lastName)){
          newErrors.lastName='Please enter a valid lastName';
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData.neighborhood) newErrors.neighborhood = 'Neighborhood is required';
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the final step before submitting
    if (!validateStep(totalSteps)) return;
    
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    // Prepare data for backend. Assuming backend expects 'name', 'email', 'password', 'role'
    const userData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful');
        // Redirect to login page after successful registration
        navigate('/login');
      } else if (response.status === 400) {
        // Handle bad request (e.g., email already exists, validation errors)
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Registration failed due to invalid data.' });
        console.error('Registration validation error:', errorData);
      } else {
        // Handle other errors
        setErrors({ submit: 'Registration failed. Please try again later.' });
        console.error('Registration error:', response.statusText);
      }
    } catch (error) {
      console.error('Registration network error:', error);
      setErrors({ submit: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          icon="User"
          required
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          icon="User"
          required
        />
      </div>

      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        icon="Mail"
        required
      />

      <div>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          icon="Lock"
          showPasswordToggle={true}
          required
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Password Strength</span>
              <span className={`font-medium ${
                passwordStrength.score <= 2 ? 'text-red-500' : 
                passwordStrength.score === 3 ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {passwordStrength.feedback}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        icon="Lock"
        required
      />

    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Icon name="MapPin" size={48} className="text-primary mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-text-primary">Help us personalize your experience</h3>
        <p className="text-text-secondary text-sm">Your location helps us show relevant community issues</p>
      </div>

      <Input
        type="text"
        name="address"
        label="Street Address"
        placeholder="Enter your street address"
        value={formData.address}
        onChange={handleInputChange}
        error={errors.address}
        icon="MapPin"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          name="city"
          label="City"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          icon="Home"
          required
        />
        <Input
          type="text"
          name="zipCode"
          label="ZIP Code"
          placeholder="Enter ZIP code"
          value={formData.zipCode}
          onChange={handleInputChange}
          error={errors.zipCode}
          icon="Hash"
          required
        />
      </div>

      <Input
        type="text"
        name="neighborhood"
        label="Neighborhood"
        placeholder="Enter your neighborhood"
        value={formData.neighborhood}
        onChange={handleInputChange}
        error={errors.neighborhood}
        icon="Map"
        required
      />

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start">
          <Icon name="Info" size={20} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-800 font-medium mb-1">Why do we need your location?</p>
            <p className="text-blue-700">
              Your location helps us show you relevant issues in your area and ensures your reports reach the right local authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Icon name="Shield" size={48} className="text-primary mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-text-primary">Almost done!</h3>
        <p className="text-text-secondary text-sm">Review your preferences and complete your registration</p>
      </div>

      <div className="bg-surface rounded-lg p-6">
        <h4 className="font-semibold text-text-primary mb-4">Account Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Name:</span>
            <span className="text-text-primary">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Email:</span>
            <span className="text-text-primary">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Location:</span>
            <span className="text-text-primary">{formData.city}, {formData.zipCode}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <Link to="/terms" className="text-primary hover:text-primary-dark">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-dark">Privacy Policy</Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-error text-sm flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <div className="min-h-screen bg-surface flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-2/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark bg-opacity-90"></div>
          <Image
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
            alt="People building community together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary bg-opacity-80 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <Icon name="Users" size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Join CleanStreet Community</h2>
              <p className="text-xl text-green-100 leading-relaxed">
                Be part of a movement that's making neighborhoods better. Your voice matters, and together we can create positive change.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <div className="text-center mb-8">
                <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
                <p className="text-text-secondary">
                  Join thousands making their communities better
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
                    }`}>
                      1
                    </div>
                    <span className="text-xs text-text-secondary mt-1">Account</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-border mx-2"></div>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
                    }`}>
                      2
                    </div>
                    <span className="text-xs text-text-secondary mt-1">Location</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-border mx-2"></div>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
                    }`}>
                      3
                    </div>
                    <span className="text-xs text-text-secondary mt-1">Confirm</span>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <Icon name="AlertCircle" size={20} className="text-error mr-2" />
                    <span className="text-error text-sm">{errors.submit}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                <div className="border-t border-border pt-6 mt-6 flex justify-between">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      onClick={handleBack} 
                      variant="secondary"
                      icon="ArrowLeft"
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < totalSteps && (
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      className="ml-auto"
                      icon="ArrowRight"
                    >
                      Next
                    </Button>
                  )}
                  {currentStep === totalSteps && (
                    <Button
                      type="submit"
                      fullWidth
                      loading={isLoading}
                      disabled={isLoading}
                      icon="UserPlus"
                      className="ml-auto"
                    >
                      {isLoading ? 'Registering...' : 'Complete Registration'}
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-text-secondary">
                  Already have an account? {' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;