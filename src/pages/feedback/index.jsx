// src/pages/feedback/index.jsx
import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Input, { Textarea } from 'components/ui/Input';
import Icon from 'components/AppIcon';


import FeedbackCategorySelector from './components/FeedbackCategorySelector';
import SuccessScreen from './components/SuccessScreen';

const Feedback = () => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: '',
    contactInfo: {
      name: '',
      email: ''
    },
    allowContact: true,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const maxChars = 1000;

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

    // Track character count for message
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value
      }
    }));
    
    // Clear contact info errors
    if (errors[`contact${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`contact${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
    }
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    /*
    if (!formData.category) {
      newErrors.category = 'Please select a feedback category';
    }
    */
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Please provide more details (minimum 10 characters)';
    }
    
    
    if (formData.allowContact) {
      if (!formData.contactInfo.name.trim()) {
        newErrors.contactName = 'Name is required for contact';
      }
    
      if (!formData.contactInfo.email.trim()) {
        newErrors.contactEmail = 'Email is required for contact';
      } else if (!/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
        newErrors.contactEmail = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
   const payload = {
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      contactName: formData.allowContact ? formData.contactInfo.name.trim() : null,
      contactEmail: formData.allowContact ? formData.contactInfo.email.trim() : null,
    };

    try {
      const response = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to submit feedback. Please try again.';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        }

        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleStartOver = () => {
    setIsSubmitted(false);
    setFormData({
      category: '',
      subject: '',
      message: '',
      contactInfo: {
        name: '',
        email: ''
      },
      allowContact: true,
    });
    setCharCount(0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />
        <SuccessScreen onStartOver={handleStartOver} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Icon name="MessageSquare" size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Your input helps us improve CleanStreet and better serve communities.
            Share your experiences, suggestions, and ideas with us.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Why Feedback Matters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="Heart" size={20} className="mr-2 text-primary" />
                  Why Your Feedback Matters
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Icon name="Lightbulb" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">Feature Development</h4>
                      <p className="text-text-secondary text-sm">Your suggestions directly influence our roadmap</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Icon name="Users" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">User Experience</h4>
                      <p className="text-text-secondary text-sm">Help us make the platform more intuitive</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Icon name="Target" size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">Community Impact</h4>
                      <p className="text-text-secondary text-sm">Enhance our ability to serve communities</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary bg-opacity-10 rounded-lg">
                  <p className="text-primary text-sm font-medium">
                    💡 Average response time: 2-3 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Feedback Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg border border-border">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                      Share Your Thoughts
                    </h2>
                    <p className="text-text-secondary">
                      Help us understand your experience and improve our platform
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

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Category Selection */}
                    {/* <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                        <Icon name="Tag" size={20} className="mr-2" />
                        What type of feedback do you have?
                      </h3>
                      <FeedbackCategorySelector 
                        selectedCategory={formData.category}
                        onCategorySelect={handleCategorySelect}
                        error={errors.category}
                      />
                    </div> */}

                    {/* Subject and Message */}
                    {/* {formData.category && ( */}
                      <div className="space-y-6">
                        <Input
                          type="text"
                          name="subject"
                          label="Subject"
                          placeholder="Brief summary of your feedback"
                          value={formData.subject}
                          onChange={handleInputChange}
                          error={errors.subject}
                          icon="Edit"
                          required
                        />

                        <div>
                          <Textarea
                            name="message"
                            label="Your Message"
                            placeholder="Share your detailed feedback, suggestions, or experiences with CleanStreet..."
                            value={formData.message}
                            onChange={handleInputChange}
                            error={errors.message}
                            rows={6}
                            required
                          />
                          <div className="mt-2 flex justify-between items-center">
                            <div className="text-sm text-text-secondary">
                              <Icon name="Info" size={16} className="inline mr-1" />
                              Be specific to help us understand your perspective
                            </div>
                            <div className={`text-sm ${
                              charCount > maxChars ? 'text-error' : 
                              charCount > maxChars * 0.8 ? 'text-warning' : 'text-text-secondary'
                            }`}>
                              {charCount}/{maxChars} characters
                            </div>
                          </div>
                        </div>
                      </div>
                    {/* )} */}

                    {/* Contact Information */}
                    {/* {formData.category && ( */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-text-primary flex items-center">
                          <Icon name="User" size={20} className="mr-2" />
                          Contact Information
                        </h3>
                        
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="allowContact"
                            checked={formData.allowContact}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                          />
                          <div>
                            <span className="text-text-primary font-medium">Allow us to contact you about this feedback</span>
                            <p className="text-text-secondary text-sm mt-1">
                              We may reach out for clarification or to update you on any changes based on your feedback
                            </p>
                          </div>
                        </label>

                        {/* {formData.allowContact && ( */}
                          <div className="space-y-4 bg-surface rounded-lg p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <Input
                                type="text"
                                name="name"
                                label="Full Name"
                                placeholder="Enter your name"
                                value={formData.contactInfo.name}
                                onChange={handleContactInfoChange}
                                error={errors.contactName}
                                icon="User"
                                required
                              />
                              <Input
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                value={formData.contactInfo.email}
                                onChange={handleContactInfoChange}
                                error={errors.contactEmail}
                                icon="Mail"
                                required
                              />
                            </div>
                          </div>
                        {/* )} */}
                      </div>
                    {/* )} */}

                    {/* Submit Button */}
                    {/* {formData.category && ( */}
                      <div className="border-t border-border pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-end">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              if (confirm('Are you sure you want to clear the form? All data will be lost.')) {
                                handleStartOver();
                              }
                            }}
                            icon="RefreshCw"
                          >
                            Clear Form
                          </Button>
                          <Button
                            type="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            icon="Send"
                            size="large"
                          >
                            {isLoading ? 'Sending Feedback...' : 'Send Feedback'}
                          </Button>
                        </div>
                      </div>
                    {/* )} */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;