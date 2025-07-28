import React from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Card = ({
  children,
  variant = 'basic',
  className = '',
  onClick,
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg border border-border transition-all duration-200';
  
  const variantClasses = {
    basic: 'p-6',
    interactive: 'p-6 cursor-pointer hover:shadow-md hover:border-primary/20',
    compact: 'p-4',
  };

  const hoverClasses = hover || onClick ? 'hover:shadow-md hover:border-primary/20' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `.trim();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

// Issue Card Component
export const IssueCard = ({
  issue,
  onClick,
  className = '',
  ...props
}) => {
  const statusColors = {
    pending: 'bg-warning text-white',
    'in-progress': 'bg-info text-white',
    resolved: 'bg-success text-white',
    rejected: 'bg-error text-white',
  };

  const priorityColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-error',
  };

  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={className}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {issue.title}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2">
            {issue.description}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status] || 'bg-gray-100 text-gray-800'}`}>
          {issue.status?.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      {issue.image && (
        <div className="mb-4">
          <Image
            src={issue.image}
            alt={issue.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-text-tertiary">
            <Icon name="MapPin" size={16} className="mr-1" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center text-text-tertiary">
            <Icon name="Calendar" size={16} className="mr-1" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`flex items-center ${priorityColors[issue.priority] || 'text-text-tertiary'}`}>
          <Icon name="AlertTriangle" size={16} className="mr-1" />
          <span className="capitalize">{issue.priority} Priority</span>
        </div>
      </div>
    </Card>
  );
};

// Stat Card Component
export const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  className = '',
  ...props
}) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-tertiary',
  };

  const trendIcons = {
    up: 'TrendingUp',
    down: 'TrendingDown',
    neutral: 'Minus',
  };

  return (
    <Card variant="basic" className={className} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 ${trendColors[trend]}`}>
              <Icon name={trendIcons[trend]} size={16} className="mr-1" />
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};

// Profile Card Component
export const ProfileCard = ({
  user,
  showActions = true,
  onEdit,
  onViewProfile,
  className = '',
  ...props
}) => {
  return (
    <Card variant="basic" className={className} {...props}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary truncate">
            {user.name}
          </h3>
          <p className="text-text-secondary text-sm">{user.email}</p>
          <p className="text-text-tertiary text-sm capitalize">{user.role}</p>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-text-tertiary hover:text-primary hover:bg-surface rounded-md transition-colors"
                aria-label="Edit profile"
              >
                <Icon name="Edit" size={18} />
              </button>
            )}
            {onViewProfile && (
              <button
                onClick={onViewProfile}
                className="p-2 text-text-tertiary hover:text-primary hover:bg-surface rounded-md transition-colors"
                aria-label="View profile"
              >
                <Icon name="Eye" size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;