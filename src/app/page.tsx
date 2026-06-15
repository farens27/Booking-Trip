import { HeroSection } from "@/components/hero/HeroSection";
import { DestinationsSection } from "@/components/destinations/DestinationsSection";
import { PromotionsSection } from "@/components/promotions/PromotionsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Popular Destinations */}
      <DestinationsSection />

      {/* Hot Deals & Promotions */}
      <PromotionsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </main>
  );
}
