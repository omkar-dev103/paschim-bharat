// src/components/home/Categories.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Castle,
  Trees,
  Mountain,
  UtensilsCrossed,
  Palette,
  Compass,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    id: "heritage",
    title: "Heritage & History",
    description: "Ancient forts, palaces, and monuments",
    icon: Castle,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    count: "45+ Sites",
  },
  {
    id: "eco-tourism",
    title: "Eco Tourism",
    description: "Wildlife sanctuaries and nature reserves",
    icon: Trees,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    count: "30+ Parks",
  },
  {
    id: "adventure",
    title: "Adventure",
    description: "Trekking, water sports, and thrills",
    icon: Mountain,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    count: "25+ Activities",
  },
  {
    id: "food",
    title: "Food & Culinary",
    description: "Local cuisines and food trails",
    icon: UtensilsCrossed,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-500/10",
    count: "100+ Spots",
  },
  {
    id: "culture",
    title: "Arts & Culture",
    description: "Traditional crafts and festivals",
    icon: Palette,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    count: "50+ Experiences",
  },
  {
    id: "spiritual",
    title: "Spiritual",
    description: "Temples, ashrams, and sacred sites",
    icon: Compass,
    color: "from-saffron-500 to-orange-600",
    bgColor: "bg-saffron-500/10",
    count: "60+ Places",
  },
];

export default function Categories() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
            Explore by Interest
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Excites <span className="gradient-text">You?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Choose your passion and discover curated experiences tailored just
            for you.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/explore?category=${category.id}`}>
                <div className="group relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl ${category.bgColor} group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors duration-500`}
                    >
                      <category.icon
                        className={`w-7 h-7 bg-gradient-to-br ${category.color} bg-clip-text text-transparent group-hover:text-white transition-colors duration-500`}
                        style={{
                          stroke: "currentColor",
                          strokeWidth: 2,
                        }}
                      />
                    </div>

                    {/* Text */}
                    <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white group-hover:text-white mb-2 transition-colors duration-500">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-white/80 mb-4 transition-colors duration-500">
                      {category.description}
                    </p>

                    {/* Count Badge */}
                    <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 group-hover:bg-white/20 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-500">
                      {category.count}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}