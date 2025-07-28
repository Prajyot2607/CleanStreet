import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    alert('You have been successfully logged out.');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/clean-street-landing-page" className="flex items-center">
              <Icon name="MapPin" size={32} className="text-primary mr-2" />
              <span className="text-xl font-bold text-text-primary">CleanStreet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/clean-street-landing-page"
              className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/feedback"
              className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Feedback
            </Link>
            {/* {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
            )} */}
            {/* {isAuthenticated && !isAdmin && (
              <Link
                to="/user/dashboard"
                className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                User Dashboard
              </Link>
            )} */}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <Icon name="User" size={20} />
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-border">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link
                to="/clean-street-landing-page"
                className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/feedback"
                className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Feedback
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {isAuthenticated && !isAdmin && (
                <Link
                  to="/user/dashboard"
                  className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  User Dashboard
                </Link>
              )}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 pb-3 border-t border-border">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="flex items-center px-3 py-2">
                      <Icon name="User" size={20} className="text-text-tertiary mr-3" />
                      <span className="text-base font-medium text-text-primary">{user?.name || 'User'}</span>
                    </div>
                    <Link
                      to="/profile"
                      className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="block text-text-secondary hover:text-primary hover:bg-surface px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-md text-base font-medium transition-colors mx-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;