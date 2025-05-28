import React from 'react';
import './Navbar.css';
import { FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../../Assets/me.png';

function Navbar() {
  return (
    <nav className='nav-wrapper'>
      <div className='nav-content'>
  
        {/* Logo */}
        <button className="logo-btn" onClick={() => window.location.reload()}>
  <img className="logo" src={logo} alt="Me" />
</button>

        {/* Artistic Antoun's Portfolio */}
        <h1 className='portfolio-title'>Antoun's Portfolio</h1>

        {/* Social Media Links */}
        {/* <div className='social-links'>
          <a href='https://www.linkedin.com/in/antoun-atallah/' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <FaLinkedin />
          </a>
          <a href='https://x.com/itsantoun' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <FaTwitter />
          </a>
        </div>

        <a
          href='mailto:antoun.atallah@hotmail.com'
          className='contact-btn'
        >
          Get in Touch!
        </a> */}
        <div className="contact-container">
  
  <div className="social-links">
    <a href="https://www.linkedin.com/in/antoun-atallah/" target="_blank" rel="noopener noreferrer" className="social-icon">
      <FaLinkedin />
    </a>
    <a href="https://x.com/itsantoun" target="_blank" rel="noopener noreferrer" className="social-icon">
      <FaXTwitter />
    </a>
    <a href="mailto:antoun.atallah@hotmail.com" className="contact-btn">
    Get in Touch!
  </a>
  </div>
</div>
      </div>
    </nav>
  );
}

export default Navbar;