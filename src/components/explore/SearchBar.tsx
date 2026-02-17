// src/components/explore/SearchBar.tsx
"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterToggle: () => void;
  showFilters: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onFilterToggle,
  showFilters,
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations, experiences..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-10 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={onFilterToggle}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>
    </div>
  );
}