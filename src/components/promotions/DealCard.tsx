"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal } from "@/types";

interface DealCardProps {
  deal: Deal;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export function DealCard({ deal }: DealCardProps) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const days = Math.max(
      0,
      Math.ceil(
        (new Date(deal.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    );
    setDaysLeft(days);
  }, [deal.endDate]);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg shadow-charcoal-950/5 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
    >
      <div className="gradient-deal absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-sm font-bold text-white shadow-lg">
        {deal.discount}% OFF
      </div>

      <div className="relative h-48 overflow-hidden">
        <Image
          src={deal.image}
          alt={`${deal.destination}, ${deal.country}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm text-white">
          <Clock className="h-4 w-4" />
          <span>{daysLeft} days left</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-foreground">
          {deal.destination}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">{deal.country}</p>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-muted-foreground line-through">
            ${deal.originalPrice}
          </span>
          <span className="text-2xl font-bold text-primary">
            ${deal.discountedPrice}
          </span>
        </div>

        <Button className="gradient-primary gradient-primary-hover group w-full text-white shadow-md shadow-primary/20">
          Book Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
