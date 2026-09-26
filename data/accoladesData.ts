import { AccoladesPageData } from "@/types/accolades";

export const initialAccoladesData: AccoladesPageData = {
  meta: {
    title: "Accolades & Professional Recognition | Kenz Engineering",
    description:
      "Explore Kenz Engineering's professional credibility, industry certifications, client recognition, and project detailing achievements across North America.",
    badge: "05. ACCOLADES PAGE",
    sectionNumber: "05",
  },
  hero: {
    badge: "05. ACCOLADES PAGE",
    headlinePart1: "Professional Credibility",
    headlineGradient: "Built on Quality & Trust.",
    leadStatement:
      "At Kenz Engineering, we believe professional credibility is built through the quality of work we deliver, the relationships we maintain, and the trust we earn from our clients.",
    subStatement:
      "AISC-aligned structural detailing, connection design, and BIM coordination executed with uncompromising precision.",
  },
  metrics: [
    {
      value: "50,000+",
      numericValue: 50000,
      suffix: "+",
      label: "Tons Detailed",
      subtext: "Structural & misc steel coordinated without shop downtime",
      badge: "Scale & Delivery",
    },
    {
      value: "99.4%",
      numericValue: 99.4,
      suffix: "%",
      label: "First-Pass Approval",
      subtext: "Engineer of Record (EOR) submittal acceptance rate",
      badge: "Quality Metric",
    },
    {
      value: "< 24h",
      numericValue: 24,
      suffix: "h",
      label: "RFI Turnaround SLA",
      subtext: "Direct communication with detailing coordinators",
      badge: "Speed & Support",
    },
    {
      value: "100%",
      numericValue: 100,
      suffix: "%",
      label: "Standards Compliance",
      subtext: "Strict adherence to AISC, NISD, OSHA, and AWS standards",
      badge: "Compliance",
    },
  ],
  philosophy: {
    sectionTag: "Core Operating Philosophy",
    heading: "More Than a Detailing Vendor",
    subheading: "An Extension of Your Engineering Team",
    statement:
      "Our goal is not simply to complete a detailing assignment. It is to become a dependable extension of the project team, supporting clients with responsive communication, consistent quality, and practical detailing solutions.",
    pillars: [
      {
        id: "pillar-1",
        number: "01",
        title: "Responsive Communication",
        subtitle: "Zero Friction Coordination",
        description:
          "Immediate engagement with senior detailing team leaders to clarify connection details, RFIs, and schedule updates without project bottlenecks.",
        features: [
          "Direct coordinator phone & WhatsApp channels",
          "Daily or weekly sync meetings with fabricator PMs",
          "Rapid RFI formulation with suggested engineering solutions",
        ],
      },
      {
        id: "pillar-2",
        number: "02",
        title: "Consistent Quality",
        subtitle: "Fabrication-Ready Precision",
        description:
          "Every drawing, Tekla 3D model, and NC/DXF file is thoroughly checked against AISC design guidelines and fabrication shop constraints.",
        features: [
          "Rigorous 3-tier internal quality check protocol",
          "Automated clash detection across MEP and architectural models",
          "Accurate piece marks, bolt schedules, and CNC data packages",
        ],
      },
      {
        id: "pillar-3",
        number: "03",
        title: "Practical Detailing Solutions",
        subtitle: "Erectability & Economy First",
        description:
          "We engineer connections and joint details with fabricator economy and field erector safety in mind, avoiding costly field welding or delays.",
        features: [
          "Standardized connection details minimizing shop tool changes",
          "Erection sequence coordination and crane reach clearance",
          "Delegated connection calculations stamped by licensed PEs",
        ],
      },
      {
        id: "pillar-4",
        number: "04",
        title: "Dependable Extension of Team",
        subtitle: "Long-Term Client Trust",
        description:
          "We integrate seamlessly into our clients' existing workflows, software templates, and standards to act as a permanent detailing wing.",
        features: [
          "Dedicated detailing pods assigned to recurring clients",
          "Custom shop standards adaptation (title blocks, layers, marks)",
          "Scalable detailing bandwidth for surge capacity project schedules",
        ],
      },
    ],
  },
  recognitions: [
    {
      id: "rec-01",
      year: "2025",
      title: "Tekla BIM Collaboration & Coordination Excellence",
      organization: "Steel Detailing Industry Forum",
      category: "Award",
      summary:
        "Recognized for multi-discipline clash-free coordination on a 6,500-ton industrial logistics facility model.",
      badge: "Industry Award",
      details: [
        "Delivered LOD 400 Tekla Structures coordinated model 3 weeks ahead of schedule.",
        "Zero field clashes reported across 42,000 individual steel components.",
        "Complete CNC, DXF, and Kiss file integration with fabricator automated lines.",
      ],
      metrics: [
        { label: "Model Scale", val: "6,500 Tons" },
        { label: "Clashes", val: "0 in Field" },
      ],
      featured: true,
    },
    {
      id: "rec-02",
      year: "2024",
      title: "NISD Detailing Quality Practice Alignment",
      organization: "National Institute of Steel Detailing",
      category: "Standard",
      summary:
        "Endorsed for technical compliance with NISD Industry Standard guidelines for steel detailing accuracy.",
      badge: "Technical Standard",
      details: [
        "100% adherence to standard presentation of shop & erection drawings.",
        "Complete conformance to Quality Procedures Manual guidelines.",
        "Certified training programs for all senior and checking detailers.",
      ],
      metrics: [
        { label: "Check Level", val: "Tier-3 Peer Review" },
        { label: "Compliance", val: "NISD / AISC" },
      ],
      featured: true,
    },
    {
      id: "rec-03",
      year: "2024",
      title: "High-Rise Seismic Bracing Connection Engineering",
      organization: "North American Structural Fabricators Guild",
      category: "Milestone",
      summary:
        "Successful execution of complex delegated moment and BRBF connection detailing for a 28-story commercial tower.",
      badge: "Project Milestone",
      details: [
        "Designed and coordinated Buckling-Restrained Braced Frame (BRBF) connections.",
        "Flawless coordination with specialty gusset and stiffener fabrications.",
        "Expedited EOR approval with zero revise-and-resubmit cycles.",
      ],
      metrics: [
        { label: "Storeys", val: "28 Commercial" },
        { label: "EOR Cycle", val: "1st Pass Approved" },
      ],
      featured: false,
    },
    {
      id: "rec-04",
      year: "2023",
      title: "Fast-Track Industrial Distribution Center Milestone",
      organization: "Midwest Steel Erectors Alliance",
      category: "Milestone",
      summary:
        "Rapid 6-week turnaround of comprehensive anchor bolt plans, shop drawings, and joist coordination for 800,000 sq ft warehouse.",
      badge: "Speed & Scale",
      details: [
        "Erection drawings released in phased sequences matching mill deliveries.",
        "Pre-coordinated bar joist and metal deck packages without field modifications.",
        "Fabricator delivered erection package ahead of project liquidated damages deadline.",
      ],
      metrics: [
        { label: "Turnaround", val: "6 Weeks" },
        { label: "Footprint", val: "800,000 SF" },
      ],
      featured: false,
    },
    {
      id: "rec-05",
      year: "2023",
      title: "AISC Code of Standard Practice Endorsement",
      organization: "American Institute of Steel Construction Guidelines",
      category: "Certification",
      summary:
        "Rigorous verification of drafting procedures conforming to AISC 303 (Code of Standard Practice) and AISC 360 specification.",
      badge: "Engineering Standard",
      details: [
        "Full implementation of AISC standard tolerance guidelines in detailing models.",
        "Standardized clear weld symbols, bolt callouts, and finish schedules.",
        "Comprehensive verification of camber and heat-straightening detailing notations.",
      ],
      metrics: [
        { label: "AISC Code", val: "AISC 303 / 360" },
        { label: "Audit Result", val: "Passed 100%" },
      ],
      featured: false,
    },
    {
      id: "rec-06",
      year: "2022",
      title: "Outstanding Commercial Miscellaneous Detailing Benchmark",
      organization: "Architectural & Ornamental Metals Association",
      category: "Award",
      summary:
        "Recognized for intricate detailing of monumental stairs, cable railings, canopy steel, and mechanical access dunnage.",
      badge: "Design Precision",
      details: [
        "Complex geometry unfolding for curved stair stringers and glass guardrail shoes.",
        "Seamless integration with architectural millwork and concrete embed tolerances.",
        "Applauded by architectural ironwork fabricators for zero site re-fabrication.",
      ],
      metrics: [
        { label: "Rework Cost", val: "$0 Incurred" },
        { label: "Assemblies", val: "350+ Misc Items" },
      ],
      featured: false,
    },
  ],
  certifications: [
    {
      id: "cert-01",
      title: "AISC Code of Standard Practice Compliance",
      code: "AISC 303-22",
      issuer: "American Institute of Steel Construction",
      validity: "Active / North America",
      description:
        "Guarantees that all detailing documentation, anchor bolt settings, erection plans, and shop drawings strictly adhere to AISC 303 standard conventions.",
      badge: "Core Detailing Standard",
      standards: ["AISC 303-22", "AISC 360-16", "AISC 341 Seismic Provisions"],
    },
    {
      id: "cert-02",
      title: "NISD Quality Procedure Program Alignment",
      code: "NISD-QPP 2024",
      issuer: "National Institute of Steel Detailing",
      validity: "Active / Global Workflows",
      description:
        "Validation of our internal quality assurance system, checker qualification standards, drawing presentation consistency, and RFI protocol.",
      badge: "Quality Assurance",
      standards: ["NISD Quality Procedures", "Checking Standards", "Document Control"],
    },
    {
      id: "cert-03",
      title: "BIM Level of Development (LOD) 350–400 Delivery",
      code: "BIMForum LOD Spec",
      issuer: "BIMForum / AGC of America",
      validity: "Active / All Projects",
      description:
        "3D Tekla model deliverables containing exact fabrication geometry, copes, cuts, welds, bolt assemblies, stiffeners, and reinforcement plates.",
      badge: "Digital BIM Standard",
      standards: ["LOD 350 (Erection)", "LOD 400 (Fabrication)", "IFC / CIS/2 Export"],
    },
    {
      id: "cert-04",
      title: "AWS D1.1 Structural Welding Detailing Notation",
      code: "AWS D1.1 / D1.8",
      issuer: "American Welding Society",
      validity: "Active / Standard Practice",
      description:
        "Precision in weld sizing, prequalified weld joints, bevel geometry, backing bars, and seismic demand critical weld notations for shop and field.",
      badge: "Welding Specification",
      standards: ["AWS D1.1 Structural Steel", "AWS D1.8 Seismic Supplement"],
    },
  ],
  endorsements: [
    {
      id: "endorsement-01",
      quote:
        "Kenz Engineering is our go-to detailing partner for complex structural projects. Their communication during the modeling phase is phenomenal—they identify connection clashes and coordinate RFIs before our shop saws even start cutting steel. They truly function like an extension of our in-house engineering team.",
      clientName: "Marcus Sterling",
      role: "Vice President of Operations",
      company: "Tri-State Steel Fabricators LLC",
      location: "Ohio, USA",
      projectType: "Commercial & Industrial Steel",
      year: "2025",
      rating: 5,
    },
    {
      id: "endorsement-02",
      quote:
        "In our 25 years of steel erection, we rarely see shop drawing packages as clean and error-free as Kenz's. Their erection plans are clearly marked, bolt lists match perfectly, and the fit-up on site was flawless on our 3,200-ton warehouse project.",
      clientName: "David Henderson, PE",
      role: "Chief Structural Engineer",
      company: "Apex Engineering & Construction",
      location: "Texas, USA",
      projectType: "Heavy Logistics & Warehouse",
      year: "2024",
      rating: 5,
    },
    {
      id: "endorsement-03",
      quote:
        "The turnaround time and responsiveness of Kenz Engineering are unmatched. Whenever an unexpected field condition occurred, their detailing coordinators had updated Tekla models and revised shop drawings back to us within 24 hours.",
      clientName: "Robert C. Miller",
      role: "Senior Project Manager",
      company: "Midwest Ironworks & Erection",
      location: "Illinois, USA",
      projectType: "High-Rise & Institutional",
      year: "2024",
      rating: 5,
    },
  ],
  cta: {
    badge: "Direct Collaboration",
    heading: "Partner With",
    subheading: "Kenz Engineering",
    description:
      "Experience detailing partnerships built around responsive communication, dependable schedules, and fabrication-ready accuracy on your next structural steel project.",
    primaryActionLabel: "Partner With Kenz Engineering",
    primaryActionHref: "/contact",
    secondaryActionLabel: "Review Service Capabilities",
    secondaryActionHref: "/services",
  },
};

/**
 * Data access function designed for dynamic backend integration.
 * In development / SSR, this returns initial mock data.
 * When a backend API or database is connected, replace the body of this
 * function (or fetch from `/api/accolades`) with zero UI breakage.
 */
export async function getAccoladesData(): Promise<AccoladesPageData> {
  // If running in client or API context with a custom backend URL:
  // e.g. const res = await fetch(`${process.env.BACKEND_API_URL}/accolades`);
  // return res.json();
  return Promise.resolve(initialAccoladesData);
}
