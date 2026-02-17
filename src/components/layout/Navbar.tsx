// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Bookmark,
  Map,
  ChevronDown,
  Sun,
  Moon,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/trip-planner", label: "Trip Planner" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, userData, isAuthenticated, login, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const isDarkContext = isHomePage && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Navbar Container with spacing from edges */}
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <nav
            className={cn(
              "relative mx-auto max-w-7xl rounded-2xl transition-all duration-500",
              isScrolled || !isHomePage
                ? "bg-white/80 dark:bg-[#0A0A0A]/80 shadow-lg shadow-black/[0.03] dark:shadow-black/20"
                : "bg-white/[0.03]",
              "backdrop-blur-xl",
              "border",
              isScrolled || !isHomePage
                ? "border-gray-200/50 dark:border-white/[0.08]"
                : "border-white/[0.08]"
            )}
          >
            {/* Subtle gradient border effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-500",
                  isScrolled && "opacity-100"
                )}
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)",
                }}
              />
            </div>

            <div className="relative px-4 sm:px-6">
              <div className="flex items-center justify-between h-16 sm:h-18">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Logo glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron-500 to-orange-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg sm:text-xl">प</span>
                    </div>
                  </motion.div>
                  <div className={cn(
                    "hidden sm:block transition-colors duration-300",
                    isDarkContext ? "text-white" : "text-gray-900 dark:text-white"
                  )}>
                    <h1 className="font-display font-bold text-lg leading-tight tracking-tight">
                      Paschim Bharat
                    </h1>
                    <p className={cn(
                      "text-[10px] tracking-wider uppercase",
                      isDarkContext ? "text-white/50" : "text-gray-500 dark:text-white/50"
                    )}>
                      Western India
                    </p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center">
                  <div className="flex items-center gap-1 p-1.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onMouseEnter={() => setHoveredLink(link.href)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className={cn(
                            "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300",
                            isActive
                              ? isDarkContext
                                ? "text-white"
                                : "text-saffron-600 dark:text-saffron-400"
                              : isDarkContext
                                ? "text-white/70 hover:text-white"
                                : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          {/* Hover/Active Background */}
                          <AnimatePresence>
                            {(isActive || hoveredLink === link.href) && (
                              <motion.span
                                layoutId="navBubble"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                  "absolute inset-0 rounded-lg -z-10",
                                  isActive
                                    ? isDarkContext
                                      ? "bg-white/10"
                                      : "bg-saffron-500/10 dark:bg-saffron-500/20"
                                    : isDarkContext
                                      ? "bg-white/5"
                                      : "bg-gray-100 dark:bg-white/5"
                                )}
                              />
                            )}
                          </AnimatePresence>
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className={cn(
                      "relative p-2.5 rounded-xl transition-colors duration-300",
                      isDarkContext
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {resolvedTheme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Auth Section */}
                  {isAuthenticated && userData ? (
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className={cn(
                          "flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-colors duration-300",
                          isDarkContext
                            ? "hover:bg-white/10"
                            : "hover:bg-gray-100 dark:hover:bg-white/10"
                        )}
                      >
                        <div className="relative">
                          <Image
                            src={userData.profilePicture || "/default-avatar.png"}
                            alt={userData.name}
                            width={36}
                            height={36}
                            className="rounded-lg object-cover"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300 hidden sm:block",
                            isDarkContext ? "text-white/70" : "text-gray-500 dark:text-white/50",
                            isUserMenuOpen && "rotate-180"
                          )}
                        />
                      </motion.button>

                      {/* User Dropdown */}
                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <>
                            {/* Backdrop */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-40"
                              onClick={() => setIsUserMenuOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 mt-3 w-64 z-50 bg-white dark:bg-[#0A0A0A] rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-gray-200/50 dark:border-white/[0.08] overflow-hidden"
                            >
                              {/* User Info */}
                              <div className="p-4 bg-gradient-to-br from-saffron-500/10 to-purple-500/10">
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={userData.profilePicture || "/default-avatar.png"}
                                    alt={userData.name}
                                    width={48}
                                    height={48}
                                    className="rounded-xl"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                      {userData.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-white/50 truncate">
                                      {userData.email}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Menu Items */}
                              <div className="p-2">
                                {[
                                  { href: "/dashboard", icon: User, label: "Dashboard" },
                                  { href: "/dashboard#bookmarks", icon: Bookmark, label: "Bookmarks" },
                                  { href: "/dashboard#trips", icon: Map, label: "My Trips" },
                                ].map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors group"
                                  >
                                    <item.icon className="w-4 h-4 text-gray-400 dark:text-white/40 group-hover:text-saffron-500 transition-colors" />
                                    <span>{item.label}</span>
                                  </Link>
                                ))}
                                
                                <div className="my-2 h-px bg-gray-200 dark:bg-white/[0.08]" />
                                
                                <button
                                  onClick={() => {
                                    logout();
                                    setIsUserMenuOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors w-full group"
                                >
                                  <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                  <span>Sign Out</span>
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={login} 
                        className="hidden sm:flex h-10 px-5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-medium shadow-lg shadow-saffron-500/25"
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  )}

                  {/* Mobile Menu Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                      "lg:hidden p-2.5 rounded-xl transition-colors",
                      isDarkContext
                        ? "text-white hover:bg-white/10"
                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 lg:hidden"
            >
              <div className="h-full bg-white dark:bg-[#0A0A0A] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">प</span>
                    </div>
                    <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                      Menu
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 rounded-2xl font-medium text-lg transition-all duration-300",
                          pathname === link.href
                            ? "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/25"
                            : "text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5"
                        )}
                      >
                        <Compass className={cn(
                          "w-5 h-5",
                          pathname === link.href ? "text-white" : "text-gray-400 dark:text-white/40"
                        )} />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* User Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02]">
                  {isAuthenticated && userData ? (
                    <div className="flex items-center gap-4">
                      <Image
                        src={userData.profilePicture || "/default-avatar.png"}
                        alt={userData.name}
                        width={48}
                        height={48}
                        className="rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {userData.name}
                        </p>
                        <Link 
                          href="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-saffron-500 hover:underline"
                        >
                          View Dashboard →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        login();
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-medium"
                      size="lg"
                    >
                      Sign In with Google
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}