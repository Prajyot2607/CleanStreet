// src/pages/feedback/components/SuccessScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SuccessScreen = ({ onStartOver }) => {
  const feedbackId = `FB-${Date.now().toString().slice(-6)}`;

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-success bg-opacity-10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={48} className="text-success" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Thank You for Your Feedback!
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Your feedback has been successfully submitted and will help us improve CleanStreet.
            We truly appreciate you taking the time to share your thoughts with us.
          </p>

          {/* Feedback Details */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Submission Details
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Feedback ID:</span>
                <span className="font-mono text-text-primary">{feedbackId}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Submitted:</span>
                <span className="text-text-primary">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Status:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                  <Icon name="Clock" size={12} className="mr-1" />
                  Under Review
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-text-secondary">Expected Response:</span>
                <span className="text-text-primary">2-3 business days</span>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center justify-center">
              <Icon name="Info" size={20} className="mr-2" />
              What Happens Next?
            </h3>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <Icon name="CheckCircle" size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-blue-700 text-sm">
                  Your feedback is automatically routed to our product team
                </span>
              </div>
              
              <div className="flex items-start">
                <Icon name="Users" size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-blue-700 text-sm">
                  Our team will review and categorize your submission
                </span>
              </div>
              
              <div className="flex items-start">
                <Icon name="Mail" size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-blue-700 text-sm">
                  You'll receive an email confirmation and any follow-up questions
                </span>
              </div>
              
              <div className="flex items-start">
                <Icon name="Rocket" size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-blue-700 text-sm">
                  Feature requests may be included in future product updates
                </span>
              </div>
            </div>
          </div>

          {/* Community Image */}
          {/* <div className="mb-8">
            <Image
              src="https://images.pixabay.com/photo/2016/02/07/21/03/computer-1185626_1280.jpg?w=600&h=300&fit=crop"
              alt="Team collaboration"
              className="rounded-lg shadow-md mx-auto w-full max-w-lg h-48 object-cover"
            />
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clean-street-landing-page">
              <Button
                size="large"
                icon="Home"
              >
                Back to Home
              </Button>
            </Link>
            
            <Button
              variant="secondary"
              size="large"
              onClick={onStartOver}
              icon="Plus"
            >
              Submit More Feedback
            </Button>
            
            <Link to="/report-issue">
              <Button
                variant="tertiary"
                size="large"
                icon="AlertCircle"
              >
                Report an Issue
              </Button>
            </Link>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              While You're Here
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link 
                to="/about-us" 
                className="text-primary hover:text-primary-dark transition-colors flex items-center justify-center"
              >
                <Icon name="Users" size={16} className="mr-1" />
                Learn About Our Team
              </Link>
              
              <Link 
                to="/clean-street-landing-page#features" 
                className="text-primary hover:text-primary-dark transition-colors flex items-center justify-center"
              >
                <Icon name="Star" size={16} className="mr-1" />
                Explore Features
              </Link>
              
              <a 
                href="mailto:support@cleanstreet.com" 
                className="text-primary hover:text-primary-dark transition-colors flex items-center justify-center"
              >
                <Icon name="Mail" size={16} className="mr-1" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;