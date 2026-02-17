// src/app/(main)/explore/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SearchBar from "@/components/explore/SearchBar";
import FilterSidebar from "@/components/explore/FilterSidebar";
import PlaceCard from "@/components/explore/PlaceCard";
import { SkeletonCard } from "@/components/ui/skeleton";
import { Place, FilterOptions } from "@/types";
import { MapPin } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [filters, setFilters] = useState<FilterOptions>({
    state: searchParams.get("state") || undefined,
    category: searchParams.get("category") || undefined,
  });

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.state) params.set("state", filters.state);
        if (filters.category) params.set("category", filters.category);
        if (filters.rating) params.set("rating", filters.rating.toString());
        if (searchQuery) params.set("search", searchQuery);

        const response = await fetch(`/api/places?${params.toString()}`);
        const data = await response.json();
        setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    }

    const debounce = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(debounce);
  }, [filters, searchQuery]);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-saffron-600 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore Western India
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover {places.length}+ incredible destinations across
              Rajasthan, Gujarat, Maharashtra, and Goa
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onFilterToggle={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mt-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClose={() => setShowFilters(false)}
            isOpen={showFilters}
          />

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>
                  {loading
                    ? "Loading..."
                    : `${places.length} destinations found`}
                </span>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : places.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {places.map((place, index) => (
                  <PlaceCard key={place._id} place={place} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}