import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    number: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["structural", "engineering", "bim"],
      required: true,
      default: "structural",
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    shortTitle: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    spec: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    href: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      default: "Ruler",
      trim: true,
    },
    capabilities: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.index({ code: 1 }, { unique: true });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ isPublished: 1, order: 1 });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
