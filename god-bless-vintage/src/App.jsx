import "./index.css";
import "./styles/main.css";

// components import
import Header from "./components/Header.jsx";
import ScrollGallery from "./components/ScrollGallery.jsx";
import InstagramLink from "./components/InstagramLink.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>GOD BLESS VINTAGE, 2025</p>
        <p>Львів, Україна</p>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
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