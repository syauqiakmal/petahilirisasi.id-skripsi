import React from 'react';

const Legend = ({isOpen, isBits}) => {
    const legendItems = [
        { color: 'linear-gradient(to right, #59955A, #0C550B)', label: 'Tutupan Vegetasi' },
        { color: 'linear-gradient(to right, #1862E6, #0108BB)', label: 'Tubuh Air' },
        { color: 'linear-gradient(to right, #FD272B, #FD272B)', label: 'Lahan Terbuka' },
        { color: 'linear-gradient(to right, #FF904D, #FF904D)', label: 'Lahan Kebun' },
        { color: 'linear-gradient(to right, #5DE1E6, #5DE1E6)', label: 'Daerah Terbangun' },
        { color: 'linear-gradient(to right, #518E52, #518E52)', label: 'Lahan Restorasi' },
    ];

    const legendBitsItem = [
        { color: 'linear-gradient(to right, #528F53, #528F53)', label: 'In Force' },
        { color: 'linear-gradient(to right, #F8914C, #F8914C)', label: 'Signed' },
        { color: 'linear-gradient(to right, #F5282D, #F5282D)', label: 'Terminated' },
    ]

    const data = isBits === 1 ? legendBitsItem : legendItems;

    return (
        <div style={{
            position: 'fixed',
            bottom: isOpen ? '120px' : '-250px',
            left: '28px',
            height: 'fit-content',
            maxHeight: 'calc(60% - 2px)',
            width: '250px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            // transition: 'bottom 0.3s ease-in-out',
            zIndex: 999,
            padding: '10px',
        }}>
            <h3 style={{color:'#08709d'}}>Tutupan Lahan Kawasan Hilirisasi</h3>
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px'}}>
                {data.map((item, index) => (
                    <li key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                        <div
                            style={{
                                width: '120px',
                                height: '20px',
                                background: item.color,
                                marginRight: '10px',
                                borderRadius: '5px'
                            }}></div>
                        <span><b>{item.label}</b></span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Legend;