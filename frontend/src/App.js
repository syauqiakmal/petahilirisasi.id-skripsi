import 'leaflet/dist/leaflet.css'

import './App.css';



import React from 'react';
import { PrintLayer } from './layers/PrintLayer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MahadataPage from './pages/MahadataPage';
import HukumPage from './pages/HukumPage';
import DiplomasiPage from './pages/DiplomasiPage';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Rute Halaman Utama */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rute Halaman Mahadata dan Peta */}
          <Route path="/mahadata-dan-kecerdasan-buatan" element={<MahadataPage />} />
          <Route path="/mahadata-dan-kecerdasan-buatan/map/Nikel" element={<PrintLayer activeMap="map1" />} />
          <Route path="/mahadata-dan-kecerdasan-buatan/map/Pasir Kuarsa" element={<PrintLayer activeMap="map2" />} />
          <Route path="/mahadata-dan-kecerdasan-buatan/map/Bauksit" element={<PrintLayer activeMap="map3" />} />
          <Route path="/mahadata-dan-kecerdasan-buatan/map" element={<PrintLayer activeMap="map4" />} />
          
          {/* Rute Halaman Hukum */}
          <Route path="/hukum-dan-perundangan" element={<HukumPage />} />
          
          {/* Rute Halaman Diplomasi */}
          <Route path="/diplomasi-dan-investasi" element={<DiplomasiPage />} />
          
          {/* Rute Halaman About dan Contact */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}
