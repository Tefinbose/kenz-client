import { ScanLine } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "05",
  eyebrow: "Digital Coordination",
  title: "BIM",
  accentTitle: "Support",
  description:
    "3D steel modeling, model coordination, clash and coordination support, and drawing extraction designed to improve project communication and model-based workflows.",
  icon: ScanLine,

  capabilities: [
    "3D steel modeling",
    "Model coordination",
    "Clash and coordination support",
    "Drawing extraction",
    "Model-based project communication",
    "Fabrication-oriented BIM workflows",
  ],

  deliverables: [
    "Coordinated 3D models",
    "Model coordination information",
    "Coordination and clash information",
    "Drawing extraction",
    "Model-based project documentation",
    "Fabrication-oriented BIM outputs",
  ],

  applications: [
    "Multi-discipline coordination",
    "Structural steel projects",
    "Fabrication workflows",
    "Model-based communication",
    "Projects requiring coordinated BIM information",
  ],

  process: [
    {
      number: "01",
      title: "Collect",
      text: "Gather available models, drawings, specifications, and project coordination information.",
    },
    {
      number: "02",
      title: "Model",
      text: "Develop or update 3D steel model information according to project requirements.",
    },
    {
      number: "03",
      title: "Coordinate",
      text: "Review model interfaces and identify coordination issues requiring project attention.",
    },
    {
      number: "04",
      title: "Extract",
      text: "Generate required project information and drawing outputs from coordinated model data.",
    },
    {
      number: "05",
      title: "Communicate",
      text: "Use model-based information to support clear communication between project stakeholders.",
    },
  ],
};

export default function BimSupportPage() {
  return (
    <ServiceDetailPage
      service={service}
      previous={{
        title: "Joist & Deck Detailing",
        href: "/services/joist-deck",
      }}
      next={{
        title: "Estimation & Material Take-Off",
        href: "/services/estimation",
      }}
    />
  );
}