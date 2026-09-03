export type Project = {
  slug: string;
  index: number;
  title: string;
  location: string;
  category: string;
  /** e.g. "Interior Design", "Architecture", "University Project" */
  type: string;
  description: string;
  /** Optional recognition line, e.g. a student award. */
  award?: string;
  /** Optional caption for the project photo, e.g. crediting how it was shot. */
  photoNote?: string;
  /** Path under /public. Leave undefined until real photography is supplied. */
  image?: string;
  /** Path under /public for the architectural drawing / floor plan. */
  drawingImage?: string;
  /** Optional caption for the drawing, e.g. "Ground floor plan". */
  drawingNote?: string;
  /** Additional gallery images (renders, alternate angles, etc). */
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "lvra-kanpai-banzai",
    index: 1,
    title: "LVRA & Kanpai Banzai",
    location: "Seksyen 14, Petaling Jaya",
    category: "Restaurant & Bar",
    type: "Interior Design Consultancy",
    description:
      "A dual-concept rooftop destination pairing an open, energetic dining space with an intimate, Japanese-inspired bar — unified through careful spatial planning, material selection, and atmospheric lighting.",
  },
  {
    slug: "naelofar",
    index: 2,
    title: "Naelofar",
    location: "Bandar Baru Uda, Johor Bahru",
    category: "Retail",
    type: "Interior Design Consultancy",
    description:
      "A contemporary expression of modest luxury, where soft neutral palettes and organic forms shape an inviting boutique defined by elegance and timeless sophistication.",
    image: "/images/Projects/naelofar/naelofar_1.jpg",
    drawingImage: "/images/Projects/naelofar/naelofar_5.jpg",
    drawingNote: "Ground floor plan",
    gallery: [
      "/images/Projects/naelofar/naelofar_7.jpg",
      "/images/Projects/naelofar/naelofar_2.jpg",
      "/images/Projects/naelofar/naelofar_3.jpg",
      "/images/Projects/naelofar/naelofar_4.jpg",
      "/images/Projects/naelofar/naelofar_6.jpg",
    ],
  },
  {
    slug: "regent-pavilion-suite",
    index: 3,
    title: "Regent Pavilion Damansara Suite",
    location: "Jalan Damanlela, Kuala Lumpur",
    category: "Residential",
    type: "Interior Design",
    description:
      "A dark modern luxe residence balancing rich materiality and refined detailing with a sophisticated palette of deep tones.",
  },
  {
    slug: "nvdm-memorial-park-museum",
    index: 4,
    title: "NVDM Memorial Park & Museum",
    location: "Kwong Tong Cemetery, Kuala Lumpur",
    category: "Memorial",
    type: "Architecture",
    description:
      "In collaboration with Studio James Lim, a series of 'Embrace Spaces' commemorate 3,200 WWII volunteer drivers, with the former funeral parlour thoughtfully adapted into a memorial museum.",
    photoNote: "Real picture taken by drone.",
  },
  {
    slug: "sunway-flora-2",
    index: 5,
    title: "Sunway Flora II",
    location: "Bukit Jalil, Kuala Lumpur",
    category: "Hospitality",
    type: "Interior Design Development",
    description:
      "A Refined Biomorphic concept integrating organic forms, natural materials, and fluid spatial experiences across the development's facility areas.",
  },
  {
    slug: "momo-paradise-ioi-city-mall",
    index: 6,
    title: "MOMO Paradise, IOI City Mall",
    location: "Putrajaya, Malaysia",
    category: "Restaurant",
    type: "Interior Design",
    description:
      "Supported through design development and construction drawing stages, shaping the dining experience for this Putrajaya restaurant.",
  },
  {
    slug: "grounded",
    index: 7,
    title: "Grounded",
    location: "Batu Arang, Gombak",
    category: "Memorial",
    type: "University Project",
    description:
      "Drawing on the history of Batu Arang, Selangor, the design preserves the site's identity through layered spatial experiences — using light, materiality, and zoning to evoke reflection and remembrance.",
    award: "ATAP Student Award — Architecture Top 3 Finalist 2023",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Returns the next project in sequence, wrapping to the first after the last. */
export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) return undefined;
  return projects[(currentIndex + 1) % projects.length];
}
