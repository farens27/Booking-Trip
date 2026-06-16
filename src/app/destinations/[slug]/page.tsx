import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/DestinationDetail";
import {
  destinations,
  getDestinationBySlug,
  getRelatedDestinations,
} from "@/lib/data";
import {
  createDestinationJsonLd,
  getDestinationUrl,
  siteConfig,
} from "@/lib/seo";

interface DestinationPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return destinations
    .filter((destination) => destination.slug)
    .map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }: DestinationPageProps): Metadata {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    return {
      title: "Destination Not Found - TripExplorer",
    };
  }

  const title = `${destination.name}, ${destination.country} - TripExplorer`;
  const url = getDestinationUrl(destination);
  const image = destination.gallery?.[0] ?? destination.image;

  return {
    title,
    description: destination.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description: destination.description,
      url,
      images: [
        { url: image, alt: `${destination.name}, ${destination.country}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: destination.description,
      images: [image],
    },
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createDestinationJsonLd(destination)),
        }}
      />
      <DestinationDetail
        destination={destination}
        relatedDestinations={getRelatedDestinations(params.slug)}
      />
    </>
  );
}
