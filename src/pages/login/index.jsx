// src/pages/login/index.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the useAuth hook and get the login function

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        console.log('Login successful');
        const userData = await response.json(); // Parse the JSON response
        console.log('Logged in user data:', userData);
        console.log('User role from backend:', userData.role);

        login(userData); // Call the login function from AuthContext

        // Redirect based on user role
        if (userData && userData.role === 'ADMIN') {
          navigate('/admin/dashboard'); // Redirect Admin users to admin dashboard
        } else if (userData && userData.role === 'USER') {
          navigate('/user/dashboard'); // Redirect Regular users to user dashboard
        } else {
           // Handle unexpected role or missing user data
           setErrors({ submit: 'Login successful, but received unexpected user data.' });
           console.error('Unexpected user data on login:', userData);
        }

      } else if (response.status === 401) {
        setErrors({ submit: 'Invalid email or password.' });
      } else {
        setErrors({ submit: 'Login failed. Please try again later.' });
        console.error('Login error:', response.statusText);
      }
    } catch (error) {
      console.error('Login network error:', error);
      setErrors({ submit: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <div className="min-h-screen bg-surface flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-2/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark bg-opacity-90"></div>
          <Image
            src="https://images.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg?w=800&h=600&fit=crop"
            alt="Community members working together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary bg-opacity-80 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <Icon name="MapPin" size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Welcome Back to CleanStreet</h2>
              <p className="text-xl text-green-100 leading-relaxed">
                Continue making a difference in your community. Track your reports and see the positive impact you're creating.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <div className="text-center mb-8">
                <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-text-primary mb-2">Sign In</h1>
                <p className="text-text-secondary">
                  Welcome back! Please sign in to your account.
                </p>
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

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  icon="Lock"
                  showPasswordToggle={true}
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <span className="ml-2 text-sm text-text-secondary">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-text-secondary">
                  Don't have an account? {' '}
                  <Link
                    to="/register"
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            {/* Mobile Hero Content */}
            <div className="lg:hidden mt-8 text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Welcome Back to CleanStreet
              </h2>
              <p className="text-text-secondary">
                Continue making a difference in your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;