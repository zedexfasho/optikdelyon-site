export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// width/height = dimensions réelles des fichiers, utilisées par next/image pour
// réserver le bon ratio et éviter tout recadrage dans la mise en page en colonnes.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/images/gallery/g01.jpg", alt: "Notice Optik de Lyon : prise de rendez-vous pour test de vue", width: 890, height: 899 },
  { src: "/images/gallery/g02.jpg", alt: "Cliente essayant une monture oversize chez Optik de Lyon", width: 900, height: 896 },
  { src: "/images/gallery/g03.jpg", alt: "Conseillère Optik de Lyon présentant une monture optique", width: 900, height: 898 },
  { src: "/images/gallery/g04.jpg", alt: "Monture bleue de la sélection Optik de Lyon, portrait stylisé", width: 900, height: 897 },
  { src: "/images/gallery/g05.jpg", alt: "Sélection de montures et lunettes de soleil Optik de Lyon", width: 828, height: 813 },
  { src: "/images/gallery/g06.jpg", alt: "Montures rondes tenues en main, collection Optik de Lyon", width: 506, height: 900 },
  { src: "/images/gallery/g07.jpg", alt: "Monture transparente de la collection Optik de Lyon", width: 675, height: 900 },
  { src: "/images/gallery/g08.jpg", alt: "Lunettes de soleil de la sélection Optik de Lyon", width: 506, height: 900 },
  { src: "/images/gallery/g09.jpg", alt: "Monture bleue moderne Optik de Lyon", width: 590, height: 590 },
  { src: "/images/gallery/g10.jpg", alt: "Monture grise à branches bois, Optik de Lyon", width: 800, height: 800 },
  { src: "/images/gallery/g11.jpg", alt: "Monture verres photochromiques Optik de Lyon", width: 800, height: 800 },
];
