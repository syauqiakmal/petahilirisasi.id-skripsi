import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faThList, faChevronLeft, faChevronRight, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const ToggleLegend = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1190  });

    const handleClick = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: "absolute",
                bottom: isMobile ? "60px" : isTablet ? "10px" : "10px",
                left: isMobile ? "10px" : isTablet ? "300px" : "300px",
                zIndex: 1000,
                backgroundColor: "#fff",
                height: "fit-content",
                width: isMobile ? "auto" : "fit-content",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                padding: isMobile ? "8px" : "10px",
                display: "flex",
                alignItems: "center"
            }}
        >
            
            <FontAwesomeIcon icon={faThList} style={{ margin: "0 10px" }} />
            <span style={{ flexGrow: 1, fontSize: isMobile ? "12px" : "14px" }}>Data & Analysis</span>
            <FontAwesomeIcon icon={isOpen ? faChevronCircleRight : faChevronRight} style={{ margin: "10px" }} />
        </div>
    );
};

export default ToggleLegend;
