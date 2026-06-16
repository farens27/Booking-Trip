"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plane, X } from "lucide-react";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { href: "#destinations", label: "Destinations" },
  { href: "#deals", label: "Deals" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/85 shadow-sm backdrop-blur-xl"
      aria-label="Primary navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="TripExplorer home"
          >
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full shadow-lg shadow-primary/20">
              <Plane className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Trip<span className="text-primary">Explorer</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <AuthStatus />
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-muted-foreground hover:text-primary"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-muted-foreground hover:text-primary"
              )}
            >
              Admin
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants(),
                "gradient-primary gradient-primary-hover text-white shadow-lg shadow-primary/20"
              )}
            >
              My Trips
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="min-h-11 min-w-11 rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden"
          >
            <div className="space-y-4 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block min-h-11 rounded-md py-3 font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="space-y-2 border-t border-border pt-4">
                <AuthStatus />
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants(),
                    "gradient-primary gradient-primary-hover w-full text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  My Trips
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
