import React from 'react';
import Header from '../components/Header/Header';
import ProjectPageInfo from '../components/ProjectPageInfo/ProjectPageInfo';
import Footer from '../components/Footer/Footer';
import HeroPage from '../components/HeroPage/HeroPage';
import Tab from '../components/Tab/Tab';

import projectInfoImage from '../components/assets/Project Info Mahadata.jpg'
import HeroBackground from '../components/assets/Hero Mahadata.png'
import overlayImage from '../components/assets/Hero Overlay Mahadata.png';

const MahadataPage = () => {
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
                subtitle="Mahadata dan Kecerdasan Buatan"
                description="Peta hilirisasi berbasis mahadata geospasial dan media sosial menggunakan AI, didukung oleh penelitian ilmiah bereputasi, memberikan wawasan strategis yang mendukung pengambilan keputusan hilirisasi nikel, bauksit, kobalt, dan pasir kuarsa secara lebih cerdas, terukur, dan berbasis bukti. Pendekatan ini tidak hanya menghasilkan pemahaman mendalam tentang potensi dan pola distribusi sumber daya, tetapi juga menyediakan dasar yang kuat untuk merancang strategi diplomasi yang akurat dan berdampak dalam proses hilirisasi mineral tersebut."            />
            <section id="about-section">
              <ProjectPageInfo 
                  subtitle="Tentang Mahadata dan Kecerdasan Buatan"
                  title="Memahami Tren dan Perubahan Melalui Data"
                  description="Menyediakan wawasan strategis berdasarkan data dari media sosial, riset mendalam, dan perubahan geospasial yang terjadi selama 20 tahun terakhir. Dengan memanfaatkan mahadata dan kecerdasan buatan (AI), kami dapat mengidentifikasi pola perubahan, mengukur dampak sosial, dan memahami tren yang berkembang. Solusi ini dirancang untuk mendukung pengambilan keputusan hilirisasi nikel, bauksit, kobalt, dan pasir kuarsa yang lebih akurat dan berbasis data."
                  contentBackground={projectInfoImage}
              />
          </section>

          <section id="tabs-section">
            <Tab />
          </section>
  
        </main>
        <footer>
            <Footer />
        </footer>
      </div>
    );
  };
  
  export default MahadataPage;
