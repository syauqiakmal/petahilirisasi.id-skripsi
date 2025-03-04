import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ContactCard from '../components/ContactCard/ContactCard';
import HeroPage from '../components/HeroPage/HeroPage';

import HeroBackground from '../components/assets/Hero Contact.png'
import overlayImage from '../components/assets/Hero Overlay Mahadata.png';


const ContactPage = () => {
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
                        subtitle="Contact"
                        description=""
                    />
                </section>

                <section>
                    <ContactCard />
                </section>

            </main>
            <footer>
                <Footer />
            </footer>
      </div>
    );
  };
  
  export default ContactPage;