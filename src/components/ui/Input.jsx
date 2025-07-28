import React, { useState, forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  showPasswordToggle = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseInputClasses = 'block w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-error'
    : success
    ? 'border-success focus:border-success focus:ring-success' :'border-border focus:border-primary focus:ring-primary';

  const sizeClasses = 'px-3 py-2 text-sm';

  const iconPaddingClasses = icon
    ? iconPosition === 'left' ?'pl-10' :'pr-10' :'';

  const passwordTogglePadding = type === 'password' && showPasswordToggle ? 'pr-10' : '';

  const inputClasses = `
    ${baseInputClasses}
    ${stateClasses}
    ${sizeClasses}
    ${iconPaddingClasses}
    ${passwordTogglePadding}
    ${inputClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium mb-1
    ${error ? 'text-error' : success ? 'text-success' : 'text-text-primary'}
    ${disabled ? 'opacity-50' : ''}
    ${labelClassName}
  `.trim();

  return (
    <div className={className}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'} pointer-events-none`}>
            <Icon
              name={icon}
              size={18}
              className={error ? 'text-error' : success ? 'text-success' : 'text-text-tertiary'}
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-tertiary hover:text-text-secondary"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            <Icon
              name={showPassword ? 'EyeOff' : 'Eye'}
              size={18}
            />
          </button>
        )}
      </div>
      
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
});

Input.displayName = 'Input';

// Textarea component
export const Textarea = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const baseTextareaClasses = 'block w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';

  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-error'
    : success
    ? 'border-success focus:border-success focus:ring-success' :'border-border focus:border-primary focus:ring-primary';

  const sizeClasses = 'px-3 py-2 text-sm';

  const textareaClasses = `
    ${baseTextareaClasses}
    ${stateClasses}
    ${sizeClasses}
    ${textareaClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium mb-1
    ${error ? 'text-error' : success ? 'text-success' : 'text-text-primary'}
    ${disabled ? 'opacity-50' : ''}
    ${labelClassName}
  `.trim();

  return (
    <div className={className}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
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
});

Textarea.displayName = 'Textarea';

export default Input;