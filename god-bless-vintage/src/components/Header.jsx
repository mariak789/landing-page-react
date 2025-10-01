import { useEffect, useRef } from "react";

// локальний хук для fade-in
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

export default Header;