import React from 'react';
import './FeatureSection.css';
import FeatureCard from '../FeatureCard/FeatureCard';

import image1 from '../assets/Diplomasi.png';
import image2 from '../assets/AI.png';
import image3 from '../assets/Hukum.png';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Diplomasi Hilirisasi dan Investasi Strategis',
    description: 'Membahas kerjasama bilateral, regional, dan multilateral tentang hilirisasi investasi strategis yang dilakukan Indonesia dengan para mitra.',
    image: image1,
    link: '/diplomasi-dan-investasi'
  },
  {
    title: 'Mahadata dan Kecerdasan Buatan',
    description: 'Memberikan analisis mendalam berbasis mahadata dan AI untuk memberikan wawasan strategis yang mendukung pengambilan keputusan hilirisasi.',
    image: image2,
    link: '/mahadata-dan-kecerdasan-buatan'
  },
  {
    title: 'Hukum dan Kebijakan Hilirisasi',
    description: 'Menegaskan landasan hukum yang adaptif dan berorientasi masa depan, mendukung keberlanjutan dan transformasi industri hilirisasi.',
    image: image3,
    link: '/hukum-dan-perundangan'
  },
];

const FeatureSection = () => {
  return (
    <div className="feature-section" id="feature-section">
      <div className="feature-content" id="feature-content">
        <div className="feature-section-content" id="feature-section-content">
          <h1 id="feature-section-heading">Aspek Kajian Hilirisasi</h1>
          <p id="feature-section-description">
          Jelajahi data dan temuan dari berbagai sudut pandang untuk mendapatkan wawasan yang lebih mendalam tentang hilirisasi. Tinjauan dari sisi diplomasi dan investasi, mahadata dan kecerdasan buatan, serta hukum dan perundangan untuk pemahaman yang lebih komprehensif.
          </p>
        </div>
        <div className="feature-section-grid" id="feature-section-grid">
          {features.map((feature, index) => (
            <Link to={feature.link}>
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                link={feature.link}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
