"use client";

import { useEffect } from "react";

export default function MagneticButtons() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn"));

    function onMove(this: HTMLElement, e: MouseEvent) {
      const r = this.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      this.style.transform = `translate(${(mx * 0.22).toFixed(1)}px,${(my * 0.32 - 3).toFixed(1)}px)`;
    }
    function onLeave(this: HTMLElement) {
      this.style.transform = "";
    }

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}
