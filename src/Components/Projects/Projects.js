import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './Projects.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProjectCard } from './ProjectCard/ProjectCard';
import { MY_PROJECTS } from '../../Utils/data';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className='project-container'>
      <h5>Projects</h5>
      <div className='project-content'>
        {isMobile ? (
          <div className='project-cards-horizontal'>
            {MY_PROJECTS.map((item) => (
              <ProjectCard
                key={item.title}
                title={item.title}
                iconURL={item.icon}
                details={item}
                projectURL={item.url}
              />
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {MY_PROJECTS.map((item) => (
              <ProjectCard
                key={item.title}
                title={item.title}
                iconURL={item.icon}
                details={item}
                projectURL={item.url}
              />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Projects;
