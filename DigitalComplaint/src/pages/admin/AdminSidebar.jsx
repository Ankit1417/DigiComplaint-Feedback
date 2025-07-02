import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./AdminSidebar.css";

function AdminSidebar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole");

  if (!isLoggedIn || role !== "admin") return null;

  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admin">📊 Dashboard</Link></li>
        <li><Link to="/admin/complaints">📝 View Complaints</Link></li>
        <li><Link to="/admin/feedback">📬 View Feedback</Link></li>
        {/* You can add more links here later */}
      </ul>
    </div>
  );
}

export default AdminSidebar;
