import logo from "../Logo/Printer.png";
import { Map } from "../Map/Map_Nikel_Morowali"; // Peta pertama
import { Map as Map2 } from "../Map/Map_Kuarsa_Sarolangun"; // Peta kedua
import { Map as Map3 } from "../Map/Map_Bauksit_Ketapang"; // Peta ketiga
import { Map as Map4 } from "../Map/Map_copy_BIT"; // Peta keempat
import { Map as Map5 } from "../Map/Map_Nikel_Weda"; 

//Mineral sidebar menu
import ToggleMineralMenu from "../layers/ToggleMineralMenu";
import MineralSidebarMenu from "../layers/MineralSidebarMenu";


import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";

export const PrintLayer = ({ activeMap: initialMap }) => {
    const [activeMap, setActiveMap] = useState(initialMap || "map1"); // "map1", "map2", "map3", atau "map4"
    const [hideComponents, setHideComponents] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef();

    const [isMineralMenuOpen, setIsMineralMenuOpen] = useState(false);
    
    const handleMineralToggle = (isOpen) => {
        setIsMineralMenuOpen(isOpen);
    }

    const handleMapSelect = (position) => {
        setActiveMap(position)
    }

    const setMapRef = useCallback((node) => {
        if (node !== null) {
            mapRef.current = node;
        }
    }, []);

    const handleCapture = () => {
        setHideComponents(true);
        setIsLoading(true);

        setTimeout(() => {
            if (mapRef.current === null) {
                return;
            }

            setIsLoading(false);

            setTimeout(() => {
                toPng(mapRef.current)
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.href = dataUrl;
                        link.download = "map.png";
                        link.click();

                        setHideComponents(false);
                    })
                    .catch((error) => {
                        console.error("Oops, something went wrong!", error);
                        setHideComponents(false);
                    });
            }, 100);
        }, 1000);
    };

    return (
        <div>
            <ToggleMineralMenu onToggle={handleMineralToggle}/>
            <MineralSidebarMenu isOpen={isMineralMenuOpen} onMapSelected={handleMapSelect}/>
            
            {/* Tombol untuk mencetak */}
            <button
                style={{
                    position: "absolute",
                    top: "10%",
                    right: "28px",
                    border: "3px solid white",
                    background: "rgba(255, 255, 255)",
                    padding: "20px",
                    borderRadius: "100px",
                    zIndex: 1000,
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "30px",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-out",
                }}
                onClick={handleCapture}
                onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                }}
            ></button>

            <div ref={setMapRef} style={{ position: "relative" }}>
                {/* Render peta berdasarkan state */}
                {activeMap === "map1" && <Map hideComponents={hideComponents} />}
                {activeMap === "map2" && <Map2 hideComponents={hideComponents} />}
                {activeMap === "map3" && <Map3 hideComponents={hideComponents} />}
                {activeMap === "map4" && <Map4 hideComponents={hideComponents} />}
                {activeMap === "map5" && <Map5 hideComponents={hideComponents} />}

                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "rgba(255, 255, 255, 0.8)",
                            padding: "20px",
                            borderRadius: "8px",
                            zIndex: 1000,
                        }}
                    >
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
};
