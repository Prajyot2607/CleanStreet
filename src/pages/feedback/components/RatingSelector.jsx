// src/pages/feedback/components/RatingSelector.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RatingSelector = ({ rating, onRatingChange, error }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels = {
    1: { text: 'Very Poor', emoji: '😞', color: 'text-red-600' },
    2: { text: 'Poor', emoji: '😕', color: 'text-orange-600' },
    3: { text: 'Average', emoji: '😐', color: 'text-yellow-600' },
    4: { text: 'Good', emoji: '😊', color: 'text-green-600' },
    5: { text: 'Excellent', emoji: '😄', color: 'text-green-700' }
  };

  const currentRating = hoverRating || rating;
  const currentLabel = ratingLabels[currentRating];

  return (
    <div className="space-y-4">
      {/* Star Rating */}
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${
              star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Icon 
              name="Star" 
              size={32} 
              className={star <= currentRating ? 'fill-current' : ''}
            />
          </button>
        ))}
      </div>

      {/* Rating Display */}
      {currentRating > 0 && (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl">{currentLabel.emoji}</span>
            <span className={`text-lg font-semibold ${currentLabel.color}`}>
              {currentLabel.text}
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            {rating > 0 ? `You rated: ${rating}/5 stars` : `Click to rate: ${currentRating}/5 stars`}
          </p>
        </div>
      )}

      {/* Emoji Rating Alternative */}
      <div className="flex items-center justify-center space-x-3 mt-6">
        {Object.entries(ratingLabels).map(([value, { text, emoji, color }]) => (
          <button
            key={value}
            type="button"
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              rating === parseInt(value)
                ? 'border-primary bg-primary bg-opacity-10 shadow-md'
                : 'border-border hover:border-primary hover:border-opacity-50 bg-white'
            }`}
            onClick={() => onRatingChange(parseInt(value))}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className={`text-xs font-medium ${
                rating === parseInt(value) ? 'text-primary' : color
              }`}>
                {text}
              </div>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-error text-sm flex items-center justify-center mt-2">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}

      {rating > 0 && (
        <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center text-primary">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            <span className="font-medium">
              Thank you for rating your experience!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSelector;