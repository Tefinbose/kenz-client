export interface ServiceItem {
  _id?: string;
  number: string;
  category: "structural" | "engineering" | "bim";
  title: string;
  shortTitle: string;
  code: string;
  spec: string;
  description: string;
  href: string;
  icon: string;
  capabilities: string[];
  featured?: boolean;
  order: number;
  isPublished: boolean;
}

export const initialServicesData: ServiceItem[] = [
  {
    number: "01",
    category: "structural",
    title: "Steel Detailing",
    shortTitle: "Structural Steel",
    code: "SRV-01",
    spec: "AISC / NISD",
    description:
      "Detailed 3D modeling and fabrication-oriented drawing development for structural steel projects.",
    href: "/services/steel-detailing",
    icon: "Ruler",
    capabilities: [
      "Structural steel 3D modeling",
      "Shop drawing development",
      "Erection drawing development",
      "Fabrication-oriented detailing",
      "Project-specific detailing standards",
      "Model-based coordination",
    ],
    order: 1,
    isPublished: true,
    featured: true,
  },
  {
    number: "02",
    category: "structural",
    title: "Miscellaneous Detailing",
    shortTitle: "Miscellaneous Steel",
    code: "SRV-02",
    spec: "Stairs & Rails",
    description:
      "Detailed modeling and documentation for miscellaneous steel components coordinated with the primary structure.",
    href: "/services/miscellaneous-detailing",
    icon: "Box",
    capabilities: [
      "Miscellaneous steel detailing",
      "Component modeling",
      "Shop drawing preparation",
      "Primary steel coordination",
      "Fabrication-ready documentation",
    ],
    order: 2,
    isPublished: true,
    featured: false,
  },
  {
    number: "03",
    category: "engineering",
    title: "Connection & Delegated Design",
    shortTitle: "Connections",
    code: "SRV-03",
    spec: "PE / SE Stamped",
    description:
      "Connection coordination and delegated design support integrated into the overall steel detailing workflow.",
    href: "/services/connection-design",
    icon: "Cable",
    capabilities: [
      "Connection detailing",
      "Connection coordination",
      "Delegated design support",
      "Model integration",
      "Drawing coordination",
      "Fabrication-oriented documentation",
    ],
    order: 3,
    isPublished: true,
    featured: true,
  },
  {
    number: "04",
    category: "engineering",
    title: "Joist & Deck Detailing",
    shortTitle: "Joist & Deck",
    code: "SRV-04",
    spec: "SJI Standards",
    description:
      "Coordinated joist and deck detailing supporting structural interfaces, fabrication, and erection.",
    href: "/services/joist-deck",
    icon: "Layers3",
    capabilities: [
      "Joist detailing",
      "Deck detailing",
      "3D coordination",
      "Drawing preparation",
      "Structural interface coordination",
      "Fabrication and erection support",
    ],
    order: 4,
    isPublished: true,
    featured: false,
  },
  {
    number: "05",
    category: "bim",
    title: "BIM Support",
    shortTitle: "BIM Workflows",
    code: "SRV-05",
    spec: "LOD 350-400",
    description:
      "Model-based coordination and BIM workflows supporting structural steel projects.",
    href: "/services/bim-support",
    icon: "ScanLine",
    capabilities: [
      "BIM model coordination",
      "Multi-disciplinary clash checking",
      "LOD 350-400 structural modeling",
      "IFC / CIS/2 data exchange",
      "Fabrication data integration",
      "Erection sequence simulation",
    ],
    order: 5,
    isPublished: true,
    featured: true,
  },
  {
    number: "06",
    category: "bim",
    title: "Estimation & Material Take-Off",
    shortTitle: "Steel Estimation",
    code: "SRV-06",
    spec: "Material Take-Off",
    description:
      "Accurate quantity extraction, bill of materials, and material estimation directly from structural drawings.",
    href: "/services/estimation",
    icon: "Calculator",
    capabilities: [
      "Material take-off (MTO)",
      "Advance bill of materials (ABM)",
      "Connection weight estimation",
      "Surface area & coating calculations",
      "Preliminary member sizing verification",
      "Bid-stage steel quantity analysis",
    ],
    order: 6,
    isPublished: true,
    featured: false,
  },
];
