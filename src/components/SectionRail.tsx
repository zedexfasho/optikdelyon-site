"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "accueil", label: "Accueil" },
  { id: "expertise", label: "Expertise" },
  { id: "medical", label: "Tests de vue" },
  { id: "boutique", label: "Boutique" },
  { id: "styles", label: "Styles" },
  { id: "galerie", label: "Galerie" },
  { id: "contact", label: "Rendez-vous" },
];

export default function SectionRail() {
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <nav className="section-rail" aria-label="Navigation rapide entre les sections">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`section-rail-dot${active === s.id ? " is-active" : ""}`}
          onClick={() => goTo(s.id)}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="section-rail-tip">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
