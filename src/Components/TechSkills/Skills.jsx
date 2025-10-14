import React, { useState, useEffect } from 'react';
import './Skills.css';
import { database } from '../../Auth & Admin/firebase'; // Adjust path as needed
import { ref, onValue } from 'firebase/database';

function Skills() {
  const [showTitles, setShowTitles] = useState(true);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsRef = ref(database, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const skillsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          order: data[key].order || 0 // Add order field
        }));
        
        // Sort by order field
        skillsArray.sort((a, b) => (a.order || 0) - (b.order || 0));
        setSkillsData(skillsArray);
      } else {
        setSkillsData([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleTitles = () => {
    setShowTitles(!showTitles);
    setSelectedGroupIndex(null);
  };

  const handleTitleClick = (index) => {
    setSelectedGroupIndex(index);
    setShowTitles(false);
  };

  // Debug: Log skills order
  useEffect(() => {
    if (skillsData.length > 0) {
      console.log('Skills order:', skillsData.map(s => ({ title: s.title, order: s.order })));
    }
  }, [skillsData]);

  if (loading) {
    return (
      <section id="Skills">
        <div className="header-container">
          <h2>Skills</h2>
        </div>
        <div className="loading-container">Loading skills...</div>
      </section>
    );
  }

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
          {skillsData.map((skillGroup, index) => (
            <div
              key={skillGroup.id}
              className="skill-group-title"
              onClick={() => handleTitleClick(index)}
            >
              {skillGroup.icon && (
                <img 
                  src={skillGroup.icon} 
                  alt={skillGroup.title}
                  className="skill-group-icon"
                />
              )}
              {skillGroup.title}
  
            </div>
          ))}
        </div>
      )}

      {selectedGroupIndex !== null && skillsData[selectedGroupIndex] && (
        <div className="skills-overlay">
          <h3 className="selected-group-title">
            {skillsData[selectedGroupIndex].title}
          </h3>
          <div className="bubble-container">
            {skillsData[selectedGroupIndex].skills.map((item, index) => (
              <div key={index} className="skill-bubble">
                {item.icon && (
                  <img src={item.icon} alt={item.skill} className="skill-icon" />
                )}
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