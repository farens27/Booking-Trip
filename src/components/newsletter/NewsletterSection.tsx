"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    // Add success notification here
  };

  return (
    <section id="contact" className="py-20 gradient-sunset relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6">
            <Mail className="w-5 h-5" />
            <span className="font-semibold">Newsletter</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Travel Tips & Deals
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals,
            new destinations, and travel inspiration.
          </p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/95 border-0 focus:ring-2 focus:ring-white/50"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 transition-colors px-8"
            >
              Subscribe
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </motion.form>

          <p className="text-white/60 text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
