import { useEffect, useMemo, useRef } from "react";

/* локальний fade-in хук */
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

  const wrapRef = useRef(null);

  const pageWidth = () => wrapRef.current?.clientWidth || 0;

  const scrollLeft = () => {
    wrapRef.current?.scrollBy({ left: -pageWidth(), behavior: "smooth" });
  };
  const scrollRight = () => {
    wrapRef.current?.scrollBy({ left: pageWidth(), behavior: "smooth" });
  };

  // Arrow keys support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };
    const el = wrapRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="review-slider-section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <FadeInSection>
          <h2 className="section-title" id="testimonials-title">Відгуки наших клієнтів 💌</h2>

          {/* стилі прямо тут */}
          <style>{`
            .review-slider { position: relative; }
            .review-slider::before,
            .review-slider::after{
              content:""; position:absolute; top:0; bottom:0; width:60px; pointer-events:none;
            }
            .review-slider::before{
              left:0; background: linear-gradient(90deg, rgba(31,31,31,1), rgba(31,31,31,0));
            }
            .review-slider::after{
              right:0; background: linear-gradient(-90deg, rgba(31,31,31,1), rgba(31,31,31,0));
            }

            .review-track{
              display:flex; gap:1rem; overflow-x:auto; scroll-snap-type:x mandatory;
              -webkit-overflow-scrolling:touch; scrollbar-width:none; padding: 4px 0 8px;
            }
            .review-track::-webkit-scrollbar{ display:none; }

            /* ширина карток: 1 / 2 / 3 в ряд */
            .review-slide{ flex:0 0 85%; scroll-snap-align:start; }
            @media (min-width: 768px){ .review-slide{ flex-basis: 48%; } }
            @media (min-width: 1200px){ .review-slide{ flex-basis: 31%; } }

            .review-slide img{ width:100%; height:auto; border-radius:12px; display:block; }

            .nav-btn{
              position:absolute; top:50%; transform:translateY(-50%);
              display:inline-flex; align-items:center; justify-content:center;
              width:40px; height:40px; border-radius:999px; border:none;
              background: rgba(0,0,0,.55); color:#fff; cursor:pointer; z-index:5;
              box-shadow: 0 6px 20px rgba(0,0,0,.25);
            }
            .nav-btn:hover, .nav-btn:focus-visible{ background: rgba(0,0,0,.75); outline:none; }
            .nav-btn.left{ left:6px; }
            .nav-btn.right{ right:6px; }
            .nav-icon{ width:22px; height:22px; }
          `}</style>

          <div className="review-slider">
            <button className="nav-btn left" onClick={scrollLeft} aria-label="Попередній відгук">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.5 19.5L8 12l7.5-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div
              ref={wrapRef}
              className="review-track"
              role="region"
              aria-label="Customer testimonials, horizontal scroll"
              tabIndex={0}
            >
              {reviewImages.map((src, i) => (
                <div className="review-slide" key={i} aria-roledescription="slide" aria-label={`Відгук ${i + 1} з ${reviewImages.length}`}>
                  <img src={src} alt={`Відгук ${i + 1}`} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>

            <button className="nav-btn right" onClick={scrollRight} aria-label="Наступний відгук">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.5 4.5L16 12l-7.5 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

export default Testimonials;