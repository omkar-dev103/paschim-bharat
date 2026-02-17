// src/models/Place.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { Place as PlaceType } from "@/types";

export interface PlaceDocument extends Omit<PlaceType, "_id">, Document {}

const PlaceSchema = new Schema<PlaceDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"],
    },
    category: {
      type: String,
      required: true,
      enum: ["heritage", "eco-tourism", "adventure", "food", "culture"],
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestTimeToVisit: {
      type: String,
    },
    entryFee: {
      type: String,
    },
    timings: {
      type: String,
    },
    highlights: [
      {
        type: String,
      },
    ],
    nearbyAttractions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
PlaceSchema.index({ state: 1, category: 1 });
PlaceSchema.index({ featured: 1 });
PlaceSchema.index({ rating: -1 });
PlaceSchema.index({ slug: 1 });
PlaceSchema.index({ title: "text", description: "text" });

const Place: Model<PlaceDocument> =
  mongoose.models.Place || mongoose.model<PlaceDocument>("Place", PlaceSchema);

export default Place;