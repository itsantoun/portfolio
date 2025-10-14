import React, { useRef, useEffect, useState } from 'react';
import { database } from '../../Auth & Admin/firebase';
import { ref, onValue } from 'firebase/database';
import './Projects.css';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaExternalLinkAlt, FaCode, FaStar, FaTools } from "react-icons/fa";

const Projects = () => {
  const sliderRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cardWidth, setCardWidth] = useState(300);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from Firebase - FIXED: Added order sorting
  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          order: data[key].order || 0 // Ensure order field is included
        }));
        
        // FIX: Sort projects by order field
        projectsArray.sort((a, b) => (a.order || 0) - (b.order || 0));
        setProjects(projectsArray);
      } else {
        setProjects([]);
      }
      setLoading(false);
      
      // Trigger Locomotive Scroll update after data loads
      setTimeout(() => {
        window.dispatchEvent(new Event('firebaseDataLoaded'));
      }, 500);
    });

    return () => unsubscribe();
  }, []);

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
      
      // Update Locomotive Scroll on resize
      setTimeout(() => {
        window.dispatchEvent(new Event('firebaseDataLoaded'));
      }, 100);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent Locomotive Scroll interference
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const preventVerticalScroll = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventTouch = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = slider.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
          e.stopPropagation();
        }
      }
    };

    slider.addEventListener('wheel', preventVerticalScroll, { passive: false });
    slider.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      slider.removeEventListener('wheel', preventVerticalScroll);
      slider.removeEventListener('touchmove', preventTouch);
    };
  }, []);

  // Update active project based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || projects.length === 0) return;
    
    const handleScroll = () => {
      if (!slider) return;
      const scrollPos = slider.scrollLeft;
      const newActiveIndex = Math.round(scrollPos / (cardWidth + 16));
      if (newActiveIndex >= 0 && newActiveIndex < projects.length) {
        setActiveProject(newActiveIndex);
      }
    };
    
    slider.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, [cardWidth, projects.length, projects]);

  // Update Locomotive Scroll when projects change
  useEffect(() => {
    if (projects.length > 0) {
      setTimeout(() => {
        window.dispatchEvent(new Event('firebaseDataLoaded'));
      }, 300);
    }
  }, [projects.length]);

  const slideLeft = () => {
    if (sliderRef.current && projects.length > 0) {
      const newIndex = Math.max(0, activeProject - 1);
      setActiveProject(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * (cardWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current && projects.length > 0) {
      const newIndex = Math.min(projects.length - 1, activeProject + 1);
      setActiveProject(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * (cardWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  const goToProject = (index) => {
    if (index >= 0 && index < projects.length) {
      setActiveProject(index);
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: index * (cardWidth + 16),
          behavior: 'smooth'
        });
      }
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

  // Reset active project when projects change
  useEffect(() => {
    setActiveProject(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: 0,
        behavior: 'auto'
      });
    }
  }, [projects]);

  // Debug: Log projects order
  useEffect(() => {
    if (projects.length > 0) {
      console.log('Projects order:', projects.map(p => ({ title: p.title, order: p.order })));
    }
  }, [projects]);

  // Handle empty or loading states
  if (loading) {
    return (
      <section className="project-container" id="projects">
        <div className="loading-state">
          <h3>Loading projects...</h3>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="project-container" id="projects">
        <div className="empty-state">
          <h3>No Projects Available</h3>
          <p>Check back later for exciting projects!</p>
          <div className="floating-elements">
            <div className="float-element float-1">💻</div>
            <div className="float-element float-2">🚀</div>
            <div className="float-element float-3">⚡</div>
            <div className="float-element float-4">🎯</div>
          </div>
        </div>
      </section>
    );
  }

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
      <div className="projects-header" data-scroll data-scroll-speed="0.3">
        <h3 className="header">
          <FaCode className="header-icon" />
          Projects
          <span className="project-count">({projects.length})</span>
        </h3>
        <div className="navigation-arrows">
          <button 
            className="arrow" 
            onClick={slideLeft} 
            aria-label="Previous projects"
            disabled={activeProject === 0}
          >
            <FaArrowLeft />
          </button>
          <button 
            className="arrow" 
            onClick={slideRight} 
            aria-label="Next projects"
            disabled={activeProject === projects.length - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Projects Gallery */}
      <div className="projects-gallery">
        <div 
          className="project-slider-creative" 
          ref={sliderRef}
          style={{ 
            cursor: projects.length > 1 ? 'grab' : 'default'
          }}
          data-scroll
          data-scroll-speed="0"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ width: `${cardWidth}px` }}
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-class="visible"
            >
              {/* Card Background Pattern */}
              <div className="card-pattern"></div>

              {/* Card Content */}
              <div className="card-content">
                {/* Image and title side by side */}
                <div className="project-header-horizontal">
                  <div className="project-icon-float">
                    <img 
                      src={project.icon || '/default-project-icon.png'} 
                      alt={project.title} 
                      className="project-icon-image" 
                      onError={(e) => {
                        e.target.src = '/default-project-icon.png';
                      }}
                    />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="title-section">
                    <h4 className="project-title-creative">{project.title}</h4>
                    {/* Debug: Show order number */}
                    <small style={{color: '#888', fontSize: '12px'}}>Order: {project.order}</small>
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
                    {project.responsibilities && project.responsibilities.map((feature, idx) => (
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
                      {project.tools[0] && project.tools[0].split(',').map((tool, toolIdx) => (
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
                      className="launch-button disabled"
                      onClick={() => alert('No URL available for this project')}
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
    </section>
  );
};

export default Projects;