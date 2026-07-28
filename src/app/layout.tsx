import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import LensCursor from "@/components/LensCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatWhatsApp from "@/components/FloatWhatsApp";
import BackToTop from "@/components/BackToTop";
import RevealInit from "@/components/RevealInit";
import MagneticButtons from "@/components/MagneticButtons";
import GlowParallax from "@/components/GlowParallax";
import SectionRail from "@/components/SectionRail";
import { WhatsAppBookingProvider } from "@/components/WhatsAppBooking";
import { SITE_URL } from "@/lib/site";

// Polices hébergées localement (fichiers dans src/app/fonts) plutôt que via
// next/font/google : ça évite toute dépendance réseau vers Google Fonts au
// moment du build/dev (source des blocages "Request timed out" sur certains
// réseaux d'entreprise ou connexions filtrées).
const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display-raw",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/manrope-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-body-raw",
  display: "swap",
});

// Remplacez par le nom de domaine définitif une fois le site déployé.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Optik de Lyon — Opticien & Expert Visuel à Dakar",
  description:
    "Optik de Lyon, opticien à Liberté 6 Extension, Dakar. Examen de vue, montures sélectionnées avec soin et ajustement sur-mesure pour sublimer votre regard.",
  openGraph: {
    title: "Optik de Lyon — Opticien & Expert Visuel à Dakar",
    description:
      "Examen de vue, montures sélectionnées avec soin et ajustement sur-mesure. Liberté 6 Extension, Dakar.",
    images: ["/images/about/main-photo.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00284D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        <div className="film-grain" aria-hidden="true" />
        <WhatsAppBookingProvider>
          <ScrollProgress />
          <LensCursor />
          <a href="#main" className="skip-link">
            Aller au contenu
          </a>

          <Header />
          <SectionRail />

          <main id="main">{children}</main>

          <Footer />

          <FloatWhatsApp />
          <BackToTop />

          {/* Global, render-nothing behaviour: scroll-reveal + magnetic buttons + glow drift */}
          <RevealInit />
          <MagneticButtons />
          <GlowParallax />
        </WhatsAppBookingProvider>
      </body>
    </html>
  );
}
