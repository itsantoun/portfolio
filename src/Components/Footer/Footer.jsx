import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-brand">
          <h2>Antoun's Portfolio</h2>
          <p>Crafting elegant solutions with clean design & modern code.</p>
        </div>

        {/* Middle Section */}
        {/* <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div> */}

        {/* Right Section */}
        <div className="footer-socials">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://github.com/itsantoun" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/antoun-atallah" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:antoun.atallah@icloud.com">Email</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {currentYear} Antoun Atallah — All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;