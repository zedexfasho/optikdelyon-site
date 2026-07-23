"use client";

import { useEffect, useRef, useState } from "react";
import { useWhatsAppBooking } from "./WhatsAppBooking";

const NAV_LINKS = [
  { href: "#expertise", label: "L'expertise" },
  { href: "#boutique", label: "La boutique" },
  { href: "#styles", label: "Nos styles" },
  { href: "#galerie", label: "Galerie" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openBooking } = useWhatsAppBooking();

  // Header scroll state
  useEffect(() => {
    function onScroll() {
      setIsScrolled((window.scrollY || window.pageYOffset) > 60);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  // Scrollspy — active nav link
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !("IntersectionObserver" in window)) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const map: Record<string, HTMLAnchorElement> = {};
    links.forEach((a) => {
      map[a.getAttribute("href")!.slice(1)] = a;
    });
    const sections = Object.keys(map)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = map[entry.target.id];
          if (!link || !entry.isIntersecting) return;
          links.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="siteHeader" ref={headerRef}>
        <div className="container nav-row">
          <a href="#accueil" className="brand" aria-label="Optik de Lyon — accueil">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="ic-stroke"
                d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8-13-8-13-8z"
                stroke="var(--white-soft)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle className="ic-pupil" cx="16" cy="16" r="3.6" fill="var(--red)" />
            </svg>
            <span className="brand-word">OPTIK</span>
            <span className="brand-word2">de Lyon</span>
          </a>
          <nav className="nav-links" aria-label="Navigation principale" ref={navRef}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <button type="button" className="btn btn-red nav-cta" onClick={openBooking}>
              Prendre rendez-vous
            </button>
          </nav>
          <button
            className="burger"
            id="burgerBtn"
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobileNav"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav className={`mobile-nav${isMenuOpen ? " is-open" : ""}`} id="mobileNav" aria-label="Menu mobile">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="btn btn-red"
          onClick={() => {
            closeMenu();
            openBooking();
          }}
        >
          Prendre rendez-vous
        </button>
      </nav>
    </>
  );
}
