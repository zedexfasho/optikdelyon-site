"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useWhatsAppBooking } from "./WhatsAppBooking";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const FLOAT_CARDS = [
  { className: "pf-wrap--a", depth: 0.55, src: "/images/hero/float-a.jpg", alt: "Monture de la sélection Optik de Lyon" },
  { className: "pf-wrap--b", depth: 0.9, src: "/images/hero/float-b.jpg", alt: "Lunettes présentées par Optik de Lyon" },
  { className: "pf-wrap--c", depth: 0.7, src: "/images/hero/float-c.jpg", alt: "Détail d'une monture Optik de Lyon" },
  { className: "pf-wrap--d", depth: 0.4, src: "/images/hero/float-d.jpg", alt: "Monture optique Optik de Lyon" },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useWhatsAppBooking();

  // Photo levitation parallax (mouse-driven)
  useEffect(() => {
    const heroEl = heroRef.current;
    const floatWrap = floatRef.current;
    if (!heroEl || !floatWrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const wraps = Array.from(floatWrap.querySelectorAll<HTMLElement>(".pf-wrap"));

    function onMouseMove(e: MouseEvent) {
      const r = heroEl!.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      wraps.forEach((w) => {
        const depth = parseFloat(w.dataset.depth || "0.5");
        w.style.transform = `translate(${(mx * 46 * depth).toFixed(1)}px,${(my * 32 * depth).toFixed(1)}px)`;
      });
    }
    function onMouseLeave() {
      wraps.forEach((w) => {
        w.style.transform = "";
      });
    }

    heroEl.addEventListener("mousemove", onMouseMove, { passive: true });
    heroEl.addEventListener("mouseleave", onMouseLeave);
    return () => {
      heroEl.removeEventListener("mousemove", onMouseMove);
      heroEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Cinematic scroll-exit: the hero recedes as you scroll into the site
  useEffect(() => {
    const heroEl = heroRef.current;
    const textEl = textRef.current;
    const visualEl = visualRef.current;
    if (!heroEl || !textEl || !visualEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let running = false;
    let raf = 0;

    function tick() {
      if (!heroEl || !textEl || !visualEl) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / heroEl.offsetHeight));
      textEl.style.opacity = String(1 - progress * 0.9);
      textEl.style.transform = `translateY(${(progress * 50).toFixed(1)}px)`;
      visualEl.style.opacity = String(1 - progress * 0.7);
      visualEl.style.transform = `translateY(${(progress * 70).toFixed(1)}px) scale(${(1 - progress * 0.08).toFixed(3)})`;
      if (running) raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(tick);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        });
      },
      { rootMargin: "0px" }
    );
    io.observe(heroEl);
    tick();

    return () => {
      io.disconnect();
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="accueil" ref={heroRef}>
      <div className="hero-grain" aria-hidden="true" />
      <div className="container hero-row">
        <div className="hero-text" ref={textRef}>
          <span className="eyebrow">Opticien &amp; expert visuel — Dakar</span>
          <h1>
            Le monde,
            <br />
            <em>enfin net.</em>
          </h1>
          <p className="lede">
            Optik de Lyon accompagne votre vue à Dakar&nbsp;: examen rigoureux, montures choisies avec soin et
            ajustement pensé pour votre visage, votre style et votre quotidien.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-red" onClick={openBooking}>
              Prendre rendez-vous
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#styles" className="btn btn-ghost-light">
              Découvrir nos styles
            </a>
          </div>
          <div className="hero-meta">
            <span className="dot" />
            Liberté 6 Extension, Dakar — ouvert du lundi au samedi
          </div>
        </div>
        <div className="hero-visual" ref={visualRef}>
          <Hero3D />
          <div className="photo-float" id="photoFloat" ref={floatRef}>
            {FLOAT_CARDS.map((card) => (
              <div className={`pf-wrap ${card.className}`} data-depth={card.depth} key={card.className}>
                <figure className={`pf-card pf-card--${card.className.slice(-1)}`}>
                  <Image src={card.src} alt={card.alt} fill sizes="260px" style={{ objectFit: "cover" }} priority />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Faites défiler</span>
        <span className="line" />
      </div>
    </section>
  );
}
