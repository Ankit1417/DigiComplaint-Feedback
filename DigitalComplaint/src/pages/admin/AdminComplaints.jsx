import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminComplaints.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="admin-complaints">
      <h2>All Student Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Submitted By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((comp) => (
            <tr key={comp._id}>
              <td>{comp.complaintId || comp._id}</td>
              <td>{comp.title}</td>
              <td>{comp.category}</td>
              <td>{comp.isAnonymous ? "Anonymous" : comp.user?.email}</td>
              <td>{comp.status}</td>
              <td>
                <Link to={`/admin/complaint/${comp._id}`} className="view-btn">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminComplaints;
