const ITEMS = [
  "Examen de vue",
  "Montures sélectionnées",
  "Verres sur-mesure",
  "Conseil personnalisé",
  "Liberté 6, Dakar",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          {ITEMS.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
        <span>
          {ITEMS.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>
    </div>
  );
}
