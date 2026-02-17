// src/models/Restaurant.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { Restaurant as RestaurantType } from "@/types";

export interface RestaurantDocument
  extends Omit<RestaurantType, "_id">,
    Document {}

const RestaurantSchema = new Schema<RestaurantDocument>(
  {
    name: {
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
    cuisine: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
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
      state: { type: String, required: true },
    },
    priceRange: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
      required: true,
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
    specialties: [
      {
        type: String,
      },
    ],
    timings: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
RestaurantSchema.index({ "location.state": 1 });
RestaurantSchema.index({ featured: 1 });
RestaurantSchema.index({ rating: -1 });
RestaurantSchema.index({ name: "text", description: "text" });

const Restaurant: Model<RestaurantDocument> =
  mongoose.models.Restaurant ||
  mongoose.model<RestaurantDocument>("Restaurant", RestaurantSchema);

export default Restaurant;