import React, { useState, useEffect } from 'react';
import { database } from '../../Auth & Admin/firebase';
import { ref, onValue } from 'firebase/database';
import './WorkExperience.css';
import { FaBriefcase, FaTools, FaCalendarAlt, FaBuilding, FaUser } from "react-icons/fa";

const WorkExperience = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const workExpRef = ref(database, 'workExperience');
    
    const unsubscribe = onValue(workExpRef, 
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const workExpArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            // Sort by date (most recent first) if you have dates
            workExpArray.sort((a, b) => {
              // You can add custom sorting logic here based on dates
              return 0; // Default no sorting
            });
            setWorkExperiences(workExpArray);
          } else {
            setWorkExperiences([]);
          }
          setError(null);
        } catch (err) {
          console.error('Error processing work experience data:', err);
          setError('Failed to load work experience data');
          setWorkExperiences([]);
        } finally {
          setLoading(false);
          
          // Trigger Locomotive Scroll update after data loads
          setTimeout(() => {
            window.dispatchEvent(new Event('firebaseDataLoaded'));
          }, 500);
        }
      },
      (error) => {
        console.error('Firebase error:', error);
        setError('Failed to connect to database');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update Locomotive Scroll when experiences change
  useEffect(() => {
    if (workExperiences.length > 0) {
      setTimeout(() => {
        window.dispatchEvent(new Event('firebaseDataLoaded'));
      }, 300);
    }
  }, [workExperiences.length]);

  if (loading) {
    return (
      <section className="timeline-container" id="work-experience">
        <div className="loading-state">
          <h3>Loading work experience...</h3>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="timeline-container" id="work-experience">
        <div className="error-state">
          <h3>Error Loading Work Experience</h3>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (workExperiences.length === 0) {
    return (
      <section className="timeline-container" id="work-experience">
        <div className="empty-state">
          <h3>No Work Experience Available</h3>
          <p>Check back later for professional experience!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="timeline-container" id="work-experience">
      <h3 className="timeline-header" data-scroll data-scroll-speed="0.5">
        Work Experience <FaBriefcase className="header-icon" />
      </h3>
      <div className="timeline">
        {workExperiences.map((experience, index) => (
          <div 
            key={experience.id} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            data-scroll
            data-scroll-speed="0.2"
            data-scroll-class="visible"
          >
            <div className="timeline-content">
              <div className="timeline-header-info">
                {/* Position (title) */}
                <div className="timeline-role">
                  <FaUser className="role-icon" />
                  <span className="role-text">{experience.position}</span>
                </div>
                {/* Company */}
                <div className="timeline-company">
                  <FaBuilding className="company-icon" />
                  <span className="company-text">{experience.company}</span>
                </div>
                {/* Date - combining startDate and endDate */}
                <div className="timeline-date">
                  <FaCalendarAlt className="date-icon" />
                  <span className="date-text">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
              </div>
              
              <div className="timeline-dot"></div>
              <div className="timeline-connector"></div>
              
              {/* Responsibilities */}
              <ul className="timeline-responsibilities">
                {experience.responsibilities && experience.responsibilities.map((responsibility, idx) => (
                  <li key={idx} data-scroll data-scroll-speed="0.1">{responsibility}</li>
                ))}
              </ul>
              
              {/* Technologies Section - Only render if technologies exist */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="timeline-tools">
                  <div className="tools-header">
                    <FaTools className="tools-icon" />
                    <span>Tools & Technologies:</span>
                  </div>
                  <div className="tools-list">
                    {experience.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="tool-item" data-scroll data-scroll-speed="0.05">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;