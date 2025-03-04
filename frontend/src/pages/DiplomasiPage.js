import React from 'react';
import Header from '../components/Header/Header';
import ProjectPageInfo from '../components/ProjectPageInfo/ProjectPageInfo';
import Footer from '../components/Footer/Footer';
import TabDiplomasi from '../components/Tab/TabDiplomasi';
import HeroPage from '../components/HeroPage/HeroPage';

import projectInfoImage from '../components/assets/Hero Diplomasi.jpg';
import HeroBackground from '../components/assets/Project Info Diplomasi.png'
import overlayImage from '../components/assets/Hero Overlay Mahadata.png';

const DiplomasiPage = () => {
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
                subtitle="Diplomasi Hilirisasi dan Investasi Strategis"
                description="Membahas kerjasama bilateral, regional, dan multilateral tentang hilirisasi investasi strategis yang dilakukan Indonesia dengan para mitra. Kerjasama ini bertujuan untuk memperkuat rantai nilai global untuk meningkatkan nilai tambah nikel, bauksit, kobalt, dan silika Indonesia."
            />
            <section id="about-section">
                <ProjectPageInfo 
                    subtitle="Tentang Diplomasi Hilirisasi dan Investasi Strategis"
                    title="Strategi Hilirisasi: Diplomasi, Investasi, dan Keberlanjutan"
                    description="Indonesia memprioritaskan kebijakan hilirisasi mineral untuk memaksimalkan pengolahan nikel, kobalt, bauksit, dan kuarsa demi menciptakan nilai tambah dan daya saing di pasar global. Strategi diplomasi dirancang untuk memperkuat kemitraan global dan menarik investasi asing dalam rangka membangun industri yang inklusif dan berkelanjutan dengan mengembangkan teknologi dan inovasi. Pendekatan yang berbasis data secara mendalam memungkinkan identifikasi peluang ekonomi baru, peningkatan kesejahteraan masyarakat dan memperkokoh posisi Indonesia menghadapi dinamika global."
                    contentBackground={projectInfoImage}
                />
          </section>

          <section id="tabs-section">
            <TabDiplomasi />
          </section>
  
        </main>
        <footer>
            <Footer />
        </footer>
      </div>
    );
  };
  
  export default DiplomasiPage;