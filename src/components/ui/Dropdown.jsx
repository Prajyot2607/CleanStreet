import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-left',
  className = '',
  menuClassName = '',
  disabled = false,
  closeOnClick = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const placementClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
  };

  const menuClasses = `
    absolute z-50 min-w-48 bg-white rounded-md shadow-lg border border-border py-1
    ${placementClasses[placement]}
    ${menuClassName}
  `.trim();

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`} {...props}>
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={menuClasses}>
          <div onClick={closeOnClick ? closeDropdown : undefined}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Select Dropdown Component
export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  success,
  label,
  required = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-error'
    : success
    ? 'border-success focus:border-success focus:ring-success' :'border-border focus:border-primary focus:ring-primary';

  const triggerClasses = `
    w-full flex items-center justify-between px-3 py-2 text-sm bg-white border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed
    ${stateClasses}
    ${disabled ? 'bg-gray-50' : 'hover:border-primary/50'}
  `.trim();

  return (
    <div className={className}>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${error ? 'text-error' : success ? 'text-success' : 'text-text-primary'}`}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <Dropdown
        trigger={
          <button
            type="button"
            className={triggerClasses}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className={selectedOption ? 'text-text-primary' : 'text-text-tertiary'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
          </button>
        }
        closeOnClick={false}
        disabled={disabled}
      >
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-4 py-2 text-sm hover:bg-surface transition-colors ${
                selectedOption?.value === option.value
                  ? 'bg-primary text-white hover:bg-primary-dark' :'text-text-primary'
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Dropdown>

      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      
      {success && (
        <p className="mt-1 text-sm text-success flex items-center">
          <Icon name="CheckCircle" size={16} className="mr-1" />
          {success}
        </p>
      )}
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const itemClasses = `
    w-full flex items-center px-4 py-2 text-sm text-left transition-colors
    ${disabled 
      ? 'text-text-tertiary cursor-not-allowed' :'text-text-primary hover:bg-surface hover:text-primary cursor-pointer'
    }
    ${className}
  `.trim();

  return (
    <button
      type="button"
      className={itemClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon name={icon} size={16} className="mr-3" />}
      {children}
    </button>
  );
};

// Dropdown Divider Component
export const DropdownDivider = ({ className = '' }) => {
  return <div className={`border-t border-border my-1 ${className}`} />;
};

export default Dropdown;