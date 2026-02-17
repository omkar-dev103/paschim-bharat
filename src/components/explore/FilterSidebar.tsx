// src/components/explore/FilterSidebar.tsx
"use client";

import { motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/types";

interface FilterSidebarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onClose: () => void;
  isOpen: boolean;
}

const states = ["Rajasthan", "Gujarat", "Maharashtra", "Goa"];
const categories = [
  { id: "heritage", label: "Heritage & History" },
  { id: "eco-tourism", label: "Eco Tourism" },
  { id: "adventure", label: "Adventure" },
  { id: "food", label: "Food & Culinary" },
  { id: "culture", label: "Arts & Culture" },
];
const ratings = [4, 3, 2, 1];

export default function FilterSidebar({
  filters,
  onChange,
  onClose,
  isOpen,
}: FilterSidebarProps) {
  const handleStateChange = (state: string) => {
    onChange({
      ...filters,
      state: filters.state === state ? undefined : state,
    });
  };

  const handleCategoryChange = (category: string) => {
    onChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleRatingChange = (rating: number) => {
    onChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  const hasActiveFilters =
    filters.state || filters.category || filters.rating;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
        className={`fixed lg:relative left-0 top-0 h-full lg:h-auto w-80 lg:w-72 bg-white dark:bg-gray-900 lg:bg-transparent z-50 lg:z-auto overflow-y-auto lg:overflow-visible ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="p-6 lg:p-0 lg:sticky lg:top-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white">
              Filters
            </h3>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-saffron-500 hover:text-saffron-600"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* States Filter */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              State
            </h4>
            <div className="space-y-2">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => handleStateChange(state)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                    filters.state === state
                      ? "bg-saffron-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Category
            </h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                    filters.category === category.id
                      ? "bg-saffron-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Minimum Rating
            </h4>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                    filters.rating === rating
                      ? "bg-saffron-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        filters.rating === rating
                          ? "fill-white text-white"
                          : "fill-saffron-500 text-saffron-500"
                      }`}
                    />
                  ))}
                  <span>& up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button (Mobile) */}
          <Button onClick={onClose} className="w-full lg:hidden">
            Apply Filters
          </Button>
        </div>
      </motion.aside>
    </>
  );
}