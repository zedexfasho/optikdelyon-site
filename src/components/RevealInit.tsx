"use client";

import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const groupCounters: Record<string, number> = {};

    items.forEach((el) => {
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      if (!parent.dataset.revealGroup) {
        parent.dataset.revealGroup = "g" + Math.random().toString(36).slice(2);
      }
      const key = parent.dataset.revealGroup;
      groupCounters[key] = groupCounters[key] || 0;
      el.style.setProperty("--d", groupCounters[key] * 90 + "ms");
      groupCounters[key]++;
    });

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
