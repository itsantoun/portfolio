import React from 'react'
import './ProjectCard.css'
import { Link } from 'react-scroll'

export const ProjectCard = ({projectURL,iconURL,details,title}) => {
  return (
    <div className='project-card'>
    <img src={iconURL} alt={title} />
    <h6>{details.title}</h6>

    <br></br>
    <div className='work-duration'>{details.date}</div>

    <ul>
      {details.responsibilities.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </ul>

    <div className='project-url'>
      <a href={projectURL} target='_blank' rel='noopener noreferrer'>
        Learn More
      </a>
    </div>
  </div>
  )
}
