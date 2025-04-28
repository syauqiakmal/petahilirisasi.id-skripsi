import React, { useState, useEffect, useRef } from "react";
import logo from "../images/PetaHilirisasi.id.png";
import { Link } from 'react-router-dom';
const Menu = ({
  selectedOption,
  handleOptionChange,
  isMenuOpen,
  handleMenuToggle,
  uploadedFiles,
  handleShowFile,
  handleColumnSelection,
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
          {/* <li className="inputshp">
            <label className="choose_file">
              <input
                type="file"
                id="shapefileInput"
                accept=".zip,.tif,.tiff,.geojson"
                onClick={(e) => {
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const maxSize = 100 * 1024 * 1024; // 50 MB in bytes
                    if (file.size > maxSize) {
                      alert(
                        "File size exceeds 100 MB. Please upload a smaller file."
                      );
                      e.target.value = null; // Clear the file input
                    }
                  }
                }}
                onChange={handleFileUpload}
                disabled={!isUploadCheckboxEnabled}
              />
            </label>
          </li> */}
          <br></br>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <div className="show_raste_image">
                {/* Check if file is a TIFF, ZIP, or has specific names */}
                {(file.name.endsWith(".tif") ||
                  file.name.endsWith(".tiff") ||
                  file.name.endsWith("2000-2020") ||
                  file.name.endsWith("2000") ||
                  file.name.endsWith("2005") ||
                  file.name.endsWith("2010") ||
                  file.name.endsWith("2015") ||
                  file.name.endsWith("2020")) ? (
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
                ) : (
                  // Render ZIP file with additional info
                  <>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <label className="control control--checkbox">
                        <input
                          id={`toggle-${index}`}
                          type="checkbox"
                          checked={file.checked}
                          onChange={(e) => handleShowFile(index, e.target.checked)}
                        />
                        <div className="upload_file_name">{file.name}</div>
                        <div className="control__indicator"></div>
                      </label>
                    </div>

                    {file.checked && (
                      <div className="additional-info">
                        <ul className="ulshp">
                          {file.name.endsWith("2000-2020") && file.selectedColumns && file.selectedColumns.length > 0 ? (
                            <ul>
                              {file.selectedColumns.map((column) => (
                                <li className="lishp" key={column}>
                                  <label className="labelshp">
                                    <input
                                      type="checkbox"
                                      checked={file.selectedColumns.includes(column)}
                                      onChange={(e) => handleColumnSelection(index, column, e.target.checked)}
                                    />
                                    <span style={{ marginLeft: "10px" }}>{column}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          ) : file.data.features && file.data.features.length > 0 ? (
                            // For shapefile/GeoJSON
                            Object.keys(file.data.features[0].properties)
                              .filter((column) => {
                                return file.data.features.every(
                                  (feature) =>
                                    column !== "geom" &&
                                    column !== "id" &&
                                    feature.properties[column] !== "" &&
                                    feature.properties[column] !== "0" &&
                                    feature.properties[column] !== null
                                );
                              })
                              .map((column) => (
                                <li className="lishp" key={column}>
                                  <label className="labelshp">
                                    <input
                                      type="checkbox"
                                      checked={file.selectedColumns.includes(column)}
                                      onChange={(e) => handleColumnSelection(index, column, e.target.checked)}
                                    />
                                    <span style={{ marginLeft: "10px" }}>{column}</span>
                                  </label>
                                </li>
                              ))
                          ) : (
                            // Fallback if no valid data
                            <li>
                              <span> Tidak ada data yang dapat ditampilkan. </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
