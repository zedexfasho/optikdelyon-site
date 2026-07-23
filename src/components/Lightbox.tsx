"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchXRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Crossfade whenever the visible photo changes
  useEffect(() => {
    if (!isOpen) return;
    setVisible(false);
    const id = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isOpen || index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, index, photos.length, onClose, onNavigate]);

  function handleTouchStart(e: React.TouchEvent) {
    touchXRef.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchXRef.current === null || index === null) return;
    const dx = e.changedTouches[0].clientX - touchXRef.current;
    if (Math.abs(dx) > 40) {
      onNavigate((index + (dx > 0 ? -1 : 1) + photos.length) % photos.length);
    }
    touchXRef.current = null;
  }

  const photo = index !== null ? photos[index] : null;

  return (
    <div
      className={`lightbox${isOpen ? " is-open" : ""}`}
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'image"
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lb-btn lb-close" id="lbClose" aria-label="Fermer" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <button
        className="lb-btn lb-prev"
        id="lbPrev"
        aria-label="Image précédente"
        onClick={() => index !== null && onNavigate((index - 1 + photos.length) % photos.length)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <span className="lb-counter" id="lbCounter">
        {index !== null ? `${index + 1} / ${photos.length}` : ""}
      </span>
      <figure>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img id="lbImg" src={photo.src} alt={photo.alt} style={{ opacity: visible ? 1 : 0 }} />
        )}
        <figcaption id="lbCaption">{photo?.alt ?? ""}</figcaption>
      </figure>
      <button
        className="lb-btn lb-next"
        id="lbNext"
        aria-label="Image suivante"
        onClick={() => index !== null && onNavigate((index + 1) % photos.length)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
