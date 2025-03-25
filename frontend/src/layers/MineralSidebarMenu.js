// import React, { useState } from "react";
// import "../components/custom.css";

// const MineralSidebarMenu = ({ isOpen, onMapSelected }) => {
//     const [activeMap, setActiveMap] = useState("map1");
//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     const menuItems = [
//         { id: 1, name: "Nikel (Bahodopi, IMIP)", value: "map1" },
//         { id: 2, name: "Nikel (Weda, IWIP)", value: "map5" },
//         { id: 3, name: "Bauksit", value: "map3" },
//         { id: 4, name: "Pasir Kuarsa", value: "map2" },
//     ];

//     const changeMap = (selectedMap) => {
//         setActiveMap(selectedMap);
//         onMapSelected(selectedMap);
//     };

//     const getStyle = (itemId, isActive) => ({
//         backgroundColor: isActive ? "#7bc0e17d" : hoveredIndex === itemId ? "#7bc0e17d" : "#FFF",
//         fontWeight: isActive ? "Bold" : "normal",
//         padding: "16px",
//         borderRadius: "10px",
//         cursor: "pointer",
//         marginBottom: "10px", // Menambahkan jarak antar menu
//     });

//     return (
//         <div
//             style={{
//                 position: 'fixed',
//                 top: '160px',
//                 right: isOpen ? '20px' : '0px',
//                 height: 'fit-content',
//                 maxHeight: 'calc(100% - 40px)',
//                 width: '240px',
//                 borderRadius: '10px',
//                 backgroundColor: "rgba(255, 255, 255, 0.81)",
//                 transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
//                 transition: 'transform 0.3s ease-in-out',
//                 zIndex: 999,
//                 padding: '20px',
//                 display: "flex",
//                 flexDirection: "column" // Supaya elemen tersusun secara vertikal dengan baik
//             }}
//         >
//             <h3>Pilihan Peta</h3>
//             {menuItems.map((item) => (
//                 <div
//                     key={item.id}
//                     style={getStyle(item.id, activeMap === item.value)}
//                     onClick={() => changeMap(item.value)}
//                     onMouseEnter={() => setHoveredIndex(item.id)}
//                     onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                     {item.name}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MineralSidebarMenu;

import React, { useState } from "react";
import "../components/custom.css";

const MineralSidebarMenu = ({ isOpen, onMapSelected }) => {
    const [activeMap, setActiveMap] = useState("map1");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const menuItems = [
        { id: 1, name: "Nickel (Bahodopi, IMIP)", value: "map1" },
        { id: 2, name: "Nickel (Weda, IWIP)", value: "map5" },
        { id: 3, name: "Bauxite", value: "map3" },
        { id: 4, name: "Quartz Sand", value: "map2" },
    ];

    const changeMap = (selectedMap) => {
        setActiveMap(selectedMap);
        onMapSelected(selectedMap);
    };

    const getStyle = (itemId, isActive) => ({
        backgroundColor: isActive ? "#7bc0e17d" : hoveredIndex === itemId ? "#7bc0e17d" : "#FFF",
        fontWeight: isActive ? "Bold" : "normal",
        padding: "16px",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "10px", // Menambahkan jarak antar menu
    });

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
                backgroundColor: "rgba(255, 255, 255, 0.81)",
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 999,
                padding: '20px',
                display: "flex",
                flexDirection: "column" // Supaya elemen tersusun secara vertikal dengan baik
            }}
        >
            <h3>Map Selection</h3>
            {menuItems.map((item) => (
                <div
                    key={item.id}
                    style={getStyle(item.id, activeMap === item.value)}
                    onClick={() => changeMap(item.value)}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default MineralSidebarMenu;
