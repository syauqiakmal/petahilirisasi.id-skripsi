import React, { useState } from 'react';
import './Tab.css';
import Accordion from "../Accordion/Accordion";

const TabHukum = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeTab, setActiveTab] = useState('Menu1');
  const [submenuVisible, setSubmenuVisible] = useState(null);
  const [tabTransition, setTabTransition] = useState(false);

  const accordionData = [
      {
        title: "Undang-Undang",
        description: "Undang-Undang menjadi dasar hukum utama yang mengatur berbagai aspek kegiatan pertambangan, perindustrian, dan tata kelola hilirisasi mineral serta batubara di tingkat nasional.",
        items: [
          {
            no: 1,
            name: "Undang-Undang Nomor 4 Tahun 2009",
            description: "Undang-Undang tentang Pertambangan Mineral dan Batubara",
          },
          {
            no: 2,
            name: "Undang-Undang Nomor 3 Tahun 2014",
            description: "Perindustrian",
          },
          {
            no: 3,
            name: "Undang-Undang Nomor 3 Tahun 2020",
            description: "Perubahan Atas Undang-Undang Nomor 4 Tahun 2009 tentang Pertambangan Mineral dan Batubara",
          },
          {
            no: 4,
            name: "Undang-Undang Nomor 6 Tahun 2023",
            description: "Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja Menjadi Undang-Undang",
          },
        ],
      },
      {
        title: "Peraturan Pemerintah",
        description: "Peraturan Pemerintah memberikan arahan lebih teknis terkait perencanaan pembangunan industri, pelaksanaan kegiatan usaha pertambangan, serta perizinan usaha di sektor ini.",
        items: [
          {
            no: 1,
            name: "Peraturan Pemerintah Nomor 14 Tahun 2015",
            description: "Rencana Induk Pembangunan Industri Nasional 2015-2035",
          },
          {
            no: 2,
            name: "Peraturan Pemerintah Nomor 1 Tahun 2017",
            description:
              "Perubahan Keempat atas Peraturan Pemerintah Nomor 23 Tahun 2010 tentang Pelaksanaan Kegiatan Usaha Pertambangan Mineral dan Batubara",
          },
          {
            no: 3,
            name: "Peraturan Pemerintah Nomor 96 Tahun 2021",
            description: "Pelaksanaan Kegiatan Usaha Pertambangan Mineral dan Batubara",
          },
          {
            no: 4,
            name: "Peraturan Pemerintah Nomor 25 Tahun 2024",
            description:
              "Perubahan Atas Peraturan Pemerintah Nomor 96 Tahun 2021 tentang Pelaksanaan Kegiatan Usaha Pertambangan Mineral dan Batubara",
          },
        ],
      },
      {
        title: "Peraturan Menteri",
        description: "Peraturan Menteri berisi pedoman dan tata cara teknis dalam meningkatkan nilai tambah mineral, mengatur perizinan usaha, serta tata kelola operasional pertambangan mineral dan batubara.",
        items: [
          {
            no: 1,
            name: "Peraturan Menteri ESDM No. 1 Tahun 2014",
            description: "Peningkatan Nilai Tambah Mineral Melalui Kegiatan Pengolahan dan Pemurnian Mineral Di Dalam Negeri",
          },
          {
            no: 2,
            name: "Peraturan Menteri ESDM No. 25 Tahun 2018",
            description:
              "Pengusahaan Pertambangan Mineral Dan Batubara",
          },
          {
            no: 3,
            name: "Peraturan Menteri ESDM No. 11 Tahun 2019",
            description: "Perubahan Kedua Atas Peraturan Menteri Energi Dan Sumber Daya Mineral Nomor 25 Tahun 2018 Tentang Pengusahaan Pertambangan Mineral Dan Batubara",
          },
          {
            no: 4,
            name: "Peraturan Menteri ESDM No. 17 Tahun 2020",
            description:
              "Perubahan Ketiga Atas Peraturan Menteri Energi dan Sumber Daya Mineral Nomor 25 Tahun 2018 tentang Pengusahaan Pertambangan Mineral dan Batubara",
          },
          {
            no: 5,
            name: "Peraturan Menteri ESDM No. 16 Tahun 2021",
            description:
              "Perubahan Atas Peraturan Menteri Energi dan Sumber Daya Mineral Nomor 7 Tahun 2020 tentang Tata Cara Pemberian Wilayah, Perizinan, dan Pelaporan Pada Kegiatan Usaha Pertambangan Mineral dan Batubara",
          },
          {
            no: 6,
            name: "Peraturan Menteri ESDM No. 10 Tahun 2023",
            description: "Tata Cara Penyusunan, Penyampaian, dan Persetujuan Rencana Kerja dan Anggaran Biaya serta Tata Cara Pelaporan Pelaksanaan Kegiatan Usaha Pertambangan Mineral dan Batubara",
          },
          {
            no: 7,
            name: "Peraturan Menteri Perdagangan No. 119 Tahun 2015",
            description:
              "Ketentuan Ekspor Produk Pertambangan Hasil Pengolahan dan Pemurnian",
          },
        ],
      },
      {
        title: "Keputusan Menteri",
        description: "Keputusan Menteri memberikan arahan spesifik terkait pedoman pengajuan izin, evaluasi wilayah tambang, serta penetapan komoditas mineral yang strategis.",
        items: [
          {
            no: 1,
            name: "Keputusan Menteri ESDM No. 375.K/MB.01/MEM.B/2023",
            description: "Pedoman Permohonan, Evaluasi, dan Pemrosesan Perluasan Wilayah Izin Usaha Pertambangan dan Wilayah Izin Usaha Pertambangan Khusus Dalam Rangka Konservasi Mineral dan Batu Bara",
          },
          {
            no: 2,
            name: "Keputusan Menteri ESDM No. 69.K/MB.01/MEM.B/2024",
            description: "Penetapan Jenis Komoditas yang Tergolong dalam Klasifikasi Mineral Strategis",
          }
        ],
      },
      {
        title: "Peraturan Daerah",
        description: "Peraturan Daerah mengatur tata ruang wilayah, izin usaha pertambangan rakyat, serta upaya perlindungan dan pengelolaan lingkungan hidup di tingkat provinsi dan kabupaten/kota.",
        items: [
          {
            no: 1,
            name: "Peraturan Daerah Provinsi Kalimantan Selatan Nomor 6 Tahun 2023",
            description: "Rencana Tata Ruang Wilayah Provinsi Kalimantan Selatan Tahun 2023-2042",
          },
          {
            no: 2,
            name: "Peraturan Daerah Provinsi Lampung Nomor 12 Tahun 2019",
            description:
              "Perubahan Atas Peraturan Daerah 1 Tahun 2010 tentang RTRW Tahun 2009 Sampai Dengan Tahun 2029",
          },
          {
            no: 3,
            name: "Peraturan Daerah (Perda) Provinsi Sulawesi Selatan Nomor 3 Tahun 2022",
            description: "Rencana Tata Ruang Wilayah Provinsi Sulawesi Selatan Tahun 2022 - 2041",
          },
          {
            no: 4,
            name: "Peraturan Daerah (Perda) Kabupaten Bintan Nomor 1 Tahun 2020",
            description:
              "Rencana Tata Ruang Wilayah Kabupaten Bintan Tahun 2020 - 2040",
          },
          {
            no: 5,
            name: "Peraturan Daerah (Perda) Kabupaten Muara Enim Nomor 24 Tahun 2008",
            description: "Perubahan atas Perda Kab. Muara Enim No.30 Tahun 2001 Tentang Pengusahaan Pertambangan Umum",
          },
          {
            no: 6,
            name: "Peraturan Daerah Kabupaten Kayong Utara Provinsi Kalimantan Barat Nomor 11 Tahun 2014",
            description:
              "Izin Pertambangan Rakyat",
          },
          {
            no: 7,
            name: "Peraturan Daerah Kabupaten Pasuruan Nomor 7 Tahun 2010",
            description: "Izin Usaha Pertambangan Mineral dan Batuan di Kabupaten Pasuruan",
          },
          {
            no: 8,
            name: "Peraturan Daerah (Perda) Kabupaten Banjar Nomor 8 Tahun 2020",
            description:
              "Rencana Perlindungan dan Pengelolaan Lingkungan Hidup",
          },
        ],
      },
    ];

  const TabHukum = [
    {
      id: 'Menu1',
      label: 'Landasan Hukum Hilirisasi',
      submenu: null,
    },
    {
      id: 'Menu2',
      label: 'Kebijakan Hilirisasi Mineral di Berbagai Negara',
      submenu: null
    },
    {
        id: 'Menu3',
        label: 'Sengketa Mineral di Berbagai Negara',
        submenu: null
    },
    {
        id: 'Menu4',
        label: 'Dampak Hilirisasi Mineral dalam Perdagangan Internasional',
        submenu: null
    },
    {
        id: 'Menu6',
        label: 'Kesimpulan',
        submenu: null
    },
    {
        id: 'Menu7',
        label: 'Rekomendasi',
        submenu: null
    },
  ];

  const ContentHukum = {
    Menu1: {
        title: 'Landasan Hukum Hilirisasi',
        description: '<p>Bagian ini menyajikan kerangka hukum yang terdiri dari berbagai jenis regulasi yang mendukung kegiatan hilirisasi mineral di Indonesia. Regulasi ini telah dikelompokkan berdasarkan jenisnya, antara lain: <strong>Undang-Undang, Peraturan Pemerintah, Peraturan Menteri, Keputusan Menteri, Peraturan Daerah</strong>.',
    },
    Menu2: {
        title: 'Kebijakasan Hilirisasi Mineral di Berbagai Negara',
        description: '<ul><li><strong>Australia</strong><br>Australia memiliki kebijakan hilirisasi yang kuat, dengan fokus pada pengembangan industri pengolahan mineral.</li><li><strong>Bostwana</strong><br>Botswana, sebagai produsen berlian besar, fokus pada peningkatan nilai ekonomi bijih melalui proses benefisiasi dan kerja sama dengan perusahaan pertambangan.</li><li><strong>Chili</strong><br>Chili penghasil tembaga terbesar dunia, berusaha kembangkan hilirisasi dan tingkatkan investasi asing.</li><li><strong>Filipina</strong><br>Filipina telah menerapkan kebijakan untuk mendorong pengolahan tambang dalam negeri, seperti mempertimbangkan larangan ekspor mineral mentah nikel.</li><li><strong>Rusia</strong><br>Rusia menerapkan kebijakan untuk pengolahan mineral dalam negeri.</li><li><strong>Tiongkok</strong><br>Tiongkok berhasil memaksimalkan hilirisasi mineral melalui investasi dalam teknologi, insentif pajak, dan kemitraan publik-swasta, mengendalikan rantai pasok global. Jumlah teks kebijakan meningkat pesat dari 1994 hingga 2018.</li><li><strong>Zambia</strong><br>Zambia menjajaki cara untuk meningkatkan pengolahan tembaga dan mineral.</li><li><strong>Zimbabwe</strong><br>Zimbabwe telah menerapkan peraturan untuk mendorong hilirisasi mineral, tetapi hasilnya tidak signifikan. Hanya Indonesia dan Tiongkok yang mengajukan gugatan ke WTO</li></ul>',
    },
    Menu3: {
        title: 'Sengketa Mineral di Berbagai Negara',
        description: '<ul><li><strong>EU vs. Indonesia di WTO (DS 592)</strong> <ul><li>Uni Eropa menggugat Indonesia di WTO terkait larangan ekspor bijih nikel.</li><li>Larangan diberlakukan pada 22 November 2019.</li><li>Masalah utama: kewajiban Tingkat Komponen Dalam Negeri (TKDN) dan dugaan pelanggaran regulasi WTO terkait UU Minerba.</li></ul></li><li><strong>Rare Earths Amerika Serikat vs. Tiongkok (DS 431)</strong> <ul><li>Kebijakan Cina tentang pembatasan ekspor bahan mentah mendapat perhatian WTO.</li><li>Kasus diajukan oleh Amerika Serikat, Uni Eropa, dan Jepang terkait mineral tanah jarang.</li></ul></li><li><strong>Ikan Herring dan Salmon Amerika Serikat vs. Kanada (1987 WL 421961)</strong> <ul><li>Kanada melarang ekspor ikan herring dan salmon.</li><li>Amerika Serikat menilai kebijakan tersebut bertentangan dengan GATT.</li><li>Panel WTO memutuskan tindakan Kanada melanggar GATT, meskipun alasan Kanada adalah menjaga cadangan ikan.</li></ul></li></ul>',
    },
    Menu4: {
        title: 'Dampak Hilirisasi Mineral dalam Perdagangan Internasional',
        description: '<ul><li><strong>Peningkatan Nilai Tambah</strong><br>Hilirisasi mineral meningkatkan nilai tambah mineral dan menciptakan produk jadi yang lebih bernilai.</li><li><strong>Penciptaan Lapangan Kerja</strong><br>Hilirisasi mineral mendorong pertumbuhan industri pengolahan dan membuka lapangan pekerjaan.<li><strong>Pengurangan Ketergantungan</strong><br>Hilirisasi mineral mengurangi ketergantungan pada ekspor bahan mentah dan mendorong diversifikasi ekonomi.<li><strong>Peningkatan Daya Saing</strong><br>Hilirisasi mineral meningkatkan daya saing industri dalam negeri dan mendorong pertumbuhan ekonomi.</li></ul>',
    },
    Menu6: {
        title: 'Kesimpulan',
        description: '<ul><li>Undang-Undang No. 4 Tahun 2009 yang kemudian direvisi dengan Undang-Undang No. 3 tahun 2020 tentang Pertambangan Mineral dan Batubara dan sejumlah aturan turunannya menjadi dasar hilirisasi.</li><li>Kebijakan perundang-undangan tentang hilirisasi dinilai tidak konsisten dan berubah-ubah sehingga menimbulkan ketidakpastian hukum khususnya bagi pengusaha yang bergerak dalam bidang pertambangan.</li><li>Peraturan perundang-undangan terkait dengan hilirisasi ini secara substantif pernah diuji di Mahkamah Konstitusi dan Mahkamah Agung namun putusan MK dan MA menolak secara keseluruhan Judicial Review tersebut.</li><li>Indonesia menghadapi gugatan Uni Eropa terkait dengan larangan ekspor bijih nikel yang dimenangkan oleh Uni Eropa. Indonesia saat ini telah mengajukan permintaan Banding ke Appellate Body.</li><li>Ditemukan ketidakseseragaman Peraturan Daerah yang mengatur tentang hilirisasi.</li></ul>',
        reference:''
    },
    Menu7: {
        title: 'Rekomendasi',
        description: '<ul><li>Dalam pemberian Izin Usaha Tambang maka pemerintah mencegah terjadinya keberpihakan pada perusahaan tertentu, sehingga tidak ada diskriminasi dalam penerbitan izin usaha tambang di bidang mineral ini.</li><li>Pengaturan mengenai hilirisasi harus didukung dengan upaya pencegahan terhadap penyelundupan bijih nikel yang dipasok oleh aktivitas penambangan ilegal.</li><li>Perlu ada regulasi untuk memudahkan dan melonggarkan ekspor mineral dari perusahaan yang bergerak di bidang hilirisasi, termasuk regulasi jaminan pembangunan fasilitas pengolahan dalam negeri.</li><li>Perlunya menjadikan isu lingkungan sebagai bagian tak terpisahkan dari kebijakan mengenai hilirisasi tambang, termasuk dengan memperhatikan prinsip ESG (<i>Environmental, Social, and Governance</i>).</li></ul>',
        reference:''
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
        Informasi hukum strategis terkait perjanjian investasi internasional dan analisis regulasi global untuk mendukung penguatan posisi hukum dalam diplomasi hilirisasi.
        </p>
        {TabHukum.map((TabHukum) => (
          <div key={TabHukum.id} className="menu-section">
            <div
              className={`tab-button ${
                activeTab === TabHukum.id && !activeSubmenu ? 'active' : ''
              }`}
              onClick={() => handleMenuClick(TabHukum.id, !!TabHukum.submenu)}
            >
              <span>{TabHukum.label}</span>
              {TabHukum.submenu && (
                <span className="arrow">
                  {submenuVisible === TabHukum.id ? '▲' : '▼'}
                </span>
              )}
            </div>
            {TabHukum.submenu && submenuVisible === TabHukum.id && (
              <ul className="submenu">
                {TabHukum.submenu.map((submenu) => (
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

      <div className={`tabs-content ${tabTransition ? 'active' : ''}`} key={activeSubmenu || activeTab}>
  {activeSubmenu ? (
    <>
      <h2>{ContentHukum[activeSubmenu].label}</h2>
      <p>{ContentHukum[activeSubmenu].description}</p>
    </>
  ) : (
    <>
      <h2>{ContentHukum[activeTab]?.title}</h2>

      <p dangerouslySetInnerHTML={{ __html: ContentHukum[activeTab].description }}></p>
      
      {/* Only show Accordion for 'Landasan Hukum Hilirisasi' tab */}
      {activeTab === 'Menu1' && <Accordion data={accordionData} />}
      
      {ContentHukum[activeTab]?.image && (
        <img
          src={ContentHukum[activeTab].image}
          alt={ContentHukum[activeTab]?.label}
          id="tabs-image-hukum"
        />
      )}
      {ContentHukum[activeTab]?.description2 && (
        <p dangerouslySetInnerHTML={{ __html: ContentHukum[activeTab].description2 }}></p>
      )}
      <div className="referensi">
        {ContentHukum[activeTab]?.reference && (
          <>
            <h4>Referensi</h4>
            <p
              id="ref"
              className="ref-penelitian"
              dangerouslySetInnerHTML={{ __html: ContentHukum[activeTab].reference }}
            />
          </>
        )}
      </div>
    </>
  )}
</div>
    </div>
  );
};

export default TabHukum;