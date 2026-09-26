import mongoose, { Schema, Document, Model } from "mongoose";
import { BlogPost, BlogSection } from "@/types/blog";

export interface IBlog extends Document, Omit<BlogPost, "id"> {
  coverImage?: string;
  isPublished: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<BlogSection>(
  {
    heading: { type: String },
    paragraphs: { type: [String], default: [] },
  },
  { _id: false }
);

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
    },
    date: {
      type: String,
      required: true,
      default: () =>
        new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    },
    readTime: {
      type: String,
      default: "4 min read",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      name: {
        type: String,
        required: true,
        default: "Kenz Engineering LLC",
      },
      role: {
        type: String,
        required: true,
        default: "Engineering Team",
      },
    },
    introParagraphs: {
      type: [String],
      default: [],
    },
    sections: {
      type: [BlogSectionSchema],
      default: [],
    },
    coverImage: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ isPublished: 1, category: 1 });
BlogSchema.index({ createdAt: -1 });

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
