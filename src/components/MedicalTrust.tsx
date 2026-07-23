import Image from "next/image";
import SplitReveal from "./SplitReveal";

const POINTS = [
  {
    title: "Test de vue rigoureux",
    text: "Votre test de vue est réalisé avec la rigueur d'un ophtalmologue, pour une mesure fiable de votre correction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-6.5 10-6.5 10 6.5 10 6.5-4 6.5-10 6.5-10-6.5-10-6.5z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    title: "Instruments de précision",
    text: "Une lampe à fente et des instruments de mesure adaptés, pour un résultat précis dès le premier test.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v4M14 2v4M5 8h14l-1.4 10.3A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.7L5 8z" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "Conseil personnalisé",
    text: "En fonction des résultats de votre test, notre équipe vous conseille la correction et la monture les plus adaptées.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 14-5.3" />
        <path d="M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18 3.7v4h-4" />
        <path d="M6 20.3v-4h4" />
      </svg>
    ),
  },
];

const PHOTOS = [
  {
    src: "/images/medical/consultation-enfant.jpg",
    alt: "Test de vue d'un jeune patient à la lampe à fente",
    caption: "Tests de vue adaptés à tous les âges",
  },
  {
    src: "/images/medical/examen-lampe-fente.jpg",
    alt: "Test de vue à la lampe à fente",
    caption: "Un examen mené avec rigueur",
  },
  {
    src: "/images/medical/selection-monture.jpg",
    alt: "Sélection de monture adaptée à la correction visuelle",
    caption: "Du test de vue au choix de la monture",
  },
] as const;

export default function MedicalTrust() {
  return (
    <section className="medical" id="medical">
      <div className="medical-glow" data-glow-drift="1" aria-hidden="true" />
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Un niveau d&apos;expertise en plus</span>
          <SplitReveal
            className="section-title on-ink"
            parts={[{ text: "Un test de vue mené avec" }, { text: "précision.", emphasis: true }]}
          />
          <p className="section-lede">
            Chez Optik de Lyon, les tests de vue sont réalisés avec la rigueur d&apos;un ophtalmologue&nbsp;: un
            niveau d&apos;exigence qui va au-delà du simple contrôle de correction.
          </p>
        </div>
        <div className="medical-grid">
          {POINTS.map((p) => (
            <div className="medical-card reveal" key={p.title}>
              <div className="medical-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <div className="medical-photos">
          {PHOTOS.map((photo) => (
            <figure className="medical-photo reveal" key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        {/*
          TODO (Mohamed) : dès que vous avez le nom et les qualifications de l'ophtalmologue
          (titre, spécialité, années d'expérience, ordre professionnel), on pourra nommer un
          praticien en particulier et enrichir sa légende — pour l'instant les photos restent
          volontairement génériques ("nos prestataires"), sans identité précise.
        */}
      </div>
    </section>
  );
}
