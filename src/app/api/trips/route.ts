// src/app/api/trips/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Trip from "@/models/Trip";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const trips = await Trip.find({ userId })
      .populate("destinations.placeId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ trips });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await connectDB();

    const trip = await Trip.create(body);

    // Add trip to user's tripsPlanned
    await User.findOneAndUpdate(
      { uid: body.userId },
      { $push: { tripsPlanned: trip._id } }
    );

    return NextResponse.json({ trip }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}