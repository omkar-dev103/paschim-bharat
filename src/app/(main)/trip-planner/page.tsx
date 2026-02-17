// src/app/(main)/trip-planner/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Plus,
  Trash2,
  GripVertical,
  IndianRupee,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Place } from "@/types";
import toast from "react-hot-toast";
import Image from "next/image";

interface TripDestination {
  placeId: string;
  placeName: string;
  thumbnail: string;
  order: number;
}

export default function TripPlannerPage() {
  const { isAuthenticated, userData, login } = useAuth();
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [destinations, setDestinations] = useState<TripDestination[]>([]);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [showPlaceSelector, setShowPlaceSelector] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("/api/places?limit=50");
        const data = await response.json();
        setAvailablePlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }
    fetchPlaces();
  }, []);

  const addDestination = (place: Place) => {
    if (destinations.find((d) => d.placeId === place._id)) {
      toast.error("This destination is already in your trip");
      return;
    }

    setDestinations([
      ...destinations,
      {
        placeId: place._id!,
        placeName: place.title,
        thumbnail: place.thumbnail,
        order: destinations.length + 1,
      },
    ]);
    setShowPlaceSelector(false);
    toast.success(`Added ${place.title} to your trip`);
  };

  const removeDestination = (placeId: string) => {
    setDestinations(
      destinations
        .filter((d) => d.placeId !== placeId)
        .map((d, index) => ({ ...d, order: index + 1 }))
    );
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSaveTrip = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save your trip");
      return;
    }

    if (!tripName || !startDate || !endDate || destinations.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData?.uid,
          name: tripName,
          destinations,
          startDate,
          endDate,
          budget: {
            estimated: parseFloat(budget) || 0,
            currency: "INR",
          },
          notes,
          status: "planning",
        }),
      });

      if (response.ok) {
        toast.success("Trip saved successfully!");
        // Reset form
        setTripName("");
        setStartDate("");
        setEndDate("");
        setBudget("");
        setNotes("");
        setDestinations([]);
      } else {
        throw new Error("Failed to save trip");
      }
    } catch (error) {
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-indigo-800 py-16">
        <div className="container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Trip Planner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Create your perfect Western India itinerary. Add destinations,
            set your budget, and plan the trip of a lifetime.
          </motion.p>
        </div>
      </div>

      <div className="container-custom mt-8">
        {!isAuthenticated ? (
          <Card variant="elevated" className="p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-saffron-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-saffron-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Sign in to Plan Your Trip
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create and save personalized itineraries for your Western India
              adventure.
            </p>
            <Button onClick={login} size="lg">
              Sign in with Google
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip Details Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card variant="elevated" className="p-6">
                <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Trip Details
                </h2>

                <div className="space-y-6">
                  {/* Trip Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Trip Name *
                    </label>
                    <input
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      placeholder="e.g., Rajasthan Heritage Tour"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimated Budget (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="50000"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or notes..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </Card>

              {/* Destinations */}
              <Card variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                    Destinations ({destinations.length})
                  </h2>
                  <Button
                    onClick={() => setShowPlaceSelector(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Place
                  </Button>
                </div>

                {destinations.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No destinations added yet
                    </p>
                    <Button
                      onClick={() => setShowPlaceSelector(true)}
                      variant="outline"
                    >
                      Add Your First Destination
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {destinations.map((dest, index) => (
                      <motion.div
                        key={dest.placeId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                      >
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                        <span className="w-8 h-8 bg-saffron-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={dest.thumbnail}
                            alt={dest.placeName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {dest.placeName}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeDestination(dest.placeId)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trip Summary */}
              <Card variant="elevated" className="p-6">
                <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Trip Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Duration
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {calculateDays()} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Destinations
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {destinations.length} places
                    </span>
                  </div>
                  {budget && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Budget
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ₹{parseInt(budget).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700" />

                <Button
                  onClick={handleSaveTrip}
                  isLoading={saving}
                  className="w-full"
                  size="lg"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Trip
                </Button>
              </Card>

              {/* Tips */}
              <Card variant="glass" className="p-6 bg-gradient-to-br from-indigo-500/10 to-saffron-500/10">
                <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Planning Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Consider travel time between destinations</li>
                  <li>• Book accommodations in advance</li>
                  <li>• Check local festivals during your dates</li>
                  <li>• Keep buffer days for unexpected discoveries</li>
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Place Selector Modal */}
      {showPlaceSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                  Select Destination
                </h3>
                <button
                  onClick={() => setShowPlaceSelector(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availablePlaces.map((place) => (
                  <button
                    key={place._id}
                    onClick={() => addDestination(place)}
                    disabled={destinations.some(
                      (d) => d.placeId === place._id
                    )}
                    className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                      destinations.some((d) => d.placeId === place._id)
                        ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                        : "bg-gray-50 dark:bg-gray-800 hover:bg-saffron-500/10 hover:border-saffron-500"
                    } border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={place.thumbnail}
                        alt={place.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {place.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {place.location.city}, {place.state}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}