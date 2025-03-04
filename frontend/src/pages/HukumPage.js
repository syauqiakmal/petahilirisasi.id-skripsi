import React from 'react';
import Header from '../components/Header/Header';
import ProjectPageInfo from '../components/ProjectPageInfo/ProjectPageInfo';
import Footer from '../components/Footer/Footer';
import HeroPage from '../components/HeroPage/HeroPage';
import TabHukum from '../components/Tab/TabHukum';

import projectInfoImage from '../components/assets/Project Info Hukum.jpg'
import HeroBackground from '../components/assets/Hero Hukum.png'
import overlayImage from '../components/assets/Hero Overlay Mahadata.png';

const HukumPage = () => {
    return (
      <div className="page-container">
        <header>
            <Header />
        </header>
        <main>
            <HeroPage
                videoSrc={HeroBackground}
                overlayImage={overlayImage}
                title="Peta Hilirisasi"
                subtitle="Hukum dan Kebijakan Hilirisasi"
                description="Peraturan tentang hilirisasi di sektor industri pertambangan mineral muncul pertama kali melalui Undang-Undang Nomor 4 Tahun 2009 tentang Mineral dan Batubara yang kemudian direvisi dengan Undang-Undang Nomor 3 tahun 2020. Kedua undang-undang ini pun menurunkan sejumlah peraturan mulai dari Peraturan Pemerintah, Peraturan Presiden dan Peraturna Menteri."
            />
            <section id="about-section">
                <ProjectPageInfo 
                    subtitle="Tentang Hukum dan Kebijakan Hilirisasi"
                    title="Keberlanjutan Hilirisasi Pertambangan"
                    description="Kebijakan hiliriasi di bidang pertambangan mineral telah memberikan implikasi  kenaikan pendapatan negara. Sejumlah kebijakan  dibidang hilirisasi pertambangan mineral  dilahirkan dalam bentuk Peraturan Menteri dan Keputusan Menteri ESDM. Kebijakan-kebijakan ini dinilai begitu cepat lahir dan berubah-ubah sehingga dikhawatirkan  menimbulkan ketidakpastian hukum. Sengketa dan kasus-kasus hilirisas di tingkat global juga mempengaruhi lahirnya kebijakan hilirisasi di tingkat nasional."
                    contentBackground={projectInfoImage}
                />
          </section>

          <section id="tabs-section">
            <TabHukum />
          </section>
  
        </main>
        <footer>
            <Footer />
        </footer>
      </div>
    );
  };
  
  export default HukumPage;