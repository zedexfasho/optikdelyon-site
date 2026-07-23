# Optik de Lyon — site Next.js

Migration du site statique (HTML/CSS/JS) vers Next.js 14 (App Router) + TypeScript, en conservant à l'identique
le design, les couleurs, les photos et toutes les interactions déjà en place (curseur-lentille, carrousel de
montures, parallaxe, lightbox, lunettes 3D en Three.js, etc.).

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```

> Le build a besoin d'un accès internet pour télécharger les polices Google Fonts (Instrument Serif & Manrope)
> au moment de la compilation — c'est normal, `next/font/google` les auto-héberge ensuite dans le build final
> (aucune requête vers Google au runtime).

## Structure

```
src/
  app/
    layout.tsx      → polices, métadonnées SEO, composants globaux (header, footer, curseur, etc.)
    page.tsx         → assemble toutes les sections de la page d'accueil
    globals.css      → design system complet (variables de couleurs, typographie, tous les styles)
  components/
    Header.tsx          → nav desktop + menu mobile + scrollspy
    Hero.tsx             → section d'accueil (texte, CTA, visuel, sortie cinématique au scroll)
    Hero3D.tsx           → lunettes 3D flottantes (Three.js, chargé uniquement côté client)
    Marquee.tsx          → bandeau défilant
    Categories.tsx       → cartes Vue / Optique / Solaire
    Process.tsx          → "Votre visite en trois temps"
    MedicalTrust.tsx     → mise en avant du suivi ophtalmologique (voir note ci-dessous)
    About.tsx             → section boutique, avec parallaxe au scroll sur les deux photos
    StylesCarousel.tsx    → carrousel des silhouettes de montures
    Gallery.tsx            → grille de photos
    Lightbox.tsx           → visionneuse plein écran (clavier + swipe tactile)
    Values.tsx              → "Pourquoi Optik de Lyon" (icônes qui se dessinent au scroll)
    CTA.tsx                  → section rendez-vous / contact / carte
    Footer.tsx
    WhatsAppBooking.tsx      → mini-formulaire de prise de RDV WhatsApp (Provider + modal, voir ci-dessous)
    SectionRail.tsx          → navigation latérale par points (desktop, scrollspy)
    GlowParallax.tsx         → fait dériver au scroll les halos lumineux des sections sombres
    ScrollProgress.tsx, LensCursor.tsx, RevealInit.tsx, MagneticButtons.tsx, BackToTop.tsx, FloatWhatsApp.tsx
      → petits comportements globaux (ne rendent aucun élément visuel propre, sauf indication contraire)
  data/
    gallery.ts       → liste des photos de la galerie (chemin + texte alternatif)
public/
  images/
    hero/     → les 4 photos flottantes de l'accueil
    about/    → les 2 photos de la section boutique
    gallery/  → les 11 photos de la galerie
```

## Prise de rendez-vous par WhatsApp

Tous les boutons "Prendre rendez-vous" du site (header, hero, bouton flottant, section contact) ouvrent
désormais un mini-formulaire (`WhatsAppBooking.tsx`) avant d'envoyer vers WhatsApp : la personne choisit son
besoin (examen, montures, ordonnance, autre) et éventuellement sa disponibilité et son prénom, et le message
WhatsApp est généré automatiquement et pré-rempli. Le numéro WhatsApp est défini une seule fois, en haut de
`src/components/WhatsAppBooking.tsx` (`WHATSAPP_NUMBER`).

## Section "Suivi médical" — à compléter

`MedicalTrust.tsx` met en avant la présence d'ophtalmologues, avec un contenu volontairement générique :
je n'ai pas de nom, de titre ou de qualifications réelles à afficher, donc je n'en ai pas inventé. Dès que vous
avez ces informations, il y a un commentaire `TODO` dans le fichier qui indique où ajouter une carte "portrait"
(nom, photo, spécialité) pour renforcer encore la crédibilité de cette section.

## Notes de migration

- **Toutes les photos sont identiques** à la version précédente : elles ont été extraites du HTML (où elles
  étaient encodées en base64) vers de vrais fichiers `.jpg`, servis maintenant via `next/image` (redimensionnement
  et formats automatiques, chargement différé).
- **Aucune couleur n'a été modifiée** — le fichier `globals.css` reprend le design system existant tel quel.
- **Effets ajoutés pour l'impact visuel** : sortie cinématique du hero au scroll (le texte et le visuel
  s'estompent doucement), halos lumineux qui dérivent au scroll dans les sections sombres, navigation latérale
  par points avec scrollspy. Tous respectent `prefers-reduced-motion` et se désactivent automatiquement pour les
  personnes qui préfèrent moins d'animations.
- Le rendu Three.js (`Hero3D.tsx`) est chargé en dynamique côté client uniquement (`next/dynamic` avec `ssr:false`),
  puisque WebGL n'existe pas côté serveur. Le repli SVG s'affiche pendant le chargement, exactement comme avant.
