// Map.js
import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ScaleControl,
  ImageOverlay,
} from "react-leaflet";
import { GeomanToolbar } from "../layers/Geoman";
import { ShowCoordinates } from "../layers/ShowCoordinates";
// import { ContinentsPolygonLayer } from "../layers/ContinentLayer";
// import Search from "../layers/Search";
// import { continents } from "../data/indo_provinces";
import Menu from "../layers/Menu";

import L from "leaflet";
import {
  PopupComponent,
  getFeatureStyle,
  onEachFeature,
} from "../layers/popupcontent"; // Import the PopupComponent
import logo from "../Logo/data.png";
// import { PopupComponentRaster } from "../layers/legend_raster";

// import MapPrint from "../layers/MapPrint";

//Legend
// import Legend from "../layers/Legend";
import ToggleLegend from "../layers/ToggleLegend";
import { createInfoIcon } from '../icons/customIcon';
import Calculate from "../layers/calculate";

export const Map = ({ hideComponents }) => {
  const [selectedOption, setSelectedOption] = useState("OSM");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [geojsonData, setGeojsonData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const mapRef = useRef(null);
  const [isNewUpload, setIsNewUpload] = useState(false);
  const [rasterData, setRasterData] = useState(null);
  const [bounds, setBounds] = useState(null);
  // const [adminDesaData, setAdminDesaData] = useState(null);
  const imageOverlayRef = useRef(null);
  const colorPickerControlRef = useRef(null);
  const [rasterOpacity, setRasterOpacity] = useState({});
  const [selectedProperty, setSelectedProperty] = useState("penanganan_sampah");
  const [showPopup, setShowPopup] = useState(false);

  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const customIcon = createInfoIcon();
  const [area, setArea] = useState(null);
  const [miningData, setMiningData] = useState(null);


  const handleLegendToggle = (isOpen) => {
    setIsLegendOpen(isOpen)
  }


  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleClick = (e, index) => {
    // Ensure colorPickerControlRef.current is defined before accessing it
    if (colorPickerControlRef.current) {
      const newOpacity = colorPickerControlRef.current.getSliderValue();
      setRasterOpacity((prevOpacities) => ({
        ...prevOpacities,
        [index]: newOpacity,
      }));
    }
  };

  const handleSelectPropertyChange = (newSelectedProperty) => {
    setSelectedProperty(newSelectedProperty);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleContinents = () => {
    // setIsContinentsVisible(!isContinentsVisible);
  };

  const handleShowFile = (index, checked) => {
    const updatedFiles = uploadedFiles.map((file, i) => {
      return i === index ? { ...file, checked } : file;
    });
    setUploadedFiles(updatedFiles);

    const selectedFiles = updatedFiles.filter((file) => file.checked);
    const combinedData = selectedFiles.flatMap((file) => file.data.features); // Gabungkan data geometri dari semua file yang dipilih

    console.log("Combined GeoJSON Data:", combinedData);

    const mergedGeojsonData = {
      type: "FeatureCollection",
      features: combinedData,
    };

    setGeojsonData(selectedFiles.length > 0 ? mergedGeojsonData : null);
  };

  const handleRasterFile = (index, checked) => {
    const updatedFiles = uploadedFiles.map((file, i) =>
      i === index ? { ...file, checked } : file
    );
    setUploadedFiles(updatedFiles);

    const selectedRasterFiles = updatedFiles.filter(
      (file) =>
        file.checked &&
        (file.name.endsWith(".tif") || file.name.endsWith(".tiff") || file.name.endsWith("2000-2020") || file.name.endsWith("2005") ||
        file.name.endsWith("2010")||
        file.name.endsWith("2015")||
        file.name.endsWith("2020"))
    );

    // Combine all raster data for rendering on map
    const combinedRasterData = selectedRasterFiles.flatMap(
      (file) => file.data.raster_images
    );

    // Get bounds for the selected files
    let selectedBounds = null;
    if (selectedRasterFiles.length > 0) {
      selectedRasterFiles.forEach((file) => {
        if (file.data.bounds) {
          const fileBounds = L.latLngBounds(file.data.bounds);
          if (fileBounds.isValid()) {
            if (selectedBounds) {
              selectedBounds.extend(fileBounds);
            } else {
              selectedBounds = fileBounds;
            }
          }
        }
      });
    }

    console.log("Selected Raster Files:", selectedRasterFiles);
    console.log("Combined Raster Data:", combinedRasterData);
    console.log("Selected Bounds:", selectedBounds);

    setRasterData(combinedRasterData.length > 0 ? combinedRasterData : null);
    setBounds(
      selectedBounds && selectedBounds.isValid() ? selectedBounds : null
    );
    setIsNewUpload(true); // Trigger map update
  };

  const handleColumnSelection = (fileIndex, column, isChecked) => {
    const updatedFiles = uploadedFiles.map((file, index) => {
      if (index === fileIndex) {
        const updatedColumns = isChecked
          ? [...file.selectedColumns, column]
          : file.selectedColumns.filter((col) => col !== column);
        return { ...file, selectedColumns: updatedColumns };
      }
      return file;
    });
    setUploadedFiles(updatedFiles);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const tableName = file.name.split(".")[0];
    const maxSize = 100 * 1024 * 1024; // 100 MB in bytes

    if (file.size > maxSize) {
      alert("File size exceeds 100 MB. Please upload a smaller file.");
      event.target.value = null; // Clear the file input
      return;
    }

    try {
      // Upload file
      const uploadResponse = await fetch("http://localhost:8000/map/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Handle zipped shapefile
      if (file.name.endsWith(".zip")) {
        const dataResponse = await fetch(
          `http://localhost:8000/map/data/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error("Failed to fetch shapefile data");
        }
        const geojsonData = await dataResponse.json();

        if (
          !geojsonData ||
          !geojsonData.features ||
          geojsonData.features.length === 0
        ) {
          throw new Error("GeoJSON data is empty or malformed");
        }

        const newUploadedFile = {
          name: file.name,
          data: geojsonData,
          checked: true, // Automatically checked after upload
          selectedColumns: Object.keys(geojsonData.features[0].properties),
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setGeojsonData(geojsonData);
      }
      // Handle raster file
      else if (file.name.endsWith(".tif") || file.name.endsWith(".tiff")) {
        const dataResponse = await fetch(
          `http://localhost:8000/map/raster/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error("Failed to fetch raster data");
        }
        const rasterData = await dataResponse.json();

        if (!rasterData || !rasterData.raster_images) {
          throw new Error(
            "Invalid raster data or missing raster_images property"
          );
        }

        const newUploadedFile = {
          name: file.name,
          data: rasterData,
          checked: true,
          bounds: rasterData.bounds,
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setRasterData((prevRasterData) => [
          ...(prevRasterData || []),
          ...rasterData.raster_images,
        ]);
        setBounds((prevBounds) =>
          prevBounds
            ? prevBounds.extend(L.latLngBounds(rasterData.bounds))
            : L.latLngBounds(rasterData.bounds)
        );

        setIsMenuOpen(true); // Open menu after uploading file
        setIsNewUpload(true);
      }
      // Handle geojson file
      else if (file.name.endsWith(".geojson")) {
        const dataResponse = await fetch(
          `http://localhost:8000/map/geojson/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error(
            `Failed to fetch GeoJSON data: ${dataResponse.status}`
          );
        }
        const geojsonData = await dataResponse.json();
        console.log("GeoJSON Data:", geojsonData);

        // Validate the GeoJSON data
        if (
          !geojsonData ||
          !geojsonData.features ||
          geojsonData.features.length === 0
        ) {
          throw new Error("GeoJSON data is empty or malformed");
        }

        const newUploadedFile = {
          name: file.name,
          data: geojsonData,
          checked: true, // Automatically checked after upload
          selectedColumns: Object.keys(geojsonData.features[0].properties),
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setGeojsonData(geojsonData);
      }
      setIsMenuOpen(true); // Open menu after uploading file
      setIsNewUpload(true);
    } catch (error) {
      console.error("Error handling file upload:", error);
      alert(
        "An error occurred while uploading the file and fetching data. Please try again."
      );
    }
  };

  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const dataResponse = await fetch(
  //         `http://localhost:8000/map/data/Blok Tambang`
  //       );
  //       if (!dataResponse.ok) {
  //         throw new Error("Failed to fetch shapefile data");
  //       }
  //       const geojsonData = await dataResponse.json();

  //       const newUploadedFile = {
  //         name: "Wilayah Izin Pertambangan",
  //         data: geojsonData,
  //         checked: true, // Automatically checked after upload
  //         selectedColumns: Object.keys(geojsonData.features[0].properties),
  //       };

  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  //       setGeojsonData(geojsonData);
  //       setIsNewUpload(true); // Moved inside the try block for correct timing
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchData(); // Corrected the function call
  // }, []);

  

  useEffect(() => {
    const fetchRaster = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/map/raster3/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch raster data");
        }
  
        const rasterResponse = await response.json();
        console.log("Raster Response:", rasterResponse);
        
       
        const newUploadedFile = {
          // name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2000-2020",
          name: "Bauxite Mining Area Changes in Ketapang, West Kalimantan 2000-2020",
          data: rasterResponse, // Base64 images
          checked: true,
          bounds: rasterResponse.bounds, // Bounding box
          area: rasterResponse.area_result, 
        };
  
        // Update state with new file and raster data
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
  
        // Update rasterData state by appending new raster images
        setRasterData((prevRasterData) => [
          ...(prevRasterData || []),
          ...rasterResponse.raster_images,
        ]);
  
        setBounds((prevBounds) =>
          prevBounds
            ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
            : L.latLngBounds(rasterResponse.bounds)
        );
  
        setArea(rasterResponse.area_result);
        console.log(rasterResponse.area_result)


        const map = mapRef.current
        map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
          maxZoom: 15,
        });

        //TODO: change text
        const markerLatLng = [-0.03, 110.1975]
        const mapMarker = L.marker(markerLatLng, {icon: customIcon}).addTo(map);
        mapMarker.bindPopup(`
          <div style="width: 320px; height: 400px; font-size: 12px; overflow-y: auto;">
              <h4 style="text-align: center; margin-bottom: 8px;">WIUP - Bauksit Marau Ketapang</h4>
              <table border="1" style="border-collapse: collapse; width: 100%; table-layout: fixed;">
                  <tr>
                      <th style="width: 40%;">Lokasi Tambang</th>
                      <td>Marau, Ketapang</td>
                  </tr>
                  <tr>
                      <th>Kabupaten</th>
                      <td>Ketapang</td>
                  </tr>
                  <tr>
                      <th>Provinsi</th>
                      <td>Kalimantan Barat</td>
                  </tr>
                  <tr>
                      <th>Komoditas</th>
                      <td>Bauksit</td>
                  </tr>
                  <tr>
                      <th>Luas Wilayah (Ha)</th>
                      <td>15,670.00</td>
                  </tr>
                  <tr>
                      <th>Jenis Izin</th>
                      <td>IUP</td>
                  </tr>
                  <tr>
                      <th>Jenis Badan Usaha</th>
                      <td>PT</td>
                  </tr>
                  <tr>
                      <th>Nama Perusahaan</th>
                      <td>CITA MINERAL INVESTINDO TBK</td>
                  </tr>
                  <tr>
                      <th>Pejabat Berwenang</th>
                      <td>Gubernur</td>
                  </tr>
                  <tr>
                      <th>Nomor SK</th>
                      <td title="503/109/MINERBA/DPMPTSP.C/2017" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">503/109/MINERBA/DPMPTSP.C/2017</td>
                  </tr>
                  <tr>
                      <th>Status C&C</th>
                      <td>CNC-3</td>
                  </tr>
                  <tr>
                      <th>Tahapan Kegiatan</th>
                      <td>Operasi Produksi</td>
                  </tr>
                  <tr>
                      <th>Pulau</th>
                      <td>Kalimantan</td>
                  </tr>
                  <tr>
                      <th>ID Kabupaten</th>
                      <td>04</td>
                  </tr>
                  <tr>
                      <th>ID Provinsi</th>
                      <td>61</td>
                  </tr>
                  <tr>
                      <th>Kode Jenis Komoditas</th>
                      <td>17</td>
                  </tr>
                  <tr>
                      <th>Kode Komoditas</th>
                      <td>Mineral Logam</td>
                  </tr>
                  <tr>
                      <th>Single ID</th>
                      <td>3361042172014100</td>
                  </tr>
                  <tr>
                      <th>Tanggal Berlaku SK</th>
                      <td>3 Agustus 2017</td>
                  </tr>
                  <tr>
                      <th>Tanggal Berakhir SK</th>
                      <td>24 Mei 2029</td>
                  </tr>
              </table>
          </div>
      `);
      
      setMiningData({
        "Lokasi Tambang": "Marau, Ketapang",
        "Kabupaten": "Ketapang",
        "Provinsi": "Kalimantan Barat",
        "Komoditas": "Bauksit",
        "Luas Wilayah (Ha)": "15,670.00",
        "Jenis Izin": "IUP",
        "Jenis Badan Usaha": "PT",
        "Nama Perusahaan": "CITA MINERAL INVESTINDO TBK",
        "Pejabat Berwenang": "Gubernur",
        "Nomor SK": "503/109/MINERBA/DPMPTSP.C/2017",
        "Status C&C": "CNC-3",
        "Tahapan Kegiatan": "Operasi Produksi",
        "Pulau": "Kalimantan",
        "ID Kabupaten": "04",
        "ID Provinsi": "61",
        "Kode Jenis Komoditas": "17",
        "Kode Komoditas": "Mineral Logam",
        "Single ID": "3361042172014100",
        "Tanggal Berlaku SK": "3 Agustus 2017",
        "Tanggal Berakhir SK": "24 Mei 2029",
      });
      
      
  
        setIsNewUpload(true);
      } catch (error) {
        console.error("Error fetching raster:", error.message);
        // Optionally show error to the user here, e.g., via a toast notification
      }
    };
  
    fetchRaster();
  });
  
  // useEffect(() => {
  //   const fetchRaster = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/map/rasterbauksitA/`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch raster data");
  //       }
  
  //       const rasterResponse = await response.json();
  //       console.log("Raster Response:", rasterResponse);
        
       
  //       const newUploadedFile = {
  //         name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2000",
  //         data: rasterResponse, // Base64 images
  //         checked: false,
  //         bounds: rasterResponse.bounds, // Bounding box
  //       };
  
  //       // Update state with new file and raster data
  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  
  //       // Update rasterData state by appending new raster images
  //       setRasterData((prevRasterData) => [
  //         ...(prevRasterData || []),
  //         ...rasterResponse.raster_images,
  //       ]);
  
  //       setBounds((prevBounds) =>
  //         prevBounds
  //           ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
  //           : L.latLngBounds(rasterResponse.bounds)
  //       );
  
  //       const map = mapRef.current
  //       map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
  //         maxZoom: 15,
  //       });
  //       setIsNewUpload(false);
  //     } catch (error) {
  //       console.error("Error fetching raster:", error.message);
  //       // Optionally show error to the user here, e.g., via a toast notification
  //     }
  //   };
  
  //   fetchRaster();
  // }, []);

  // useEffect(() => {
  //   const fetchRaster = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/map/rasterbauksitB/`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch raster data");
  //       }
  
  //       const rasterResponse = await response.json();
  //       console.log("Raster Response:", rasterResponse);
        
       
  //       const newUploadedFile = {
  //         name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2005",
  //         data: rasterResponse, // Base64 images
  //         checked: false,
  //         bounds: rasterResponse.bounds, // Bounding box
  //       };
  
  //       // Update state with new file and raster data
  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  
  //       // Update rasterData state by appending new raster images
  //       setRasterData((prevRasterData) => [
  //         ...(prevRasterData || []),
  //         ...rasterResponse.raster_images,
  //       ]);
  
  //       setBounds((prevBounds) =>
  //         prevBounds
  //           ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
  //           : L.latLngBounds(rasterResponse.bounds)
  //       );
  
  //       const map = mapRef.current
  //       map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
  //         maxZoom: 15,
  //       });
  //       setIsNewUpload(false);
  //     } catch (error) {
  //       console.error("Error fetching raster:", error.message);
  //       // Optionally show error to the user here, e.g., via a toast notification
  //     }
  //   };
  
  //   fetchRaster();
  // }, []);


  // useEffect(() => {
  //   const fetchRaster = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/map/rasterbauksitC/`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch raster data");
  //       }
  
  //       const rasterResponse = await response.json();
  //       console.log("Raster Response:", rasterResponse);
        
       
  //       const newUploadedFile = {
  //         name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2010",
  //         data: rasterResponse, // Base64 images
  //         checked: false,
  //         bounds: rasterResponse.bounds, // Bounding box
  //       };
  
  //       // Update state with new file and raster data
  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  
  //       // Update rasterData state by appending new raster images
  //       setRasterData((prevRasterData) => [
  //         ...(prevRasterData || []),
  //         ...rasterResponse.raster_images,
  //       ]);
  
  //       setBounds((prevBounds) =>
  //         prevBounds
  //           ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
  //           : L.latLngBounds(rasterResponse.bounds)
  //       );
  
  //       const map = mapRef.current
  //       map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
  //         maxZoom: 15,
  //       });
  //       setIsNewUpload(false);
  //     } catch (error) {
  //       console.error("Error fetching raster:", error.message);
  //       // Optionally show error to the user here, e.g., via a toast notification
  //     }
  //   };
  
  //   fetchRaster();
  // }, []);


  // useEffect(() => {
  //   const fetchRaster = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/map/rasterbauksitD/`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch raster data");
  //       }
  
  //       const rasterResponse = await response.json();
  //       console.log("Raster Response:", rasterResponse);
        
       
  //       const newUploadedFile = {
  //         name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2015",
  //         data: rasterResponse, // Base64 images
  //         checked: false,
  //         bounds: rasterResponse.bounds, // Bounding box
  //       };
  
  //       // Update state with new file and raster data
  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  
  //       // Update rasterData state by appending new raster images
  //       setRasterData((prevRasterData) => [
  //         ...(prevRasterData || []),
  //         ...rasterResponse.raster_images,
  //       ]);
  
  //       setBounds((prevBounds) =>
  //         prevBounds
  //           ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
  //           : L.latLngBounds(rasterResponse.bounds)
  //       );
  
  //       const map = mapRef.current
  //       map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
  //         maxZoom: 15,
  //       });
  //       setIsNewUpload(false);
  //     } catch (error) {
  //       console.error("Error fetching raster:", error.message);
  //       // Optionally show error to the user here, e.g., via a toast notification
  //     }
  //   };
  
  //   fetchRaster();
  // }, []);


  // useEffect(() => {
  //   const fetchRaster = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/map/rasterbauksitE/`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch raster data");
  //       }
  
  //       const rasterResponse = await response.json();
  //       console.log("Raster Response:", rasterResponse);
        
       
  //       const newUploadedFile = {
  //         name: "Perubahan Wilayah Pertambangan Bauksit Tahun 2020",
  //         data: rasterResponse, // Base64 images
  //         checked: false,
  //         bounds: rasterResponse.bounds, // Bounding box
  //       };
  
  //       // Update state with new file and raster data
  //       setUploadedFiles((prevUploadedFiles) => [
  //         ...prevUploadedFiles,
  //         newUploadedFile,
  //       ]);
  
  //       // Update rasterData state by appending new raster images
  //       setRasterData((prevRasterData) => [
  //         ...(prevRasterData || []),
  //         ...rasterResponse.raster_images,
  //       ]);
  
  //       setBounds((prevBounds) =>
  //         prevBounds
  //           ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds))
  //           : L.latLngBounds(rasterResponse.bounds)
  //       );
  
  //       const map = mapRef.current
  //       map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
  //         maxZoom: 15,
  //       });
  //       setIsNewUpload(false);
  //     } catch (error) {
  //       console.error("Error fetching raster:", error.message);
  //       // Optionally show error to the user here, e.g., via a toast notification
  //     }
  //   };
  
  //   fetchRaster();
  // }, []);
 

  // Get bounds everytime shapefile uploaded
  useEffect(() => {
    console.log("useEffect triggered with dependencies: ", {
      geojsonData,
      rasterData,
      bounds,
      isNewUpload,
      uploadedFiles,
    });

    if (mapRef.current && isNewUpload) {
      const map = mapRef.current;
      let combinedBounds = null;

      // Fit bounds for geojsonData
      if (
        geojsonData &&
        geojsonData.features &&
        geojsonData.features.length > 0
      ) {
        try {
          const geoJsonLayer = L.geoJSON(geojsonData);
          if (geoJsonLayer.getBounds().isValid()) {
            combinedBounds = L.latLngBounds(geoJsonLayer.getBounds());
          } else {
            console.error("Invalid bounds for geojsonData:", geojsonData);
          }
        } catch (error) {
          console.error("Error creating GeoJSON layer:", error);
        }
      }

      // Fit bounds for rasterData
      if (rasterData && rasterData.length > 0) {
        rasterData.forEach((raster) => {
          if (raster.bounds) {
            const rasterBounds = L.latLngBounds(raster.bounds);
            if (rasterBounds.isValid()) {
              combinedBounds = combinedBounds
                ? combinedBounds.extend(rasterBounds)
                : rasterBounds;
            }
          }
        });
      }

      // Check if combinedBounds is valid before fitting map bounds
      if (combinedBounds && combinedBounds.isValid()) {
        map.fitBounds(combinedBounds, {
          maxZoom: 12,
        });
      } else {
        console.error("Invalid combinedBounds:", combinedBounds);
      }

      setIsNewUpload(false); // Reset isNewUpload after fitting bounds

      console.log("Bounds fit completed, isNewUpload reset");
    }
  }, [geojsonData, rasterData, bounds, isNewUpload, uploadedFiles]);

  const position = [-0.04428, 110.18154];

  return (
    <div className="container" id="map-container">
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={12}
        style={{ width: "100%", height: "97vh" }}
        minZoom={3}
        maxBounds={[
          [-90, -180], // Batas sudut barat daya
          [90, 180], // Batas sudut timur laut
        ]}
      >
        {!hideComponents && (
          <Menu
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            isMenuOpen={isMenuOpen}
            handleMenuToggle={handleMenuToggle}
            handleToggleContinents={handleToggleContinents}
            uploadedFiles={uploadedFiles}
            handleShowFile={handleShowFile}
            handleRasterFile={handleRasterFile}
            // handleGeoJSONUpload={handleGeoJSONUpload}
            handleFileUpload={handleFileUpload}
            handleColumnSelection={handleColumnSelection}
          />
        )}

        {/* {!hideComponents && <Search />} */}
        {selectedOption === "OSM" && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {selectedOption === "Imagery" && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        )}
        {selectedOption === "Topo" && (
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          />
        )}
        {/* {renderGeoJSONLayers()} */}
        {/* {isContinentsVisible && <ContinentsPolygonLayer data={continents} />} */}
        {geojsonData &&
          uploadedFiles.map(
            (file, index) =>
              file.checked && // Only show checked files
              !file.name.endsWith(".tif") &&
              !file.name.endsWith(".tiff") &&
              file.data && (
                <GeoJSON
                  key={index}
                  data={file.data}
                  style={(feature) =>
                    getFeatureStyle(feature, selectedProperty)
                  }
                  onEachFeature={(feature, layer) =>
                    onEachFeature(feature, layer, uploadedFiles)
                  }
                />
              )
          )}

        {rasterData &&
          bounds &&
          rasterData.map((raster, index) => {
            console.log("Rendering raster image:", raster);
            console.log("index", index);
            return (
              <ImageOverlay
                key={index}
                url={`data:image/png;base64,${raster}`}
                bounds={bounds}
                opacity={rasterOpacity[index] || 0.8}
                interactive={true}
                ref={imageOverlayRef}
                eventHandlers={{
                  click: (e) => {
                    handleClick(e, index);
                  },
                }}
              />
            );
          })}
        <ScaleControl position="bottomleft" imperial={true} />
        <GeomanToolbar
          setcolorPickerRef={(ref) =>
            (colorPickerControlRef.current = ref.current)
          }
        />
        <ShowCoordinates />

        <ToggleLegend onToggle={handleLegendToggle}/>
        <Calculate isOpen={isLegendOpen} area={area} miningData={miningData}/>
        {/* <Legend isOpen={isLegendOpen} isBits={false}/> */}

        {uploadedFiles.map((file, index) => {
          if (
            file.checked && // Only show checked files
            !file.name.endsWith(".tif") &&
            !file.name.endsWith(".tiff") &&
            !file.name.endsWith("2000-2020") && 
            !file.name.endsWith("2000")&&     
            !file.name.endsWith("2005") &&
            !file.name.endsWith("2010")&&
            !file.name.endsWith("2015")&&
            !file.name.endsWith("2020")&&
            file.data
          ) {
            return (
              <button
                key={index} // Ensure each button has a unique key
                onClick={() => {
                  togglePopup();
                }}
                style={{
                  position: "absolute",
                  top: "150px",
                  right: "20px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                  backgroundImage: `url(${logo})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "40px",
                  backgroundPosition: "center",
                  zIndex: 1000,
                  transition: "transform 0.3s ease-out",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
           
           
            );
          }
          return null; // Return null for files that do not meet the conditions
        })}            

  {/* <PopupComponentRaster/> */}

         {showPopup && (
          <PopupComponent
            data={geojsonData} // Ensure geojsonData is defined and passed correctly
            onSelectPropertyChange={handleSelectPropertyChange}
            onTogglePopup={togglePopup}
          />
        )} 
        {/* {showLegend && <Legend />} */}

        
      </MapContainer>
    </div>
  );
};
