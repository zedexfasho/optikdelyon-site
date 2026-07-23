"use client";

import { useEffect } from "react";

export default function GlowParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-glow-drift]"));
    if (!els.length) return;

    let running = false;
    let raf = 0;
    const active = new Set<HTMLElement>();

    function tick() {
      active.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(-0.3, Math.min(1.3, (vh - r.top) / (vh + r.height)));
        const shift = (progress - 0.5) * 90;
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
      if (running) raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target as HTMLElement);
          else active.delete(entry.target as HTMLElement);
        });
        if (active.size && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!active.size && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
