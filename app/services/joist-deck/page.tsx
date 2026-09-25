import { Layers3 } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "04",
  eyebrow: "Floor & Roof Systems",
  title: "Joist & Deck",
  accentTitle: "Detailing",
  description:
    "Coordinated joist and deck detailing supporting structural interfaces, drawing preparation, fabrication requirements, and erection workflows.",
  icon: Layers3,

  capabilities: [
    "Joist detailing",
    "Deck detailing",
    "3D coordination",
    "Drawing preparation",
    "Structural interface coordination",
    "Fabrication and erection support",
  ],

  deliverables: [
    "Joist detailing documentation",
    "Deck layout documentation",
    "Coordinated 3D information",
    "Interface and edge condition information",
    "Project-specific drawings",
    "Fabrication and erection support documentation",
  ],

  applications: [
    "Structural floor systems",
    "Roof systems",
    "Steel-framed buildings",
    "Joist and deck coordination",
    "Structural interface coordination",
  ],

  process: [
    {
      number: "01",
      title: "Review",
      text: "Review architectural and structural information relevant to joists, deck, supports, openings, and interfaces.",
    },
    {
      number: "02",
      title: "Coordinate",
      text: "Coordinate joist and deck information with the structural steel model and project requirements.",
    },
    {
      number: "03",
      title: "Model",
      text: "Develop coordinated model information representing the required joist and deck elements.",
    },
    {
      number: "04",
      title: "Detail",
      text: "Prepare project drawings and documentation required for coordination and execution.",
    },
    {
      number: "05",
      title: "Deliver",
      text: "Provide coordinated deliverables aligned with project scope and agreed schedules.",
    },
  ],
};

export default function JoistDeckPage() {
  return (
    <ServiceDetailPage
      service={service}
      previous={{
        title: "Connection & Delegated Design",
        href: "/services/connection-design",
      }}
      next={{
        title: "BIM Support",
        href: "/services/bim-support",
      }}
    />
  );
}