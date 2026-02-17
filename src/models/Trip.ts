// src/models/Trip.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { Trip as TripType } from "@/types";

export interface TripDocument extends Omit<TripType, "_id">, Document {}

const TripSchema = new Schema<TripDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    destinations: [
      {
        placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
        placeName: { type: String, required: true },
        order: { type: Number, required: true },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budget: {
      estimated: { type: Number, required: true },
      currency: { type: String, default: "INR" },
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["planning", "confirmed", "completed", "cancelled"],
      default: "planning",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TripSchema.index({ userId: 1, status: 1 });
TripSchema.index({ startDate: 1 });

const Trip: Model<TripDocument> =
  mongoose.models.Trip || mongoose.model<TripDocument>("Trip", TripSchema);

export default Trip;