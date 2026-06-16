"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Destination } from "@/types";

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
  const detailHref = `/destinations/${destination.slug ?? destination.id}`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg shadow-charcoal-950/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-charcoal-900 backdrop-blur-sm">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{destination.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{destination.country}</span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-foreground">
          {destination.name}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {destination.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <div className="text-2xl font-bold text-primary">
              ${destination.price}
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {destination.reviews.toLocaleString()} reviews
          </div>
        </div>

        <Link
          href={detailHref}
          className={cn(
            buttonVariants(),
            "gradient-primary gradient-primary-hover mt-4 w-full text-white shadow-md shadow-primary/20"
          )}
        >
          Explore Now
        </Link>
      </div>
    </motion.div>
  );
}
