// src/app/(main)/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Bookmark,
  Map,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Place, Trip } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

type TabType = "profile" | "bookmarks" | "trips";

export default function DashboardPage() {
  const { userData, isAuthenticated, isLoading, login } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Place[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (userData?.uid) {
      fetchUserData();
    }
  }, [userData]);

  const fetchUserData = async () => {
    setLoadingData(true);
    try {
      // Fetch trips
      const tripsResponse = await fetch(`/api/trips?userId=${userData?.uid}`);
      const tripsData = await tripsResponse.json();
      setTrips(tripsData.trips || []);

      // Fetch bookmarked places
      if (userData?.bookmarks && userData.bookmarks.length > 0) {
        const placesPromises = userData.bookmarks.map((id) =>
          fetch(`/api/places/${id}`).then((res) => res.json())
        );
        const placesData = await Promise.all(placesPromises);
        setBookmarkedPlaces(
          placesData.map((d) => d.place).filter(Boolean)
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <Skeleton className="h-40 w-full rounded-2xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-60 rounded-2xl" />
            <Skeleton className="h-60 rounded-2xl" />
            <Skeleton className="h-60 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <Card variant="elevated" className="p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-saffron-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-saffron-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to view your bookmarks, saved trips, and personalized
              recommendations.
            </p>
            <Button onClick={login} size="lg">
              Sign in with Google
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "bookmarks" as TabType, label: "Bookmarks", icon: Bookmark },
    { id: "trips" as TabType, label: "My Trips", icon: Map },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card variant="elevated" className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Image
                src={userData?.profilePicture || "/default-avatar.png"}
                alt={userData?.name || "User"}
                width={100}
                height={100}
                className="rounded-full border-4 border-saffron-500"
              />
              <div className="text-center sm:text-left">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {userData?.name?.split(" ")[0]}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {userData?.email}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-saffron-500 text-white"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.id === "bookmarks" && bookmarkedPlaces.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {bookmarkedPlaces.length}
                </span>
              )}
              {tab.id === "trips" && trips.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {trips.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="elevated" className="p-6 text-center">
                <div className="w-16 h-16 bg-saffron-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-saffron-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {bookmarkedPlaces.length}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Saved Places
                </p>
              </Card>

              <Card variant="elevated" className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {trips.length}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Planned Trips
                </p>
              </Card>

              <Card variant="elevated" className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatDate(userData?.createdAt || new Date()).split(" ")[1]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Member Since
                </p>
              </Card>
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
            <div>
              {loadingData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-2xl" />
                  ))}
                </div>
              ) : bookmarkedPlaces.length === 0 ? (
                <Card variant="elevated" className="p-12 text-center">
                  <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No bookmarks yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start exploring and save your favorite places!
                  </p>
                  <Link href="/explore">
                    <Button>Explore Destinations</Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedPlaces.map((place) => (
                    <Link key={place._id} href={`/place/${place._id}`}>
                      <Card
                        variant="elevated"
                        className="overflow-hidden card-hover"
                      >
                        <div className="relative h-48">
                          <Image
                            src={place.thumbnail}
                            alt={place.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-lg">
                              {place.title}
                            </h3>
                            <p className="text-sm text-white/80 flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {place.location.city}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Trips Tab */}
          {activeTab === "trips" && (
            <div>
              {loadingData ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-2xl" />
                  ))}
                </div>
              ) : trips.length === 0 ? (
                <Card variant="elevated" className="p-12 text-center">
                  <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No trips planned yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create your first trip and start exploring Western India!
                  </p>
                  <Link href="/trip-planner">
                    <Button>Plan a Trip</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <Card
                      key={trip._id}
                      variant="elevated"
                      className="p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                              {trip.name}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                trip.status === "confirmed"
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : trip.status === "completed"
                                  ? "bg-indigo-500/10 text-indigo-600"
                                  : "bg-saffron-500/10 text-saffron-600"
                              }`}
                            >
                              {trip.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(trip.startDate)} -{" "}
                              {formatDate(trip.endDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {trip.destinations.length} destinations
                            </span>
                            {trip.budget.estimated > 0 && (
                              <span>
                                Budget:{" "}
                                {formatCurrency(trip.budget.estimated)}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link href={`/trip-planner?edit=${trip._id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}