import React from 'react';
import './HeroSection.css';

const HeroSection = ({ videoSrc, overlayImage, title, subtitle, description }) => {
  return (
    <div id="hero-section" className="hero-section">
      <video id="hero-video" className="hero-video" autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <img id="hero-overlay" src={overlayImage} alt="Overlay" className="hero-overlay" />
      <div id="hero-content" className="hero-content">
        <h5 id="hero-title">{title}</h5>
        <h1 id="hero-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }}></h1>
        <p id="hero-description">{description}</p>
      </div>
    </div>
  );
};

export default HeroSection;