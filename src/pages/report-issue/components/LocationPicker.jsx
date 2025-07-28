// src/pages/report-issue/components/LocationPicker.jsx
import React, { useState, useEffect } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const LocationPicker = ({ onLocationSelect, selectedLocation, error }) => {
  const [address, setAddress] = useState(selectedLocation?.address || '');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock address suggestions
  const mockSuggestions = [
    { id: 1, address: '123 Main Street, Downtown', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { id: 2, address: '456 Oak Avenue, Midtown', coordinates: { lat: 40.7589, lng: -73.9851 } },
    { id: 3, address: '789 Pine Road, Uptown', coordinates: { lat: 40.7831, lng: -73.9712 } },
    { id: 4, address: '321 Elm Street, Riverside', coordinates: { lat: 40.7505, lng: -73.9934 } },
    { id: 5, address: '654 Maple Drive, Hillside', coordinates: { lat: 40.7614, lng: -73.9776 } }
  ];

  useEffect(() => {
    if (address.length > 2) {
      // Filter suggestions based on input
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.address.toLowerCase().includes(address.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setLocationError('');
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.address);
    setShowSuggestions(false);
    onLocationSelect({
      address: suggestion.address,
      coordinates: suggestion.coordinates
    });
  };

  const handleManualAddressSubmit = () => {
    if (address.trim()) {
      // For demo purposes, generate random coordinates
      const coordinates = {
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1
      };
      
      onLocationSelect({
        address: address.trim(),
        coordinates
      });
      setShowSuggestions(false);
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Mock reverse geocoding for demo
        const mockAddress = `${Math.floor(Math.random() * 999) + 1} Current Street, Your Neighborhood`;
        
        setAddress(mockAddress);
        onLocationSelect({
          address: mockAddress,
          coordinates: { lat: latitude, lng: longitude }
        });
        setUseCurrentLocation(true);
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Input
              type="text"
              label="Street Address"
              placeholder="Enter the address where the issue is located"
              value={address}
              onChange={handleAddressChange}
              error={error || locationError}
              icon="MapPin"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleManualAddressSubmit();
                }
              }}
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    className="w-full px-4 py-3 text-left hover:bg-surface focus:bg-surface focus:outline-none transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <Icon name="MapPin" size={16} className="text-text-tertiary mr-2" />
                      <span className="text-text-primary">{suggestion.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={getCurrentLocation}
            loading={isGettingLocation}
            disabled={isGettingLocation}
            icon="Navigation"
          >
            {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
          
          {address && !showSuggestions && (
            <Button
              type="button"
              variant="tertiary"
              fullWidth
              onClick={handleManualAddressSubmit}
              icon="Check"
              size="small"
            >
              Confirm Address
            </Button>
          )}
        </div>
      </div>

      {useCurrentLocation && (
        <div className="flex items-center text-success text-sm">
          <Icon name="Navigation" size={16} className="mr-2" />
          <span>Using your current location</span>
        </div>
      )}

      {selectedLocation?.coordinates && (
        <div className="bg-surface rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2" />
            Selected Location
          </h4>
          <p className="text-text-secondary mb-2">{selectedLocation.address}</p>
          {selectedLocation.coordinates.lat != null && selectedLocation.coordinates.lng != null && (
            <div className="text-sm text-text-tertiary">
              Coordinates: {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}
            </div>
          )}
          
          {/* Mock Map Placeholder */}
          <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center text-text-secondary">
              <Icon name="Map" size={48} className="mx-auto mb-2" />
              <p className="text-sm">Interactive Map View</p>
              <p className="text-xs">(Would show actual map in production)</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start">
          <Icon name="Info" size={20} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-800 font-medium mb-1">Location Tips</p>
            <ul className="text-blue-700 space-y-1">
              <li>• Be as specific as possible with the address</li>
              <li>• Use landmarks if the exact address is unknown</li>
              <li>• Current location provides the most accurate coordinates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;