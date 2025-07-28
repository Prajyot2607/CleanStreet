import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  // If still loading auth state, show a loading indicator or null
  if (isLoading) {
    return <div>Loading authentication...</div>; // Or return null or a loading spinner
  }

  // Check if user is authenticated
  if (!user) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, check if user's role is allowed
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // If role is not allowed, redirect to an unauthorized page or home
      return <Navigate to="/unauthorized" replace />; // TODO: Create an Unauthorized page or redirect elsewhere
    }
  }

  // If authenticated and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 