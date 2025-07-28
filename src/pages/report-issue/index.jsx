// src/pages/report-issue/index.jsx
import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Input, { Textarea } from 'components/ui/Input';
import Icon from 'components/AppIcon';
import MediaUpload from './components/MediaUpload';
import CategorySelector from './components/CategorySelector';
import SeveritySlider from './components/SeveritySlider';
import ReportSummary from './components/ReportSummary';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
// import { useLocation, useParams } from 'react-router-dom'; // Import useLocation and useParams

const ReportIssue = ({ onReportSuccess, hideHeader = false, editingComplaint }) => {
  const { user } = useAuth(); // Get user from AuthContext
  // const location = useLocation();
  // const { id } = useParams(); // Get ID from URL for editing
  // const editingComplaint = location.state?.complaint; // Get complaint object from navigation state
  const isEditing = !!editingComplaint; // Determine if we are in edit mode

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: {
      address: '',
    },
    severity: 3,
    media: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    isAnonymous: false,
    allowFollowUp: true
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const maxChars = 500;

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          name: user.name || '',
          email: user.email || ''
        }
      }));
    }

    // Pre-fill form if editing an existing complaint
    if (editingComplaint) {
      setFormData(prev => ({
        ...prev,
        category: editingComplaint.category || '',
        title: editingComplaint.title || '',
        description: editingComplaint.description || '',
        location: {
          address: editingComplaint.location?.areaName || '',
        },
        severity: editingComplaint.severity || 3,
        // Media is not supported for editing currently, so we don't pre-fill it
        contactInfo: {
          name: editingComplaint.user?.name || '',
          email: editingComplaint.user?.email || '',
          // Phone might not be available in complaint object, handle if needed
          phone: '' 
        },
        // Assuming anonymous status doesn't change on edit, or is handled separately
        isAnonymous: editingComplaint.isAnonymous || false,
        allowFollowUp: editingComplaint.allowFollowUp || true,
      }));
      setCharCount(editingComplaint.description?.length || 0);
      setShowSummary(false); // Ensure the form is displayed for editing
    }
  }, [user, editingComplaint]);

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

    // Track character count for description
    if (name === 'description') {
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
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handleSeverityChange = (severity) => {
    setFormData(prev => ({ ...prev, severity }));
  };

  const handleMediaUpload = (media) => {
    setFormData(prev => ({ ...prev, media }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) {
      newErrors.category = 'Please select an issue category';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Issue title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Issue description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide more details (minimum 20 characters)';
    }
    
    if (!formData.location.address.trim()) {
      newErrors.locationAddress = 'Location address is required';
    }
    
    if (!formData.isAnonymous) {
      if (!formData.contactInfo.name.trim()) {
        newErrors.contactName = 'Name is required for non-anonymous reports';
      }
      if (!formData.contactInfo.email.trim()) {
        newErrors.contactEmail = 'Email is required for non-anonymous reports';
      } else if (!/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
        newErrors.contactEmail = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowSummary(true);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    let requestMethod = 'POST';
    let requestUrl = 'http://localhost:8080/api/complaints';
    let complaintPayload = {};

    if (isEditing) {
      // For editing, include all fields that can be updated
      complaintPayload = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        locationAddress: formData.location.address,
        severity: formData.severity,
        // Media is not updated via this form in edit mode
        contactInfo: formData.contactInfo,
        isAnonymous: formData.isAnonymous,
        allowFollowUp: formData.allowFollowUp
      };
      requestMethod = 'PUT';
      requestUrl = `http://localhost:8080/api/complaints/${editingComplaint.id}`;
    } else {
      // For new complaint creation
      complaintPayload = {
        title: formData.title,
        description: formData.description,
        locationAddress: formData.location.address,
        // Add other fields for new complaint creation if needed
      };
    }

    const data = new FormData();
    // Create a Blob from the JSON and set the content-type before this line 403 error
    const complaintBlob=new Blob(
      [JSON.stringify(complaintPayload)],
      {type: 'application/json'}
    );
    //
    data.append('complaint', complaintBlob);
    
    // Only append image if it's a new complaint or if new media is selected for an update (not supported by current UI)
    if (formData.media.length > 0 && formData.media[0].file) {
      data.append('image', formData.media[0].file); // Append the actual file
    }

    try {
      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization header
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Complaint ${isEditing ? 'updated' : 'submitted'} successfully:`, result);
        alert(`Report ${isEditing ? 'updated' : 'submitted'} successfully! Status: ${result.status}`);
        if (onReportSuccess) {
          onReportSuccess(); // Call the callback on success
        }
        // Clear the form after submission/update
        setFormData({
          category: '',
          title: '',
          description: '',
          location: {
            address: '',
          },
          severity: 3,
          media: [],
          contactInfo: {
            name: user.name || '',
            email: user.email || '',
            phone: ''
          },
          isAnonymous: false,
          allowFollowUp: true
        });
        setCharCount(0);
      } else {
        const errorText = await response.text(); // Read response as text for potential error messages
        setErrors({ submit: `Failed to ${isEditing ? 'update' : 'submit'} report: ${response.status} ${response.statusText}. ${errorText}` });
        console.error(`Complaint ${isEditing ? 'update' : 'submission'} error:`, response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error('Complaint submission network error:', error);
      setErrors({ submit: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
      setShowSummary(false); // Hide summary after submission attempt
    }
  };

  const handleEdit = () => {
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background">
        {!hideHeader && <Header isAuthenticated={true} />} {/* Conditionally render Header */}
        <ReportSummary 
          data={formData}
          onEdit={handleEdit}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={errors.submit}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header isAuthenticated={true} />} {/* Conditionally render Header */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Icon name="Plus" size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isEditing ? 'Update Your Complaint' : 'Report a Community Issue'}
          </h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Help improve your neighborhood by reporting issues that need attention.
            Your report helps local authorities prioritize and address community concerns.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-border">
            <div className="p-8">
              <div className="space-y-8">
                {/* Category Selection */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
                    <Icon name="Tag" size={24} className="mr-2" />
                    What type of issue are you reporting?
                  </h2>
                  <CategorySelector 
                    selectedCategory={formData.category}
                    onCategorySelect={handleCategorySelect}
                    error={errors.category}
                  />
                </div>

                {/* Issue Details */}
                {formData.category && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center">
                      <Icon name="FileText" size={24} className="mr-2" />
                      Tell us more about the issue
                    </h2>
                    
                    <Input
                      type="text"
                      name="title"
                      label="Issue Title"
                      placeholder="A brief, clear title for the issue (e.g., 'Pothole on Main St.')"
                      value={formData.title}
                      onChange={handleInputChange}
                      error={errors.title}
                      icon="MapPin"
                      required
                    />

                    <div>
                      <Textarea
                        name="description"
                        label="Detailed Description"
                        placeholder="Provide specific details about the issue, its location, size, severity, and any other relevant information..."
                        value={formData.description}
                        onChange={handleInputChange}
                        error={errors.description}
                        rows={6}
                        required
                      />
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-text-secondary">
                          <Icon name="Info" size={16} className="inline mr-1" />
                          The more details, the faster we can address it
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
                )}

                {/* Severity Slider */}
                {/* {formData.category && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center">
                      <Icon name="Thermometer" size={24} className="mr-2" />
                      How severe is the issue?
                    </h2>
                    <SeveritySlider 
                      severity={formData.severity}
                      onSeverityChange={handleSeverityChange}
                    />
                    <p className="text-sm text-text-secondary">
                      Severity helps us prioritize. 1 = Minor, 5 = Critical.
                    </p>
                  </div>
                )} */}

                {/* Media Upload */}
                {formData.category && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center">
                      <Icon name="Camera" size={24} className="mr-2" />
                      Add Photos or Videos (Optional)
                    </h2>
                    <MediaUpload 
                      media={formData.media}
                      onMediaUpload={handleMediaUpload}
                    />
                    <p className="text-sm text-text-secondary">
                      Visual evidence greatly helps in resolving the issue.
                    </p>
                  </div>
                )}

                {/* Location Address */}
                {formData.category && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
                      <Icon name="MapPin" size={24} className="mr-2" />
                      Where is the issue located?
                    </h2>
                    <Input
                      label="Location Address"
                      id="locationAddress"
                      name="location.address"
                      value={formData.location.address}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            address: e.target.value
                          }
                        }));
                        if (errors.locationAddress) {
                          setErrors(prev => ({ ...prev, locationAddress: '' }));
                        }
                      }}
                      placeholder="E.g., 123 Main St, City, State"
                      error={errors.locationAddress}
                    />
                  </div>
                )}

                {/* Contact Information */}
                {formData.category && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center">
                      <Icon name="User" size={24} className="mr-2" />
                      Your Contact Information
                    </h2>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                      />
                      <div>
                        <span className="text-text-primary font-medium">Report Anonymously</span>
                        <p className="text-text-secondary text-sm mt-1">
                          Your contact information will not be shared with authorities.
                        </p>
                      </div>
                    </label>

                    {!formData.isAnonymous && (
                      <div className="space-y-4 bg-surface rounded-lg p-6">
                        <Input
                          type="text"
                          name="name"
                          label="Full Name"
                          placeholder="Enter your full name"
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
                        <Input
                          type="tel"
                          name="phone"
                          label="Phone Number (Optional)"
                          placeholder="Enter your phone number"
                          value={formData.contactInfo.phone}
                          onChange={handleContactInfoChange}
                          icon="Phone"
                        />
                        <label className="flex items-start space-x-3 mt-4">
                          <input
                            type="checkbox"
                            name="allowFollowUp"
                            checked={formData.allowFollowUp}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                          />
                          <div>
                            <span className="text-text-primary font-medium">Allow follow-up questions from authorities</span>
                            <p className="text-text-secondary text-sm mt-1">
                              This helps authorities get more details if needed.
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <Icon name="AlertCircle" size={20} className="text-error mr-2" />
                      <span className="text-error text-sm">{errors.submit}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="border-t border-border pt-6 mt-6 flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handlePreview}
                    icon="Eye"
                    disabled={isLoading}
                  >
                    Review Report
                  </Button>
                  <Button
                    type="submit"
                    icon="Send"
                    disabled={isLoading}
                  >
                    {isEditing ? 'Update Complaint' : 'Submit Report'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportIssue;