"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SplitReveal from "./SplitReveal";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const accentImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const main = mainImgRef.current;
    const accent = accentImgRef.current;
    if (!section || !main || !accent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let raf = 0;

    function update() {
      if (!section || !main || !accent) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      let progress = (vh - r.top) / (vh + r.height);
      progress = Math.max(-0.15, Math.min(1.15, progress));
      const shift = (progress - 0.5) * 110;
      main.style.transform = `translateY(${(shift * 0.55).toFixed(1)}px) scale(1.14)`;
      accent.style.transform = `translateY(${(-shift * 0.95).toFixed(1)}px) scale(1.14)`;
      if (active) raf = requestAnimationFrame(update);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !active) {
            active = true;
            raf = requestAnimationFrame(update);
          } else if (!entry.isIntersecting) {
            active = false;
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    io.observe(section);
    update();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="about" id="boutique" ref={sectionRef}>
      <div className="about-glow" data-glow-drift="1" aria-hidden="true" />
      <div className="container about-grid">
        <div className="about-media reveal">
          <div className="main-photo">
            <Image
              ref={mainImgRef}
              src="/images/about/main-photo.jpg"
              alt="Devanture de la boutique Optik de Lyon, Liberté 6 Extension, Dakar"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
          <div className="accent-photo">
            <Image
              ref={accentImgRef}
              src="/images/about/accent-photo.jpg"
              alt="Intérieur de la boutique Optik de Lyon, présentoirs de montures"
              fill
              sizes="(max-width: 900px) 44vw, 22vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="about-text">
          <span className="eyebrow">Optik de Lyon</span>
          <SplitReveal className="section-title on-ink" parts={[{ text: "Une boutique pensée pour votre regard." }]} />
          <p>
            Nichée à Liberté 6 Extension, à Dakar, notre boutique réunit dans un même espace l&apos;exigence
            d&apos;un cabinet d&apos;optique et le raffinement d&apos;une adresse mode. Chaque monture de notre
            sélection est choisie avec la même attention que nous portons à votre vue.
          </p>
          <div className="about-quote reveal">« Une bonne vue commence par une bonne écoute. »</div>
          <p>
            Que vous veniez renouveler vos verres ou changer complètement de style, notre équipe prend le temps de
            comprendre ce que vous cherchez — et parfois, de vous surprendre.
          </p>
          <a href="#contact" className="btn btn-ghost-light">
            Nous rendre visite
          </a>
        </div>
      </div>
    </section>
  );
}
