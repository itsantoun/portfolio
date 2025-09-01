// Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../../../Assets/me.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className='nav-content'>
          {/* Logo */}
          <button className="logo-btn" onClick={() => window.location.reload()}>
            <img className="logo" src={logo} alt="Me" />
          </button>
          
          {/* Desktop Menu */}
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

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-social-links">
            <a href="https://www.linkedin.com/in/antoun-atallah/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon" onClick={closeMenu}>
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/itsantoun" target="_blank" rel="noopener noreferrer" className="mobile-social-icon" onClick={closeMenu}>
              <FaXTwitter />
              <span>Twitter</span>
            </a>
            <a href="mailto:antoun.atallah@hotmail.com" className="mobile-contact-btn" onClick={closeMenu}>
              Get in Touch!
            </a>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="nav-spacer"></div>
    </>
  );
}

export default Navbar;