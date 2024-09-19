import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './WorkExperience.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExperienceCard from './ExperienceCard/ExperienceCard';
import { WORK_EXPERIENCE } from '../../Utils/data';

const WorkExperience = () => {
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
    <section className='experience-container'>
      <h5>Work Experience</h5>
      <div className='experience-content'>
        {isMobile ? (
          <div className='experience-cards-horizontal'>
            {WORK_EXPERIENCE.map((item) => (
              <ExperienceCard key={item.title} details={item} />
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {WORK_EXPERIENCE.map((item) => (
              <ExperienceCard key={item.title} details={item} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;
