import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faThList} from "@fortawesome/free-solid-svg-icons";

const ToggleLegend = ({onToggle}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    }

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'absolute',
                bottom: '50px',
                left: '20px',
                zIndex: 1000,
                backgroundColor: '#fff',
                height: 'fit-content',
                width: 'fit-content',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                padding: '10px'
                
            }}
        >
            <FontAwesomeIcon icon={isOpen ?  faChevronDown : faChevronUp} />
            <FontAwesomeIcon icon={faThList} style={{ marginRight: '10px', marginLeft: '10px'}}/>
            <span style={{flexGrow: 1}}>Legend</span>
        </div>
    )
}

export default ToggleLegend;