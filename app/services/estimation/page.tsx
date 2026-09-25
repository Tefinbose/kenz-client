import { Calculator } from "lucide-react";
import ServiceDetailPage, {
  type ServiceDetail,
} from "@/components/services/ServiceDetailPage";

const service: ServiceDetail = {
  number: "06",
  eyebrow: "Quantity Information",
  title: "Estimation &",
  accentTitle: "Material Take-Off",
  description:
    "Model-based quantity extraction and steel estimation support providing project teams with organized quantity information for planning and project evaluation.",
  icon: Calculator,

  capabilities: [
    "Material take-off",
    "Quantity extraction",
    "Steel estimation support",
    "Model-based quantity information",
    "Project quantity documentation",
  ],

  deliverables: [
    "Material quantity information",
    "Model-based quantity extraction",
    "Steel quantity summaries",
    "Project quantity documentation",
    "Estimation support information",
    "Organized take-off data",
  ],

  applications: [
    "Pre-fabrication planning",
    "Project estimation support",
    "Steel quantity evaluation",
    "Model-based material take-offs",
    "Project planning and coordination",
  ],

  process: [
    {
      number: "01",
      title: "Review",
      text: "Review available drawings, models, project scope, and information relevant to quantity extraction.",
    },
    {
      number: "02",
      title: "Identify",
      text: "Identify the project elements and quantity categories required for the agreed scope.",
    },
    {
      number: "03",
      title: "Extract",
      text: "Extract relevant quantity information from available model and project data.",
    },
    {
      number: "04",
      title: "Organize",
      text: "Organize quantities into project-specific documentation and usable summaries.",
    },
    {
      number: "05",
      title: "Deliver",
      text: "Provide quantity and estimation support information according to the agreed project requirements.",
    },
  ],
};

export default function EstimationPage() {
  return (
    <ServiceDetailPage
      service={service}
      previous={{
        title: "BIM Support",
        href: "/services/bim-support",
      }}
    />
  );
}