// src/app/(main)/place/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  IndianRupee,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Place } from "@/types";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PlaceDetailPage() {
  const params = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userData, isAuthenticated } = useAuthStore();

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await fetch(`/api/places/${params.id}`);
        const data = await response.json();
        setPlace(data.place);
        setIsBookmarked(
          userData?.bookmarks?.includes(data.place._id) || false
        );
      } catch (error) {
        console.error("Error fetching place:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlace();
  }, [params.id, userData]);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to bookmark places");
      return;
    }
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: place?.title,
        text: place?.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const nextImage = () => {
    if (place) {
      setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
    }
  };

  const prevImage = () => {
    if (place) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + place.images.length) % place.images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <Skeleton className="h-[500px] w-full rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Place not found
          </h1>
          <Link href="/explore">
            <Button className="mt-4">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      {/* Image Gallery */}
      <div className="relative h-[60vh] min-h-[500px] bg-gray-100 dark:bg-gray-900">
        <Image
          src={place.images[currentImageIndex] || place.thumbnail}
          alt={place.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Navigation Arrows */}
        {place.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {place.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {place.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Back Button */}
        <Link
          href="/explore"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={handleBookmark}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isBookmarked
                ? "bg-saffron-500 text-white"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            }`}
          >
            <Heart className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card variant="elevated" className="p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 rounded-full text-sm font-medium capitalize">
                    {place.category.replace("-", " ")}
                  </span>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium">
                    {place.state}
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {place.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-5 h-5 text-saffron-500" />
                    <span>
                      {place.location.city}, {place.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-saffron-500 fill-saffron-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {place.rating.toFixed(1)}
                    </span>
                    <span>({place.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">
                  About this place
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {place.description}
                </p>
              </div>

              {/* Highlights */}
              {place.highlights && place.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {place.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Attractions */}
              {place.nearbyAttractions && place.nearbyAttractions.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Nearby Attractions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {place.nearbyAttractions.map((attraction, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <Navigation className="w-5 h-5 text-saffron-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {attraction}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card variant="elevated" className="p-6">
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Info
              </h3>
              <div className="space-y-4">
                {place.timings && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-saffron-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Timings
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {place.timings}
                      </p>
                    </div>
                  </div>
                )}
                {place.entryFee && (
                  <div className="flex items-start gap-3">
                    <IndianRupee className="w-5 h-5 text-saffron-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Entry Fee
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {place.entryFee}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-saffron-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Best Time to Visit
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {place.bestTimeToVisit || "Year-round"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Add to Trip Card */}
            <Card variant="glass" className="p-6 bg-gradient-to-br from-saffron-500 to-saffron-600">
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Plan Your Visit
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Add this destination to your trip planner
              </p>
              <Link href={`/trip-planner?add=${place._id}`}>
                <Button
                  variant="glass"
                  className="w-full border-white/30 hover:bg-white/20"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Trip
                </Button>
              </Link>
            </Card>

            {/* Map Card */}
            <Card variant="elevated" className="overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-saffron-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {place.location.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <a
                  href={`https://www.google.com/maps?q=${place.location.lat},${place.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}