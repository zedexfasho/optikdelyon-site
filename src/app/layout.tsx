import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-raw",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
