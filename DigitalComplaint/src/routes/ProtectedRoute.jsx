import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStudentRoute = location.pathname.startsWith("/student");

  if (isAdminRoute && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (isStudentRoute && userRole !== "student") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
