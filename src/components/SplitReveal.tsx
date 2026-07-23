"use client";

import { useEffect, useRef } from "react";

interface SplitRevealPart {
  text: string;
  emphasis?: boolean;
}

interface SplitRevealProps {
  parts: SplitRevealPart[];
  className?: string;
}

export default function SplitReveal({ parts, className = "" }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.classList.add("in-view");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIndex = 0;

  return (
    <h2 className={`split-reveal ${className}`} ref={ref}>
      {parts.map((part, pi) => {
        const words = part.text.split(" ");
        const Wrapper = part.emphasis ? "em" : "span";
        return (
          <Wrapper key={pi}>
            {words.map((word, wi) => {
              const idx = wordIndex++;
              return (
                <span className="sr-word" key={wi}>
                  <span className="sr-word-inner" style={{ transitionDelay: `${idx * 55}ms` }}>
                    {word}
                    {wi < words.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </h2>
  );
}
