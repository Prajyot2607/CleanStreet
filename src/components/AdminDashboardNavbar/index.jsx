import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const AdminDashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('You have been successfully logged out.');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard" className="flex items-center">
            <Icon name="MapPin" size={32} className="text-primary mr-2" />
            <span className="text-xl font-bold text-text-primary">CleanStreet</span>
          </Link>
          
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-text-secondary hidden md:block">
              Welcome, <span className="font-medium text-text-primary">{user.name}</span>
            </span>
          )}
          <Button onClick={handleLogout} variant="destructive" icon="LogOut">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminDashboardNavbar; 