"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-xl shadow-charcoal-950/5">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            TripExplorer hit a local preview error. Try again, or return to the
            previous page.
          </p>
          {error.digest && (
            <p className="mt-4 text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
          <Button
            onClick={reset}
            className="gradient-primary gradient-primary-hover mt-6 text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </div>
      </section>
    </main>
  );
}
