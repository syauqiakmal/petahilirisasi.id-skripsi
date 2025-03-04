import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ToggleMineralMenu = ({onToggle}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    }
    
    return (
        <button
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            onClick={handleClick}
            style={{
                position: 'absolute',
                top: '150px',
                right: isOpen ? '310px' : '28px',
                zIndex: 1000,
                backgroundColor: '#fff',
                height: '48px',
                width: '48px',
                border: 'none',
                borderRadius: '50%',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                padding: '10px',
            }}
        >
            <FontAwesomeIcon icon={isOpen ? faChevronRight : faChevronLeft} size="lg" />
        </button>
    );
}

export default ToggleMineralMenu;