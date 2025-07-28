import React, { useState } from 'react';
import UserComplaintList from '../../components/UserComplaintList';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import ReportIssue from '../report-issue'; // Import the existing ReportIssue component
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserDashboard = () => {
  const { user, isLoading } = useAuth();
  const [showReportForm, setShowReportForm] = useState(false);
  const [editingComplaintData, setEditingComplaintData] = useState(null); // New state for editing complaint

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  const handleReportNewIssueClick = () => {
    setShowReportForm(true);
  };

  const handleBackToDashboard = () => {
    setShowReportForm(false);
    setEditingComplaintData(null); // Clear editing data when going back
  };

  const handleEditComplaintFromList = (complaint) => {
    setEditingComplaintData(complaint);
    setShowReportForm(true); // Show the form for editing
  };

  if (showReportForm) {
    return (
      <div className="min-h-screen bg-background">
        <UserDashboardNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={handleBackToDashboard} variant="secondary" icon="ArrowLeft">
              Back to Dashboard
            </Button>
          </div>
          <ReportIssue 
            onReportSuccess={handleBackToDashboard} 
            hideHeader={true} 
            editingComplaint={editingComplaintData} // Pass the complaint data for editing
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <UserDashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-text-primary">Welcome...</h1>
          <Button onClick={handleReportNewIssueClick} icon="PlusCircle">
            Report New Issue
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Display User Profile Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <Icon name="User" size={24} className="mr-2" />
              Profile Information
            </h2>
            <p className="text-text-secondary mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-text-secondary"><strong>Email:</strong> {user.email}</p>
          </div>

          {/* Additional User Dashboard Content (e.g., Stats or quick actions) */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <Icon name="BarChart2" size={24} className="mr-2" />
              Your Activity
            </h2>
            <p className="text-text-secondary">
              Here you can see a summary of your reported issues and their statuses.
            </p> */}
            {/* Add more stats or quick actions here */}
          {/* </div> */}
        </div>

        {/* User Specific Complaints List */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <Icon name="List" size={24} className="mr-2" />
            My Reported Complaints
          </h2>
          <UserComplaintList 
            userId={user.id} 
            onEditComplaint={handleEditComplaintFromList} // Pass the new handler
          />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 