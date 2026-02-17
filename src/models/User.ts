// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { User as UserType } from "@/types";

export interface UserDocument extends Omit<UserType, "_id">, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
    tripsPlanned: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ uid: 1 });

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;