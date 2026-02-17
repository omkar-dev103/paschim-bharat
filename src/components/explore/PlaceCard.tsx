// src/components/explore/PlaceCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Heart, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Place } from "@/types";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface PlaceCardProps {
  place: Place;
  index?: number;
}

export default function PlaceCard({ place, index = 0 }: PlaceCardProps) {
  const { userData, isAuthenticated, addBookmark, removeBookmark } =
    useAuthStore();
  const [isBookmarked, setIsBookmarked] = useState(
    userData?.bookmarks?.includes(place._id || "") || false
  );

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to bookmark places");
      return;
    }

    try {
      const endpoint = `/api/users/${userData?.uid}/bookmarks`;
      const method = isBookmarked ? "DELETE" : "POST";

      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: place._id }),
      });

      if (isBookmarked) {
        removeBookmark(place._id!);
        toast.success("Removed from bookmarks");
      } else {
        addBookmark(place._id!);
        toast.success("Added to bookmarks");
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/place/${place._id}`}>
        <Card
          variant="elevated"
          className="group cursor-pointer overflow-hidden card-hover h-full"
        >
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={place.thumbnail || "/placeholder-destination.jpg"}
              alt={place.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isBookmarked
                  ? "bg-saffron-500 text-white"
                  : "bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 hover:bg-saffron-500 hover:text-white"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>

            {/* Category Badge */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 dark:text-white capitalize">
              {place.category.replace("-", " ")}
            </span>

            {/* State Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                {place.location.city}, {place.state}
              </span>
            </div>

            {/* Rating */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full">
              <Star className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
              <span className="text-xs font-semibold text-gray-800 dark:text-white">
                {place.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-saffron-500 transition-colors line-clamp-1">
              {place.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {place.shortDescription}
            </p>

            {/* Highlights */}
            {place.highlights && place.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {place.highlights.slice(0, 3).map((highlight, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {place.bestTimeToVisit || "Year-round"}
              </span>
              <span className="flex items-center gap-1 text-saffron-500 font-medium text-sm group-hover:gap-2 transition-all">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}