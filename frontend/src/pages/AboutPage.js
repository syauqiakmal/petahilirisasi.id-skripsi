import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import HeroPage from '../components/HeroPage/HeroPage';
import Partner from '../components/Partner/Partner';

import HeroBackground from '../components/assets/Hero About.png'
import overlayImage from '../components/assets/Hero Overlay Mahadata.png';
import projectInfoImage from '../components/assets/miningProjectInfo.jpg'


const AboutPage = () => {
    return (
        <div className="page-container">
            <header>
                <Header />
            </header>
            <main>
                <section>
                    <HeroPage
                        videoSrc={HeroBackground}
                        overlayImage={overlayImage}
                        title="Peta Hilirisasi"
                        subtitle="About Us"
                        description=""
                    />
                </section>

                <section id="about-section">
                    <ProjectInfo 
                        subtitle="Tentang Kami"
                        title="Sinergi Multidisiplin untuk Mendukung Transformasi dan Hilirisasi Ekonomi Indonesia yang Berkelanjutan"
                        description="Petahilirisasi.id adalah inisiatif dari tim peneliti multidisiplin BINUS University yang terdiri dari para ahli dari berbagai bidang, yaitu Hubungan Internasional, Computer Science, Sistem Informasi, Hukum, dan Bisnis Internasional. Dengan pendekatan lintas disiplin, kami berkomitmen untuk menghadirkan solusi inovatif yang mendukung pengembangan hilirisasi industri dan diplomasi ekonomi.<br><br>Platform ini didukung penuh oleh Research Interest Group (RIG) GeoEcoAI BINUS University, yang berfokus pada penerapan kecerdasan buatan, geoinformatika, dan analisis ekologi untuk menjawab tantangan global dan nasional. Kami percaya bahwa kolaborasi antara berbagai bidang keilmuan adalah kunci untuk menghasilkan penelitian yang relevan dan berdampak tinggi.<br><br>Petahilirisasi.id hadir sebagai sumber informasi strategis yang mengintegrasikan perspektif hukum, teknologi, hubungan internasional dan bisnis untuk memperkuat hilirisasi di Indonesia. Melalui kerja sama ini, kami tidak hanya memberikan wawasan berbasis data, tetapi juga membantu pengambilan keputusan yang mendukung pertumbuhan ekonomi berkelanjutan."
                        contentBackground={projectInfoImage}
                    />
                </section>

                <section>
                    <Partner />
                </section>

            </main>
            <footer>
                <Footer />
            </footer>
      </div>
    );
  };
  
  export default AboutPage;