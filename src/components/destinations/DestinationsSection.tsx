"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listAdminDestinations } from "@/lib/admin";
import { destinations as staticDestinations } from "@/lib/data";
import { Destination } from "@/types";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./DestinationCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function DestinationsSection() {
  const [destinations, setDestinations] =
    useState<Destination[]>(staticDestinations);

  useEffect(() => {
    setDestinations(listAdminDestinations());
  }, []);

  return (
    <section id="destinations" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Curated escapes
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Popular Destinations
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our handpicked selection of the world&apos;s most stunning
            destinations. From tropical paradises to cultural wonders.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-primary px-8 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
