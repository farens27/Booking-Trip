import { Destination } from "@/types";

export const siteConfig = {
  name: "TripExplorer",
  url: "https://tripexplorer.local",
  description:
    "Discover curated destinations, compare travel deals, preview booking quotes, and manage mock trips locally.",
  keywords: [
    "travel booking",
    "trip planner",
    "curated destinations",
    "vacation packages",
    "travel dashboard",
  ],
};

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function getDestinationUrl(destination: Destination) {
  return absoluteUrl(`/destinations/${destination.slug ?? destination.id}`);
}

export function createHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: "Worldwide",
  };
}

export function createDestinationJsonLd(destination: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${destination.name}, ${destination.country}`,
    description: destination.description,
    url: getDestinationUrl(destination),
    image: destination.gallery?.[0] ?? destination.image,
    touristType: "Leisure travelers",
    address: {
      "@type": "PostalAddress",
      addressCountry: destination.country,
      addressRegion: destination.region,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: destination.rating,
      reviewCount: destination.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
