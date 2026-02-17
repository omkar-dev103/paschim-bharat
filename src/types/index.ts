// src/types/index.ts

export interface User {
  _id?: string;
  uid: string;
  name: string;
  email: string;
  profilePicture: string;
  bookmarks: string[];
  tripsPlanned: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Place {
  _id?: string;
  title: string;
  slug: string;
  state: "Rajasthan" | "Gujarat" | "Maharashtra" | "Goa";
  category: "heritage" | "eco-tourism" | "adventure" | "food" | "culture";
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestTimeToVisit: string;
  entryFee?: string;
  timings?: string;
  highlights: string[];
  nearbyAttractions: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Restaurant {
  _id?: string;
  name: string;
  slug: string;
  cuisine: string[];
  description: string;
  images: string[];
  thumbnail: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
  };
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  featured: boolean;
  specialties: string[];
  timings: string;
  contact?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Trip {
  _id?: string;
  userId: string;
  name: string;
  destinations: {
    placeId: string;
    placeName: string;
    order: number;
  }[];
  startDate: Date;
  endDate: Date;
  budget: {
    estimated: number;
    currency: string;
  };
  notes?: string;
  status: "planning" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt?: Date;
}

export interface Review {
  _id?: string;
  userId: string;
  userName: string;
  userImage: string;
  placeId?: string;
  restaurantId?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface FilterOptions {
  state?: string;
  category?: string;
  rating?: number;
  priceRange?: string;
  search?: string;
}