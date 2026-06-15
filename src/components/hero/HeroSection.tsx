"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function HeroSection() {
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", formData);
    // Handle search logic here
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Explore breathtaking destinations, create unforgettable memories, and embark on the journey of a lifetime.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="border-gray-200 focus:border-primary"
              />
            </div>

            {/* Check In */}
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Check In
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="border-gray-200 focus:border-primary"
              />
            </div>

            {/* Check Out */}
            <div className="space-y-2">
              <Label htmlFor="checkOut" className="text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Check Out
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="border-gray-200 focus:border-primary"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                className="border-gray-200 focus:border-primary"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto gradient-sunset text-white hover:opacity-90 transition-opacity px-12 py-6 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Trips
            </Button>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
            <div className="text-white/60 text-sm md:text-base">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
            <div className="text-white/60 text-sm md:text-base">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">4.9</div>
            <div className="text-white/60 text-sm md:text-base">Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
