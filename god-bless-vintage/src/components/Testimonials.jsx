import { useEffect, useMemo, useRef, useState } from "react";

// локальний fade-in хук
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

// простий автослайдер
function AutoSlider({ items = [], intervalMs = 2500 }) {
  const [idx, setIdx] = useState(0);
  const wrap = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const child = el.children[idx];
    if (child) el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, [idx]);

  if (!items.length) return null;

  return (
    <div className="review-slider">
      <div
        ref={wrap}
        className="review-track"
        style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollSnapType: "x mandatory" }}
      >
        {items.map((src, i) => (
          <div className="review-slide" key={i} style={{ flex: "0 0 85%", scrollSnapAlign: "start" }}>
            <img src={src} alt={`Відгук ${i + 1}`} loading='lazy' />
          </div>
        ))}
      </div>
    </div>
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

export default Testimonials;