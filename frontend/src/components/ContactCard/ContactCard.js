import React from 'react';
import './ContactCard.css';

const ContactCard = () => {
  return (
    <div className="card">
      <div className="infoSection">
        <h3 className="title">
        Head of Research Interest Group (RIG)<br></br> Geospatial & Economics Artificial Intelligence (Geo-Eco AI),<br></br> Binus University
        </h3>
        <p className="name">Dr. Ir. Alexander Agung S. Gunawan, S.Si., M.T., M.Sc., IPM</p>
        <p className="email">
          email : <a href="mailto:eirwansyah@binus.edu" className="emailLink">aagung@binus.edu</a>
        </p>
        <br>
        </br>
        <h3 className="title">
          Head of Researcher Geo-AI<br></br> Research and Innovation Lab School of Computer Science,<br></br> Binus University
        </h3>
        <p className="name">Dr. Ir. Edy Irwansyah, S.T., M.Si., IPM, ASEAN Eng.</p>
        <p className="email">
          email : <a href="mailto:eirwansyah@binus.edu" className="emailLink">eirwansyah@binus.edu</a>
        </p>
      </div>
      <div className="mapSection">
        <iframe
          title="Map"
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.738530906418!2d106.7810816!3d-6.2062592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6dcc7d2c4ad%3A0x209cb1eef39be168!2sUniversitas%20Bina%20Nusantara%20Kampus%20Anggrek!5e0!3m2!1sid!2sid!4v1733212517355!5m2!1sid!2sid"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ContactCard;