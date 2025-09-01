import React, { useRef, useEffect, useState } from 'react';
import { MY_PROJECTS } from '../../Utils/data';
import './Projects.css';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaExternalLinkAlt, FaCode, FaStar, FaTools } from "react-icons/fa";

const Projects = () => {
  const sliderRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cardWidth, setCardWidth] = useState(300);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      const containerWidth = document.querySelector('.project-container')?.offsetWidth || window.innerWidth;
      if (window.innerWidth < 576) {
        setCardWidth(containerWidth - 48);
      } else if (window.innerWidth < 768) {
        setCardWidth(320);
      } else if (window.innerWidth < 992) {
        setCardWidth(350);
      } else if (window.innerWidth < 1200) {
        setCardWidth(360);
      } else {
        setCardWidth(380);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update active project based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    const handleScroll = () => {
      if (!slider) return;
      const scrollPos = slider.scrollLeft;
      const newActiveIndex = Math.round(scrollPos / (cardWidth + 16));
      if (newActiveIndex >= 0 && newActiveIndex < MY_PROJECTS.length) {
        setActiveProject(newActiveIndex);
      }
    };
    
    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [cardWidth]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -cardWidth - 16, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  const goToProject = (index) => {
    setActiveProject(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  // FIXED: Add proper URL handling
  const handleLaunchProject = (project, event) => {
    console.log('Launching project:', project.title);
    console.log('Project URL:', project.url);
    
    // Prevent default if URL is invalid
    if (!project.url) {
      console.error('No URL provided for project:', project.title);
      event.preventDefault();
      alert('No URL available for this project');
      return;
    }
    
    // Check if URL is properly formatted
    let url = project.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      console.log('Auto-corrected URL to:', url);
    }
    
    // Update href if needed
    event.target.href = url;
  };

  return (
    <section className="project-container" id="projects">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="float-element float-1">💻</div>
        <div className="float-element float-2">🚀</div>
        <div className="float-element float-3">⚡</div>
        <div className="float-element float-4">🎯</div>
      </div>

      {/* Header */}
      <div className="projects-header">
        <h3 className="header">
          <FaCode className="header-icon" />
          Projects
        </h3>
        <div className="navigation-arrows">
          <button className="arrow" onClick={slideLeft} aria-label="Previous projects">
            <FaArrowLeft />
          </button>
          <button className="arrow" onClick={slideRight} aria-label="Next projects">
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Projects Gallery */}
      <div className="projects-gallery">
        <div className="project-slider-creative" ref={sliderRef}>
          {MY_PROJECTS.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ width: `${cardWidth}px` }}
            >
              {/* Card Background Pattern */}
              <div className="card-pattern"></div>

              {/* Card Content */}
              <div className="card-content">
                {/* Image and title side by side */}
                <div className="project-header-horizontal">
                  <div className="project-icon-float">
                    <img src={project.icon} alt={project.title} className="project-icon-image" />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="title-section">
                    <h4 className="project-title-creative">{project.title}</h4>
                  </div>
                </div>

                {/* Date below the image and title */}
                <div className="date-section">
                  <div className="date-badge">
                    <FaCalendarAlt />
                    <span>{project.date}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="features-section">
                  <div className="features-header">
                    <FaStar className="star-icon" />
                    <span>Description</span>
                  </div>
                  <div className="features-grid">
                    {project.responsibilities.map((feature, idx) => (
                      <div key={idx} className="feature-pill">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Section */}
                {project.tools && (
                  <div className="tools-section">
                    <div className="tools-header">
                      <FaTools className="tools-icon" />
                      <span>Tools & Technologies</span>
                    </div>
                    <div className="tools-list">
                      {project.tools[0].split(',').map((tool, toolIdx) => (
                        <span key={toolIdx} className="tool-item">
                          {tool.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* FIXED: Launch Button with proper error handling */}
                <div className="card-footer">
                  {project.url ? (
                    <a 
                      href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="launch-button"
                      onClick={(e) => handleLaunchProject(project, e)}
                    >
                      <span className="button-text">Launch Project</span>
                      <div className="button-icon">
                        <FaExternalLinkAlt />
                      </div>
                      <div className="button-shine"></div>
                    </a>
                  ) : (
                    <button 
                      className="launch-button"
                      onClick={() => alert('No URL available for this project')}
                      style={{ opacity: 0.6, cursor: 'not-allowed' }}
                    >
                      <span className="button-text">No Link Available</span>
                      <div className="button-icon">
                        <FaExternalLinkAlt />
                      </div>
                      <div className="button-shine"></div>
                    </button>
                  )}
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="card-overlay"></div>
              <div className="corner-accent top-left"></div>
              <div className="corner-accent bottom-right"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Counter */}
      <div className="project-counter">
        <div className="counter-dots">
          {MY_PROJECTS.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeProject ? 'active' : ''}`}
              onClick={() => goToProject(index)}
              aria-label={`View project ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;