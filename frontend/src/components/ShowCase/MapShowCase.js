import React, { useState } from "react";
import "./MapShowCase.css";

// Menggunakan gambar yang sama untuk setiap layer dan ikon
import Nickel from '../assets/Nickel.jpg';
import Bauxite from '../assets/Bauxite.jpg';
import Quartz from '../assets/Quartz.jpg';

import mapImage1 from "../assets/Nikel Showcase.jpeg";
import mapImage2 from "../assets/Bauksit Showcase.jpeg";
import mapImage3 from "../assets/Kuarsa Showcase.jpeg";

const images = [mapImage1, mapImage2, mapImage3];
const icons = [
  {
    src: Nickel,
    title: "Nikel",
    description: "Peta menampilkan distribusi nikel secara interaktif, dilengkapi dengan visual detail dari citra satelit dan informasi topografi untuk memahami potensi wilayah serta mendukung pengembangan hilirisasi industri baterai.",
  },
  {
    src: Bauxite,
    title: "Bauksit",
    description: "Peta interaktif bauksit menyediakan visual distribusi geografis, citra satelit yang detail, serta topografi untuk analisis wilayah. Solusi ideal untuk pengembangan hilirisasi aluminium.",
  },
  {
    src: Quartz,
    title: "Pasir Kuarsa",
    description: "Peta pasir kuarsa menampilkan distribusi area secara visual dengan detail citra satelit dan peta topografi. Sangat mendukung studi geologi dan pengembangan hilirisasi semikonduktor dan kaca.",
  },
];

const MapShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(1); 

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="map-showcase">
      <h2>Eksplorasi Mineral yang Komprehensif</h2>
      <p className="map-description">
      Klik Nikel, Bauksit, atau Pasir Kuarsa untuk menampilkan peta distribusi, data geospasial, dan analisis wilayah secara interaktif. Pilih peta satelit untuk visual detail atau peta topografi untuk memahami elevasi dan kontur medan.
      </p>

      <div className="icon-section">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`icon-container ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleIconClick(index)}
          >
            <img src={icon.src} alt={icon.title} className="icon-image" />
            <div className="icon-info">
              <h4>{icon.title}</h4>
              <p>{icon.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="map-image-container">
        <img src={images[activeIndex]} alt="Selected Map" className="map-image" />
      </div>
    </div>
  );
};

export default MapShowcase;

