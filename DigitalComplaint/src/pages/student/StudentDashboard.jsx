import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboard;
