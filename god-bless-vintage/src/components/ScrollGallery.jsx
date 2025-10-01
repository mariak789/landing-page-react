import { useEffect, useMemo, useRef } from "react";

// простий автоскрол по горизонталі
function AutoScrollRow({ children, speed = 0.4 }) {
  const containerRef = useRef(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId;
    let last = performance.now();

    const step = (now) => {
      const dt = now - last;
      last = now;
      if (!stopRef.current) el.scrollLeft += speed * dt;
      const maxScroll = el.scrollWidth - el.clientWidth - 1;
      if (el.scrollLeft >= maxScroll) el.scrollLeft = 0;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) stopRef.current = true;
  }, []);

  return (
    <div
      ref={containerRef}
      className="scroll-gallery"
      style={{ overflowX: "auto", whiteSpace: "nowrap", scrollBehavior: "auto" }}
      id="auto-scroll-gallery"
      onMouseEnter={() => (stopRef.current = true)}
      onMouseLeave={() => (stopRef.current = false)}
      onFocus={() => (stopRef.current = true)}
      onBlur={() => (stopRef.current = false)}
    >
      {children}
    </div>
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
          <img
            src={src}
            alt={i === 0 || i === 5 ? "90s vintage watches" : "vintage watch"}
            loading="lazy"
          />
        </div>
      ))}
    </AutoScrollRow>
  );
}

export default ScrollGallery;