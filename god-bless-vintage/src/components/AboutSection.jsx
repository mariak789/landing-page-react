import { useEffect, useRef } from "react";

function useFadeInOnView() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
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

function AboutSection() {
  return (
    <section className="about-section" id="about" aria-label="About the shop">
      <div className="container">
        <FadeInSection>
          <div className="grid">
            <img
              src="images/maria1.JPEG"
              alt="Maria, owner of the shop"
              className="about-image-round"
              loading="lazy"
              decoding="async"
              width="320"
              height="420"
            />
            <div className="measure">
              <p>
                Ми локальна крамничка вінтажних годинників з душею та характером зі Львова,
                заснована у 2019 році.
              </p>
              <p>
                У нашому затишному корнері представлені вінтажні та антикварні годинники з
                багатьох куточків світу, автентична швейцарська механіка, елегантні годинники
                французької, данської та інших європейських мануфактур. Чому саме вінтаж?
                Вінтаж — про характер, неповторний вайб та якість, перевірені часом.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

export default AboutSection;