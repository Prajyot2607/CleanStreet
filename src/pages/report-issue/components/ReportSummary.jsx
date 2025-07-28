// src/pages/report-issue/components/ReportSummary.jsx
import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';


const ReportSummary = ({ data, onEdit, onSubmit, isLoading, error }) => {
  const categoryNames = {
    graffiti: 'Graffiti',
    trash: 'Trash & Litter',
    infrastructure: 'Infrastructure',
    lighting: 'Street Lighting',
    vegetation: 'Vegetation',
    traffic: 'Traffic & Parking',
    'public-safety': 'Public Safety',
    noise: 'Noise Issues',
    water: 'Water & Drainage',
    other: 'Other'
  };

  const severityLabels = {
    1: { label: 'Low Priority', color: 'text-green-600', bgColor: 'bg-green-100' },
    2: { label: 'Low-Medium Priority', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    3: { label: 'Medium Priority', color: 'text-orange-600', bgColor: 'bg-orange-100' },
    4: { label: 'Medium-High Priority', color: 'text-red-600', bgColor: 'bg-red-100' },
    5: { label: 'High Priority', color: 'text-red-700', bgColor: 'bg-red-200' }
  };

  const currentSeverity = severityLabels[data.severity] || severityLabels[3];

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Icon name="Eye" size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-text-primary mb-2">Review Your Report</h1>
          <p className="text-text-secondary">
            Please review all details before submitting your report to local authorities.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} className="text-error mr-2" />
              <span className="text-error text-sm">{error}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg border border-border overflow-hidden">
          {/* Report Header */}
          <div className="bg-surface border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg mr-4">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{data.title}</h2>
                  <p className="text-text-secondary">
                    {/* {categoryNames[data.category]}  Report #{Date.now().toString().slice(-6)} */}
                  </p>
                </div>
              </div>
              
              {/* <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentSeverity.bgColor} ${currentSeverity.color}`}>
                {currentSeverity.label}
              </div> */}
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Issue Details */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="FileText" size={20} className="mr-2" />
                Issue Details
              </h3>
              <div className="bg-surface rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Category</label>
                    <p className="text-text-primary">{categoryNames[data.category]}</p>
                  </div>
                  {/* <div>
                    <label className="text-sm font-medium text-text-secondary">Priority Level</label>
                    <p className={currentSeverity.color}>{currentSeverity.label}</p>
                  </div> */}
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">Description</label>
                  <p className="text-text-primary mt-1 leading-relaxed">{data.description}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="MapPin" size={20} className="mr-2" />
                Location
              </h3>
              <div className="bg-surface rounded-lg p-4">
                <p className="text-text-primary mb-2">{data.location.address}</p>
                {data.location.coordinates && data.location.coordinates.lat != null && data.location.coordinates.lng != null && (
                  <p className="text-sm text-text-secondary">
                    Coordinates: {data.location.coordinates.lat.toFixed(6)}, {data.location.coordinates.lng.toFixed(6)}
                  </p>
                )}
                
                {/* Mock Map */}
                {/* <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-border">
                  <div className="text-center text-text-secondary">
                    <Icon name="Map" size={48} className="mx-auto mb-2" />
                    <p className="text-sm">Location Preview</p>
                    <p className="text-xs">{data.location.address}</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Media */}
            {data.media && data.media.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                  <Icon name="Camera" size={20} className="mr-2" />
                  Attached Media ({data.media.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.media.map((item, index) => (
                    <div key={item.id || index} className="relative bg-surface rounded-lg overflow-hidden border border-border">
                      <div className="aspect-video">
                        {item.type === 'image' ? (
                          <img
                            src={item.preview}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              src={item.preview}
                              alt={`Video ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Icon name="Play" size={24} className="text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-text-secondary truncate">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Contact Information
              </h3>
              <div className="bg-surface rounded-lg p-4">
                {data.isAnonymous ? (
                  <div className="flex items-center text-text-secondary">
                    <Icon name="EyeOff" size={20} className="mr-2" />
                    <span>This report will be submitted anonymously</span>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Name</label>
                      <p className="text-text-primary">{data.contactInfo.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Email</label>
                      <p className="text-text-primary">{data.contactInfo.email}</p>
                    </div>
                    {data.contactInfo.phone && (
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Phone</label>
                        <p className="text-text-primary">{data.contactInfo.phone}</p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <div className="flex items-center text-sm">
                        <Icon 
                          name={data.allowFollowUp ? "Check" : "X"} 
                          size={16} 
                          className={`mr-2 ${data.allowFollowUp ? 'text-success' : 'text-text-tertiary'}`} 
                        />
                        <span className="text-text-secondary">
                          {data.allowFollowUp ? 'Follow-up communication allowed' : 'No follow-up communication'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Info */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icon name="Info" size={20} className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-800 font-medium mb-1">What happens next?</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Your report will be automatically sent to the appropriate local department</li>
                    <li>• You'll receive a confirmation email with a tracking number</li>
                    <li>• Updates will be posted as the issue is addressed</li>
                    <li>• Average response time is 2-3 business days</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="bg-surface border-t border-border p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                variant="secondary"
                onClick={onEdit}
                icon="Edit"
                disabled={isLoading}
              >
                Edit Report
              </Button>
              <Button
                onClick={onSubmit}
                loading={isLoading}
                disabled={isLoading}
                icon="Send"
                size="large"
              >
                {isLoading ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;