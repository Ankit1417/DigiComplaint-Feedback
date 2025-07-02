import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import "./AppRoutes.css";

import Login from "../pages/student/Login";
import Register from "../pages/student/Register";
import Home from "../pages/student/Home";

import SubmitComplaint from "../pages/student/SubmitComplaint";
import TrackStatus from "../pages/student/TrackStatus";
import ComplaintDetails from "../pages/student/ComplaintDetails";
import Feedback from "../pages/student/Feedback";
import StudentDashboard from "../pages/student/StudentDashboard";

// Admin Pages
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminComplaints from "../pages/admin/AdminComplaints";
import AdminComplaintDetails from "../pages/admin/AdminComplaintDetails";
import AdminFeedback from "../pages/admin/AdminFeedback";

function AppRoutesWrapper() {
  const location = useLocation();
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Dashboard Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="portal-container">
                <div className="portal-hero">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      Your Voice Matters <span className="highlight">✨</span>
                    </h1>
                    <p className="hero-subtitle">Shaping a Better Campus Experience Together</p>
                  </div>
                  <div className="hero-illustration">
                    <img src="sf1.jpg" alt="Feedback System" />
                  </div>
                </div>

                <div className="portal-features">
                  <h2 className="section-title">How It Works</h2>
                  <div className="feature-grid">
                    <div className="feature-card animate-pop">
                      <div className="feature-icon"><img src="ss.jpg" alt="Secure" /></div>
                      <h3>Secure & Anonymous</h3>
                      <p>Choose to remain anonymous while submitting sensitive concerns</p>
                    </div>
                    <div className="feature-card animate-pop delay-1">
                      <div className="feature-icon"><img src="tr1.jpg" alt="Tracking" /></div>
                      <h3>Real-time Tracking</h3>
                      <p>Monitor your complaint's progress with unique tracking ID</p>
                    </div>
                    <div className="feature-card animate-pop delay-2">
                      <div className="feature-icon"><img src="cip.jpg" alt="Change" /></div>
                      <h3>Drive Change</h3>
                      <p>See tangible improvements through collective feedback</p>
                    </div>
                  </div>
                </div>

                <div className="campus-impact">
                  <h2 className="section-title">Our Collective Impact</h2>
                  <div className="impact-stats">
                    <div className="stat-item"><div className="stat-number">85%</div><div className="stat-label">Issues Resolved</div></div>
                    <div className="stat-item"><div className="stat-number">48h</div><div className="stat-label">Avg. Response Time</div></div>
                    <div className="stat-item"><div className="stat-number">1.2k+</div><div className="stat-label">Improvements</div></div>
                  </div>

                  <div className="campus-gallery">
                    <div className="gallery-item before-after">
                      <img src="lib1.jpg" alt="Library Upgrade" />
                      <div className="improvement-badge">New Study Spaces</div>
                    </div>
                    <div className="gallery-item testimonial">
                      <blockquote>
                        "Our hostel WiFi issues were resolved within 3 days after submitting through the portal!"
                        <cite>- Ananya, CS Department</cite>
                      </blockquote>
                    </div>
                    <div className="gallery-item live-feed">
                      <h4>Recent Resolutions</h4>
                      <ul className="resolution-list">
                        <li>✅ Cafeteria hygiene improvements</li>
                        <li>✅ New sports equipment added</li>
                        <li>🔄 Lecture hall AC repairs in progress</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="submit" element={<SubmitComplaint />} />
          <Route path="status" element={<TrackStatus />} />
          <Route path="complaints" element={<ComplaintDetails />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="complaint/:id" element={<AdminComplaintDetails />} />
          <Route path="feedback" element={<AdminFeedback />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Router>
      <AppRoutesWrapper />
    </Router>
  );
}

export default AppRoutes;
