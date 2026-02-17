// src/app/api/restaurants/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Restaurant from "@/models/Restaurant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const featured = searchParams.get("featured");
    const priceRange = searchParams.get("priceRange");
    const limit = parseInt(searchParams.get("limit") || "20");

    await connectDB();

    const query: any = {};

    if (state) query["location.state"] = state;
    if (featured === "true") query.featured = true;
    if (priceRange) query.priceRange = priceRange;

    const restaurants = await Restaurant.find(query)
      .sort({ featured: -1, rating: -1 })
      .limit(limit);

    return NextResponse.json({ restaurants });
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

    const restaurant = await Restaurant.create(body);

    return NextResponse.json({ restaurant }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}