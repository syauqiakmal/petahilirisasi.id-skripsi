import React, { useState } from 'react';
import './Tab.css';
import Chart from '../Chart/Chart';

import NickelMap from '../assets/Nikel-Map.png';
import BauxiteMap from '../assets/Bauksit-Map.png';
import KuarsaMap from '../assets/Kuarsa-Map.png';

const Tab = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeTab, setActiveTab] = useState('Hilirisasi');
  const [submenuVisible, setSubmenuVisible] = useState('BarangTambang');
  const [tabTransition, setTabTransition] = useState(false);

  const tabs = [
    {
      id: 'Hilirisasi',
      label: 'Hilirisasi',
      submenu: null,
    },
    {
      id: 'BarangTambang',
      label: 'Barang Tambang',
      submenu: [
        { id: 'Nikel', label: 'Nikel' },
        { id: 'Bauksit', label: 'Bauksit' },
        { id: 'Kobalt', label: 'Kobalt' },
        { id: 'PasirKwarsa', label: 'Pasir Kuarsa' },
      ],
    },
  ];

  const content = {
    Hilirisasi: {
        title: 'Hilirisasi',
        description: '<h3>Dampak Positif Hilirisasi pada Rantai Nilai Global (GVC)</h3>Kebijakan hilirisasi mineral Indonesia telah memberikan dampak positif yang signifikan dalam memperkuat posisi negara di Rantai Nilai Global (GVC). Dengan mendorong pemrosesan domestik dan melarang ekspor bahan mentah, Indonesia berhasil menambah nilai produk mineral sebelum diekspor. Kebijakan ini memperkuat daya saing Indonesia di pasar global dan menempatkan negara sebagai pemain kunci dalam perdagangan internasional.<br><br>Langkah ini juga meningkatkan daya tarik investasi asing, yang mendukung pembangunan industri domestik dan menciptakan lapangan kerja. Pemerintah secara konsisten mengembangkan kebijakan yang berpihak pada pembangunan berkelanjutan, memastikan bahwa pertumbuhan ekonomi dapat berjalan seiring dengan perlindungan lingkungan.<br><br><h4>Referensi</h4><p id="ref">Camba, A., Lim, G., & Gallagher, K. (2022). Leading sector and dual economy: how Indonesia and Malaysia mobilised Chinese capital in mineral processing. Third World Quarterly, 43(10), 2375–2395. doi:10.1080/01436597.2022.2093180</p><h3>Kemitraan Internasional</h3>Pemerintah Indonesia berhasil membangun kemitraan strategis dengan berbagai negara untuk mendukung kebijakan hilirisasi. Tiongkok, misalnya, menjadi mitra utama dalam investasi pembangunan smelter dan fasilitas pengolahan mineral. Kolaborasi ini tidak hanya memperkuat hubungan ekonomi bilateral tetapi juga meningkatkan kapasitas pengolahan domestik Indonesia.<br><br>Di sisi lain, tantangan seperti gugatan Uni Eropa di WTO direspons dengan strategi yang mengedepankan kedaulatan nasional atas sumber daya alam. Hal ini menunjukkan komitmen pemerintah dalam melindungi kepentingan nasional sekaligus memperkuat posisi Indonesia dalam diplomasi internasional.<br><br><h4>Referensi</h4><p id="ref">Simbolon, P. G. M., Yusro, M. A., & Taniady, V. (2024). Permanent Sovereignty vs. International Obligations. Lentera Hukum, 11(2), 189. doi:10.19184/ejlh.v11i2.43342</p><h3>Tantangan dan Solusi</h3>Meskipun kebijakan hilirisasi memerlukan upaya besar dalam implementasinya, pemerintah telah menunjukkan kemampuan untuk mengatasi tantangan dengan langkah-langkah strategis. Peningkatan infrastruktur, penguatan teknologi pemrosesan, dan penerapan standar keberlanjutan menjadi fokus utama untuk mendukung keberhasilan hilirisasi.<br><br>Dengan dukungan penuh dari pemerintah, sektor hilirisasi mineral tidak hanya membawa manfaat ekonomi tetapi juga memperkuat kedaulatan Indonesia dalam mengelola sumber daya alam. Hal ini menjadi bukti nyata bahwa kebijakan hilirisasi merupakan langkah progresif yang memberikan dampak positif bagi perekonomian nasional dan kesejahteraan masyarakat.<br><br><h4>Referensi</h4><p id="ref">Krustiyati, A., & Gea, G. V. V. (2023). The paradox of downstream mining industry development in Indonesia: Analysis and challenges. Sriwijaya Law Review, 7(2), 335. doi:10.28946/slrev.vol7.iss2.2734.pp335-349</p>'
    },
    BarangTambang: {
        title: 'Barang Tambang: Mendukung Hilirisasi dengan Teknologi dan Data',
        description: '<br>Hilirisasi bahan tambang seperti nikel, kobalt, bauksit, dan pasir kuarsa merupakan langkah strategis dalam mendukung pembangunan ekonomi berkelanjutan di Indonesia. Dengan memanfaatkan mahadata (big data) dan kecerdasan buatan (AI), berbagai inovasi kini dapat diterapkan untuk meningkatkan efisiensi, produktivitas, dan nilai tambah dari pengelolaan sumber daya mineral ini.<br><br>Melalui analisis data yang terintegrasi, proses hilirisasi dapat lebih terarah, mulai dari prediksi permintaan pasar global hingga optimalisasi proses produksi. Teknologi ini juga berperan penting dalam memastikan keberlanjutan lingkungan, seperti pengurangan limbah dan pemanfaatan sumber daya yang lebih efisien.<br><br>Dalam konteks pembangunan nasional, pemanfaatan AI dan mahadata juga mendukung terciptanya kebijakan yang berbasis bukti. Hal ini tidak hanya memperkuat daya saing Indonesia di pasar global, tetapi juga mendorong pengelolaan sumber daya yang bertanggung jawab dan inklusif.Komitmen kami adalah menjadikan bahan tambang Indonesia sebagai penggerak utama ekonomi masa depan.'
    },
    Nikel: {
        SosialMedia: 'Berikut merupakan grafik hasil analisis sentimen pada beberapa media terkait hilirisasi nikel di Indonesia. Media yang kami analasis adalah news/blogs, website, twitter, YouTube dan reddit. Grafik tersebut menampilkan persentase sentimen netral, positif dan negatif. Data yang kami kumpulkan adalah data unggahan media dari tahun 2020 sampai saat ini. Grafik ini juga dilengkapi sumber data yang paling banyak dikunjungi',
        Penelitian: 'Indonesia telah mengambil langkah progresif dalam hilirisasi nikel melalui larangan ekspor bijih mentah sejak Januari 2020. Kebijakan ini bertujuan untuk meningkatkan nilai tambah produk melalui pemrosesan domestik, seperti produksi bahan baku untuk baterai kendaraan listrik (EV). Hasilnya, Indonesia berhasil menarik investasi besar dari mitra internasional, termasuk Tiongkok, yang berkontribusi pada pembangunan fasilitas modern seperti Indonesia Morowali Industrial Park.<br><br>Langkah ini memperkuat posisi Indonesia di pasar nikel global dan memberikan dampak positif bagi pertumbuhan ekonomi nasional. Kebijakan ini juga mencerminkan visi besar pemerintah untuk mendorong kemandirian ekonomi dengan memanfaatkan potensi sumber daya secara optimal. Meski mendapat tantangan internasional, seperti sengketa di WTO, pemerintah tetap konsisten dalam menjalankan kebijakan ini demi kepentingan jangka panjang bangsa. ',
        ReferensiPenelitian: 'Santoso, R. B., Dermawan, W., & Moenardy, D. F. (2024). Indonesia’s rational choice in the nickel ore export ban policy. Cogent Social Sciences, 10(1). doi:10.1080/23311886.2024.2400222',
        PerubahanLingkungan: 'Perubahan Tutupan Lahan Area Smelting Plant Nikel di Kab. Luwu Timur, Sulawesi Selatan (2000 - 2020). Kapasitas Input : 8,000,000 (ton/th) dan Kapasitas Output: 80,000 (ton/th).',
        ReferensiPerubahanLingkungan: 'https://geoportal.esdm.go.id/minerba/ dan pengolahan data citra satelit Sentinel-2A',
        image: NickelMap,
        label: 'Nikel',
        direct: "/mahadata-dan-kecerdasan-buatan/map/Nikel",
        sentimentApiUrl: "https://api.awario.com/v1.0/alerts/100058460/insights/total/sentiment?access_token=KTOdiuA6BzXcY0Z0&date_from=2020-01-01",
        apiUrl: "https://api.awario.com/v1.0/alerts/100058460/mentions?access_token=KTOdiuA6BzXcY0Z0&sort_by=reach&sort_order=desc&limit=6"
      },
      Bauksit: {
        SosialMedia: 'Berikut merupakan grafik hasil analisis sentimen pada beberapa media terkait hilirisasi bauksit di Indonesia. Media yang kami analasis adalah news/blogs, website, twitter, YouTube dan reddit. Grafik tersebut menampilkan persentase sentimen netral, positif dan negatif. Data yang kami kumpulkan adalah data unggahan media dari tahun 2020 sampai saat ini. Grafik ini juga dilengkapi sumber data yang paling banyak dikunjungi',
        Penelitian: 'Hilirisasi bauksit merupakan salah satu wujud nyata keberhasilan pemerintah dalam mengelola sumber daya mineral. Dengan memprioritaskan pemrosesan bauksit di dalam negeri, Indonesia telah menciptakan ekosistem industri yang mampu menghasilkan alumina berkualitas tinggi. Daerah seperti Kalimantan Barat, yang memiliki cadangan bauksit terbesar di Indonesia, kini menjadi pusat pengembangan industri ini.<br><br>Dampaknya tidak hanya pada peningkatan nilai ekspor, tetapi juga pada pertumbuhan ekonomi lokal, penciptaan lapangan kerja, dan penguatan perekonomian daerah. Pemerintah telah membuktikan komitmennya dalam membangun infrastruktur dan memberikan insentif untuk mendukung industri pemrosesan mineral, menjadikan Indonesia sebagai pemain penting di pasar alumina global. ',
        ReferensiPenelitian: 'Krustiyati, A., & Gea, G. V. V. (2023). The paradox of downstream mining industry development in Indonesia: Analysis and challenges. Sriwijaya Law Review, 7(2), 335. doi:10.28946/slrev.vol7.iss2.2734.pp335-349',
        PerubahanLingkungan: 'Perubahan Tutupan Lahan Area Smelting Plant Bauksit di Kab. Sanggau, Kalimantan Barat (2000 - 2020). Kapasitas Input : 1,000,000 (ton/th) dan Kapasitas Output: 300,000 (ton/th).',
        ReferensiPerubahanLingkungan: 'https://geoportal.esdm.go.id/minerba/ dan pengolahan data citra satelit Sentinel-2A',
        image: BauxiteMap,
        label: 'Bauksit',
        direct:"/mahadata-dan-kecerdasan-buatan/map/Bauksit",
        sentimentApiUrl:"https://api.awario.com/v1.0/alerts/100058462/insights/total/sentiment?access_token=KTOdiuA6BzXcY0Z0&date_from=2020-01-01",
        apiUrl:"https://api.awario.com/v1.0/alerts/100058462/mentions?access_token=KTOdiuA6BzXcY0Z0&sort_by=reach&sort_order=desc&limit=6"
      },
      Kobalt: {
        SosialMedia: 'Berikut merupakan grafik hasil analisis sentimen pada beberapa media terkait hilirisasi kobalt di Indonesia. Media yang kami analasis adalah news/blogs, website, twitter, YouTube dan reddit. Grafik tersebut menampilkan persentase sentimen netral, positif dan negatif. Data yang kami kumpulkan adalah data unggahan media dari tahun 2020 sampai saat ini. Grafik ini juga dilengkapi sumber data yang paling banyak dikunjungi',
        Penelitian: 'Indonesia terus menunjukkan komitmennya dalam pengembangan hilirisasi mineral dengan memperluas fokus pada kobalt, mineral yang penting untuk produksi baterai EV. Pemrosesan domestik kobalt memberikan nilai tambah signifikan pada ekspor dan memperkuat posisi Indonesia sebagai salah satu negara utama dalam rantai pasok global. <br><br>Kebijakan ini juga mendorong investasi dalam teknologi dan infrastruktur, yang memberikan dampak positif bagi pertumbuhan industri dalam negeri. Dengan strategi yang terintegrasi, pemerintah terus mengembangkan potensi kobalt untuk mendukung transisi energi global dan memperkuat perekonomian nasional. ',
        ReferensiPenelitian:'Marwanto, I Nyoman Prabu Buana Rumiartha, Putri, M., I Wayan Parsa, & I Gede Yusa. (2024). Business on nickel downstreaming with China and European Union lawsuits. Jurnal IUS Kajian Hukum Dan Keadilan, 12(2), 315–329. doi:10.29303/ius.v12i2.1381',
        PerubahanLingkungan: '',
        label: 'Kobalt',
        sentimentApiUrl:"https://api.awario.com/v1.0/alerts/100058461/insights/total/sentiment?access_token=KTOdiuA6BzXcY0Z0&date_from=2020-01-01",
        apiUrl:"https://api.awario.com/v1.0/alerts/100058461/mentions?access_token=KTOdiuA6BzXcY0Z0&sort_by=reach&sort_order=desc&limit=6"
      },
      PasirKwarsa: {
        SosialMedia: 'Berikut merupakan grafik hasil analisis sentimen pada beberapa media terkait hilirisasi pasir kuarsa di Indonesia. Media yang kami analasis adalah news/blogs, website, twitter, YouTube dan reddit. Grafik tersebut menampilkan persentase sentimen netral, positif dan negatif. Data yang kami kumpulkan adalah data unggahan media dari tahun 2020 sampai saat ini. Grafik ini juga dilengkapi sumber data yang paling banyak dikunjungi',
        Penelitian: 'Kuarsa, sebagai salah satu mineral strategis, kini menjadi bagian penting dalam kebijakan hilirisasi Indonesia. Pemerintah mendorong pemrosesan domestik kuarsa untuk mendukung industri kaca, keramik, dan teknologi lainnya. Langkah ini menciptakan peluang baru bagi investasi, memperluas kapasitas industri nasional, dan meningkatkan daya saing produk Indonesia di pasar global.<br><br>Kebijakan ini juga memberikan manfaat besar bagi perekonomian dengan meningkatkan pendapatan dari ekspor bernilai tambah dan menciptakan lapangan kerja baru. Pemerintah terus berupaya memperkuat infrastruktur dan teknologi untuk memastikan keberhasilan strategi hilirisasi kuarsa.',
        ReferensiPenelitian:'Simbolon, P. G. M., Yusro, M. A., & Taniady, V. (2024). Permanent Sovereignty vs. International Obligations. Lentera Hukum, 11(2), 189. doi:10.19184/ejlh.v11i2.43342',
        PerubahanLingkungan: '',
        image: KuarsaMap,
        label: 'Pasir Kuarsa',
        direct:"/mahadata-dan-kecerdasan-buatan/map/Pasir Kuarsa",
        sentimentApiUrl:"https://api.awario.com/v1.0/alerts/100058463/insights/total/sentiment?access_token=KTOdiuA6BzXcY0Z0&date_from=2020-01-01",
        apiUrl:"https://api.awario.com/v1.0/alerts/100058463/mentions?access_token=KTOdiuA6BzXcY0Z0&sort_by=reach&sort_order=desc&limit=6"
      },
  };

  const handleMenuClick = (menuId, hasSubmenu) => {
    if (hasSubmenu) {
      setSubmenuVisible((prev) => (prev === menuId ? null : menuId));
      setActiveSubmenu(null);
      setActiveTab(menuId);
      triggerTransition();
    } else {
      setActiveTab(menuId);
      setSubmenuVisible(null);
      setActiveSubmenu(null);
      triggerTransition();
    }
  };

  const handleSubmenuClick = (submenuId) => {
    setActiveSubmenu(submenuId);
    setActiveTab(null);
    triggerTransition();
  };

  const triggerTransition = () => {
    setTabTransition(false);
    setTimeout(() => {
      setTabTransition(true);
    }, 50);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-sidebar">
        <p className="tabs-intro">
          Informasi detail terkait potensi sumber daya seperti Nikel, Bauksit, Kobalt, dan Pasir Kuarsa.
        </p>
        {tabs.map((tab) => (
          <div key={tab.id} className="menu-section">
            <div
              className={`tab-button ${
                activeTab === tab.id && !activeSubmenu ? 'active' : ''
              }`}
              onClick={() => handleMenuClick(tab.id, !!tab.submenu)}
            >
              <span>{tab.label}</span>
              {tab.submenu && (
                <span className="arrow">
                  {submenuVisible === tab.id ? '▲' : '▼'}
                </span>
              )}
            </div>
            {tab.submenu && submenuVisible === tab.id && (
              <ul className="submenu">
                {tab.submenu.map((submenu) => (
                  <li key={submenu.id}>
                    <button
                      className={`submenu-button ${
                        activeSubmenu === submenu.id ? 'active' : ''
                      }`}
                      onClick={() => handleSubmenuClick(submenu.id)}
                    >
                      {submenu.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className={`tabs-content ${tabTransition ? 'active' : ''}`}
        key={activeSubmenu || activeTab}>
        {activeSubmenu ? (
          <>
            <h2>{content[activeSubmenu].label}</h2>
            <div>
              <h3>Sosial Media</h3>
              <p dangerouslySetInnerHTML={{ __html: content[activeSubmenu].SosialMedia }} />
              <Chart sentimentApiUrl={content[activeSubmenu].sentimentApiUrl} apiUrl={content[activeSubmenu].apiUrl} />
              <h3>Penelitian dan Riset</h3>
              <p dangerouslySetInnerHTML={{ __html: content[activeSubmenu].Penelitian }} />
              <div className="referensi">
                <h4>Referensi</h4>
                <p id="ref" className="ref-penelitian" dangerouslySetInnerHTML={{ __html: content[activeSubmenu].ReferensiPenelitian }}/>
            </div>
              {content[activeSubmenu]?.PerubahanLingkungan && (
                <div>
                <h3>Perubahan Lingkungan</h3>
                 <p>{content[activeSubmenu].PerubahanLingkungan}</p>
                 <div className="referensi">
                    <h4>Referensi</h4>
                    <p id="ref" className="ref-penelitian"dangerouslySetInnerHTML={{ __html: content[activeSubmenu].ReferensiPerubahanLingkungan }}/>
                </div>
                </div>
              )}
              {content[activeSubmenu].image && (
                <img
                  src={content[activeSubmenu].image}
                  alt={content[activeSubmenu].label}
                  id="tabs-image"
                />
              )}
              <div className="button-visit-map">
                {content[activeSubmenu]?.direct && (
                  <a
                  href={content[activeSubmenu].direct}
                  className="visit-map-button"
                  id="visit-map-button"
                  target="_blank"
                  without rel="noreferrer"
                >
                  PETA
                </a>
              )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>{content[activeTab]?.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content[activeTab].description }}></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Tab;