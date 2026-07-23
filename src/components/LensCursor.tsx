"use client";

import { useEffect, useRef } from "react";

export default function LensCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0,
      y = 0,
      rx = 0,
      ry = 0;
    let raf = 0;

    function onMouseMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      ring?.classList.add("is-visible");
    }
    function onMouseLeave() {
      ring?.classList.remove("is-visible");
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    function loop() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const lightZones = Array.from(
      document.querySelectorAll(".hero, .about, .gallery, .cta, footer")
    );
    const targets = Array.from(document.querySelectorAll("a, button, .style-card, .g-item"));

    function onEnter(this: Element) {
      const onDark = lightZones.some((z) => z.contains(this));
      ring?.classList.add(onDark ? "is-active-light" : "is-active");
    }
    function onLeave() {
      ring?.classList.remove("is-active", "is-active-light");
    }

    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div className="lens-ring" ref={ringRef} aria-hidden="true" />;
}
