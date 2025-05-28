import React, { useRef, useEffect } from 'react';
import { WORK_EXPERIENCE } from '../../Utils/data';
import './WorkExperience.css'; 
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const WorkExperience = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const experienceItems = document.querySelectorAll('.work-experience-item');
      const header = document.querySelector('.header');
      const emojis = document.querySelectorAll('.emoji');
      
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hover');
            header.classList.add('fadeIn');
            emojis.forEach((emoji, index) => {
              emoji.classList.add('bounce');
              emoji.style.animationDelay = `${index * 0.2}s`;
            });
          } else {
            entry.target.classList.remove('hover');
            header.classList.remove('fadeIn');
            emojis.forEach(emoji => emoji.classList.remove('bounce'));
          }
        });
      }, options);

      experienceItems.forEach(item => observer.observe(item));
    }
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="work-experience-container">
      <h3 className="header">
        Work Experience
        <span className="emoji">💼</span>
        <FaArrowLeft
          onClick={slideLeft}
          style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '25px', verticalAlign: 'middle' }}
        />
        <FaArrowRight
          onClick={slideRight}
          style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '22px', verticalAlign: 'middle' }}
        />
      </h3>

      <div className="work-experience-slider" ref={sliderRef}>
        {[...WORK_EXPERIENCE, ...WORK_EXPERIENCE].map((experience, index) => (
          <div key={index} className="work-experience-item">
            <div className="work-experience-details">
              <p><strong>Company:</strong> {experience.company}</p>
              <p><strong>Role:</strong> {experience.title}</p>
              <p><strong>Duration:</strong> {experience.date}</p>
              <p><strong>Responsibilities:</strong></p>
             <ul>
  {experience.responsibilities.map((responsibility, idx) => (
    <li key={idx}>
      <FaArrowRight style={{ marginRight: '6px', verticalAlign: 'middle' }} />
      {responsibility}
    </li>
  ))}
</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;