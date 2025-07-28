import React, { useState, useEffect } from 'react';
import ComplaintCard from '../ComplaintCard';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ComplaintList = ({ isAdmin, searchQuery }) => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { userid }=useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    console.log(userid);
    

    fetchComplaints();
  }, [user,userid]);
  const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/complaints', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  const handleEditComplaint = (id) => {
    navigate(`/report-issue/${id}`);
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm(`Are you sure you want to delete complaint ${id}?`)) {
      try {
        // Fetch the complaint to check its status before deleting
        const response = await fetch(`http://localhost:8080/api/complaints/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch complaint for deletion check: ${response.status} ${response.statusText}. ${errorText}`);
        }
        const complaintToDelete = await response.json();

        if (complaintToDelete.status !== 'RESOLVED') {
          alert('Complaints can only be deleted if their status is RESOLVED.');
          return; // Prevent deletion if not resolved
        }

        const deleteResponse = await fetch(`http://localhost:8080/api/complaints/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (deleteResponse.ok) {
          alert('Complaint deleted successfully by Admin!');
          setComplaints(prev => prev.filter(c => c.id !== id));
        } else {
          const errorText = await deleteResponse.text();
          alert(`Failed to delete complaint: ${deleteResponse.status} ${deleteResponse.statusText}. ${errorText}`);
        }
      } catch (error) {
        alert(`Network error: Could not connect to the server. ${error.message}`);
      }
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/complaints/status/${complaintId}?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        // body: JSON.stringify({ ...complaints.find(c => c.id === complaintId), status: newStatus })
      });

      if (response.ok) {
       /* const updatedComplaint = await response.json();
        setComplaints(prevComplaints =>
          prevComplaints.map(complaint =>
            complaint.id === complaintId ? updatedComplaint : complaint
          )
        );*/
        fetchComplaints();
        alert(`Complaint ${complaintId} status updated to ${newStatus}`);
      } else {
        const errorText = await response.text();
        alert(`Failed to update status: ${response.status} ${response.statusText}. ${errorText}`);
      }
    } catch (error) {
      alert(`Network error: Could not connect to the server. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading all complaints...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-error">Error loading complaints: {error}</div>;
  }

  if (complaints.length === 0) {
    return <div className="text-center py-8 text-text-secondary">No complaints found in the system.</div>;
  }

  const filteredComplaints = complaints.filter(complaint =>
    complaint.location.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredComplaints.length === 0) {
    return <div className="text-center py-8 text-text-secondary">No complaints found matching your search.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredComplaints.map(complaint => (
        <ComplaintCard
          key={complaint.id}
          complaint={complaint}
          onEdit={() => handleEditComplaint(complaint.id)}
          onDelete={handleDeleteComplaint}
          onStatusChange={handleStatusChange}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ComplaintList;
