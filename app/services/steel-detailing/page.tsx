import { Ruler } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "01",
  eyebrow: "Structural Steel",
  title: "Steel",
  accentTitle: "Detailing",
  description:
    "Structural steel 3D modeling and fabrication-oriented drawing development designed to support steel fabricators, contractors, and construction teams from design intent through fabrication and erection.",
  icon: Ruler,

  capabilities: [
    "Structural steel 3D modeling",
    "Shop drawing development",
    "Erection drawing development",
    "Fabrication-oriented detailing",
    "Project-specific detailing standards",
    "Model-based coordination",
  ],

  deliverables: [
    "Coordinated structural steel 3D models",
    "Fabrication-oriented shop drawings",
    "Erection drawings",
    "Member and assembly documentation",
    "Project-specific detailing documentation",
    "Model-based coordination information",
  ],

  applications: [
    "Structural steel fabrication projects",
    "Commercial and industrial structures",
    "Multi-discipline construction coordination",
    "Fabrication and erection workflows",
    "Projects requiring detailed 3D steel models",
  ],

  process: [
    {
      number: "01",
      title: "Review",
      text: "Review structural drawings, specifications, project standards, schedules, and available design information.",
    },
    {
      number: "02",
      title: "Model",
      text: "Develop the structural steel model based on project requirements and coordinated design information.",
    },
    {
      number: "03",
      title: "Coordinate",
      text: "Coordinate structural members, interfaces, and project-specific requirements within the model.",
    },
    {
      number: "04",
      title: "Detail",
      text: "Develop fabrication-oriented shop and erection drawings from the coordinated model.",
    },
    {
      number: "05",
      title: "Deliver",
      text: "Complete project deliverables according to the agreed scope, standards, and schedule.",
    },
  ],
};

export default function SteelDetailingPage() {
  return (
    <ServiceDetailPage
      service={service}
      next={{
        title: "Miscellaneous Detailing",
        href: "/services/miscellaneous-detailing",
      }}
    />
  );
}