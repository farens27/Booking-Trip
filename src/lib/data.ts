import { Destination, Deal, Testimonial } from "@/types";

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
    ],
    price: 899,
    rating: 4.9,
    reviews: 2847,
    duration: "6 days / 5 nights",
    bestTimeToVisit: "April to October",
    description:
      "Tropical paradise with stunning beaches, ancient temples, rice terraces, and warm island hospitality.",
    amenities: [
      "Beach resorts",
      "Temple tours",
      "Airport transfer",
      "Daily breakfast",
      "Private guide",
      "Spa access",
    ],
    highlights: [
      "Watch sunset at Tanah Lot Temple",
      "Explore Ubud rice terraces",
      "Relax on Nusa Dua beaches",
      "Try a Balinese cooking class",
    ],
  },
  {
    id: "2",
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
    ],
    price: 1299,
    rating: 4.8,
    reviews: 3156,
    duration: "5 days / 4 nights",
    bestTimeToVisit: "May to September",
    description:
      "Iconic white buildings, blue domes, volcanic beaches, and breathtaking sunset views over the Aegean Sea.",
    amenities: [
      "Cliffside hotel",
      "Sunset cruise",
      "Breakfast included",
      "Winery visit",
      "Port transfer",
      "Photo spots",
    ],
    highlights: [
      "See the sunset in Oia",
      "Sail around the caldera",
      "Visit volcanic black sand beaches",
      "Taste local Assyrtiko wine",
    ],
  },
  {
    id: "3",
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "East Asia",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80",
    ],
    price: 1499,
    rating: 4.9,
    reviews: 4521,
    duration: "7 days / 6 nights",
    bestTimeToVisit: "March to May or October to November",
    description:
      "A dynamic city where ancient tradition, neon nightlife, world-class cuisine, and cutting-edge technology meet.",
    amenities: [
      "Central hotel",
      "JR transit pass",
      "Food tour",
      "Museum entry",
      "Airport transfer",
      "Local host",
    ],
    highlights: [
      "Cross Shibuya Crossing",
      "Visit Senso-ji Temple",
      "Eat through Tsukiji Outer Market",
      "Explore Shinjuku at night",
    ],
  },
  {
    id: "4",
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80",
    ],
    price: 2499,
    rating: 4.9,
    reviews: 1893,
    duration: "6 days / 5 nights",
    bestTimeToVisit: "November to April",
    description:
      "Crystal-clear lagoons, white-sand beaches, coral reefs, and overwater villas built for slow luxury.",
    amenities: [
      "Overwater villa",
      "Speedboat transfer",
      "Snorkeling gear",
      "Breakfast included",
      "Sunset dinner",
      "Spa credit",
    ],
    highlights: [
      "Snorkel with tropical marine life",
      "Stay in an overwater villa",
      "Enjoy a private sandbank picnic",
      "Watch dolphins at sunset",
    ],
  },
  {
    id: "5",
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=1200&q=80",
    ],
    price: 1099,
    rating: 4.7,
    reviews: 5678,
    duration: "5 days / 4 nights",
    bestTimeToVisit: "April to June or September to October",
    description:
      "The city of love, art, fashion, and world-class cuisine, with timeless streets and iconic landmarks.",
    amenities: [
      "Boutique hotel",
      "Museum pass",
      "Seine cruise",
      "Breakfast included",
      "Metro card",
      "Walking tour",
    ],
    highlights: [
      "Visit the Eiffel Tower",
      "Explore the Louvre",
      "Cruise the Seine",
      "Discover Montmartre cafés",
    ],
  },
  {
    id: "6",
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
    ],
    price: 1399,
    rating: 4.8,
    reviews: 3421,
    duration: "5 days / 4 nights",
    bestTimeToVisit: "November to March",
    description:
      "A futuristic skyline, desert adventures, luxury shopping, beach clubs, and traditional Arabian culture.",
    amenities: [
      "City hotel",
      "Desert safari",
      "Airport transfer",
      "Breakfast included",
      "Burj Khalifa entry",
      "Marina cruise",
    ],
    highlights: [
      "Go on a desert safari",
      "See the Burj Khalifa skyline",
      "Cruise Dubai Marina",
      "Shop traditional souks",
    ],
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getRelatedDestinations(slug: string) {
  return destinations
    .filter((destination) => destination.slug !== slug)
    .slice(0, 3);
}

export const deals: Deal[] = [
  {
    id: "1",
    destination: "Phuket",
    country: "Thailand",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 30,
    endDate: "2026-06-30",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
  },
  {
    id: "2",
    destination: "Barcelona",
    country: "Spain",
    originalPrice: 1499,
    discountedPrice: 999,
    discount: 33,
    endDate: "2026-07-15",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  },
  {
    id: "3",
    destination: "Cancun",
    country: "Mexico",
    originalPrice: 1799,
    discountedPrice: 1199,
    discount: 35,
    endDate: "2026-06-25",
    image:
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&q=80",
  },
  {
    id: "4",
    destination: "Sydney",
    country: "Australia",
    originalPrice: 2299,
    discountedPrice: 1699,
    discount: 25,
    endDate: "2026-07-20",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "TripExplorer made planning our honeymoon absolutely seamless. The Bali package exceeded all our expectations!",
    tripDestination: "Bali, Indonesia",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "Found an amazing deal for Tokyo! The entire experience from booking to the trip itself was fantastic.",
    tripDestination: "Tokyo, Japan",
  },
  {
    id: "3",
    name: "Emma Williams",
    location: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "The customer service is outstanding. They helped me plan the perfect family vacation to Santorini.",
    tripDestination: "Santorini, Greece",
  },
  {
    id: "4",
    name: "David Martinez",
    location: "Miami, USA",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 4,
    text: "Great prices and incredible destinations. Already planning my next adventure through TripExplorer!",
    tripDestination: "Maldives",
  },
];
