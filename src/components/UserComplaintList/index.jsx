import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import Icon from '../AppIcon'; // Import Icon component
import ComplaintCard from '../ComplaintCard'; // Import the new ComplaintCard component
import { useNavigate, useParams } from 'react-router-dom'; // Re-introduce useNavigate

const UserComplaintList = ({ userId, onEditComplaint }) => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   // Get user from AuthContext 
    // Get user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Use the user ID from the context, or the prop if provided (though context is preferred after login)
    // const { userId } = useParams();

    const fetchUserComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/complaints/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization header
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserComplaints();
  }, [userId]); // Rerun effect if user object or userId prop changes

  const handleEditComplaint = (complaint) => {
    // Instead of navigating, call the onEditComplaint prop with the complaint object
    if (onEditComplaint) {
      onEditComplaint(complaint);
    }
  };

  const handleUpdateComplaintSubmit = async (e) => {
    // This function is no longer directly used in this component, as we're navigating.
    // The update logic will be handled in the ReportIssue component.
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm(`Are you sure you want to delete complaint ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/complaints/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          alert('Complaint deleted successfully!');
          // Remove the deleted complaint from the state
          setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== id));
        } else {
          const errorText = await response.text();
          alert(`Failed to delete complaint: ${response.status} ${response.statusText}. ${errorText}`);
        }
      } catch (error) {
        alert(`Network error: Could not connect to the server to delete complaint. ${error.message}`);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading your complaints...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-error">Error loading your complaints: {error}</div>;
  }

  if (complaints.length === 0) {
    return <div className="text-center py-8 text-text-secondary">You have not reported any complaints yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaints.map(complaint => (
        <ComplaintCard 
          key={complaint.id} 
          complaint={complaint} 
          onEdit={handleEditComplaint} 
          onDelete={handleDeleteComplaint}
        />
      ))}
    </div>
  );
};

export default UserComplaintList; 