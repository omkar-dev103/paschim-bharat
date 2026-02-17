// src/components/home/Testimonials.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Our trip to Rajasthan was absolutely magical! The platform made it so easy to discover hidden gems and plan our itinerary. The local restaurant recommendations were spot on!",
    destination: "Rajasthan",
  },
  {
    id: 2,
    name: "Rahul Patel",
    location: "Mumbai",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "As a Mumbaikar, I thought I knew Maharashtra well, but this platform showed me places I never knew existed. The Sahyadri treks were breathtaking!",
    destination: "Maharashtra",
  },
  {
    id: 3,
    name: "Ananya Desai",
    location: "Bangalore",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Goa beyond the beaches! I discovered beautiful temples, spice plantations, and the most authentic Goan cuisine. This platform is a game-changer for travel planning.",
    destination: "Goa",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "The Rann of Kutch during the festival was an experience of a lifetime. The trip planner helped us budget perfectly and find the best stays.",
    destination: "Gujarat",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-b from-sand-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4">
            Traveler Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="gradient-text">Explorers</span> Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Real experiences from real travelers who discovered the magic of
            Western India with us.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-2xl bg-saffron-500/10 flex items-center justify-center mb-8">
                <Quote className="w-8 h-8 text-saffron-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-saffron-500 fill-saffron-500"
                  />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {testimonials[currentIndex].location} •{" "}
                    {testimonials[currentIndex].destination} Trip
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-saffron-500 hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-saffron-500 hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-saffron-500"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-saffron-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}