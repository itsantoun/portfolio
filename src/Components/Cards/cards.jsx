import React from 'react';
import './card.css';

function Cards({ title, children }) {
  return (
    <div className="card-content">
      <h3>{title}</h3>
      <div className="skills-list">
        {children} {/* Render whatever content is passed */}
      </div>
    </div>
  );
}

export default Cards;