import { Box } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "02",
  eyebrow: "Miscellaneous Steel",
  title: "Miscellaneous",
  accentTitle: "Detailing",
  description:
    "Detailed modeling and documentation for miscellaneous steel components, coordinated with the primary structural steel and developed with fabrication requirements in mind.",
  icon: Box,

  capabilities: [
    "Miscellaneous steel detailing",
    "Component modeling",
    "Shop drawing preparation",
    "Coordination with primary structural steel",
    "Fabrication-ready documentation",
    "Model-based component coordination",
  ],

  deliverables: [
    "Miscellaneous steel 3D models",
    "Component and assembly drawings",
    "Fabrication-oriented shop drawings",
    "Connection and interface information",
    "Coordinated documentation",
    "Project-specific detailing outputs",
  ],

  applications: [
    "Stairs and platforms",
    "Ladders and access systems",
    "Handrails and guardrails",
    "Equipment support steel",
    "Miscellaneous framing",
    "Other project-specific steel components",
  ],

  process: [
    {
      number: "01",
      title: "Identify",
      text: "Review the project drawings and identify miscellaneous steel components and interfaces.",
    },
    {
      number: "02",
      title: "Coordinate",
      text: "Coordinate miscellaneous components with the primary structure and available project information.",
    },
    {
      number: "03",
      title: "Model",
      text: "Develop detailed 3D representations of the required miscellaneous steel components.",
    },
    {
      number: "04",
      title: "Document",
      text: "Prepare drawings and documentation required for fabrication and project coordination.",
    },
    {
      number: "05",
      title: "Deliver",
      text: "Provide coordinated deliverables according to the defined project scope and schedule.",
    },
  ],
};

export default function MiscellaneousDetailingPage() {
  return (
    <ServiceDetailPage
      service={service}
      previous={{
        title: "Steel Detailing",
        href: "/services/steel-detailing",
      }}
      next={{
        title: "Connection & Delegated Design",
        href: "/services/connection-design",
      }}
    />
  );
}