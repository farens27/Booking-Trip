"use client";

import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
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

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-600 mb-6 line-clamp-4">{testimonial.text}</p>

      {/* Trip Destination */}
      <div className="flex items-center gap-1 text-sm text-primary mb-4">
        <MapPin className="w-4 h-4" />
        <span>{testimonial.tripDestination}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
}
