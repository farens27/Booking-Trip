import { HeroSection } from "@/components/hero/HeroSection";
import { DestinationsSection } from "@/components/destinations/DestinationsSection";
import { PromotionsSection } from "@/components/promotions/PromotionsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";
import { createHomeJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createHomeJsonLd()) }}
      />
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
