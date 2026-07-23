"use client";

import { useEffect, useRef, useState } from "react";
import SplitReveal from "./SplitReveal";

const STYLES = [
  {
    title: "Ronde",
    text: "Adoucit les traits marqués, pour une allure intemporelle et un brin littéraire.",
    icon: (
      <svg viewBox="0 0 140 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="38" cy="35" r="26" />
        <circle cx="102" cy="35" r="26" />
        <path d="M64 33q6-6 12 0" />
        <line x1="12" y1="28" x2="2" y2="20" />
        <line x1="128" y1="28" x2="138" y2="20" />
      </svg>
    ),
  },
  {
    title: "Rectangulaire",
    text: "Des lignes nettes et structurées, pour un style sobre et résolument actuel.",
    icon: (
      <svg viewBox="0 0 140 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="14" width="52" height="40" rx="8" />
        <rect x="76" y="14" width="52" height="40" rx="8" />
        <path d="M64 30h12" />
        <line x1="12" y1="24" x2="2" y2="17" />
        <line x1="128" y1="24" x2="138" y2="17" />
      </svg>
    ),
  },
  {
    title: "Aviateur",
    text: "Le classique par excellence\u00a0: une silhouette fine, pour un regard affirmé.",
    icon: (
      <svg viewBox="0 0 140 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14,28 C14,14 26,8 38,9 C50,8 62,16 62,28 C62,44 50,56 36,56 C23,56 14,42 14,28 Z" />
        <path d="M78,28 C78,14 90,8 102,9 C114,8 126,16 126,28 C126,44 114,56 100,56 C87,56 78,42 78,28 Z" />
        <path d="M64 20q6-5 12 0" />
        <line x1="14" y1="20" x2="3" y2="12" />
        <line x1="126" y1="20" x2="137" y2="12" />
      </svg>
    ),
  },
  {
    title: "Œil-de-chat",
    text: "Des angles relevés qui redessinent le regard vers le haut, avec caractère.",
    icon: (
      <svg viewBox="0 0 140 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="19" width="50" height="32" rx="15" />
        <rect x="77" y="19" width="50" height="32" rx="15" />
        <path d="M63 30h14" />
        <path d="M20,22 L4,9 L23,25 Z" fill="currentColor" stroke="none" opacity="0.92" />
        <path d="M120,22 L136,9 L117,25 Z" fill="currentColor" stroke="none" opacity="0.92" />
        <line x1="13" y1="33" x2="2" y2="27" />
        <line x1="127" y1="33" x2="138" y2="27" />
      </svg>
    ),
  },
  {
    title: "Oversize",
    text: "Une monture généreuse qui prend de la place — dans le bon sens du terme.",
    icon: (
      <svg viewBox="0 0 140 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="56" height="54" rx="22" />
        <rect x="76" y="6" width="56" height="54" rx="22" />
        <path d="M66 30h8" />
        <line x1="8" y1="22" x2="1" y2="16" />
        <line x1="132" y1="22" x2="139" y2="16" />
      </svg>
    ),
  },
];

export default function StylesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const userInteractedRef = useRef(false);

  // Prev/next scroll-snap navigation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    function refresh() {
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth - 2;
      setPrevDisabled(track.scrollLeft <= 2);
      setNextDisabled(track.scrollLeft >= max);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          refresh();
          ticking = false;
        });
      }
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  function step() {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".style-card");
    return card ? card.getBoundingClientRect().width + 22 : 260;
  }
  function goPrev() {
    userInteractedRef.current = true;
    trackRef.current?.scrollBy({ left: -step(), behavior: "smooth" });
  }
  function goNext() {
    userInteractedRef.current = true;
    trackRef.current?.scrollBy({ left: step(), behavior: "smooth" });
  }

  // Gentle autoplay — pauses on hover/touch, stops for good once the person steers manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;

    function advance() {
      if (paused || userInteractedRef.current || !track) return;
      const max = track.scrollWidth - track.clientWidth - 2;
      if (track.scrollLeft >= max) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step(), behavior: "smooth" });
      }
    }

    const timer = window.setInterval(advance, 3600);
    function pause() {
      paused = true;
    }
    function resume() {
      paused = false;
    }
    function stopForGood() {
      userInteractedRef.current = true;
    }

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });
    track.addEventListener("wheel", stopForGood, { passive: true });
    track.addEventListener("pointerdown", stopForGood);

    return () => {
      window.clearInterval(timer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
      track.removeEventListener("wheel", stopForGood);
      track.removeEventListener("pointerdown", stopForGood);
    };
  }, []);

  // 3D tilt + glare on cards
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".styles .style-card"));

    function onMove(this: HTMLElement, e: MouseEvent) {
      const r = this.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      this.style.transform = `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
      this.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(1) + "%");
      this.style.setProperty("--my", ((py + 0.5) * 100).toFixed(1) + "%");
    }
    function onLeave(this: HTMLElement) {
      this.style.transform = "perspective(800px)";
    }

    cards.forEach((card) => {
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <section className="styles" id="styles">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Nos styles</span>
          <SplitReveal
            className="section-title"
            parts={[{ text: "Trouvez la monture qui vous" }, { text: "ressemble.", emphasis: true }]}
          />
          <p className="section-lede">
            Chaque visage a sa géométrie. Voici quelques-unes des silhouettes que l&apos;on retrouve dans notre
            sélection — à essayer, à mélanger, à faire sienne.
          </p>
        </div>
        <div className="carousel-wrap">
          <div className="styles-grid" id="stylesCarousel" ref={trackRef}>
            {STYLES.map((s) => (
              <article className="style-card reveal" data-tilt key={s.title}>
                <span className="card-glare" aria-hidden="true" />
                <div className="style-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div className="carousel-nav">
            <button
              type="button"
              className="carousel-btn"
              id="carPrev"
              aria-label="Style précédent"
              onClick={goPrev}
              disabled={prevDisabled}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-btn"
              id="carNext"
              aria-label="Style suivant"
              onClick={goNext}
              disabled={nextDisabled}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
