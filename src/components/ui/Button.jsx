import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-white border border-gray-300 text-text-primary hover:bg-surface focus:ring-primary',
    tertiary: 'text-primary hover:text-primary-dark hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-error hover:bg-red-700 text-white focus:ring-error',
    icon: 'text-text-secondary hover:text-primary hover:bg-surface focus:ring-primary',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const iconSizeMap = {
    small: 16,
    medium: 18,
    large: 20,
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const iconSize = iconSizeMap[size];

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <Icon
          name="Loader2"
          size={iconSize}
          className={`animate-spin ${children || icon ? 'mr-2' : ''}`}
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <Icon
          name={icon}
          size={iconSize}
          className={children ? 'mr-2' : ''}
        />
      )}
      
      {children && <span>{children}</span>}
      
      {!loading && icon && iconPosition === 'right' && (
        <Icon
          name={icon}
          size={iconSize}
          className={children ? 'ml-2' : ''}
        />
      )}
    </button>
  );
};

export default Button;