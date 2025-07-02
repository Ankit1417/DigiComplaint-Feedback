import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole");

  if (!isLoggedIn || role !== "student") return null;

  return (
    <div className="sidebar">
      <h3>Student Panel</h3>
      <ul>
        <li><Link to="/student/submit">📩 Submit Complaint</Link></li>
        <li><Link to="/student/status">📋 Track Status</Link></li>
        <li><Link to="/student/complaints">📝 Complaint Details</Link></li>
        <li><Link to="/student/feedback">🗣️ Feedback</Link></li> {/* ✅ Feedback route added */}
      </ul>
    </div>
  );
}

export default Sidebar;
