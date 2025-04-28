// import React from "react";
// import { useMediaQuery } from "react-responsive";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";


// const Calculate = ({ isOpen, area, miningData }) => {
//   const isMobile = useMediaQuery({ maxWidth: 768 });
//   const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1190 });

//   const legendData = [
//     { name: "Tutupan Vegetasi", color: "#59955A", area: (area?.["Tutupan Vegetasi"] || 0) / 10000 },
//     { name: "Tubuh Air", color: "#1862E6", area: (area?.["Tubuh Air"] || 0) / 10000 },
//     { name: "Lahan Terbuka", color: "#FD272B", area: (area?.["Lahan Terbuka"] || 0) / 10000 },
//     { name: "Lahan Kebun", color: "#FF904D", area: (area?.["Lahan Kebun"] || 0) / 10000 },
//     { name: "Daerah Terbangun", color: "#5DE1E6", area: (area?.["Daerah Terbangun"] || 0) / 10000 },
//     { name: "Lahan Restorasi", color: "#518E52", area: (area?.["Lahan Restorasi"] || 0) / 10000 },
//   ];


//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Judul laporan
//     doc.text("Laporan Analisis Tutupan Lahan", 14, 10);

//     // Tabel Tutupan Lahan
//     autoTable(doc, {
//       startY: 20,
//       head: [["Kategori", "Luas Area (ha)"]],
//       body: legendData.map((item) => [item.name, item.area.toLocaleString()]),
//     });

//     // Ambil posisi Y setelah tabel pertama
//     const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30;

//     // Judul Informasi Smalter
//     doc.text("Informasi Smalter", 14, finalY);

//     // Tabel Informasi Smalter
//     autoTable(doc, {
//       startY: finalY + 10,
//       head: [["Parameter", "Nilai"]],
//       body: miningData ? Object.entries(miningData).map(([key, value]) => [key, value]) : [["-", "-"]],
//     });

//     // Simpan file PDF
//     doc.save("Laporan_Analisis.pdf");
//   };



//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: isOpen ? "30px" : "-500px",
//         right: isMobile ? "100px" : isTablet ? "100px" : "600px",
//         width: isMobile ? "70%" : isTablet ? "70%" : "490px",
//         backgroundColor: "rgba(255, 255, 255, 0.15)",
//         borderRadius: "10px",
//         padding: "10px",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//         zIndex: 999,
//         transition: "bottom 0.3s ease-in-out",
//         backdropFilter: "blur(1px)",
//         maxHeight: "350px",
//         overflowY: "auto",
//         scrollbarWidth: "thin",
//         scrollbarColor: "#08709d rgba(255, 255, 255, 0.3)"
//       }}
//     >
//       <h3 style={{ color: "black", textAlign: "center", marginBottom: "10px" }}>
//         Tutupan Lahan Kawasan Hilirisasi
//       </h3>





//       <h4 style={{ textAlign: "center", margin: "10px 0" }}>Luas Area (ha)</h4>
//       <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(1px)" }}>
//         <thead>
//           <tr style={{ background: "#08709d", color: "white", textAlign: "left" }}>
//             <th style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>Kategori</th>
//             <th style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>Luas</th>
//           </tr>
//         </thead>
//         <tbody>
//           {legendData.map((item, index) => (
//             <tr key={index} style={{ background: index % 2 === 0 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)" }}>
//               <td style={{ padding: "10px", display: "flex", alignItems: "center", fontWeight: "500", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>
//                 <span style={{ display: "inline-block", width: "14px", height: "14px", backgroundColor: item.color, marginRight: "10px", borderRadius: "4px" }}></span>
//                 {item.name}
//               </td>
//               <td style={{ padding: "10px", fontWeight: "500", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>{item.area.toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>

        
//       <ResponsiveContainer width="100%" height={250}>
//   <BarChart 
//     data={legendData} 
//     margin={{ top: 20, right: 30, left: 20, bottom: 50 }} 
//   >
//     <XAxis 
//       dataKey="name" 
//       tick={{ fill: "black" }} 
//       angle={-30} 
//       textAnchor="end"
//     />
//     <YAxis 
//       tick={{ fill: "black" }} 
//       scale="log" // Gunakan skala logaritmik agar lebih proporsional
//       domain={[Math.max(1, Math.min(...legendData.map(item => item.area))), Math.max(...legendData.map(item => item.area))]} 
//       allowDataOverflow={true}
//     />
//     <Tooltip />
//     <Bar dataKey="area" fill="#08709d" barSize={40} /> 
//   </BarChart>
// </ResponsiveContainer>
//       </table>
//       <h4 style={{ textAlign: "center", margin: "20px 0 10px 0" }}>Informasi Smalter</h4>
//       <p style={{ textAlign: "center" }}>
//         <a href="https://geoportal.esdm.go.id/minerba/" target="_blank" rel="noopener noreferrer">
//           Referensi website Geoportal ESDM Minerba
//         </a>
//       </p>
//       <div style={{ maxHeight: "200px", overflowY: "auto", backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "10px", borderRadius: "8px" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <tbody>
//             {miningData && Object.entries(miningData).map(([key, value], index) => (
//               <tr key={index} style={{ background: index % 2 === 0 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)" }}>
//                 <th style={{ padding: "10px", textAlign: "left" , backgroundColor: "rgba(255, 255, 255, 0.15)",}}>{key}</th>
//                 <td style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>{value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button onClick={generatePDF} style={{ width: "100%", padding: "10px", background: "#08709d", color: "white", border: "none", borderRadius: "5px", marginTop: "10px", cursor: "pointer" }}>
//         Download Hasil Analisis
//       </button>
//     </div>
//   );
// };

// export default Calculate;


import React from "react";
import { useMediaQuery } from "react-responsive";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const Calculate = ({ isOpen, area, miningData }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1190 });

  const legendData = [
    { 
      name: "Vegetation Cover", 
      color: "#4CAF50", 
      area: Math.round((area?.["Tutupan Vegetasi"] || 0) / 10000)
    },
    { 
      name: "Water Bodies", 
      color: "#1E88E5", 
      area: Math.round((area?.["Tubuh Air"] || 0) / 10000)
    },
    { 
      name: "Short Vegetation after Tree Cover Loss", 
      color: "#E53935", 
      area: Math.round((area?.["Lahan Terbuka"] || 0) / 10000)
    },
    { 
      name: "Cropland Gain within Wetlands", 
      color: "#FB8C00", 
      area: Math.round((area?.["Lahan Kebun"] || 0) / 10000)
    },
    { 
      name: "Built-Up Area", 
      color: "#26C6DA", 
      area: Math.round((area?.["Daerah Terbangun"] || 0) / 10000)
    },
    { 
      name: "Short Vegetation Gain From Cropland Loss", 
      color: "#388E3C", 
      area: Math.round((area?.["Lahan Restorasi"] || 0) / 10000)
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    // Judul laporan
    doc.text("Land Cover Analysis Report", 14, 10);

    // Tabel Tutupan Lahan
    autoTable(doc, {
      startY: 20,
      head: [["Category", "Area (ha)"]],
      body: legendData.map((item) => [item.name, item.area.toLocaleString()]),
    });

    // Ambil posisi Y setelah tabel pertama
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30;

    // Judul Informasi Smalter
    doc.text("Smelter Information", 14, finalY);

    // Tabel Informasi Smalter
    autoTable(doc, {
      startY: finalY + 10,
      head: [["Parameter", "Value"]],
      body: miningData ? Object.entries(miningData).map(([key, value]) => [key, value]) : [["-", "-"]],
    });

    // Simpan file PDF
    doc.save("Land_Cover_Analysis_Report.pdf");
  };



  return (
    <div
      style={{
        position: "fixed",
        bottom: isOpen ? "30px" : "-500px",
        right: isMobile ? "100px" : isTablet ? "100px" : "600px",
        width: isMobile ? "70%" : isTablet ? "70%" : "490px",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 999,
        transition: "bottom 0.3s ease-in-out",
        backdropFilter: "blur(1px)",
        maxHeight: "350px",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#08709d rgba(255, 255, 255, 0.3)"
      }}
    >
      <h3 style={{ color: "black", textAlign: "center", marginBottom: "10px" }}>
        Land Cover of Downstream Area
      </h3>





      <h4 style={{ textAlign: "center", margin: "10px 0" }}>Area Size (ha)</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(1px)" }}>
        <thead>
          <tr style={{ background: "#08709d", color: "white", textAlign: "left" }}>
            <th style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>Category</th>
            <th style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>Area (ha)</th>
          </tr>
        </thead>
        <tbody>
          {legendData.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)" }}>
              <td style={{ padding: "10px", display: "flex", alignItems: "center", fontWeight: "500", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>
                <span style={{ display: "inline-block", width: "14px", height: "14px", backgroundColor: item.color, marginRight: "10px", borderRadius: "4px" }}></span>
                {item.name}
              </td>
              <td style={{ padding: "10px", fontWeight: "500", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>{item.area.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

        
      <ResponsiveContainer width="100%" height={250}>
  <BarChart 
    data={legendData} 
    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} 
  >
    <XAxis 
      dataKey="name" 
      tick={{ fill: "black" }} 
      angle={-30} 
      textAnchor="end"
    />
    <YAxis 
      tick={{ fill: "black" }} 
      scale="log" // Gunakan skala logaritmik agar lebih proporsional
      domain={[Math.max(1, Math.min(...legendData.map(item => item.area))), Math.max(...legendData.map(item => item.area))]} 
      allowDataOverflow={true}
    />
    <Tooltip />
    <Bar dataKey="area" fill="#08709d" barSize={40} /> 
  </BarChart>
</ResponsiveContainer>
      </table>
      <h4 style={{ textAlign: "center", margin: "20px 0 10px 0" }}>Smelter Information</h4>
      <p style={{ textAlign: "center" }}>
        <a href="https://geoportal.esdm.go.id/minerba/" target="_blank" rel="noopener noreferrer">
        Geoportal ESDM Minerba Reference Website
        </a>
      </p>
      <div style={{ maxHeight: "200px", overflowY: "auto", backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "10px", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {miningData && Object.entries(miningData).map(([key, value], index) => (
              <tr key={index} style={{ background: index % 2 === 0 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)" }}>
                <th style={{ padding: "10px", textAlign: "left" , backgroundColor: "rgba(255, 255, 255, 0.15)",}}>{key}</th>
                <td style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.15)", }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={generatePDF} style={{ width: "100%", padding: "10px", background: "#08709d", color: "white", border: "none", borderRadius: "5px", marginTop: "10px", cursor: "pointer" }}>
      Download Analysis Report
      </button>
    </div>
  );
};

export default Calculate;

