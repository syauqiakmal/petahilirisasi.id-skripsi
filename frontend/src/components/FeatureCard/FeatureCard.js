import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="feature-card-content">
        <h2 className="feature-card-title">{title}</h2>
        <p className="feature-card-description">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;