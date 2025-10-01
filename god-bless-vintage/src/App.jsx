// src/App.jsx
import { useEffect } from "react";
import "./index.css"; // базові стилі Vite
import "./styles/main.css"; // тимчасово підключаємо твої стилі, перелік розширимо

function App() {
  useEffect(() => {
    // якщо у тебе були легкі ефекти типу fade-in on scroll,
    // ми перенесемо їх поступово в React (IntersectionObserver/класи стану)
  }, []);

  return (
    <>
      {/* Header */}
      <header id="top">
        {/* TODO: навігація, лого, якірні лінки */}
      </header>

      {/* Hero */}
      <section id="hero">
        {/* TODO: фон/обкладинка/цитата */}
      </section>

      {/* Gallery */}
      <section id="gallery">
        {/* TODO: слайдер/грід */}
      </section>

      {/* Instagram */}
      <section id="instagram">
        {/* TODO: блок із Instagram */}
      </section>

      {/* About */}
      <section id="about">
        {/* TODO: опис магазину */}
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        {/* TODO: відгуки */}
      </section>

      {/* FAQ */}
      <section id="faq">
        {/* TODO: акордеон */}
      </section>

      {/* Footer */}
      <footer id="footer">
        {/* TODO: контакти/копірайт */}
      </footer>
    </>
  );
}

export default App;