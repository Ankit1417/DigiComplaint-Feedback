import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/complaints/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">📋 Total Complaints: {stats.total}</div>
        <div className="stat-card">⏳ Pending: {stats.pending}</div>
        <div className="stat-card">🔧 In Progress: {stats.inProgress}</div>
        <div className="stat-card">✅ Resolved: {stats.resolved}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
