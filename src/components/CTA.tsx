"use client";

import { useWhatsAppBooking } from "./WhatsAppBooking";
import SplitReveal from "./SplitReveal";

export default function CTA() {
  const { openBooking } = useWhatsAppBooking();
  return (
    <section className="cta" id="contact">
      <div className="cta-glow" data-glow-drift="1" aria-hidden="true" />
      <div className="container cta-grid">
        <div className="cta-text reveal">
          <span className="eyebrow">Rendez-vous</span>
          <SplitReveal parts={[{ text: "Offrons à votre regard un moment rien qu'à lui." }]} />
          <p>
            Réservez votre créneau ou passez simplement nous voir à la boutique. Nous sommes à votre écoute du lundi
            au samedi.
          </p>
          <div className="cta-actions">
            <button type="button" className="btn btn-red" onClick={openBooking}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.2 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" />
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z" />
              </svg>
              RDV par WhatsApp
            </button>
            <a href="tel:+221777684656" className="btn btn-ghost-light">
              Appeler la boutique
            </a>
          </div>
        </div>
        <div className="cta-card reveal">
          <h3>Optik de Lyon</h3>
          <div className="cta-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Liberté 6 Extension, Dakar, Sénégal</span>
          </div>
          <div className="cta-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L7.9 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z" />
            </svg>
            <a href="tel:+221777684656">+221 77 768 46 56</a>
          </div>
          <div className="cta-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <a href="mailto:optikdelyon@gmail.com">optikdelyon@gmail.com</a>
          </div>
          <div className="cta-map">
            <iframe
              src="https://www.google.com/maps?q=14.7271843,-17.471077&z=17&output=embed"
              loading="lazy"
              title="Localisation de la boutique Optik de Lyon"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
