import React from 'react';
import './HeroPage.css';

const HeroPage = ({ videoSrc, title, subtitle, description }) => {
  return (
    <div id="hero-page-section" className="hero-section">
      <img src={videoSrc} id="hero-page-video" className="hero-video" alt="Mining"></img>

      <div id="hero-page-content" className="hero-content">
        <h5 id="hero-page-title">{title}</h5>
        <h1 id="hero-page-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }}></h1>
        <p id="hero-page-description">{description}</p>
      </div>
    </div>
  );
};

export default HeroPage;