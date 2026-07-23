const CATEGORIES = [
  {
    href: "#expertise",
    title: "Vue",
    text: "Examen complet mené par une équipe qualifiée.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-6.5 10-6.5 10 6.5 10 6.5-4 6.5-10 6.5-10-6.5-10-6.5z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    href: "#boutique",
    title: "Optique",
    text: "Montures de vue sélectionnées, pour chaque visage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M11 12h2" />
      </svg>
    ),
  },
  {
    href: "#galerie",
    title: "Solaire",
    text: "Lunettes de soleil de notre sélection du moment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.3l2.6 2.6L16 9.3" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="categories" aria-label="Nos univers">
      <div className="container">
        <div className="cat-grid">
          {CATEGORIES.map((cat) => (
            <a key={cat.href} href={cat.href} className="cat-card reveal">
              <span className="cat-icon" aria-hidden="true">
                {cat.icon}
              </span>
              <span className="cat-body">
                <h3>{cat.title}</h3>
                <p>{cat.text}</p>
              </span>
              <span className="cat-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
