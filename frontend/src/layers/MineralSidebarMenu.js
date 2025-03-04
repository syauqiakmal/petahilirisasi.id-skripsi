import React, { useState } from "react";
import "../components/custom.css";

const MineralSidebarMenu = ({isOpen, onMapSelected}) => {
    const [activeMap, setActiveMap] = useState("map1");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const changeMap = (selectMap) => {
        setActiveMap(selectMap);
        onMapSelected(selectMap);
    }

    const activeStyle = {
        backgroundColor: "#efefef",
        fontWeight: "bold",
        padding: "16px",
        borderRadius: "10px"
    }

    const inactiveStyle = (index) => ({
        backgroundColor: hoveredIndex === index ? "#efefef" : "#FFF",
        fontWeight: "normal",
        padding: "16px",
        borderRadius: "10px"
    })

    return (
        <div
            style={{
                position: 'fixed',
                top: '160px',
                right: isOpen ? '20px' : '0px',
                height: 'fit-content',
                maxHeight: 'calc(100% - 40px)',
                width: '240px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 999,
                padding: '20px',
            }}
            >
                <h3>Pilihan Peta</h3>
                <br/>
                <div
                    key={1}
                    style={activeMap === "map1" ? activeStyle : inactiveStyle(1)} 
                    onClick={() => changeMap("map1")}
                    onMouseEnter={() => setHoveredIndex(1)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    >Nikel (Bahodopi, IMIP)</div>
                <br/>
                <div
                    key={2}
                    style={activeMap === "map5" ? activeStyle : inactiveStyle(2)} 
                    onClick={() => changeMap("map5")}
                    onMouseEnter={() => setHoveredIndex(2)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    >Nikel (Weda, IWIP)</div>
                <br/>
                <div 
                    key={3}
                    style={activeMap === "map3" ? activeStyle : inactiveStyle(3)} 
                    onClick={() => changeMap("map3")}
                    onMouseEnter={() => setHoveredIndex(3)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    >Bauksit</div>
                <br/>
                <div 
                    key={4}
                    style={activeMap === "map2" ? activeStyle : inactiveStyle(4)} 
                    onClick={() => changeMap("map2")}
                    onMouseEnter={() => setHoveredIndex(4)}
                    onMouseLeave={() => setHoveredIndex(null)}>Pasir Kuarsa</div>
                <br/>
                {/* <div 
                    key={5}
                    style={activeMap === "map4" ? activeStyle : inactiveStyle(5)} 
                    onClick={() => changeMap("map4")}
                    onMouseEnter={() => setHoveredIndex(5)}
                    onMouseLeave={() => setHoveredIndex(null)}>Bilateral Invesment Treties (BITs)
                </div> */}
        </div>
    );
}

export default MineralSidebarMenu;