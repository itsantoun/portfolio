import React, { useState } from 'react';
import './Skills.css';
import { SKILLS } from '../../Utils/data';

function Skills() {
  const [showTitles, setShowTitles] = useState(true);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const toggleTitles = () => {
    setShowTitles(!showTitles);
    setSelectedGroupIndex(null);
  };

  const handleTitleClick = (index) => {
    setSelectedGroupIndex(index);
    setShowTitles(false);
  };

  return (
    <section id="Skills">
      <div className="header-container">
        <h2>Skills</h2>
        {(selectedGroupIndex !== null) && (
          <button className="toggle-button" onClick={toggleTitles}>
            Back
          </button>
        )}
      </div>

      {showTitles && (
        <div className="titles-overlay">
          {SKILLS.map((skillGroup, index) => (
            <div
              key={index}
              className="skill-group-title"
              onClick={() => handleTitleClick(index)}
            >
              {skillGroup.title}
            </div>
          ))}
        </div>
      )}

      {selectedGroupIndex !== null && (
        <div className="skills-overlay">
          <h3 className="selected-group-title">
            {SKILLS[selectedGroupIndex].title}
          </h3>
          <div className="bubble-container">
            {SKILLS[selectedGroupIndex].skills.map((item, index) => (
              <div key={index} className="skill-bubble">
                <img src={item.icon} alt={item.skill} className="skill-icon" />
                <div className="skill-name">{item.skill}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Skills;