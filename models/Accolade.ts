import mongoose, { Schema, Document, Model } from "mongoose";
import {
  AccoladeMetric,
  AccoladeItem,
  Certification,
  ClientEndorsement,
  PhilosophyPillar,
  AccoladesPageData,
} from "@/types/accolades";

export interface IAccoladePage extends Document, AccoladesPageData {
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AccoladeMetricSchema = new Schema<AccoladeMetric>(
  {
    value: { type: String, required: true },
    numericValue: { type: Number },
    suffix: { type: String },
    label: { type: String, required: true },
    subtext: { type: String, required: true },
    badge: { type: String, required: true },
  },
  { _id: false }
);

const PhilosophyPillarSchema = new Schema<PhilosophyPillar>(
  {
    id: { type: String, required: true },
    number: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const AccoladeItemSchema = new Schema<AccoladeItem>(
  {
    id: { type: String, required: true },
    year: { type: String, required: true },
    title: { type: String, required: true },
    organization: { type: String, required: true },
    category: {
      type: String,
      enum: ["Award", "Certification", "Milestone", "Standard"],
      required: true,
    },
    summary: { type: String, required: true },
    badge: { type: String, required: true },
    details: { type: [String], default: [] },
    metrics: [
      {
        label: { type: String },
        val: { type: String },
        _id: false,
      },
    ],
    featured: { type: Boolean, default: false },
  },
  { _id: false }
);

const CertificationSchema = new Schema<Certification>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    issuer: { type: String, required: true },
    validity: { type: String, required: true },
    description: { type: String, required: true },
    badge: { type: String, required: true },
    standards: { type: [String], default: [] },
  },
  { _id: false }
);

const ClientEndorsementSchema = new Schema<ClientEndorsement>(
  {
    id: { type: String, required: true },
    quote: { type: String, required: true },
    clientName: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    projectType: { type: String, required: true },
    year: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { _id: false }
);

const AccoladePageSchema = new Schema<IAccoladePage>(
  {
    isDefault: {
      type: Boolean,
      default: true,
      index: true,
    },
    meta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      badge: { type: String, required: true },
      sectionNumber: { type: String, required: true },
    },
    hero: {
      badge: { type: String, required: true },
      headlinePart1: { type: String, required: true },
      headlineGradient: { type: String, required: true },
      leadStatement: { type: String, required: true },
      subStatement: { type: String, required: true },
    },
    metrics: {
      type: [AccoladeMetricSchema],
      default: [],
    },
    philosophy: {
      sectionTag: { type: String, required: true },
      heading: { type: String, required: true },
      subheading: { type: String, required: true },
      statement: { type: String, required: true },
      pillars: { type: [PhilosophyPillarSchema], default: [] },
    },
    recognitions: {
      type: [AccoladeItemSchema],
      default: [],
    },
    certifications: {
      type: [CertificationSchema],
      default: [],
    },
    endorsements: {
      type: [ClientEndorsementSchema],
      default: [],
    },
    cta: {
      badge: { type: String, required: true },
      heading: { type: String, required: true },
      subheading: { type: String, required: true },
      description: { type: String, required: true },
      primaryActionLabel: { type: String, required: true },
      primaryActionHref: { type: String, required: true },
      secondaryActionLabel: { type: String, required: true },
      secondaryActionHref: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Accolade: Model<IAccoladePage> =
  mongoose.models.Accolade ||
  mongoose.model<IAccoladePage>("Accolade", AccoladePageSchema);

export default Accolade;
