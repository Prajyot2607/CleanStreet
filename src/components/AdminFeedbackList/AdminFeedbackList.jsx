import React, { useEffect, useState } from "react";


const AdminFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p className="text-text-secondary text-sm">Loading feedback...</p>;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (feedbacks.length === 0) return <p className="text-text-secondary text-sm">No feedback available.</p>;

  return (
    <div className="overflow-x-auto max-h-[300px]">
      <table className="w-full text-sm border border-gray-300 bg-white rounded-lg shadow">
        <thead className="bg-blue-200 text-blue-800">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Contact Name</th>
            <th className="p-2 border">Contact Email</th>
            
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.id} className="hover:bg-blue-50">
              <td className="p-2 border">{fb.id ?? "-"}</td>
              <td className="p-2 border">{fb.subject || "-"}</td>
              <td className="p-2 border">{fb.message || "-"}</td>
              <td className="p-2 border">{fb.contactName || "-"}</td>
              <td className="p-2 border">{fb.contactEmail || "-"}</td>
     
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackList;
