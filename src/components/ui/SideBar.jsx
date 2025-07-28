import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SideBar = ({ userRole = 'user', isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
    },
    {
      key: 'my-reports',
      label: 'My Reports',
      icon: 'FileText',
      path: '/my-reports',
    },
    {
      key: 'report-issue',
      label: 'Report Issue',
      icon: 'Plus',
      path: '/report-issue',
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: 'User',
      path: '/profile',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/settings',
    },
  ];

  const adminMenuItems = [
    {
      key: 'admin-dashboard',
      label: 'Admin Dashboard',
      icon: 'LayoutDashboard',
      path: '/admin/dashboard',
    },
    {
      key: 'issue-management',
      label: 'Issue Management',
      icon: 'ClipboardList',
      path: '/admin/issues',
      submenu: [
        { label: 'All Issues', path: '/admin/issues' },
        { label: 'Pending Issues', path: '/admin/issues/pending' },
        { label: 'In Progress', path: '/admin/issues/in-progress' },
        { label: 'Resolved Issues', path: '/admin/issues/resolved' },
      ]
    },
    {
      key: 'user-management',
      label: 'User Management',
      icon: 'Users',
      path: '/admin/users',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/admin/analytics',
    },
    {
      key: 'system-settings',
      label: 'System Settings',
      icon: 'Settings',
      path: '/admin/settings',
    },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
  };

  return (
    <div className={`bg-white border-r border-border h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Icon name="MapPin" size={24} className="text-primary mr-2" />
              <span className="text-lg font-semibold text-text-primary">CleanStreet</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md hover:bg-surface text-text-secondary hover:text-primary transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.key}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleSection(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                  aria-expanded={expandedSections[item.key]}
                >
                  <div className="flex items-center">
                    <Icon name={item.icon} size={20} className="mr-3" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`transition-transform ${
                        expandedSections[item.key] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                
                {!isCollapsed && expandedSections[item.key] && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          isActiveRoute(subItem.path)
                            ? 'bg-primary-light text-white' :'text-text-secondary hover:text-primary hover:bg-surface'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon name={item.icon} size={20} className="mr-3" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Link
            to="/help"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface transition-colors"
            title={isCollapsed ? 'Help' : ''}
          >
            <Icon name="HelpCircle" size={20} className="mr-3" />
            {!isCollapsed && <span>Help</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-error hover:bg-red-50 transition-colors"
            title={isCollapsed ? 'Logout' : ''}
          >
            <Icon name="LogOut" size={20} className="mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;