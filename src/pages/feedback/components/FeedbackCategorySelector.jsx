// src/pages/feedback/components/FeedbackCategorySelector.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const FeedbackCategorySelector = ({ selectedCategory, onCategorySelect, error }) => {
  const categories = [
    {
      id: 'experience',
      name: 'Platform Experience',
      description: 'Share your overall experience using CleanStreet',
      icon: 'Star',
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    {
      id: 'feature-request',
      name: 'Feature Request',
      description: 'Suggest new features or improvements',
      icon: 'Lightbulb',
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200'
    },
    {
      id: 'bug-report',
      name: 'Bug Report',
      description: 'Report technical issues or problems',
      icon: 'Bug',
      color: 'bg-red-100 text-red-600 border-red-200'
    },
    {
      id: 'general',
      name: 'General Comment',
      description: 'Share general thoughts or suggestions',
      icon: 'MessageCircle',
      color: 'bg-green-100 text-green-600 border-green-200'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              selectedCategory === category.id
                ? 'border-primary bg-primary bg-opacity-10 shadow-md'
                : `border-border hover:border-primary hover:border-opacity-50 bg-white`
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : category.color
              }`}>
                <Icon name={category.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold mb-1 ${
                  selectedCategory === category.id
                    ? 'text-primary' :'text-text-primary'
                }`}>
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {category.description}
                </p>
              </div>
              {selectedCategory === category.id && (
                <div className="flex-shrink-0">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {error && (
        <p className="mt-2 text-error text-sm flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      
      {selectedCategory && (
        <div className="mt-4 p-4 bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg">
          <div className="flex items-center text-primary">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            <span className="font-medium">
              Category selected: {categories.find(cat => cat.id === selectedCategory)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCategorySelector;