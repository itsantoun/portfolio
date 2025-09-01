// import React from 'react';
// import { WORK_EXPERIENCE } from '../../Utils/data';
// import './WorkExperience.css';
// import { FaBriefcase, FaTools } from "react-icons/fa";

// const WorkExperience = () => {
//   return (
//     <section className="timeline-container">
//       <h3 className="timeline-header">
//         Work Experience <FaBriefcase className="header-icon" />
//       </h3>

//       <div className="timeline">
//         {WORK_EXPERIENCE.map((experience, index) => (
//           <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
//             <div className="timeline-content">
//               <div className="timeline-date">{experience.date}</div>
//               <div className="timeline-company">{experience.company}</div>
//               <div className="timeline-role">{experience.title}</div>
//               <div className="timeline-dot"></div>
//               <div className="timeline-connector"></div>
              
//               <ul className="timeline-responsibilities">
//                 {experience.responsibilities.map((responsibility, idx) => (
//                   <li key={idx}>{responsibility}</li>
//                 ))}
//               </ul>

//               {/* Tools Section - Only render if tools exist */}
//               {experience.tools && (
//                 <div className="timeline-tools">
//                   <div className="tools-header">
//                     <FaTools className="tools-icon" />
//                     <span>Tools & Technologies:</span>
//                   </div>
//                   <div className="tools-list">
//                     {experience.tools[0].split(',').map((tool, toolIdx) => (
//                       <span key={toolIdx} className="tool-item">
//                         {tool.trim()}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WorkExperience;

import React from 'react';
import { WORK_EXPERIENCE } from '../../Utils/data';
import './WorkExperience.css';
import { FaBriefcase, FaTools, FaCalendarAlt, FaBuilding, FaUser } from "react-icons/fa";

const WorkExperience = () => {
return (
<section className="timeline-container">
<h3 className="timeline-header">
 Work Experience <FaBriefcase className="header-icon" />
</h3>
<div className="timeline">
{WORK_EXPERIENCE.map((experience, index) => (
<div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
<div className="timeline-content">
<div className="timeline-header-info">
  <div className="timeline-date">
    <FaCalendarAlt className="date-icon" />
    <span className="date-text">{experience.date}</span>
  </div>
  <div className="timeline-company">
    <FaBuilding className="company-icon" />
    <span className="company-text">{experience.company}</span>
  </div>
  <div className="timeline-role">
    <FaUser className="role-icon" />
    <span className="role-text">{experience.title}</span>
  </div>
</div>
<div className="timeline-dot"></div>
<div className="timeline-connector"></div>
<ul className="timeline-responsibilities">
{experience.responsibilities.map((responsibility, idx) => (
<li key={idx}>{responsibility}</li>
 ))}
</ul>
{/* Tools Section - Only render if tools exist */}
{experience.tools && (
<div className="timeline-tools">
<div className="tools-header">
<FaTools className="tools-icon" />
<span>Tools & Technologies:</span>
</div>
<div className="tools-list">
{experience.tools[0].split(',').map((tool, toolIdx) => (
<span key={toolIdx} className="tool-item">
{tool.trim()}
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