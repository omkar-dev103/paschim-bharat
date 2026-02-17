// src/app/api/places/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Place from "@/models/Place";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    await connectDB();

    // Build query
    const query: any = {};

    if (state) query.state = state;
    if (category) query.category = category;
    if (featured === "true") query.featured = true;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [places, total] = await Promise.all([
      Place.find(query)
        .sort({ featured: -1, rating: -1 })
        .skip(skip)
        .limit(limit),
      Place.countDocuments(query),
    ]);

    return NextResponse.json({
      places,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
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

    const place = await Place.create(body);

    return NextResponse.json({ place }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}