import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  number?: string;
  tag?: string;
  category: string;
  description: string;
  detailedScope?: string[];
  icon?: string;
  href?: string;
  client?: string;
  location?: string;
  year?: string;
  image?: string;
  gallery?: string[];
  featured: boolean;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: "Structural",
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    detailedScope: {
      type: [String],
      default: [],
    },
    icon: {
      type: String,
      default: "Ruler",
      trim: true,
    },
    href: {
      type: String,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    gallery: {
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

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ isPublished: 1, order: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
