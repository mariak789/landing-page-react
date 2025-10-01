// src/App.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import "./styles/main.css"; // тут можеш імпортувати style.css, faq.css, slider.css, responsive.css всередині одного файлу

// Утиліта: спостерігає за появою елемента в полі зору і додає клас 'visible'
function useFadeInOnView() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function FadeInSection({ children, className = "" }) {
  const ref = useFadeInOnView();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

// Простий автоскрол по горизонталі (для стрічки фото)
function AutoScrollRow({ children, speed = 0.4 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId;
    let last = performance.now();

    const step = (now) => {
      const dt = now - last;
      last = now;
      // плавний автоскрол; коли кінець — повертаємось на початок
      el.scrollLeft += speed * dt;
      const maxScroll = el.scrollWidth - el.clientWidth - 1;
      if (el.scrollLeft >= maxScroll) el.scrollLeft = 0;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="scroll-gallery"
      style={{ overflowX: "auto", whiteSpace: "nowrap", scrollBehavior: "auto" }}
      id="auto-scroll-gallery"
    >
      {children}
    </div>
  );
}

// Дуже простий слайдер для відгуків (автоперегортання)
function AutoSlider({ items = [], intervalMs = 2500 }) {
  const [idx, setIdx] = useState(0);
  const wrap = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  useEffect(() => {
    // прокрутити контейнер до активного слайда
    const el = wrap.current;
    if (!el) return;
    const child = el.children[idx];
    if (child) {
      el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  }, [idx]);

  if (!items.length) return null;

  return (
    <div className="review-slider">
      <div
        ref={wrap}
        className="review-track"
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {items.map((src, i) => (
          <div
            className="review-slide"
            key={i}
            style={{ flex: "0 0 85%", scrollSnapAlign: "start" }}
          >
            <img src={src} alt={`Відгук ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header landing" id="top">
      <FadeInSection>
        <h1>GOD BLESS VINTAGE</h1>
        <p>створено часом</p>
        <p>presented in Budapest, Prague, Warsaw</p>
      </FadeInSection>
    </header>
  );
}

function ScrollGallery() {
  const images = useMemo(
    () => [
      "images/IMG_6764.JPEG",
      "images/photo5.JPEG",
      "images/photo4.JPEG",
      "images/ring.jpg",
      "images/photo3.JPEG",
      "images/watchbox.JPG",
      "images/photo2.JPG",
      "images/photo1.JPEG",
      "images/IMG_6763.JPEG",
    ],
    []
  );

  return (
    <AutoScrollRow>
      {images.map((src, i) => (
        <div className="scroll-item" key={i} style={{ display: "inline-block" }}>
          <img src={src} alt={i === 0 || i === 5 ? "90s vintage watches" : ""} />
        </div>
      ))}
    </AutoScrollRow>
  );
}

function InstagramLink() {
  return (
    <a
      href="https://www.instagram.com/god_bless_vintage?igsh=MXR0amwwZHV4c3diZA==/"
      target="_blank"
      rel="noreferrer"
      className="insta-link"
      aria-label="Instagram"
      title="Відкрити Instagram"
    >
      <img src="images/icon.png" alt="Instagram" />
    </a>
  );
}

function AboutSection() {
  return (
    <FadeInSection className="about-section">
      <img src="images/maria1.JPEG" alt="" className="about-image-round" />
      <p>
        Ми локальна крамничка вінтажних годинників з душею та характером зі Львова,
        заснована у 2019 році
      </p>
      <p>
        У нашому затишному корнері представлені вінтажні та антикварні годинники з
        багатьох куточків світу, автентична швейцарська механіка, елегантні годинники
        французької, данської та інших європейських мануфактур. Чому саме вінтаж?
        Вінтаж - про характер, неповторний вайб та якість, перевірені часом.
      </p>
    </FadeInSection>
  );
}

function Testimonials() {
  const reviewImages = useMemo(
    () => [
      "images/feedback/feedback3.PNG",
      "images/feedback/review1.PNG",
      "images/feedback/review2.PNG",
      "images/feedback/review3.PNG",
      "images/feedback/gucci1.PNG",
      "images/feedback/gucci2.PNG",
      "images/feedback/watchwithcat.PNG",
      "images/feedback/feedback2.PNG",
    ],
    []
  );

  const sectionRef = useFadeInOnView();

  return (
    <section className="review-slider-section" ref={sectionRef}>
      <h2>Відгуки наших клієнтів 💌</h2>
      <AutoSlider items={reviewImages} />
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0); // індекс відкритого питання

  const items = [
    {
      q: "Чи всі годинники у робочому стані?",
      a: "Так, ми ретельно перевіряємо і тестуємо годинники у спеціалізованій майстерні. Особлива увага надається вінтажним та антикварним механічним годинникам, за необхідності проводимо репасаж та комплексне обслуговування механізму. Також проводимо реставрацію з метою усунення косметичних недоліків, коли це можливо та доречно.",
    },
    {
      q: "Де ви знаходите годинники?",
      a: "Наші годинники приїжджають із США, Канади, Японії, Франції та інших куточків світу. Ми завжди у пошуках краси, зокрема з міжнародних аукціонів.",
    },
    {
      q: "Як ви перевіряєте чи дійсно годинник автентичний?",
      a: "Ретельна перевірка у спеціалізованій майстерні, увага до деталей та 5-річний досвід.",
    },
  ];

  const wrapperRef = useFadeInOnView();

  return (
    <section className="faq-section" ref={wrapperRef}>
      <h2>Поширені запитання:</h2>
      {items.map((it, i) => (
        <div className="faq-item" key={i}>
          <button
            className="faq-question"
            aria-expanded={open === i}
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
          >
            {it.q}
          </button>
          <div
            className="faq-answer"
            style={{
              display: open === i ? "block" : "none",
            }}
          >
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

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
  // нічого критичного в DOMContentLoaded більше не потрібно — все в React
  return (
    <>
      {/* Header */}
      <Header />

      {/* Gallery */}
      <ScrollGallery />

      {/* Instagram floating link */}
      <InstagramLink />

      {/* About */}
      <AboutSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </>
  );
}