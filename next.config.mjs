/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le site est 100% statique (aucune route serveur, aucune donnée dynamique) :
  // l'export statique permet de l'héberger n'importe où (Cloudflare Pages, un
  // hébergement mutualisé classique, etc.) sans dépendre d'un serveur Node.js.
  output: "export",
  images: {
    // Next/Image a besoin d'un serveur pour redimensionner les images à la volée ;
    // en export statique on sert directement les fichiers d'origine (déjà légers).
    unoptimized: true,
  },
};

export default nextConfig;
