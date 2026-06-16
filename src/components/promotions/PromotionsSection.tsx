"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { listAdminDeals } from "@/lib/admin";
import { deals as staticDeals } from "@/lib/data";
import { Deal } from "@/types";
import { DealCard } from "./DealCard";

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
  const [deals, setDeals] = useState<Deal[]>(staticDeals);

  useEffect(() => {
    setDeals(listAdminDeals());
  }, []);

  return (
    <section id="deals" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-accent-foreground dark:text-accent">
            <Flame className="h-5 w-5" />
            <span className="font-semibold">Hot Deals</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Limited Time Offers
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don&apos;t miss out on these incredible deals! Book now and save up
            to 35% on your dream vacation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
