// src/app/restaurants/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  Clock,
  IndianRupee,
  Filter,
  X,
  ChevronDown,
  Heart,
  Utensils,
  Flame,
  Leaf,
  Coffee,
  Wine,
  ArrowRight,
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  location: string;
  state: string;
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4;
  image: string;
  images: string[];
  isOpen: boolean;
  openingHours: string;
  specialties: string[];
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

// Sample Data
const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    slug: "spice-garden-jaipur",
    description: "Authentic Rajasthani cuisine in a royal heritage setting with traditional thali experiences.",
    cuisine: ["Rajasthani", "North Indian"],
    location: "Jaipur",
    state: "Rajasthan",
    rating: 4.8,
    reviewCount: 1250,
    priceRange: 3,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "11:00 AM - 11:00 PM",
    specialties: ["Dal Baati Churma", "Laal Maas", "Ghevar"],
    tags: ["Heritage", "Fine Dining", "Family"],
    isFeatured: true,
  },
  {
    id: "2",
    name: "Coastal Flavors",
    slug: "coastal-flavors-goa",
    description: "Fresh seafood and traditional Goan delicacies with stunning beach views.",
    cuisine: ["Goan", "Seafood", "Portuguese"],
    location: "Panjim",
    state: "Goa",
    rating: 4.6,
    reviewCount: 890,
    priceRange: 2,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "12:00 PM - 10:30 PM",
    specialties: ["Fish Curry Rice", "Prawn Balchão", "Bebinca"],
    tags: ["Beachside", "Casual", "Romantic"],
    isNew: true,
  },
  {
    id: "3",
    name: "Gujarat Bhavan",
    slug: "gujarat-bhavan-ahmedabad",
    description: "Traditional Gujarati thali with unlimited servings and authentic flavors.",
    cuisine: ["Gujarati", "Vegetarian"],
    location: "Ahmedabad",
    state: "Gujarat",
    rating: 4.7,
    reviewCount: 2100,
    priceRange: 2,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "11:00 AM - 3:30 PM, 7:00 PM - 10:30 PM",
    specialties: ["Unlimited Thali", "Dhokla", "Fafda"],
    tags: ["Vegetarian", "Traditional", "Family"],
    isFeatured: true,
  },
  {
    id: "4",
    name: "Mumbai Masala",
    slug: "mumbai-masala-mumbai",
    description: "Street food inspired fine dining celebrating Mumbai's culinary diversity.",
    cuisine: ["Street Food", "Maharashtrian", "Fusion"],
    location: "Mumbai",
    state: "Maharashtra",
    rating: 4.5,
    reviewCount: 1560,
    priceRange: 3,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    images: [],
    isOpen: false,
    openingHours: "6:00 PM - 12:00 AM",
    specialties: ["Vada Pav Slider", "Pav Bhaji Fondue", "Cutting Chai"],
    tags: ["Trendy", "Innovative", "Nightlife"],
  },
  {
    id: "5",
    name: "Desert Oasis",
    slug: "desert-oasis-jaisalmer",
    description: "Rooftop dining under the stars with panoramic views of Jaisalmer Fort.",
    cuisine: ["Rajasthani", "North Indian", "Continental"],
    location: "Jaisalmer",
    state: "Rajasthan",
    rating: 4.9,
    reviewCount: 680,
    priceRange: 4,
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "7:00 PM - 11:00 PM",
    specialties: ["Fort View Dinner", "Ker Sangri", "Mawa Kachori"],
    tags: ["Rooftop", "Romantic", "Luxury"],
    isFeatured: true,
  },
  {
    id: "6",
    name: "Fisherman's Wharf",
    slug: "fishermans-wharf-goa",
    description: "Iconic riverside restaurant known for fresh catches and Goan hospitality.",
    cuisine: ["Goan", "Seafood"],
    location: "Panjim",
    state: "Goa",
    rating: 4.4,
    reviewCount: 3200,
    priceRange: 3,
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "12:00 PM - 3:30 PM, 7:00 PM - 11:00 PM",
    specialties: ["Crab Xec Xec", "Kingfish Steak", "Feni Cocktails"],
    tags: ["Riverside", "Live Music", "Family"],
  },
  {
    id: "7",
    name: "The Konkan Kitchen",
    slug: "konkan-kitchen-mumbai",
    description: "Coastal Maharashtrian cuisine featuring recipes from the Konkan region.",
    cuisine: ["Konkani", "Seafood", "Maharashtrian"],
    location: "Mumbai",
    state: "Maharashtra",
    rating: 4.6,
    reviewCount: 920,
    priceRange: 3,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "12:00 PM - 11:00 PM",
    specialties: ["Solkadhi", "Bombil Fry", "Malvani Chicken"],
    tags: ["Authentic", "Coastal", "Hidden Gem"],
    isNew: true,
  },
  {
    id: "8",
    name: "Kutchi Rasoi",
    slug: "kutchi-rasoi-bhuj",
    description: "Experience the unique flavors of Kutch with traditional recipes passed down generations.",
    cuisine: ["Kutchi", "Gujarati", "Vegetarian"],
    location: "Bhuj",
    state: "Gujarat",
    rating: 4.8,
    reviewCount: 450,
    priceRange: 2,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    images: [],
    isOpen: true,
    openingHours: "8:00 AM - 10:00 PM",
    specialties: ["Dabeli", "Kutchi Thali", "Bhujia"],
    tags: ["Local", "Traditional", "Budget-Friendly"],
  },
];

const cuisineCategories = [
  { id: "all", name: "All Cuisines", icon: Utensils },
  { id: "rajasthani", name: "Rajasthani", icon: Flame },
  { id: "goan", name: "Goan", icon: Wine },
  { id: "gujarati", name: "Gujarati", icon: Leaf },
  { id: "maharashtrian", name: "Maharashtrian", icon: Coffee },
  { id: "seafood", name: "Seafood", icon: Sparkles },
];

const states = ["All States", "Rajasthan", "Goa", "Gujarat", "Maharashtra"];
const priceRanges = ["Any Price", "₹", "₹₹", "₹₹₹", "₹₹₹₹"];
const sortOptions = ["Recommended", "Rating: High to Low", "Reviews: Most", "Price: Low to High", "Price: High to Low"];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.cuisine.some(c => c.toLowerCase().includes(query)) ||
        r.location.toLowerCase().includes(query) ||
        r.specialties.some(s => s.toLowerCase().includes(query))
      );
    }

    // Cuisine filter
    if (selectedCuisine !== "all") {
      filtered = filtered.filter(r =>
        r.cuisine.some(c => c.toLowerCase().includes(selectedCuisine.toLowerCase()))
      );
    }

    // State filter
    if (selectedState !== "All States") {
      filtered = filtered.filter(r => r.state === selectedState);
    }

    // Price filter
    if (selectedPrice !== "Any Price") {
      const priceLevel = selectedPrice.length;
      filtered = filtered.filter(r => r.priceRange === priceLevel);
    }

    // Sorting
    switch (sortBy) {
      case "Rating: High to Low":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Reviews: Most":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.priceRange - b.priceRange);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.priceRange - a.priceRange);
        break;
      default:
        // Recommended: featured first, then by rating
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchQuery, selectedCuisine, selectedState, selectedPrice, sortBy]);

  const featuredRestaurants = restaurants.filter(r => r.isFeatured);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#030303]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Restaurant ambiance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-[#030303]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]"
          />
        </div>

        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Utensils className="w-4 h-4 text-saffron-400" />
              <span className="text-white/60 text-sm">Culinary Experiences</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Savor the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 to-orange-500">
                Flavors of the West
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 font-light max-w-2xl mb-10">
              From royal Rajasthani thalis to coastal Goan seafood, discover the diverse culinary heritage of Western India.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden focus-within:border-saffron-500/50 focus-within:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 px-5 py-4 flex-1">
                  <Search className="w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines, or dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base"
                  />
                </div>
                <Button className="m-2 px-6 py-5 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-500 hover:from-saffron-600 hover:to-orange-600">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cuisine Categories */}
      <section className="relative -mt-8 z-10 pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
          >
            {cuisineCategories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCuisine === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCuisine(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-saffron-500 to-orange-500 text-white shadow-lg shadow-saffron-500/25"
                      : "bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Restaurants */}
      {selectedCuisine === "all" && !searchQuery && (
        <section className="py-12 border-b border-gray-200 dark:border-white/5">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
                  Featured Restaurants
                </h2>
                <p className="text-gray-500 dark:text-white/50 mt-1">
                  Handpicked culinary destinations
                </p>
              </div>
              <Link
                href="#all-restaurants"
                className="hidden sm:flex items-center gap-2 text-saffron-500 hover:text-saffron-600 font-medium transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeaturedRestaurantCard
                    restaurant={restaurant}
                    isFavorite={favorites.includes(restaurant.id)}
                    onToggleFavorite={() => toggleFavorite(restaurant.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Restaurant Listing */}
      <section id="all-restaurants" className="py-12">
        <div className="container-custom">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <p className="text-gray-600 dark:text-white/60">
                <span className="font-semibold text-gray-900 dark:text-white">{filteredRestaurants.length}</span> restaurants found
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2",
                  showFilters && "bg-saffron-500/10 border-saffron-500/50 text-saffron-500"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {(selectedState !== "All States" || selectedPrice !== "Any Price") && (
                  <span className="w-2 h-2 rounded-full bg-saffron-500" />
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 dark:text-white/80 focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === "grid"
                      ? "bg-saffron-500 text-white"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === "list"
                      ? "bg-saffron-500 text-white"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* State Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        State
                      </label>
                      <div className="relative">
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-gray-700 dark:text-white/80 focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                        >
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        {priceRanges.map((price) => (
                          <button
                            key={price}
                            onClick={() => setSelectedPrice(price)}
                            className={cn(
                              "flex-1 py-3 rounded-xl text-sm font-medium transition-all",
                              selectedPrice === price
                                ? "bg-saffron-500 text-white"
                                : "bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10"
                            )}
                          >
                            {price === "Any Price" ? "Any" : price}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        Minimum Rating
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-700 dark:text-white/80">4.0+</span>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedState("All States");
                          setSelectedPrice("Any Price");
                          setSelectedCuisine("all");
                        }}
                        className="w-full"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Restaurant Grid/List */}
          {filteredRestaurants.length > 0 ? (
            <div className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            )}>
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {viewMode === "grid" ? (
                    <RestaurantCard
                      restaurant={restaurant}
                      isFavorite={favorites.includes(restaurant.id)}
                      onToggleFavorite={() => toggleFavorite(restaurant.id)}
                    />
                  ) : (
                    <RestaurantListItem
                      restaurant={restaurant}
                      isFavorite={favorites.includes(restaurant.id)}
                      onToggleFavorite={() => toggleFavorite(restaurant.id)}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState onClear={() => {
              setSearchQuery("");
              setSelectedCuisine("all");
              setSelectedState("All States");
              setSelectedPrice("Any Price");
            }} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron-500 to-orange-500" />
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Own a Restaurant?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join our platform and showcase your culinary creations to thousands of food lovers exploring Western India.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-saffron-500 hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-xl"
            >
              Partner With Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Featured Restaurant Card Component
function FeaturedRestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {restaurant.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-saffron-500 to-orange-500 text-white text-xs font-medium">
                Featured
              </span>
            )}
            {restaurant.isNew && (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                New
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-red-500 text-red-500")} />
          </button>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.location}, {restaurant.state}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              {restaurant.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{restaurant.rating}</span>
              </div>
              <span className="text-gray-500 dark:text-white/50 text-sm">
                ({restaurant.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-white/60">
              {Array.from({ length: restaurant.priceRange }).map((_, i) => (
                <IndianRupee key={i} className="w-3.5 h-3.5" />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.cuisine.slice(0, 3).map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 text-xs"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className={restaurant.isOpen ? "text-emerald-500" : "text-red-500"}>
                {restaurant.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
            <span className="text-saffron-500 font-medium text-sm group-hover:underline">
              View Menu →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Regular Restaurant Card Component
function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-saffron-500/30 hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {restaurant.isNew && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                New
              </span>
            )}
          </div>

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 transition-colors"
          >
            <Heart className={cn(
              "w-4 h-4",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-white"
            )} />
          </button>

          {/* Status Badge */}
          <div className="absolute bottom-3 right-3">
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
              restaurant.isOpen
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"
            )}>
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-saffron-500 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-gray-900 dark:text-white text-sm">{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 dark:text-white/50 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{restaurant.location}</span>
            <span>•</span>
            <span className="flex items-center">
              {Array.from({ length: restaurant.priceRange }).map((_, i) => (
                <IndianRupee key={i} className="w-3 h-3" />
              ))}
            </span>
          </div>

          <p className="text-gray-600 dark:text-white/60 text-sm line-clamp-2 mb-3">
            {restaurant.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisine.slice(0, 2).map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 text-xs"
              >
                {c}
              </span>
            ))}
            {restaurant.cuisine.length > 2 && (
              <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/40 text-xs">
                +{restaurant.cuisine.length - 2}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// List View Component
function RestaurantListItem({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <motion.div
        whileHover={{ x: 4 }}
        className="group flex gap-5 bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-saffron-500/30 hover:shadow-lg p-4 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {restaurant.isNew && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-medium">
              New
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-saffron-500 transition-colors">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-3 text-gray-500 dark:text-white/50 text-sm mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {restaurant.location}, {restaurant.state}
                </span>
                <span className="flex items-center">
                  {Array.from({ length: restaurant.priceRange }).map((_, i) => (
                    <IndianRupee key={i} className="w-3 h-3" />
                  ))}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/10">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{restaurant.rating}</span>
                <span className="text-gray-500 dark:text-white/50 text-sm">({restaurant.reviewCount})</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite();
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <Heart className={cn(
                  "w-5 h-5",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                )} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-white/60 text-sm mt-2 line-clamp-1">
            {restaurant.description}
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisine.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 text-xs"
                >
                  {c}
                </span>
              ))}
            </div>
            <span className={cn(
              "text-sm font-medium",
              restaurant.isOpen ? "text-emerald-500" : "text-red-500"
            )}>
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Empty State Component
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
        <Utensils className="w-10 h-10 text-gray-400 dark:text-white/30" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No restaurants found
      </h3>
      <p className="text-gray-500 dark:text-white/50 mb-6 max-w-md">
        We couldn't find any restaurants matching your criteria. Try adjusting your filters or search query.
      </p>
      <Button onClick={onClear}>
        Clear All Filters
      </Button>
    </motion.div>
  );
}