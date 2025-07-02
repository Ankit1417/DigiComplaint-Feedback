
// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Navbar from "../../components/Navbar"; // If you want navbar here
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <>
      {/* <Navbar /> Put navbar outside the flex */}
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
