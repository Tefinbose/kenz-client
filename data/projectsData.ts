export interface ProjectItem {
  _id?: string;
  title: string;
  slug?: string;
  number?: string;
  tag?: string;
  category: string;
  description: string;
  detailedScope?: string[];
  icon?: string;
  href?: string;
  client?: string;
  location?: string;
  year?: string;
  image?: string;
  gallery?: string[];
  featured: boolean;
  order: number;
  isPublished: boolean;
}

export const initialProjectsData: ProjectItem[] = [
  {
    number: "01",
    icon: "Ruler",
    title: "Structural Steel Detailing",
    description: "3D modelling, shop and erection drawings for structural steel frameworks.",
    tag: "Structural",
    category: "Structural",
    href: "/services/steel-detailing",
    detailedScope: [
      "AISC-compliant 3D model creation",
      "Detailed shop fabrication drawings",
      "Anchor bolt plans and field erection drawings",
    ],
    featured: true,
    order: 1,
    isPublished: true,
  },
  {
    number: "02",
    icon: "Box",
    title: "Miscellaneous Steel",
    description: "Stairs, rails, embeds, grating, and secondary steel detailing.",
    tag: "Misc Steel",
    category: "Miscellaneous",
    href: "/services/miscellaneous-detailing",
    detailedScope: [
      "Commercial egress stair towers",
      "ADA-compliant handrails and guardrails",
      "Embed plates, lintels, and roof frames",
    ],
    featured: false,
    order: 2,
    isPublished: true,
  },
  {
    number: "03",
    icon: "Layers3",
    title: "Joist & Deck Detailing",
    description: "Coordinated joist and deck detailing integrated with primary structure.",
    tag: "Joist & Deck",
    category: "Engineering",
    href: "/services/joist-deck",
    detailedScope: [
      "Steel Joist Institute (SJI) standard detailing",
      "Composite and non-composite floor/roof deck layouts",
      "Joist girder loading diagrams and bridge coordination",
    ],
    featured: false,
    order: 3,
    isPublished: true,
  },
  {
    number: "04",
    icon: "ScanLine",
    title: "BIM Support",
    description: "Model-based coordination and BIM workflows at LOD 350–400.",
    tag: "BIM / LOD",
    category: "BIM",
    href: "/services/bim-support",
    detailedScope: [
      "LOD 350-400 trade model federation",
      "Automated clash detection with MEP/architectural trades",
      "IFC & NC file generation for CNC machinery",
    ],
    featured: true,
    order: 4,
    isPublished: true,
  },
  {
    number: "05",
    icon: "Cable",
    title: "Connection Detailing",
    description: "PE/SE-stamped connection coordination and delegated design support.",
    tag: "Connections",
    category: "Engineering",
    href: "/services/connection-design",
    detailedScope: [
      "Moment, shear, and bracing connection calculations",
      "Delegated design packets for EOR review",
      "Shop-friendly connection optimization",
    ],
    featured: true,
    order: 5,
    isPublished: true,
  },
  {
    number: "06",
    icon: "Calculator",
    title: "Estimation & Take-Off",
    description: "Model-based quantity extraction, BOM, and steel estimation.",
    tag: "Estimation",
    category: "Estimation",
    href: "/services/estimation",
    detailedScope: [
      "Comprehensive material take-offs (MTO)",
      "Advance Bill of Materials (ABM) for procurement",
      "Bolt and weld estimate summaries",
    ],
    featured: false,
    order: 6,
    isPublished: true,
  },
];
