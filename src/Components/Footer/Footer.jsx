import React from 'react';
import './Footer.css';


function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <div className='footer'>
      © {currentYear} Antoun's Portfolio. Thank you for visiting :)
    </div>
  );
}

export default Footer;