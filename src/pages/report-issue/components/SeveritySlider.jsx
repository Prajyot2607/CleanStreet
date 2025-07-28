// src/pages/report-issue/components/SeveritySlider.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const SeveritySlider = ({ severity, onSeverityChange }) => {
  const severityLevels = [
    {
      value: 1,
      label: 'Low',
      description: 'Minor inconvenience, no immediate danger',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      icon: 'Info'
    },
    {
      value: 2,
      label: 'Low-Medium',
      description: 'Noticeable issue, some impact on daily life',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200',
      icon: 'AlertTriangle'
    },
    {
      value: 3,
      label: 'Medium',
      description: 'Moderate concern, affects multiple people',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-200',
      icon: 'AlertCircle'
    },
    {
      value: 4,
      label: 'Medium-High',
      description: 'Significant issue, needs prompt attention',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200',
      icon: 'AlertOctagon'
    },
    {
      value: 5,
      label: 'High',
      description: 'Urgent safety concern, immediate action required',
      color: 'text-red-700',
      bgColor: 'bg-red-200',
      borderColor: 'border-red-300',
      icon: 'ShieldAlert'
    }
  ];

  const currentLevel = severityLevels.find(level => level.value === severity) || severityLevels[2];

  const getSliderColor = () => {
    if (severity <= 1) return 'bg-green-500';
    if (severity <= 2) return 'bg-yellow-500';
    if (severity <= 3) return 'bg-orange-500';
    if (severity <= 4) return 'bg-red-500';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Current Selection Display */}
      <div className={`p-4 rounded-lg border ${currentLevel.bgColor} ${currentLevel.borderColor}`}>
        <div className="flex items-center mb-2">
          <Icon name={currentLevel.icon} size={24} className={`mr-3 ${currentLevel.color}`} />
          <div>
            <h4 className={`font-semibold ${currentLevel.color}`}>
              {currentLevel.label} Priority
            </h4>
            <p className="text-sm text-text-secondary mt-1">
              {currentLevel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={severity}
            onChange={(e) => onSeverityChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                #10b981 0%, #10b981 ${((severity - 1) / 4) * 20}%, 
                #f59e0b ${((severity - 1) / 4) * 20}%, #f59e0b ${((severity - 1) / 4) * 40}%, 
                #f97316 ${((severity - 1) / 4) * 40}%, #f97316 ${((severity - 1) / 4) * 60}%, 
                #ef4444 ${((severity - 1) / 4) * 60}%, #ef4444 ${((severity - 1) / 4) * 80}%, 
                #dc2626 ${((severity - 1) / 4) * 80}%, #dc2626 100%)`
            }}
          />
          
          {/* Slider Labels */}
          <div className="flex justify-between mt-2 px-1">
            {severityLevels.map((level) => (
              <div key={level.value} className="text-center">
                <div className={`text-xs font-medium ${
                  severity === level.value ? level.color : 'text-text-tertiary'
                }`}>
                  {level.value}
                </div>
                <div className={`text-xs mt-1 ${
                  severity === level.value ? level.color : 'text-text-tertiary'
                }`}>
                  {level.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Severity Level Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {severityLevels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onSeverityChange(level.value)}
            className={`p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              severity === level.value
                ? `${level.bgColor} ${level.borderColor} shadow-md`
                : 'border-border bg-white hover:border-primary hover:border-opacity-50'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon 
                name={level.icon} 
                size={20} 
                className={severity === level.value ? level.color : 'text-text-tertiary'} 
              />
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${
                severity === level.value ? level.color : 'text-text-primary'
              }`}>
                {level.label}
              </div>
              <div className="text-xs text-text-secondary mt-1 leading-tight">
                {level.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start">
          <Icon name="HelpCircle" size={20} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-800 font-medium mb-1">How to Assess Severity</p>
            <ul className="text-blue-700 space-y-1">
              <li>• <strong>Low:</strong> Aesthetic issues, minor maintenance needs</li>
              <li>• <strong>Medium:</strong> Issues affecting accessibility or daily routines</li>
              <li>• <strong>High:</strong> Safety hazards, urgent infrastructure problems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeveritySlider;