import React, { useState } from 'react';
import './Carousel.css';
import Facts1 from '../assets/Facts-1.png'
import Facts2 from '../assets/Facts-2.png'
import Facts3 from '../assets/Facts-3.jpeg'
import Facts4 from '../assets/Facts-4.jpeg'

const cards = [
  {
    image1: Facts4,
    headline: 'Apa yang Dibicarakan tentang Hilirisasi di Media Sosial?',
    description: 'Topic cloud ini menunjukkan beberapa kata yang sering muncul terkait unggahan media tentang hilirisasi mineral di Indonesia. Semakin besar ukuran kata pada topic cloud, semakin banyak kata tersebut muncul di banyak unggahan. Data pada topic cloud ini dikumpulkan dalam Waktu tujuh hari dengan rentang Waktu unggahan media dari januari 2020  sampai November 2024.'
  },
  {
    image1: Facts1,
    headline: 'Realisasi Investasi Industri Hilirisasi Januari - September 2024',
    description: 'Gambaran realisasi investasi di sektor hilir selama periode Januari hingga September 2024 menunjukkan distribusi investasi di berbagai sektor seperti mineral, kehutanan, pertanian, minyak, gas, dan ekosistem kendaraan listrik. Data ini mencerminkan komitmen pemerintah dalam memperkuat hilirisasi guna meningkatkan nilai tambah dan daya saing ekonomi nasional.',
    reference: 'Referensi: Kementerian Investasi dan Hilirisasi/BKPM'
  },
  {
    image1: Facts2,
    headline: 'Fokus Hilirisasi',
    description: 'Fokus Indonesia dalam mengembangkan industri hilir adalah untuk meningkatkan nilai tambah sumber daya alam. Proyeksi dampak ekonomi hingga tahun 2040 menunjukkan kontribusi signifikan terhadap investasi, ekspor, dan lapangan kerja, mencerminkan potensi besar hilirisasi dalam memperkuat perekonomian nasional. Inisiatif ini juga mencakup pengembangan peta jalan untuk komoditas strategis hingga 2040.',
    reference: 'Referensi: Kementerian Investasi dan Hilirisasi/BKPM'
  },
  {
    image1: Facts3,
    headline: '9 Sektor Prioritas Investasi: Peluang Besar untuk Masa Depan',
    description: 'Pemerintah Indonesia membuka jalan bagi investasi di 9 sektor strategis—dari energi terbarukan hingga ekonomi digital—dengan potensi besar untuk mendorong pertumbuhan ekonomi hingga 8% per tahun. Ini adalah kesempatan untuk menjadi bagian dari transformasi ekonomi Indonesia menuju keberlanjutan dan daya saing global.',
    reference: 'Referensi: Kementerian Investasi dan Hilirisasi/BKPM'
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="facts-slider">
      <h2>Fakta-Fakta Hilirisasi</h2>
      <div className="carousel-section" id="carousel-section">
        <div className="carousel-text" id="carousel-text">
          <div className="carousel-content">
            <h1 id="carousel-heading">{cards[currentIndex].headline}</h1>
            <p id="carousel-description">{cards[currentIndex].description}</p>
          </div>
          <div className="button-container" id="button-container">
            <div className="carousel-nav-button" id="carousel-nav-button">
              <button
                className="nav-button"
                id="nav-button"
                onClick={handlePrev}
                aria-label="Previous Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
              </button>
              <button
                className="nav-button"
                id="nav-button"
                onClick={handleNext}
                aria-label="Next Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-image-container" id="carousel-image-container">
          <img
            src={cards[currentIndex].image1}
            alt={cards[currentIndex].headline}
            id="carousel-image"
          />
          {cards[currentIndex]?.reference && (
              <p className="carousel-ref">
              Referensi: Kementerian Investasi dan Hilirisasi/BKPM
            </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;