  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-scroll';
  import './Navbar.css';
  import logo from '../../../Assets/me.png';

  function Navbar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // const isSmallWindow = windowWidth <= 768;

    return (
      <>
        <nav className='nav-wrapper'>
          <div className='nav-content'>
            <img className='logo' src={logo} alt='Me' />
            <ul>
              <li>
              <Link to='homePage' 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className='menu-item'>
                  Home
                </Link>
              </li>


              <li>
                <Link to='skills' 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className='menu-item'>
                  Technical Proficiency
                </Link>
              </li>

              <li>
              <Link to='Projects' 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className='menu-item'>
                  Projects
                </Link>
              </li>

              <li>
                <Link to='workExperience'
                spy={true} smooth={true} 
                offset={-70} 
                duration={500} 
                className='menu-item'>
                Work Experience
                </Link>
              </li>


              <a href='mailto:antoun.atallah@hotmail.com'
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className='contact-btn'>
                  Contact Me
                </a>
            </ul>


          </div>
        </nav>
      </>
    );
  }

  export default Navbar;
