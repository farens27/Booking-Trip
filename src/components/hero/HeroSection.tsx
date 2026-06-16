"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function HeroSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (formData.destination.trim()) {
      params.set("destination", formData.destination.trim());
    }
    if (formData.checkIn) {
      params.set("checkIn", formData.checkIn);
    }
    if (formData.checkOut) {
      params.set("checkOut", formData.checkOut);
    }
    params.set("guests", String(formData.guests));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 backdrop-blur-md">
            Enterprise-grade travel booking is coming
          </p>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Discover Your Next
            <span className="mt-2 block bg-gradient-to-r from-lime-200 via-primary to-lime-500 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/80 md:text-2xl">
            Explore breathtaking destinations, compare curated deals, and plan
            every journey with confidence.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-background/95 p-6 text-left shadow-2xl shadow-charcoal-950/20 backdrop-blur-md dark:bg-card/95"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label
                htmlFor="destination"
                className="flex items-center gap-2 text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="checkIn"
                className="flex items-center gap-2 text-foreground"
              >
                <Calendar className="h-4 w-4 text-primary" />
                Check In
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) =>
                  setFormData({ ...formData, checkIn: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="checkOut"
                className="flex items-center gap-2 text-foreground"
              >
                <Calendar className="h-4 w-4 text-primary" />
                Check Out
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) =>
                  setFormData({ ...formData, checkOut: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="guests"
                className="flex items-center gap-2 text-foreground"
              >
                <Users className="h-4 w-4 text-primary" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guests: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              type="submit"
              size="lg"
              className="gradient-primary gradient-primary-hover px-12 py-6 text-lg text-white shadow-lg shadow-primary/25"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Trips
            </Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">
              500+
            </div>
            <div className="text-sm text-white/60 md:text-base">
              Destinations
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">
              10K+
            </div>
            <div className="text-sm text-white/60 md:text-base">
              Happy Travelers
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">4.9</div>
            <div className="text-sm text-white/60 md:text-base">Rating</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
