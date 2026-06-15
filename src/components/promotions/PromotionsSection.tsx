"use client";

import { motion } from "framer-motion";
import { deals } from "@/lib/data";
import { DealCard } from "./DealCard";
import { Flame } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function PromotionsSection() {
  return (
    <section id="deals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-primary px-4 py-2 rounded-full mb-4">
            <Flame className="w-5 h-5" />
            <span className="font-semibold">Hot Deals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Limited Time Offers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on these incredible deals! Book now and save up to 35% on your dream vacation.
          </p>
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
