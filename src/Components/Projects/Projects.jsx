import React, { useRef, useEffect } from 'react';
import { MY_PROJECTS } from '../../Utils/data';
import './Projects.css';
import { FaArrowLeft, FaArrowRight, FaLaptopCode, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const projectItems = document.querySelectorAll('.project-item');
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hover');
          } else {
            entry.target.classList.remove('hover');
          }
        });
      }, options);

      projectItems.forEach(item => observer.observe(item));
    }

    // if (window.innerWidth > 768 && sliderRef.current) {
    //   const interval = setInterval(() => {
    //     sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    //   }, 5000);
    //   return () => clearInterval(interval);
    // }
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="project-container">
      <h3 className="header">
        Projects <span className="emoji">💻</span>
        <FaArrowLeft className="arrow" onClick={slideLeft} />
        <FaArrowRight className="arrow" onClick={slideRight} />
      </h3>

      <div className="project-slider" ref={sliderRef}>
        {/* {[...MY_PROJECTS, ...MY_PROJECTS].map((project, index) => ( */}
        {MY_PROJECTS.map((project, index) => (
          <div key={index} className="project-item">
            <img src={project.icon} alt={project.title} className="project-icon" />
            <div className="project-details">
              <p><FaLaptopCode style={{ marginRight: '6px' }} /><strong>{project.title}</strong></p>
              <p><FaCalendarAlt style={{ marginRight: '6px' }} />{project.date}</p>
              <p><strong>Description:</strong></p>
              <ul>
                {project.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="responsibility-item">
                    <FaArrowRight style={{ marginRight: '6px', fontSize: '12px' }} />
                    {responsibility}
                  </li>
                ))}
              </ul>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Project <FaExternalLinkAlt style={{ marginLeft: '4px' }} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;