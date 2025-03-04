import React from 'react';
import './Footer.css';
import logo from '../assets/Logo BW.png';
import { Link } from 'react-router-dom';

import LogoGeoAI from '../assets/Geoai.png';
import LogoBinus from '../assets/binus.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Peta Hilirisasi Logo" className="logo-image" />
        </div>
        <div className="footer-supported-by">
          <p className="footer-p">Supported by:</p>
          <img src={LogoBinus} alt="Binus Logo" className="logo-support" />
          <img src={LogoGeoAI} alt="GeoAI Logo" className="logo-support" />
        </div>
        <div className="footer-links">
          <div className="footer-link">
            <Link to="/about">
              About
            </Link>
          </div>
          <div className="footer-link">
            <Link to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Peta Hilirisasi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;