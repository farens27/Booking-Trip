"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addNewsletterSubscriber } from "@/lib/newsletter";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = addNewsletterSubscriber(email);

    if (result.status === "duplicate") {
      toast.info("You're already subscribed locally", {
        description:
          "This email already exists in the admin newsletter preview.",
      });
    } else {
      toast.success("You're on the local early list", {
        description:
          "Saved in this browser. Email delivery connects in a later phase.",
      });
    }

    setEmail("");
  };

  return (
    <section
      id="contact"
      className="gradient-primary relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white">
            <Mail className="h-5 w-5" />
            <span className="font-semibold">Newsletter</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Get Travel Tips & Deals
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Subscribe to our newsletter and be the first to know about exclusive
            deals, new destinations, and travel inspiration.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1 border-0 bg-white/95 text-charcoal-950 focus-visible:ring-white/70"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white px-8 text-primary hover:bg-lime-50"
            >
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>

          <p className="mt-4 text-sm text-white/60">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
