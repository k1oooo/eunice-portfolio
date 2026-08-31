export type Project = {
  slug: string;
  index: number;
  title: string;
  location: string;
  category: string;
  description: string;
  /** Path under /public. Leave undefined until real photography is supplied. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "lvra-kanpai-banzai",
    index: 1,
    title: "LVRA & Kanpai Banzai",
    location: "Seksyen 14, Petaling Jaya",
    category: "Hospitality",
    description:
      "A dual-concept hospitality fit-out pairing two distinct dining identities under one roof.",
  },
  {
    slug: "naelofar",
    index: 2,
    title: "Naelofar",
    location: "Bandar Baru Uda, Johor Bahru",
    category: "Retail",
    description:
      "A retail interior built around brand storytelling and considered material choices.",
  },
  {
    slug: "regent-pavilion-suite",
    index: 3,
    title: "Regent Pavilion Suite",
    location: "Jalan Damanlela, Kuala Lumpur",
    category: "Residential",
    description:
      "A residential suite balancing warmth and restraint across an efficient floor plan.",
  },
  {
    slug: "nvdm-memorial-park-museum",
    index: 4,
    title: "NVDM Memorial Park & Museum",
    location: "Kwong Tong Cemetery, Kuala Lumpur",
    category: "Civic",
    description:
      "A memorial park and museum conceived as a quiet, contemplative civic landscape.",
  },
  {
    slug: "sunway-flora-2",
    index: 5,
    title: "Sunway Flora 2",
    location: "Bukit Jalil, Kuala Lumpur",
    category: "Residential",
    description:
      "A residential scheme exploring density, natural light, and shared green space.",
  },
  {
    slug: "momo-paradise-ioi-city-mall",
    index: 6,
    title: "MOMO Paradise, IOI City Mall",
    location: "Putrajaya, Malaysia",
    category: "Hospitality",
    description:
      "A shabu-shabu restaurant interior built around ritual, texture, and warm lighting.",
  },
  {
    slug: "grounded",
    index: 7,
    title: "Grounded",
    location: "ATAP Student Award Project",
    category: "Academic",
    description:
      "An award-recognised student project exploring architecture rooted in site and material honesty.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
