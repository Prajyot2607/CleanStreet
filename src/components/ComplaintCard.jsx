import React from 'react';
import Icon from './AppIcon';
import Button from './ui/Button'; // Assuming Button component is in ui folder
import { useAuth } from '../context/AuthContext';

const ComplaintCard = ({ complaint, onEdit, onDelete, onStatusChange, isAdmin }) => {
  const { user } = useAuth();
  const isOwner = user && user.id === complaint.user.id;

  const getStatusBadge = (status) => {
    let badgeClass = '';
    switch (status) {
      case 'OPEN':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'IN_PROGRESS':
        badgeClass = 'bg-blue-100 text-blue-800';
        break;
      case 'RESOLVED':
        badgeClass = 'bg-green-100 text-green-800';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>{status}</span>;
  };

  const getFullImageUrl = (relativePath) => {
    if (!relativePath) return null;
    // Assuming your backend serves static files from /uploads
    return `http://localhost:8080${relativePath}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      {complaint.imageUrl && (
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img 
            src={getFullImageUrl(complaint.imageUrl)} 
            alt={complaint.title} 
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg md:text-xl font-bold text-text-primary pr-2 leading-tight">{complaint.title}</h3>
            {getStatusBadge(complaint.status)}
          </div>
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">{complaint.description}</p>

          <div className="space-y-1 text-sm text-text-secondary mt-2">
            <div className="flex items-center">
              <Icon name="MapPin" size={16} className="mr-1" />
              <span>Location: {complaint.location?.areaName || complaint.location?.address || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <Icon name="User" size={16} className="mr-1" />
              <span>Reported by: {complaint.isAnonymous ? 'Anonymous' : complaint.user?.name || complaint.user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              <span>Reported on: {new Date(complaint.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-border-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">


          {isAdmin ? (
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                value={complaint.status}
                onChange={(e) => onStatusChange(complaint.id, e.target.value)}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
              {complaint.status === 'RESOLVED' && (
                <Button
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => onDelete(complaint.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ) : (
            isOwner && complaint.status === 'OPEN' && (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                   className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => onEdit(complaint)}
                >
                  Edit
                </Button>
                <Button
                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => onDelete(complaint.id)}
                >
                  Delete
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard; 