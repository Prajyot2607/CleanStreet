// src/pages/report-issue/components/CategorySelector.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const CategorySelector = ({ selectedCategory, onCategorySelect, error }) => {
  const categories = [
    {
      id: 'graffiti',
      name: 'Graffiti',
      description: 'Vandalism, tags, unwanted artwork',
      icon: 'Paintbrush',
      color: 'bg-red-100 text-red-600 border-red-200'
    },
    {
      id: 'trash',
      name: 'Trash & Litter',
      description: 'Overflowing bins, illegal dumping, litter',
      icon: 'Trash2',
      color: 'bg-orange-100 text-orange-600 border-orange-200'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      description: 'Potholes, broken sidewalks, damaged roads',
      icon: 'Construction',
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200'
    },
    {
      id: 'lighting',
      name: 'Street Lighting',
      description: 'Broken lights, dark areas, safety concerns',
      icon: 'Lightbulb',
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    {
      id: 'vegetation',
      name: 'Vegetation',
      description: 'Overgrown plants, dead trees, landscaping',
      icon: 'TreePine',
      color: 'bg-green-100 text-green-600 border-green-200'
    },
    {
      id: 'traffic',
      name: 'Traffic & Parking',
      description: 'Signage, parking violations, traffic flow',
      icon: 'Car',
      color: 'bg-purple-100 text-purple-600 border-purple-200'
    },
    {
      id: 'public-safety',
      name: 'Public Safety',
      description: 'Suspicious activity, safety hazards',
      icon: 'Shield',
      color: 'bg-red-100 text-red-600 border-red-200'
    },
    {
      id: 'noise',
      name: 'Noise Issues',
      description: 'Construction noise, loud neighbors, events',
      icon: 'Volume2',
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    },
    {
      id: 'water',
      name: 'Water & Drainage',
      description: 'Leaks, flooding, drainage problems',
      icon: 'Droplet',
      color: 'bg-cyan-100 text-cyan-600 border-cyan-200'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Issues not covered by other categories',
      icon: 'MoreHorizontal',
      color: 'bg-gray-100 text-gray-600 border-gray-200'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              selectedCategory === category.id
                ? 'border-primary bg-primary bg-opacity-10 shadow-md'
                : `border-border hover:border-primary hover:border-opacity-50 bg-white ${category.color.split(' ')[0]}`
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

export default CategorySelector;