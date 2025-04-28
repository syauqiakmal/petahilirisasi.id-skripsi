import React, { useState, useEffect, useRef } from "react";
import logo from "../images/PetaHilirisasi.id.png";
import { Link } from 'react-router-dom';
const Menu = ({
  selectedOption,
  handleOptionChange,
  isMenuOpen,
  handleMenuToggle,
  uploadedFiles,
  handleRasterFile,
}) => {
  const menuRef = useRef(null);


  useEffect(() => {
    const handleDoubleClick = (event) => {
      event.stopPropagation();
    };

    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, []);

  return (
    <div className="dashboard-menu" style={{ zIndex: 1000 }} ref={menuRef}>
      <input
        type="checkbox"
        id="dashboard-toggle"
        className="dashboard-toggle"
        checked={isMenuOpen}
        onChange={handleMenuToggle}
      />
      <label htmlFor="dashboard-toggle" className="dashboard-icon">
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
      </label>
      <hr className="divider-vertical" />
      <Link to="/"><div className="menu-logo-container">
      
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="menu-title">petahilirisasi.id</h2>
        
      </div></Link>

      <div className={`dashboard-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <div className="map_setting">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="OSM"
                  checked={selectedOption === "OSM"}
                  onChange={() => handleOptionChange("OSM")}
                />
                <p>OSM Street</p>
              </label>
            </div>
          </li>
          <li>
            <div className="map_setting">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="Imagery"
                  checked={selectedOption === "Imagery"}
                  onChange={() => handleOptionChange("Imagery")}
                />
                <p> ESRI World Imagery</p>
              </label>
            </div>
          </li>
          <li>
            <div className="map_setting">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="Topo"
                  checked={selectedOption === "Topo"}
                  onChange={() => handleOptionChange("Topo")}
                />
                <p>Topography Map</p>
              </label>
            </div>
          </li>
          <hr className="divider" /> {/* Pembatas */}
          <br></br>

          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <div className="show_raster_image">
                {
                  <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <label className="control control--checkbox" style={{ display: "flex", alignItems: "center" }}>
                      <input
                        id={`toggle-${index}`}
                        type="checkbox"
                        checked={file.checked}
                        onChange={(e) => {
                          handleRasterFile(index, e.target.checked);
                          e.stopPropagation(); // Stop propagation if needed
                        }}
                        style={{ marginRight: "10px" }} // Add space between checkbox and text
                      />
                      <div className="upload_file_name">{file.name}</div>
                      <div className="control__indicator"></div>
                    </label>
                  </div>
                }

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
