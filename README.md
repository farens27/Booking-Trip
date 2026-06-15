# 🌍 TripExplorer - Travel Booking Landing Page

A modern, interactive travel booking landing page built with Next.js 14, featuring a stunning Green & Emerald color theme inspired by nature and eco-tourism.

![TripExplorer](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80)

---

## ✨ Features

### 🎯 Core Sections
- **Hero Section** - Full-screen hero with integrated search form (destination, dates, guests)
- **Popular Destinations** - Grid showcase of 6 stunning destinations with ratings and pricing
- **Hot Deals** - Limited-time promotions with countdown timers and discount badges
- **Testimonials** - Customer reviews with star ratings and trip destinations
- **Newsletter** - Email subscription for travel tips and exclusive deals

### 🎨 Design
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion powered interactions
- **Modern UI** - Clean, accessible components with ShadCN UI
- **Custom Color Theme** - Nature-inspired Green & Emerald palette

### 🔧 Functionality
- **Search Form** - Filter trips by destination, dates, and guest count
- **Interactive Cards** - Hover effects, zoom animations, and transitions
- **Dynamic Deal Countdown** - Real-time days remaining calculation
- **Mobile Navigation** - Hamburger menu with smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [ShadCN UI](https://ui.shadcn.com/) | Re-usable component library |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Lucide Icons](https://lucide.dev/) | Beautiful open-source icons |

---

## 🎨 Color Palette

### Green & Emerald Theme (Nature-Inspired)

| Color | Hex | Usage |
|-------|-----|-------|
| Green | `#22c55e` | Primary buttons, accents |
| Emerald | `#10b981` | Secondary accents, gradients |
| Gradient | `#22c55e → #10b981` | CTAs, hero elements |

### Alternative Themes Available
- 🔵 **Blue & Teal** - Ocean & sky vibes (beach destinations)
- 🟠 **Orange & Coral** - Warm & adventurous (exotic travel)
- 🟣 **Purple & Violet** - Luxurious & elegant (premium travel)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & CSS variables
│
├── components/
│   ├── ui/                 # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   │
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── hero/               # Hero section
│   │   └── HeroSection.tsx
│   │
│   ├── destinations/       # Destinations showcase
│   │   ├── DestinationsSection.tsx
│   │   └── DestinationCard.tsx
│   │
│   ├── promotions/         # Deals & promotions
│   │   ├── PromotionsSection.tsx
│   │   └── DealCard.tsx
│   │
│   ├── testimonials/       # Customer reviews
│   │   ├── TestimonialsSection.tsx
│   │   └── TestimonialCard.tsx
│   │
│   └── newsletter/         # Newsletter signup
│       └── NewsletterSection.tsx
│
├── lib/
│   ├── utils.ts            # Utility functions (cn helper)
│   └── data.ts             # Mock data for destinations, deals, testimonials
│
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/farens27/Booking-Trip.git

# Navigate to project directory
cd Booking-Trip

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Live Sections

| Section | Description |
|---------|-------------|
| **Hero** | Search form with destination, dates, guests |
| **Destinations** | 6 popular destinations with pricing & ratings |
| **Deals** | 4 limited-time offers with discount badges |
| **Testimonials** | 4 customer reviews with ratings |
| **Newsletter** | Email subscription form |

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🔮 Future Enhancements

- [ ] Add actual booking functionality
- [ ] Integrate with travel API for real data
- [ ] Add user authentication
- [ ] Implement dark mode toggle
- [ ] Add more destination categories
- [ ] Multi-language support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Built with ❤️ for travelers around the world.

---

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for beautiful travel images
- [ShadCN](https://ui.shadcn.com/) for the amazing component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
