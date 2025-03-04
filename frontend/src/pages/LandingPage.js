import React from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import ShowCase from '../components/ShowCase/MapShowCase';
import FeatureSection from '../components/FeatureSection/FeatureSection';
import Footer from '../components/Footer/Footer';
import Carousel from '../components/Carousel/Carousel'

import videoSrc from '../components/assets/mining video.mp4';
import overlayImage from '../components/assets/Hero Video-Overlay.png';
import projectInfoImage from '../components/assets/miningProjectInfo-2.jpg'

const LandingPage = () => {
    return (
      <div className="page-container">
        <header>
            <Header />
        </header>
        <main>
            <section>
                <HeroSection
                    videoSrc={videoSrc}
                    overlayImage={overlayImage}
                    title="Peta Hilirisasi"
                    subtitle="Empowering Indonesia’s Downstream Industries:<br>Strategies for Golden Indonesia 2045"
                    description="Merupakan rujukan (hub) tentang hilirisasi strategi, aturan, kebijakan, dan diplomasi  Indonesia terkait hilirisasi nikel, bauksit, kobalt, dan pasir kuarsa di kancah internasional. Analisis mendalam berbasis pendapat ahli, karya ilmiah, opini publik menggunakan mahadata geospasial, teks dan kecerdasan buatan (AI), serta landasan hukum dan perundangan dengan memperhatikan dinamika geopolitik, geoekonomi, dan geostrategi global. Merupakan bagian dari upaya mendukung strategi transformasi bangsa menuju Indonesia emas 2045 khususnya Asta Cita ke-5 melanjutkan hilirisasi dan industrialisasi berbasis sumber daya alam untuk meningkatkan nilai tambah dalam negeri."
                />
            </section>

            <section id="about-section">
                <ProjectInfo 
                    subtitle="Tentang Peta Hilirisasi"
                    title="Hilirisasi: Melihat Masa Depan Indonesia Lebih Dekat"
                    description="<b>Tahukah Anda?</b> Indonesia sedang membangun industri yang berkelanjutan untuk mengolah kekayaan mineralnya seperti nikel, bauksit, dan bahan tambang lainnya. Dengan Peta Hilirisasi, Anda bisa memahami pengaruh kegiatan dan kebijakan hilirisasi secara komprehensif. mendukung ekonomi nasional. Cek sekarang dan temukan bagaimana ini memperkaya pengetahuan Anda."
                    contentBackground={projectInfoImage}
                />
          </section>

          <section>
            <Carousel />
          </section>

          <section id="feature-section">
            <FeatureSection />
          </section>
  
          <ShowCase />
        </main>
        <footer>
            <Footer />
        </footer>
      </div>
    );
  };
  
  export default LandingPage;