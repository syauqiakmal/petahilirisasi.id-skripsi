import React from 'react';
import './ProjectInfo.css';

const ProjectInfo = ({ subtitle, title, description, contentBackground }) => {
  return (
    <section id="project-info-section" className="project-info">
      <h5 id="project-subtitle" className="project-subtitle">{subtitle}</h5>
      <div id="project-header" className="project-header">
        <h2 id="project-title" className="project-title">{title}</h2>
        <p id="project-description" className="project-description" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <div
        id="project-content"
        className="project-content"
        style={{ backgroundImage: `url(${contentBackground})` }}
      ></div>
    </section>
  );
};

export default ProjectInfo;