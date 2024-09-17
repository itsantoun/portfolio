import React, { useState } from 'react'
import './Skills.css'
import { SKILLS } from '../../Utils/data'
import SkillCard from './SkillCard/SkillCard'
import SkillInfoCard from './SkillsInfoCard/SkillInfoCard';


function Skills() {

const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);

const handleSelectedSkill = (data) =>{
    setSelectedSkill(data);
} 

  return (
   <section className='skills-container'>
   <h5>Technical Proficiency</h5>

<div className='skills-content'>
<div className='skills'>
{SKILLS.map((skill, index)=>(
    <SkillCard
     key={index}
          title={skill.title}
          iconURL={skill.icon}
    isActive={selectedSkill.title === skill.title}
    onClick={() => {
        handleSelectedSkill(skill);
    }}
    />
))}
</div>

<div className='skills-info'>
<SkillInfoCard 
heading={selectedSkill.title} 
skills={selectedSkill.skills}
/>

</div>
</div>
   </section>
  )
}

export default Skills