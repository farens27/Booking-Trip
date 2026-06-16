import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden bg-charcoal-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 bg-white/15" />
          <Skeleton className="mt-6 h-14 max-w-2xl bg-white/15" />
          <Skeleton className="mt-4 h-6 max-w-xl bg-white/10" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-card p-5 shadow-lg shadow-charcoal-950/5"
            >
              <Skeleton className="h-48 w-full" />
              <Skeleton className="mt-5 h-5 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-3 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
