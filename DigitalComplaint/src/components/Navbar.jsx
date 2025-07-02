
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const role = localStorage.getItem("userRole");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <header className="navbar-container">
//       {/* Top Bar */}
//       <div className="top-bar">
//         <p>An Official Website For The Grievance Handling</p>
//         <div className="top-right">
//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <span>|</span>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav className="navbar">
//         <div className="navbar-logo">
//           <span className="logo-text">DC&FP</span>
//           <p className="logo-subtext">Digital Complaint & Feedback Portal</p>
//         </div>

//         <ul className="navbar-links">
//           <li><Link to="/student/Home">Home</Link></li>
//           <li><a href="/#about">About</a></li>
//           <li className="dropdown">
//             <span>Services ▾</span>
//             <ul className="dropdown-menu">
//               <li><Link to="/student/submit">Submit Complaint</Link></li>
//               <li><Link to="/student/status">Track Status</Link></li>
//             </ul>
//           </li>
//           <li><a href="/#contact">Contact</a></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName") || ""; // assuming you saved it after login
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar">
        <p>An Official Website For The Grievance Handling</p>
        <div className="top-right">
          {isLoggedIn ? (
            <>
              <span className="username">👋 {userName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <span>|</span>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-text">DC&FP</span>
          <p className="logo-subtext">Digital Complaint & Feedback Portal</p>
        </div>

        <ul className="navbar-links">
          <li><Link to="/student/Home">Home</Link></li>
          <li><a href="/#about">About</a></li>
          <li className="dropdown">
            <span>Services ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/student/submit">Submit Complaint</Link></li>
              <li><Link to="/student/status">Track Status</Link></li>
            </ul>
          </li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
