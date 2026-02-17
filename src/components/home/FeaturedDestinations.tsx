// src/components/home/FeaturedDestinations.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Place } from "@/types";

export default function FeaturedDestinations() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("/api/places?featured=true&limit=6");
        const data = await response.json();
        setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="section-padding bg-sand-50 dark:bg-gray-950">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 rounded-full text-sm font-medium mb-4">
            Featured Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Iconic <span className="gradient-text">Landmarks</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            From majestic forts to serene beaches, discover the most breathtaking
            destinations Western India has to offer.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {places.map((place) => (
              <motion.div key={place._id} variants={itemVariants}>
                <Link href={`/place/${place._id}`}>
                  <Card
                    variant="elevated"
                    className="group cursor-pointer overflow-hidden card-hover"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={place.thumbnail || "/placeholder-destination.jpg"}
                        alt={place.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 dark:text-white capitalize">
                        {place.category}
                      </span>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full">
                        <Star className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
                        <span className="text-xs font-semibold">
                          {place.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {place.location.city}, {place.state}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-saffron-500 transition-colors">
                        {place.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {place.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          Best time: {place.bestTimeToVisit || "Year-round"}
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
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <Button size="lg" variant="outline">
              View All Destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}