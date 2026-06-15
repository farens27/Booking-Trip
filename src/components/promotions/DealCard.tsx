"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Deal } from "@/types";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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
      Math.ceil((new Date(deal.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );
    setDaysLeft(days);
  }, [deal.endDate]);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
        {deal.discount}% OFF
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Time Left */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-sm">
          <Clock className="w-4 h-4" />
          <span>{daysLeft} days left</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{deal.destination}</h3>
        <p className="text-gray-500 text-sm mb-3">{deal.country}</p>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-400 line-through">${deal.originalPrice}</span>
          <span className="text-2xl font-bold text-primary">${deal.discountedPrice}</span>
        </div>

        <Button className="w-full gradient-sunset text-white hover:opacity-90 transition-opacity group">
          Book Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
