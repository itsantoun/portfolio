import React from 'react'
import './WorkExperience.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExperienceCard from './ExperienceCard/ExperienceCard'
import { WORK_EXPERIENCE } from '../../Utils/data'

const WorkExperience = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
    
  return (
    <section className='experience-container'>
    <h5>Work Experience</h5>

{/* <div className='experience-content'>
{WORK_EXPERIENCE.map((item)=>(
    <ExperienceCard key={item.title} 
    details={item}/>
))}
</div> */}


<div className='experience-content'>
        <Slider {...settings}>
          {WORK_EXPERIENCE.map((item) => (
            <ExperienceCard key={item.title} details={item} />
          ))}
        </Slider>
      </div>

    </section>
  )
}

export default WorkExperience