import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Career } from "@/models";

export const dynamic = "force-dynamic";

const initialCareers = [
  {
    title: "Senior Structural Steel Detailer (Tekla Structures)",
    slug: "senior-structural-steel-detailer-tekla",
    department: "Structural Detailing",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "5+ years",
    description:
      "Responsible for 3D modeling of complex structural steel frameworks, generating fabrication shop drawings and erection plans in accordance with AISC and NISD standards.",
    responsibilities: [
      "Develop coordinated 3D Tekla models for industrial and commercial structures",
      "Produce fabrication shop drawings, anchor bolt plans, and erection drawings",
      "Identify coordination issues and formulate proactive technical RFIs",
      "Review drawing submittals against design documents and contract specifications",
      "Collaborate directly with project coordinators and shop fabrication managers",
    ],
    requirements: [
      "5+ years of hands-on experience in Tekla Structures steel detailing",
      "Strong understanding of AISC steel construction manual and OSHA provisions",
      "Proven capability coordinating with structural engineers and fabricators",
      "Proficient in interpreting architectural and structural design packages",
    ],
    benefits: [
      "Competitive compensation package",
      "Flexible remote/hybrid work structure",
      "Advanced 3D modeling workstation allowance",
      "Comprehensive healthcare and paid time off",
    ],
    isActive: true,
    order: 1,
  },
  {
    title: "BIM Coordination Specialist (LOD 350-400)",
    slug: "bim-coordination-specialist-lod",
    department: "BIM Services",
    location: "Remote",
    type: "Full-Time",
    experience: "3+ years",
    description:
      "Lead clash detection, model federation, and BIM coordination workflows at LOD 350-400 across architectural, structural, and MEP trades.",
    responsibilities: [
      "Federate multidisciplinary trade models and run automated clash matrix reports",
      "Ensure steel detailing models integrate seamlessly with general contractor coordination files",
      "Support project teams with IFC exports and model-based communication",
      "Participate in virtual design coordination meetings with project stakeholders",
    ],
    requirements: [
      "3+ years experience with Navisworks, Tekla, and Revit BIM workflows",
      "Demonstrated proficiency with LOD 350-400 structural modeling specifications",
      "Strong technical communication and proactive problem-solving skills",
      "Experience on commercial or industrial steel construction projects",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Collaborative technical engineering environment",
      "Professional development and certification support",
      "Flexible work schedule",
    ],
    isActive: true,
    order: 2,
  },
  {
    title: "Connection Design & Detailing Engineer",
    slug: "connection-design-detailing-engineer",
    department: "Engineering Support",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "4+ years",
    description:
      "Perform connection engineering calculations and delegated design support for shear, moment, and bracing connections coordinated with fabrication requirements.",
    responsibilities: [
      "Design structural steel connections according to AISC 360 specifications",
      "Coordinate connection details with detailers and fabrication shop constraints",
      "Prepare connection calculation packets for Engineer of Record (EOR) approval",
      "Resolve connection discrepancies and field erection issues",
    ],
    requirements: [
      "Bachelor's degree in Civil/Structural Engineering (BSCE)",
      "Proficiency with connection design software (IDEA StatiCa, RAM Connection, or Descon)",
      "Familiarity with AISC 14th/15th Edition design provisions",
      "Experience coordinating with shop fabrication teams",
    ],
    benefits: [
      "Professional licensing support & PE exam sponsorship",
      "Flexible scheduling and generous PTO",
      "Comprehensive health and retirement benefits",
      "Work on landmark North American structural projects",
    ],
    isActive: true,
    order: 3,
  },
];

export async function GET() {
  try {
    await connectDB();

    // Auto-seed initial careers if collection is empty
    const count = await Career.countDocuments();
    if (count === 0) {
      await Career.insertMany(initialCareers);
    }

    const careers = await Career.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      careers,
      total: careers.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Public careers GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
