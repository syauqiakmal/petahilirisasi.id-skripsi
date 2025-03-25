import React, {useState, useRef, useEffect} from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl, ImageOverlay } from "react-leaflet";
import { GeomanToolbar } from "../layers/Geoman";
import { ShowCoordinates } from "../layers/ShowCoordinates";
import Menu from "../layers/Menu";
import L from "leaflet";
import { PopupComponent, getFeatureStyle, onEachFeature } from "../layers/popupcontent";
import logo from "../Logo/data.png";
import Legend from "../layers/Legend";
import ToggleLegend from "../layers/ToggleLegend";
import Calculate from "../layers/calculate";
import { createInfoIcon } from "../icons/customIcon";

export const Map = ({hideComponents}) => {
    const [selectedOption, setSelectedOption] = useState("OSM");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContinentsVisible, setIsContinentsVisible] = useState(false);
    const [geojsonData, setGeojsonData] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isContinentsCheckboxEnabled, setIsContinentsCheckboxEnabled] = useState(true);
    const [isUploadCheckboxEnabled, setIsUploadCheckboxEnabled] = useState(true);
    const mapRef = useRef(null);
    const [isNewUpload, setIsNewUpload] = useState(false);
    const [rasterData, setRasterData] = useState(null);
    const [bounds, setBounds] = useState(null);
    const imageOverlayRef = useRef(null);
    const colorPickerControlRef = useRef(null);
    const [rasterOpacity, setRasterOpacity] = useState({});
    const [selectedProperty, setSelectedProperty] = useState("penanganan_sampah");
    const [showPopup, setShowPopup] = useState(false);
    const [isLegendOpen, setIsLegendOpen] = useState(false);
    const customIcon = createInfoIcon();
    const [area, setArea] = useState(null);
    const [miningData, setMiningData] = useState(null);

    const handleLegendToggle = (isOpen) => { setIsLegendOpen(isOpen); }
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
    
    const updateOpacity = (value) => {
        setRasterOpacity(value);
    }

    const handleRasterFile = (index, checked) => {
        const map = mapRef.current;
        const updateFiles = uploadedFiles.map((file, i) => 
            i === index ? {...file, checked} : file
        );
        setUploadedFiles(updateFiles);

        const selectedRasterFiles = updateFiles.filter(
            (file) => 
                file.checked &&
                (file.name.endsWith(".tif") ||
                file.name.endsWith(".tiff") ||
                file.name.endsWith("2000-2020")||
                file.name.endsWith("2000")||
                file.name.endsWith("2005") ||
                file.name.endsWith("2010")||
                file.name.endsWith("2015")||
                file.name.endsWith("2020")
                )
        );

        //combined all raster data for rendering on map
        const combinedRasterData = selectedRasterFiles.flatMap(
            (file) => file.data.raster_images
        );

        //get bound for the selected files
        let selectedBounds = null;
        if (selectedRasterFiles.length > 0){
            selectedRasterFiles.forEach((file) => {
                if (file.data.bounds){
                    const fileBounds = L.latLngBounds(file.data.bounds);
                    if (fileBounds.isValid()){
                        if (selectedBounds){
                            selectedBounds.index(fileBounds);
                        }else {
                            selectedBounds = fileBounds;
                        }
                    }
                }
            });
        }

        setRasterData(combinedRasterData.length > 0 ? combinedRasterData : null);
        setBounds(selectedBounds && selectedBounds.isValid() ? selectedBounds : null);
        setIsNewUpload(true); //Trigger map update

        // fit map bounds with a maximum zoom level
        if (selectedBounds && selectedBounds.isValid() && map){
            map.fitBounds(selectedBounds, {maxZoom: 20}); // set max zoom level
        }
    }

    const handleShowFile = (index, checked) => {
        const updatedFiles = uploadedFiles.map((file, i) => {
            return i === index ? {...file, checked} : file;
        });
        setUploadedFiles(updatedFiles);

        const selectedFiles = updatedFiles.filter((file) => file.checked);
        const combinedData = selectedFiles.flatMap((file) => file.data.features); // gabungkan data geometri dari semua file yang dipilih

        const mergedGeojsonData = {
            type: "FeatureCollection",
            features: combinedData,
        }

        setGeojsonData(selectedFiles.length > 0 ? mergedGeojsonData : null);
    }

    const handleColumnSelection = (fileIndex, column, isChecked) => {
        const updatedFiles = uploadedFiles.map((file, index) => {
            if (index === fileIndex){
                const updatedColumns = isChecked ? [...file.selectedColumns, column] : file.selectedColumns.filter((col) => col !== column);
                return {...file, selectedColumns: updatedColumns};
            }
            return file;
        });

        setUploadedFiles(updatedFiles);
    }

    useEffect(() => {
        const fetchRaster = async () => {
            try{
                const response = await fetch(`http://localhost:8000/map/raster_morowali2/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch raster data");
                }

                const rasterResponse = await response.json();
                const newUploadedFile = {
                    // name: "Perubahan Wilayah Pertambangan Nikel IWIP Tahun 2000 - 2020",
                    name: "Nickel Mining Area Changes in Weda, Central Halmahera & East Halmahera, North Maluku 2000 - 2020",
                    data: rasterResponse,
                    checked: true,
                    bounds: rasterResponse.bounds,
                    area: rasterResponse.area_result, 
                };

                setUploadedFiles((prevUploadedFiles) => [
                    ...prevUploadedFiles,
                    newUploadedFile
                ]);

                setRasterData((prevRasterData) => [
                    ...(prevRasterData || []),
                    ...rasterResponse.raster_images
                ]);
                setArea(rasterResponse.area_result);
                console.log(rasterResponse.area_result)
        
                
                setBounds((prevBounds) => prevBounds ? prevBounds.extend(L.latLngBounds(rasterResponse.bounds)) : L.latLngBounds(rasterResponse.bounds));

                const map = mapRef.current;
                map.fitBounds(L.latLngBounds(rasterResponse.bounds), {
                    maxZoom: 15
                });

                //TODO: Change marker location
                const markerLatLng = [0.472, 127.946]
                // [0.53660, 127.92616]
                const mapMarker = L.marker(markerLatLng, {icon: customIcon}).addTo(map);
                mapMarker.bindPopup(`
                    <div style="width: 320px; font-size: 12px;">
                        <h4 style="text-align: center; margin-bottom: 8px;">WIUP - Weda Bay Nickel</h4>
                        <table border="1" style="border-collapse: collapse; width: 100%; table-layout: fixed;">
                            <tr>
                                <th style="width: 40%;">Lokasi Tambang</th>
                                <td>Halmahera Tengah, Halmahera Timur</td>
                            </tr>
                            <tr>
                                <th>Kabupaten</th>
                                <td>Halmahera Timur, Halmahera Tengah</td>
                            </tr>
                            <tr>
                                <th>Provinsi</th>
                                <td>Maluku Utara</td>
                            </tr>
                            <tr>
                                <th>Komoditas</th>
                                <td>Nikel DMP</td>
                            </tr>
                            <tr>
                                <th>Luas Wilayah (Ha)</th>
                                <td>45,065.00</td>
                            </tr>
                            <tr>
                                <th>Jenis Izin</th>
                                <td>KK</td>
                            </tr>
                            <tr>
                                <th>Jenis Badan Usaha</th>
                                <td>PT</td>
                            </tr>
                            <tr>
                                <th>Nama Perusahaan</th>
                                <td>Weda Bay Nickel</td>
                            </tr>
                            <tr>
                                <th>Pejabat Berwenang</th>
                                <td>Menteri</td>
                            </tr>
                            <tr>
                                <th>Nomor SK</th>
                                <td >
                                    239.K/30/DJB/2019
                                </td>
                            </tr>
                            <tr>
                                <th>Status C&C</th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>Tahapan Kegiatan</th>
                                <td>Operasi Produksi</td>
                            </tr>
                            <tr>
                                <th>Pulau</th>
                                <td>Kepulauan Maluku</td>
                            </tr>
                            <tr>
                                <th>ID Kabupaten</th>
                                <td>06,02</td>
                            </tr>
                            <tr>
                                <th>ID Provinsi</th>
                                <td>82</td>
                            </tr>
                            <tr>
                                <th>Kode Jenis Komoditas</th>
                                <td>12</td>
                            </tr>
                            <tr>
                                <th>Kode Komoditas</th>
                                <td>Mineral Logam</td>
                            </tr>
                            <tr>
                                <th>Kode Wilayah</th>
                                <td>05PK0057</td>
                            </tr>
                            <tr>
                                <th>Single ID</th>
                                <td>1600002122014126</td>
                            </tr>
                            <tr>
                                <th>Tanggal Berlaku SK</th>
                                <td>30 Desember 2019</td>
                            </tr>
                            <tr>
                                <th>Tanggal Berakhir SK</th>
                                <td>27 Februari 2048</td>
                            </tr>
                            <tr>
                                <th>Remark</th>
                                <td>GEN VII</td>
                            </tr>
                        </table>
                    </div>
                `);
                
                setMiningData({
                    "Lokasi Tambang": "Halmahera Tengah, Halmahera Timur",
                    "Kabupaten": "Halmahera Timur, Halmahera Tengah",
                    "Provinsi": "Maluku Utara",
                    "Komoditas": "Nikel DMP",
                    "Luas Wilayah (Ha)": "45,065.00",
                    "Jenis Izin": "KK",
                    "Jenis Badan Usaha": "PT",
                    "Nama Perusahaan": "Weda Bay Nickel",
                    "Pejabat Berwenang": "Menteri",
                    "Nomor SK": "239.K/30/DJB/2019",
                    "Status C&C": "-",
                    "Tahapan Kegiatan": "Operasi Produksi",
                    "Pulau": "Kepulauan Maluku",
                    "ID Kabupaten": "06,02",
                    "ID Provinsi": "82",
                    "Kode Jenis Komoditas": "12",
                    "Kode Komoditas": "Mineral Logam",
                    "Kode Wilayah": "05PK0057",
                    "Single ID": "1600002122014126",
                    "Tanggal Berlaku SK": "30 Desember 2019",
                    "Tanggal Berakhir SK": "27 Februari 2048",
                    "Remark": "GEN VII",
                  });
                  
                setIsNewUpload(true);
            }catch (error){
                console.error("error fetching raster: ", error.message);
            }
        }

        fetchRaster();
    }, []);

    function convertBounds(bounds) {
        if (bounds && bounds._southWest && bounds._northEast) {
            return [
                [bounds._southWest.lat, bounds._southWest.lng],
                [bounds._northEast.lat, bounds._northEast.lng]
            ];
        } else {
            console.error("Invalid bounds object: ", bounds);
            return null;
        }
    }

    useEffect(() => {
        if (mapRef.current && isNewUpload) {
            const map = mapRef.current;
            let combinedBounds = null;

            try {
                if(geojsonData && geojsonData.features && geojsonData.features.length > 0){
                    const geoJsonLayer = L.geoJSON(geojsonData);
                    const geoJsonBounds = geoJsonLayer.getBounds();
                    if (geoJsonBounds.isValid()) {
                        combinedBounds = L.latLngBounds(geoJsonBounds);
                    }else{
                        console.error("GeoJSON bounds are invalid: ", geojsonData);
                    }
                }else {
                    console.warn("No valid geojsonData available");
                }

                if (rasterData && rasterData.length > 0){
                    rasterData.forEach((raster, index) => {
                        if (raster.bounds) {
                            const convertedBounds = convertBounds(raster.bounds);
                            if (convertedBounds) {
                                const rasterBounds = L.latLngBounds(convertedBounds);
                                if (rasterBounds.isValid()) {
                                    combinedBounds = combinedBounds ? combinedBounds.extend(rasterBounds) : rasterBounds;
                                }else {
                                    console.error(`Invalid bounds for raster [${index}]: `, convertedBounds);
                                }
                            }
                        }else {
                            console.warn(`Raster [${index}] missing bounds property:`, raster);
                        }
                    });
                }else {
                    console.warn("No valid rasterData available.");
                }

                if (combinedBounds && combinedBounds.isValid()) {
                    map.fitBounds(combinedBounds, { padding: [20, 20]});
                }else {
                    console.error("Combined bounds are invalid or undefined:", combinedBounds);
                }
            }catch(error){
                console.error("Error fitting bounds:", error);
            }

            setIsNewUpload(true);
        }
    }, [geojsonData, rasterData, bounds, isNewUpload, uploadedFiles]);

    const position = [0.52151, 127.89562];

    return (
        <div className="container" id="map-container">
            <MapContainer
                ref={mapRef}
                center={position}
                zoom={12}
                style={{width: "100%", height: "97vh"}}
                minZoom={3}
                maxBounds={[
                    [-90, -180],
                    [90, 180]
                ]}
            >
                {!hideComponents && (
                    <Menu
                        selectedOption={selectedOption}
                        handleOptionChange={handleOptionChange}
                        isMenuOpen={isMenuOpen}
                        handleMenuToggle={handleMenuToggle}
                        isContinentsVisible={isContinentsVisible}
                        handleToggleContinents={handleToggleContinents}
                        uploadedFiles={uploadedFiles}
                        handleShowFile={handleShowFile}
                        handleRasterFile={handleRasterFile}
                        isContinentsCheckboxEnabled={isContinentsCheckboxEnabled}
                        isUploadCheckboxEnabled={isUploadCheckboxEnabled}
                        handleColumnSelection={handleColumnSelection}
                    />
                )}

                <ToggleLegend onToggle={handleLegendToggle}/>
                <Calculate isOpen={isLegendOpen} area={area} miningData={miningData} />

                
                {/* <Legend isOpen={isLegendOpen} isBits={false}/> */}

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

                {geojsonData && uploadedFiles.map(
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
                    )
                }

                {rasterData && bounds && rasterData.map((raster, index) => {
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
                            togglePopup(); // Toggle both popup and legend visibility
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

                {showPopup && (
                    <PopupComponent
                        data={geojsonData} // Ensure geojsonData is defined and passed correctly
                        onSelectPropertyChange={handleSelectPropertyChange}
                        onTogglePopup={togglePopup}
                    />
                )} 
            </MapContainer>
        </div>
    );
}