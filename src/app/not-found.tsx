import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-xl shadow-charcoal-950/5">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Compass className="h-7 w-7" />
          </div>
          <p className="text-sm font-semibold text-primary">404</p>
          <h1 className="mt-2 text-3xl font-bold">
            This route drifted off-map
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you’re looking for does not exist in this local
            TripExplorer preview.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(
                buttonVariants(),
                "gradient-primary gradient-primary-hover text-white"
              )}
            >
              Back home
            </Link>
            <Link
              href="/search"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              )}
            >
              Search trips
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
