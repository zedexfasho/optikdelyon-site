import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#accueil" className="brand" aria-label="Optic de Lyon — accueil">
              <Image src="/images/brand/logo.png" alt="Optic de Lyon" width={280} height={180} className="brand-logo" />
            </a>
            <p>
              Opticien &amp; expert visuel à Liberté 6 Extension, Dakar. Montures sélectionnées avec soin, examens
              rigoureux et accompagnement sur-mesure.
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/optik_delyon/"
                target="_blank"
                rel="noopener"
                aria-label="Optik de Lyon sur Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" />
                </svg>
              </a>
              <a
                href="https://wa.me/221777684656"
                target="_blank"
                rel="noopener"
                aria-label="Optik de Lyon sur WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.2 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" />
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="#expertise">L&apos;expertise</a>
              </li>
              <li>
                <a href="#boutique">La boutique</a>
              </li>
              <li>
                <a href="#styles">Nos styles</a>
              </li>
              <li>
                <a href="#galerie">Galerie</a>
              </li>
              <li>
                <a href="#contact">Rendez-vous</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>Liberté 6 Extension, Dakar</li>
              <li>
                <a href="tel:+221777684656">+221 77 768 46 56</a>
              </li>
              <li>
                <a href="mailto:optikdelyon@gmail.com">optikdelyon@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} Optik de Lyon. Tous droits réservés.</p>
          <p>Liberté 6 Extension, Dakar — Sénégal</p>
        </div>
        <p className="footer-credit">
          Site créé par MJC —{" "}
          <a href="mailto:cherifmj04@gmail.com">cherifmj04@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
