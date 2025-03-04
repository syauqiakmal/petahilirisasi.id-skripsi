import React from 'react';
import './ProjectPageInfo.css';

const ProjectPageInfo = ({ subtitle, title, description, contentBackground }) => {
  return (
    <section id="info-section" className="info-section">
      <div className="image-wrapper" id="image-wrapper">
        <img
          className="content"
          id="content"
          src={contentBackground}
          alt="Mining"
        />
        <div className="card-overlay" id="card-overlay">
          <h5 id="subtitle" className="subtitle">{subtitle}</h5>
          <h2 id="title" className="title">{title}</h2>
          <p id="description" className="description">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectPageInfo;