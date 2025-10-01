import { useEffect, useRef, useState } from "react";

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

function FAQ() {
  const [open, setOpen] = useState(0);
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
        <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
          <button
            className="faq-question"
            aria-expanded={open === i}
            aria-controls={`faq-panel-${i}`}
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
          >
            {it.q}
          </button>
        <div
            id={`faq-panel-${i}`}
            className="faq-answer"
            hidden={open !== i}
        >
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default FAQ;