import { Cable } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "03",
  eyebrow: "Connections",
  title: "Connection &",
  accentTitle: "Delegated Design",
  description:
    "Connection detailing, coordination, and delegated design support integrated with the structural steel detailing workflow and project requirements.",
  icon: Cable,

  capabilities: [
    "Connection detailing",
    "Connection coordination",
    "Delegated design support",
    "Model integration",
    "Drawing coordination",
    "Fabrication-oriented documentation",
  ],

  deliverables: [
    "Connection detailing information",
    "Coordinated connection models",
    "Connection drawing documentation",
    "Delegated design support documentation",
    "Model integration",
    "Fabrication-oriented outputs",
  ],

  applications: [
    "Structural steel connections",
    "Fabricator coordination",
    "Connection model integration",
    "Projects requiring delegated design support",
    "Multi-discipline coordination",
  ],

  process: [
    {
      number: "01",
      title: "Review",
      text: "Review the structural design information, project requirements, connection scope, and applicable documentation.",
    },
    {
      number: "02",
      title: "Coordinate",
      text: "Coordinate connection requirements with the structural model and other relevant project disciplines.",
    },
    {
      number: "03",
      title: "Develop",
      text: "Develop connection detailing and supporting information according to the defined project scope.",
    },
    {
      number: "04",
      title: "Integrate",
      text: "Integrate connection information into the overall steel model and drawing workflow.",
    },
    {
      number: "05",
      title: "Document",
      text: "Prepare coordinated project documentation and fabrication-oriented outputs.",
    },
  ],
};

export default function ConnectionDesignPage() {
  return (
    <ServiceDetailPage
      service={service}
      previous={{
        title: "Miscellaneous Detailing",
        href: "/services/miscellaneous-detailing",
      }}
      next={{
        title: "Joist & Deck Detailing",
        href: "/services/joist-deck",
      }}
    />
  );
}