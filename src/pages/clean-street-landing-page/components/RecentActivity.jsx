import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  // Mock recent activity data
  const recentIssues = [
    {
      id: 1,
      title: "Broken Streetlight on Main Street",
      description: "The streetlight near the bus stop has been flickering and went out completely last night. This creates a safety hazard for pedestrians.",
      location: "Main Street & 5th Avenue",
      status: "resolved",
      reportedBy: "Sarah Johnson",
      reportedDate: "2024-01-15",
      resolvedDate: "2024-01-18",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      priority: "high"
    },
    {
      id: 2,
      title: "Illegal Dumping in Park Area",
      description: "Large pile of construction debris dumped near the children\'s playground. Needs immediate cleanup for safety reasons.",
      location: "Riverside Park",
      status: "in-progress",
      reportedBy: "Michael Chen",
      reportedDate: "2024-01-20",
      resolvedDate: null,
      category: "Waste Management",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
      priority: "high"
    },
    {
      id: 3,
      title: "Pothole on Elm Street",
      description: "Large pothole causing damage to vehicles and creating dangerous driving conditions during rush hour.",
      location: "Elm Street near School Zone",
      status: "reported",
      reportedBy: "David Rodriguez",
      reportedDate: "2024-01-22",
      resolvedDate: null,
      category: "Road Maintenance",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      priority: "medium"
    },
    {
      id: 4,
      title: "Graffiti on Community Center",
      description: "Vandalism on the exterior walls of the community center. Multiple tags and inappropriate content visible.",
      location: "Downtown Community Center",
      status: "resolved",
      reportedBy: "Lisa Thompson",
      reportedDate: "2024-01-10",
      resolvedDate: "2024-01-14",
      category: "Vandalism",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop",
      priority: "low"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-success text-white';
      case 'in-progress':
        return 'bg-warning text-white';
      case 'reported':
        return 'bg-info text-white';
      default:
        return 'bg-text-tertiary text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'reported':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-tertiary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Recent Community Activity
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Stay updated with the latest issues reported and resolved in your community. See how your neighbors are making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recentIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative">
                <Image
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    <Icon name={getStatusIcon(issue.status)} size={12} className="mr-1" />
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white bg-opacity-90 ${getPriorityColor(issue.priority)}`}>
                    <Icon name="Flag" size={12} className="mr-1" />
                    {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
                    {issue.title}
                  </h3>
                </div>

                <p className="text-text-secondary mb-4 line-clamp-3">
                  {issue.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="MapPin" size={16} className="mr-2 text-text-tertiary" />
                    <span>{issue.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="Tag" size={16} className="mr-2 text-text-tertiary" />
                    <span>{issue.category}</span>
                  </div>

                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="User" size={16} className="mr-2 text-text-tertiary" />
                    <span>Reported by {issue.reportedBy}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Icon name="Calendar" size={16} className="mr-2 text-text-tertiary" />
                      <span>Reported: {formatDate(issue.reportedDate)}</span>
                    </div>
                    {issue.resolvedDate && (
                      <div className="flex items-center">
                        <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
                        <span>Resolved: {formatDate(issue.resolvedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Icon name="Eye" size={20} className="mr-2" />
            View All Activity
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default RecentActivity;