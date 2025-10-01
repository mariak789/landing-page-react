import "./index.css";
import "./styles/main.css";

// імпорти компонентів
import Header from "./components/Header.jsx";
import ScrollGallery from "./components/ScrollGallery.jsx";
import InstagramLink from "./components/InstagramLink.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <p>
          GOD BLESS VINTAGE, <span>{year}</span>
        </p>
        <p>Львів, Україна</p>
        <a
          href="https://www.instagram.com/god_bless_vintage/?igsh=MXR0amwwZHV4c3diZA%3D%3D%2F"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <ScrollGallery />
      <InstagramLink />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}