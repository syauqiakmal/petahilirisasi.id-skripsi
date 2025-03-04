import React, { useState } from 'react';
import './Tabs.css';

import NickelMap from '../assets/Nikel-Map.png';
import BauxiteMap from '../assets/Bauksit-Map.png';
import KuarsaMap from '../assets/Kuarsa-Map.png';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Nikel');

  const tabs = [
    { id: 'Nikel', label: 'Nikel' },
    { id: 'Bauksit', label: 'Bauksit' },
    { id: 'Kobalt', label: 'Kobalt' },
    { id: 'PasirKwarsa', label: 'Pasir Kuarsa' },
  ];

  const content = {
    Nikel: {
      SosialMedia: 'Peningkatan kesadaran tentang manfaat nikel dalam teknologi baterai dan kendaraan listrik sering menjadi fokus kampanye media sosial...',
      Penelitian: 'Indonesia telah mengambil langkah progresif dalam hilirisasi nikel melalui larangan ekspor bijih mentah sejak Januari 2020. Kebijakan ini bertujuan untuk meningkatkan nilai tambah produk melalui pemrosesan domestik, seperti produksi bahan baku untuk baterai kendaraan listrik (EV). Hasilnya, Indonesia berhasil menarik investasi besar dari mitra internasional, termasuk Tiongkok, yang berkontribusi pada pembangunan fasilitas modern seperti Indonesia Morowali Industrial Park.<br><br>Langkah ini memperkuat posisi Indonesia di pasar nikel global dan memberikan dampak positif bagi pertumbuhan ekonomi nasional. Kebijakan ini juga mencerminkan visi besar pemerintah untuk mendorong kemandirian ekonomi dengan memanfaatkan potensi sumber daya secara optimal. Meski mendapat tantangan internasional, seperti sengketa di WTO, pemerintah tetap konsisten dalam menjalankan kebijakan ini demi kepentingan jangka panjang bangsa. ',
      ReferensiPenelitian: 'Santoso, R. B., Dermawan, W., & Moenardy, D. F. (2024). Cogent Social Sciences. DOI: 10.1080/23311886.2024.2400222.',
      PerubahanLingkungan: 'Perubahan Tutupan Lahan Area Smelting Plant Nikel di Kab. Luwu Timur, Sulawesi Selatan (2000 - 2020). Kapasitas Input : 8,000,000 (ton/th) dan Kapasitas Output: 80,000 (ton/th).',
      ReferensiPerubahanLingkungan: 'https://geoportal.esdm.go.id/minerba/ dan pengolahan data citra satelit Sentinel-2A',
      image: NickelMap,
      label: 'Nikel',
      direct:'https://ee-fabiansuryap.projects.earthengine.app/view/hilirisasi-nikel'
    },
    Bauksit: {
      SosialMedia: 'Kampanye media sosial tentang bauksit sering kali berfokus pada penggunaannya dalam industri aluminium...',
      Penelitian: 'Hilirisasi bauksit merupakan salah satu wujud nyata keberhasilan pemerintah dalam mengelola sumber daya mineral. Dengan memprioritaskan pemrosesan bauksit di dalam negeri, Indonesia telah menciptakan ekosistem industri yang mampu menghasilkan alumina berkualitas tinggi. Daerah seperti Kalimantan Barat, yang memiliki cadangan bauksit terbesar di Indonesia, kini menjadi pusat pengembangan industri ini.<br><br>Dampaknya tidak hanya pada peningkatan nilai ekspor, tetapi juga pada pertumbuhan ekonomi lokal, penciptaan lapangan kerja, dan penguatan perekonomian daerah. Pemerintah telah membuktikan komitmennya dalam membangun infrastruktur dan memberikan insentif untuk mendukung industri pemrosesan mineral, menjadikan Indonesia sebagai pemain penting di pasar alumina global. ',
      ReferensiPenelitian: 'Krustiyati, A., & Gea, G. V. V. (2023). Sriwijaya Law Review. DOI: 10.28946/slrev.Vol7.Iss2.2734.pp335-349.',
      PerubahanLingkungan: 'Perubahan Tutupan Lahan Area Smelting Plant Bauksit di Kab. Sanggau, Kalimantan Barat (2000 - 2020). Kapasitas Input : 1,000,000 (ton/th) dan Kapasitas Output: 300,000 (ton/th).',
      ReferensiPerubahanLingkungan: 'https://geoportal.esdm.go.id/minerba/ dan pengolahan data citra satelit Sentinel-2A',
      image: BauxiteMap,
      label: 'Bauksit',
      direct: 'https://ee-fabiansuryap.projects.earthengine.app/view/hilirisasi-bauksit'
    },
    Kobalt: {
      SosialMedia: 'Dalam media sosial, kobalt sering digambarkan sebagai bahan penting untuk revolusi kendaraan listrik...',
      Penelitian: 'Indonesia terus menunjukkan komitmennya dalam pengembangan hilirisasi mineral dengan memperluas fokus pada kobalt, mineral yang penting untuk produksi baterai EV. Pemrosesan domestik kobalt memberikan nilai tambah signifikan pada ekspor dan memperkuat posisi Indonesia sebagai salah satu negara utama dalam rantai pasok global. <br><br>Kebijakan ini juga mendorong investasi dalam teknologi dan infrastruktur, yang memberikan dampak positif bagi pertumbuhan industri dalam negeri. Dengan strategi yang terintegrasi, pemerintah terus mengembangkan potensi kobalt untuk mendukung transisi energi global dan memperkuat perekonomian nasional. ',
      ReferensiPenelitian:'Marwanto et al. (2024). Jurnal IUS Kajian Hukum dan Keadilan. DOI: 10.29303/ius.v12i2.1381. ',
      PerubahanLingkungan: 'Pertambangan kobalt dapat menyebabkan pencemaran tanah dan air...',
      label: 'Kobalt'
    },
    PasirKwarsa: {
      SosialMedia: 'Pasir kwarsa menjadi sorotan dalam media sosial terkait penggunaannya dalam pembuatan kaca dan semikonduktor...',
      Penelitian: 'Kuarsa, sebagai salah satu mineral strategis, kini menjadi bagian penting dalam kebijakan hilirisasi Indonesia. Pemerintah mendorong pemrosesan domestik kuarsa untuk mendukung industri kaca, keramik, dan teknologi lainnya. Langkah ini menciptakan peluang baru bagi investasi, memperluas kapasitas industri nasional, dan meningkatkan daya saing produk Indonesia di pasar global.<br><br>Kebijakan ini juga memberikan manfaat besar bagi perekonomian dengan meningkatkan pendapatan dari ekspor bernilai tambah dan menciptakan lapangan kerja baru. Pemerintah terus berupaya memperkuat infrastruktur dan teknologi untuk memastikan keberhasilan strategi hilirisasi kuarsa.',
      ReferensiPenelitian:'Simbolon, P. G. M., Yusro, M. A., & Taniady, V. (2024). Lentera Hukum. DOI: 10.19184/ejlh.v11i2.43342. ',
      PerubahanLingkungan: 'Penambangan pasir kwarsa sering berdampak pada erosi tanah dan degradasi sungai...',
      image: KuarsaMap,
      label: 'Pasir Kuarsa'
    },
  };

  return (
    <div className="tabs-container">
      <div className="tabs-sidebar">
        <p className="tabs-intro">
          Informasi detail terkait potensi sumber daya seperti Nikel, Bauksit, Kobalt, dan Pasir Kuarsa.
        </p>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {activeTab === tab.id && (
              <div
                className="tab-image"
                style={{
                  backgroundImage: `url(${tab.backgroundImage})`,
                }}
              ></div>
            )}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tabs-content">
        <h2>{content[activeTab].label}</h2>
        <div>
        <h3>Sosial Media</h3>
          <p dangerouslySetInnerHTML={{ __html: content[activeTab].SosialMedia }} />
          <h3>Penelitian dan Riset</h3>
          <p dangerouslySetInnerHTML={{ __html: content[activeTab].Penelitian }} />
          <div className="referensi">
            <h4>Referensi</h4>
            <p id="ref" className="ref-penelitian"dangerouslySetInnerHTML={{ __html: content[activeTab].ReferensiPenelitian }}/>
          </div>
          <h3>Perubahan Lingkungan</h3>
          <p dangerouslySetInnerHTML={{ __html: content[activeTab].PerubahanLingkungan }} />
          <img
            src={content[activeTab].image}
            alt={content[activeTab].activeTab}
            id="tabs-image"
          />
          <div className="referensi">
            <h4>Referensi</h4>
            <p id="ref" dangerouslySetInnerHTML={{ __html: content[activeTab].ReferensiPerubahanLingkungan }} />
          </div>
        </div>

          <a href={content[activeTab].direct} className="visit-map-button" id="visit-map-button">
              Visit Map
          </a>
      </div>
    </div>
  );
};

export default Tabs;