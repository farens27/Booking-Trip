"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
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
      className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className="mb-4 flex items-center gap-1"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "text-muted-foreground/35"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="mb-6 line-clamp-4 text-muted-foreground">
        {testimonial.text}
      </p>

      <div className="mb-4 flex items-center gap-1 text-sm text-primary">
        <MapPin className="h-4 w-4" />
        <span>{testimonial.tripDestination}</span>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
