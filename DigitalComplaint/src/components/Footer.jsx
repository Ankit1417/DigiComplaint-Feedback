import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <h2 className="footer-logo">DigitalComplaint</h2>
        <p className="footer-description">
          Empowering students to raise their voices and resolve issues
          efficiently through a unified digital platform.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/help">Help</a>
        </div>

        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} DigitalComplaint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
