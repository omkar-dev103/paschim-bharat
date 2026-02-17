// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await verifyIdToken(token);

    const body = await request.json();
    const { uid, name, email, profilePicture } = body;

    // Validate required fields
    if (!uid || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify token matches request
    if (decodedToken.uid !== uid) {
      return NextResponse.json(
        { error: "Token mismatch" },
        { status: 401 }
      );
    }

    await connectDB();

    // Upsert user (create if not exists, update if exists)
    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        name: name || "User",
        email,
        profilePicture: profilePicture || "",
        $setOnInsert: {
          bookmarks: [],
          tripsPlanned: [],
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        bookmarks: user.bookmarks,
      },
    });
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}