import SplitReveal from "./SplitReveal";

const VALUES = [
  {
    title: "Écoute & conseil",
    text: "Nous prenons le temps de comprendre votre vue, votre visage et vos habitudes avant de vous conseiller.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="4" pathLength={1} />
        <path d="M8 21l3-4" pathLength={1} />
      </svg>
    ),
  },
  {
    title: "Sélection exigeante",
    text: "Chaque monture de la boutique est choisie pour sa qualité de fabrication autant que pour son style.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" pathLength={1} />
        <path d="M8 12.3l2.6 2.6L16 9.3" pathLength={1} />
      </svg>
    ),
  },
  {
    title: "Précision technique",
    text: "Mesures digitales et centrage rigoureux\u00a0: chaque paire est ajustée pour un confort immédiat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9V5a1 1 0 0 1 1-1h4" pathLength={1} />
        <path d="M20 9V5a1 1 0 0 0-1-1h-4" pathLength={1} />
        <path d="M4 15v4a1 1 0 0 0 1 1h4" pathLength={1} />
        <path d="M20 15v4a1 1 0 0 1-1 1h-4" pathLength={1} />
        <circle cx="12" cy="12" r="3" pathLength={1} />
      </svg>
    ),
  },
  {
    title: "Suivi dans le temps",
    text: "Réglages, entretien, ajustements\u00a0: nous restons disponibles bien après votre achat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 14-5.3" pathLength={1} />
        <path d="M20 12a8 8 0 0 1-14 5.3" pathLength={1} />
        <path d="M18 3.7v4h-4" pathLength={1} />
        <path d="M6 20.3v-4h4" pathLength={1} />
      </svg>
    ),
  },
];

export default function Values() {
  return (
    <section className="values">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Pourquoi Optik de Lyon</span>
          <SplitReveal className="section-title" parts={[{ text: "Le détail, à chaque" }, { text: "étape.", emphasis: true }]} />
        </div>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div className="value-item reveal" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
