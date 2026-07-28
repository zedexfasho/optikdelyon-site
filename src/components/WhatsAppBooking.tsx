"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "221777684656";

const REASONS = [
  {
    id: "examen",
    label: "Examen de la vue",
    text: "un examen de la vue",
  },
  {
    id: "monture",
    label: "Choisir une monture",
    text: "essayer des montures",
  },
  {
    id: "ordonnance",
    label: "Renouveler mon ordonnance",
    text: "renouveler mon ordonnance",
  },
  {
    id: "autre",
    label: "Autre demande",
    text: "en savoir plus",
  },
] as const;

const MOMENTS = [
  { id: "asap", label: "Dès que possible" },
  { id: "week", label: "Cette semaine" },
  { id: "month", label: "Ce mois-ci" },
  { id: "any", label: "Peu importe" },
] as const;

type ReasonId = (typeof REASONS)[number]["id"];
type MomentId = (typeof MOMENTS)[number]["id"];

interface WhatsAppBookingContextValue {
  openBooking: () => void;
}

const WhatsAppBookingContext = createContext<WhatsAppBookingContextValue | null>(null);

export function useWhatsAppBooking() {
  const ctx = useContext(WhatsAppBookingContext);
  if (!ctx) {
    throw new Error("useWhatsAppBooking must be used within a WhatsAppBookingProvider");
  }
  return ctx;
}

export function WhatsAppBookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<ReasonId | null>(null);
  const [moment, setMoment] = useState<MomentId | null>(null);
  const [name, setName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const openBooking = useCallback(() => {
    setIsOpen(true);
    setReason(null);
    setMoment(null);
    setName("");
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isOpen && e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function buildMessage() {
    const reasonObj = REASONS.find((r) => r.id === reason);
    let msg = `Bonjour Optik de Lyon 👋 Je souhaite ${reasonObj ? reasonObj.text : "prendre rendez-vous"}.`;
    if (name.trim()) msg += ` Je m'appelle ${name.trim()}.`;
    const momentObj = MOMENTS.find((m) => m.id === moment);
    if (momentObj) msg += ` Disponibilité souhaitée : ${momentObj.label.toLowerCase()}.`;
    return msg;
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;

  return (
    <WhatsAppBookingContext.Provider value={{ openBooking }}>
      {children}

      <div
        className={`wa-modal${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Prendre rendez-vous par WhatsApp"
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="wa-modal-card">
          <button className="wa-close" aria-label="Fermer" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <span className="wa-eyebrow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon-sm">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.2 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" />
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z" />
            </svg>
            RDV par WhatsApp
          </span>
          <h3 className="wa-title">Dites-nous ce qu&apos;il vous faut</h3>
          <p className="wa-sub">Deux ou trois précisions, et on vous ouvre WhatsApp avec un message déjà prêt.</p>

          <div className="wa-field-label">Votre besoin</div>
          <div className="wa-reason-grid">
            {REASONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`wa-reason-btn${reason === r.id ? " is-selected" : ""}`}
                onClick={() => setReason(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="wa-field-label">Votre disponibilité (optionnel)</div>
          <div className="wa-moment-grid">
            {MOMENTS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`wa-moment-btn${moment === m.id ? " is-selected" : ""}`}
                onClick={() => setMoment(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <label className="wa-field-label" htmlFor="wa-name">
            Votre prénom (optionnel)
          </label>
          <input
            id="wa-name"
            className="wa-input"
            type="text"
            placeholder="Ex. Awa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
          />

          {reason ? (
            <a href={waLink} target="_blank" rel="noopener" className="btn btn-red wa-send" onClick={close}>
              Continuer sur WhatsApp
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : (
            <button type="button" className="btn btn-red wa-send" disabled>
              Continuer sur WhatsApp
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          )}
          {!reason && <p className="wa-hint">Choisissez d&apos;abord un besoin ci-dessus.</p>}
        </div>
      </div>
    </WhatsAppBookingContext.Provider>
  );
}
