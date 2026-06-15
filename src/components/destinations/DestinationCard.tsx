"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Destination } from "@/types";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  destination: Destination;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 text-gray-500 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{destination.country}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="text-2xl font-bold text-primary">${destination.price}</div>
          </div>
          <div className="text-sm text-gray-500">{destination.reviews.toLocaleString()} reviews</div>
        </div>

        <Button
          className="w-full mt-4 gradient-sunset text-white hover:opacity-90 transition-opacity"
        >
          Explore Now
        </Button>
      </div>
    </motion.div>
  );
}
