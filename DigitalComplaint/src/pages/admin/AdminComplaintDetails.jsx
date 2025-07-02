import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminComplaintDetails.css";

function AdminComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/admin/complaints/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaint(res.data);
        setStatus(res.data.status);
        setResponse(res.data.adminResponse || "");
      } catch (err) {
        console.error("Error fetching complaint:", err);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/complaints/${id}`,
        { status, response },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Complaint updated successfully");
    } catch (err) {
      alert("Failed to update complaint");
    }
  };

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="admin-complaint-details">
      <h2>Complaint ID: {complaint.complaintId || complaint._id}</h2>
      <p><strong>Title:</strong> {complaint.title}</p>
      <p><strong>Category:</strong> {complaint.category}</p>
      <p><strong>Description:</strong> {complaint.description}</p>
      <p><strong>Submitted By:</strong> {complaint.isAnonymous ? "Anonymous" : complaint.user?.email}</p>
      <p><strong>Current Status:</strong> {complaint.status}</p>

      <form onSubmit={handleUpdate} className="admin-response-form">
        <label>Update Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
  <option value="Rejected">Rejected</option>
</select>

        <label>Response</label>
        <textarea
          rows="4"
          placeholder="Write your response here..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        ></textarea>

        <button type="submit">Update Complaint</button>
      </form>
    </div>
  );
}

export default AdminComplaintDetails;
