// src/components/home/Hero.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Rajasthan",
    subtitle: "Where legends come alive",
    description: "Ancient forts, golden deserts, and royal heritage await",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=90",
    accent: "#F59E0B",
  },
  {
    id: 2,
    title: "Goa",
    subtitle: "Paradise found",
    description: "Where azure waters meet golden shores",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=90",
    accent: "#06B6D4",
  },
  {
    id: 3,
    title: "Gujarat",
    subtitle: "The land of legends",
    description: "Craft traditions and timeless culture",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06a5e3?w=1920&q=90",
    accent: "#F97316",
  },
  {
    id: 4,
    title: "Maharashtra",
    subtitle: "Beyond the ordinary",
    description: "Mountains, caves, and coastal wonders",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1920&q=90",
    accent: "#8B5CF6",
  },
];

const suggestedSearches = [
  "Heritage walks in Jaipur",
  "Beach resorts in Goa",
  "Wildlife safaris",
  "Cultural festivals",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [0, 1], [2, -2]);
  const rotateY = useTransform(x, [0, 1], [-2, 2]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentAccent = heroSlides[currentSlide].accent;

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-[#030303]"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              priority
              quality={90}
              className="object-cover"
            />
            {/* Multi-layer gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/50" />
            <div className="absolute inset-0 bg-[#030303]/30" />
          </motion.div>
        </AnimatePresence>

        {/* Animated grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_100%)] opacity-60" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: currentAccent, opacity: 0.1 }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
        />
      </div>

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Main Content - Added pt-32 for navbar spacing */}
      <div className="relative min-h-screen container-custom flex flex-col justify-center pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
              <span className="text-white/60 text-sm font-light tracking-wide">
                IndiaSkills 2025-26
              </span>
            </div>
          </motion.div>

          {/* Dynamic Title */}
          <div className="mb-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white/40 text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-4"
            >
              Experience Western India
            </motion.p>
            
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="origin-center"
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block"
                >
                  Discover
                </motion.span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="block mt-2"
                    style={{ color: currentAccent }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </motion.div>
          </div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-white/70 font-light">
                {heroSlides[currentSlide].subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/40 mt-2 font-light">
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Premium Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-2xl"
          >
            <div 
              className={`relative rounded-2xl transition-all duration-500 ${
                isSearchFocused 
                  ? 'bg-white/[0.08] shadow-2xl shadow-white/[0.05]' 
                  : 'bg-white/[0.03]'
              }`}
              style={{
                border: `1px solid ${isSearchFocused ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Glow effect */}
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${currentAccent}20, transparent, ${currentAccent}10)`,
                  }}
                />
              )}
              
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 p-2">
                <div className="flex-1 flex items-center gap-4 px-4 py-3">
                  <Compass className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isSearchFocused ? 'text-white/80' : 'text-white/30'}`} />
                  <input
                    type="text"
                    placeholder="Where will your journey begin?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-base sm:text-lg font-light"
                  />
                </div>
                <Link href={`/explore${searchQuery ? `?search=${searchQuery}` : ""}`} className="sm:flex-shrink-0">
                  <Button 
                    size="lg" 
                    className="relative w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-base font-medium overflow-hidden group"
                    style={{ backgroundColor: currentAccent }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Suggested Searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              <span className="text-white/30 text-sm py-2">Try:</span>
              {suggestedSearches.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 rounded-full text-sm text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:text-white/80 hover:border-white/[0.12] transition-all duration-300"
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 sm:gap-12 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/[0.06]"
          >
            {[
              { value: "4", label: "States", suffix: "" },
              { value: "100", label: "Destinations", suffix: "+" },
              { value: "50", label: "Experiences", suffix: "+" },
              { value: "1000", label: "Local Partners", suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="group"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: currentAccent }}>
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-white/30 text-xs sm:text-sm mt-1 font-light tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation - Repositioned */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className="group relative flex items-center gap-4"
          >
            <span className={`text-xs font-light tracking-wider transition-all duration-300 ${
              index === currentSlide ? 'text-white/80 translate-x-0' : 'text-transparent -translate-x-4 group-hover:text-white/40 group-hover:translate-x-0'
            }`}>
              {slide.title}
            </span>
            <div className="relative w-12 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                initial={false}
                animate={{
                  width: index === currentSlide ? '100%' : '0%',
                  backgroundColor: index === currentSlide ? currentAccent : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: index === currentSlide ? 7 : 0.3 }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}