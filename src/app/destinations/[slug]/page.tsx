import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/DestinationDetail";
import {
  destinations,
  getDestinationBySlug,
  getRelatedDestinations,
} from "@/lib/data";
import {
  getTursoDestinationBySlug,
  listTursoDestinations,
} from "@/lib/repositories";
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

async function getCatalogDestinationBySlug(slug: string) {
  try {
    return (await getTursoDestinationBySlug(slug)) ?? getDestinationBySlug(slug);
  } catch {
    return getDestinationBySlug(slug);
  }
}

async function getRelatedCatalogDestinations(slug: string) {
  try {
    const tursoDestinations = await listTursoDestinations();
    return tursoDestinations.filter((destination) => destination.slug !== slug).slice(0, 3);
  } catch {
    return getRelatedDestinations(slug);
  }
}

export async function generateStaticParams() {
  try {
    const tursoDestinations = await listTursoDestinations();
    return tursoDestinations
      .filter((destination) => destination.slug)
      .map((destination) => ({ slug: destination.slug! }));
  } catch {
    return destinations
      .filter((destination) => destination.slug)
      .map((destination) => ({ slug: destination.slug }));
  }
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const destination = await getCatalogDestinationBySlug(params.slug);

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

export default async function DestinationPage({ params }: DestinationPageProps) {
  const destination = await getCatalogDestinationBySlug(params.slug);

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
        relatedDestinations={await getRelatedCatalogDestinations(params.slug)}
      />
    </>
  );
}
