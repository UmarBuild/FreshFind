# FreshFind 🌱

A production-ready React (Vite) SPA built for the **TechWiz 7 World Tech Championship** — Category: Web Innovation Unleashed.

Discover farmers markets, seasonal produce, and verified-organic farms near you.

## Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** GSAP, ScrollTrigger, @gsap/react
- **Routing:** React Router DOM 6
- **Icons:** Lucide React

## Design System — Midnight Harvest Theme
- Background: `#F7F5F0` (Warm Oatmeal)
- Primary/Headings: `#064E3B` (Deep Emerald)
- Accents/Buttons: `#EA580C` (Burnt Orange)
- General Text: `#1C1917` (Rich Charcoal)
- Cards: Pure `#FFFFFF`

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## Build for Production

```bash
npm run build
npm run preview
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page (hero, highlights, stats) |
| `/markets` | Market directory (filter/sort) |
| `/market/:id` | Market detail (schedule, map, products) |
| `/produce` | Produce guide (filters + GSAP modal) |
| `/about` | About page (mission, team) |
| `/contact` | Contact page (form, map) |

## Features
- 12 farmers markets across 10 neighborhoods
- 30+ seasonal produce items with nutrition facts
- Rule-based AI Chatbot (Sage) with quick replies
- Floating Bookmark Bar with notes, export, and share
- Glassmorphism sticky header with live clock + visitor counter
- Custom magnetic cursor (desktop)
- GSAP ScrollTrigger reveals + parallax
- Real-time "Open Right Now" status badges
- Embedded OpenStreetMap for each market
- Dummy login/signup modal

## File Structure
```
src/
├── data/dummyData.js          # All market & produce data
├── context/                   # Bookmark & Auth providers
├── hooks/useGsap.js           # GSAP animation helpers
├── components/                # 12 reusable components
└── pages/                     # 6 route pages
```

Built with care for TechWiz 7. 🌾
