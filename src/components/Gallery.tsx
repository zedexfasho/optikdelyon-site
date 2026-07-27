"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/gallery";
import Lightbox from "./Lightbox";
import SplitReveal from "./SplitReveal";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="gallery" id="galerie">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Dans notre boutique</span>
          <SplitReveal className="section-title on-ink" parts={[{ text: "L'univers Optik de Lyon, en images." }]} />
          <p className="section-lede">
            Un aperçu de notre espace et de notre sélection, capturé au fil des jours à Liberté 6 Extension.
          </p>
        </div>
        <div className="gallery-grid reveal" id="galleryGrid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              type="button"
              className="g-item"
              key={photo.src}
              onClick={() => setOpenIndex(i)}
              aria-label={`Agrandir : ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 50vw, 25vw"
                style={{ width: "100%", height: "auto" }}
              />
              <span className="g-zoom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={GALLERY_PHOTOS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(i) => setOpenIndex(i)}
      />
    </section>
  );
}
