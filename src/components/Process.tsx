import SplitReveal from "./SplitReveal";

const STEPS = [
  {
    index: "01",
    title: "Examen de la vue",
    text: "Un contrôle rigoureux et sans précipitation, mené par une équipe qualifiée, pour connaître précisément vos besoins.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-6.5 10-6.5 10 6.5 10 6.5-4 6.5-10 6.5-10-6.5-10-6.5z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Choix de la monture",
    text: "Nous vous accompagnons vers la monture qui sert votre morphologie, votre style et votre manière de vivre.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M11 12h2M2.5 10.5 3 12l-.5 1.5M21.5 10.5 21 12l.5 1.5" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Ajustement & mesures",
    text: "Centrage et réglages digitaux effectués avec précision, pour une adaptation immédiate dès la sortie de la boutique.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
        <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section className="process" id="expertise">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Votre parcours chez nous</span>
          <SplitReveal className="section-title" parts={[{ text: "Votre visite, en trois temps." }]} />
          <p className="section-lede">
            Un protocole simple et rigoureux, pensé pour que chaque paire qui sort de la boutique soit la bonne — dès
            le premier jour.
          </p>
        </div>
        <div className="process-grid">
          {STEPS.map((step) => (
            <div className="step-card reveal" key={step.index}>
              <span className="step-index">{step.index}</span>
              <div className="step-icon-wrap">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
