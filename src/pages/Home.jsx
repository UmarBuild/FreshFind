import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Sprout, ArrowRight, MapPin, Clock, Calendar, Leaf, Star, Store,
  TrendingUp, Users, BadgeCheck, ChevronRight, Sparkles,
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import MarketCard from '../components/MarketCard'
import { useGsapReveal, useGsapParallax } from '../hooks/useGsap'
import { useLiveVisitors } from '../components/StatusBadge'
import { APP_META, MARKETS, PRODUCE } from '../data/dummyData'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Hero() {
  const root = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-hero="eyebrow"]', { y: 20, opacity: 0, duration: 0.5 })
      .from('[data-hero="title"] > span', { y: 60, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.2')
      .from('[data-hero="subtitle"]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('[data-hero="cta"]', { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('[data-hero="search"]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('[data-hero="stats"] > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.2')
  }, { scope: root })

  return (
    <section ref={root} className="relative pt-32 pb-16 overflow-hidden gradient-hero">
      {/* Decorative blobs */}
      <div className="absolute top-24 -left-20 w-72 h-72 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />

      <div className="container-ff relative">
        <div className="max-w-3xl">
          <span data-hero="eyebrow" className="eyebrow-ff">
            <Sparkles className="inline w-3 h-3 mr-1" />
            {APP_META.championship}
          </span>
          <h1 data-hero="title" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald mt-4 leading-[1.05] text-balance">
            <span className="block">From the soil</span>
            <span className="block text-orange">to your table</span>
            <span className="block">in under a day.</span>
          </h1>
          <p data-hero="subtitle" className="mt-6 text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            FreshFind connects you to {APP_META.totalMarkets} farmers markets, {APP_META.organicFarms} verified-organic farms,
            and a rotating cast of {APP_META.totalProduce}+ seasonal produce items — all in your neighbourhood. Discover where your food comes from.
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/markets" className="btn-primary">
              Explore markets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/produce" className="btn-secondary">
              Browse produce
            </Link>
          </div>

          <div data-hero="search" className="mt-10 max-w-2xl">
            <SearchBar variant="hero" />
          </div>

          {/* Inline stats */}
          <div data-hero="stats" className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { Icon: Store, label: 'Markets', value: APP_META.totalMarkets },
              { Icon: BadgeCheck, label: 'Organic farms', value: APP_META.organicFarms },
              { Icon: Leaf, label: 'Produce items', value: `${APP_META.totalProduce}+` },
              { Icon: Users, label: 'Online now', value: <LiveCounter base={APP_META.liveVisitorsBase} /> },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-3 shadow-card">
                <Icon className="w-4 h-4 text-orange mb-1" />
                <p className="font-display text-2xl text-emerald leading-none">{value}</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveCounter({ base }) {
  const c = useLiveVisitors(base)
  return <span className="tabular-nums">{c.toLocaleString()}</span>
}

function Highlights() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.1, y: 32 })

  const featured = MARKETS.filter((m) => m.featured).slice(0, 3)
  return (
    <section ref={root} className="py-20">
      <div className="container-ff">
        <div className="flex items-end justify-between gap-4 mb-10" data-reveal>
          <div>
            <span className="eyebrow-ff">Featured this week</span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">Highlights from the network</h2>
            <p className="text-charcoal/70 mt-2 max-w-xl">
              A rotating selection of the markets our community is loving right now — from dockside seafood to historic cobblestone squares.
            </p>
          </div>
          <Link to="/markets" className="hidden sm:inline-flex btn-ghost text-sm">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((m) => (
            <div key={m.id} data-reveal>
              <MarketCard market={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeasonalPicks() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.06 })

  // Determine current season
  const month = new Date().getMonth()
  const currentSeason =
    (month >= 2 && month <= 4) ? 'Spring'
    : (month >= 5 && month <= 7) ? 'Summer'
    : (month >= 8 && month <= 10) ? 'Autumn'
    : 'Winter'

  const picks = PRODUCE.filter((p) => p.seasons.includes(currentSeason)).slice(0, 6)

  return (
    <section ref={root} className="py-20 bg-cream relative overflow-hidden">
      <div className="absolute top-10 -right-20 w-80 h-80 bg-emerald/5 rounded-full blur-3xl" />
      <div className="container-ff relative">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="eyebrow-ff">This week in season</span>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">
            {currentSeason} seasonal picks
          </h2>
          <p className="text-charcoal/70 mt-3">
            What's at its peak right now — picked at dawn, on your table by lunch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {picks.map((p) => (
            <Link
              key={p.id}
              to={`/produce?p=${p.id}`}
              data-reveal
              data-hover
              className="card-ff p-4 text-center hover:shadow-cardHover hover:-translate-y-1 transition-all group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{p.icon}</div>
              <p className="font-semibold text-emerald group-hover:text-orange transition-colors text-sm leading-tight">{p.name}</p>
              <p className="text-[10px] text-charcoal/50 mt-1">{p.category}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10" data-reveal>
          <Link to="/produce" className="btn-secondary">
            Browse the full produce guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function StatsBanner() {
  const root = useRef(null)

  useGSAP(() => {
    const counters = gsap.utils.toArray('[data-counter]', root.current)
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.counter)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          const formatted = target >= 1000 ? Math.floor(obj.v).toLocaleString() : Math.floor(obj.v)
          el.textContent = formatted
        },
      })
    })
  }, { scope: root })

  useGsapParallax(root, 0.15)

  const stats = [
    { label: 'Live visitors', value: APP_META.liveVisitorsBase + 60, Icon: Users, suffix: '' },
    { label: 'Total markets', value: APP_META.totalMarkets, Icon: Store, suffix: '' },
    { label: 'Verified organic farms', value: APP_META.organicFarms, Icon: BadgeCheck, suffix: '' },
    { label: 'Produce items tracked', value: APP_META.totalProduce, Icon: Leaf, suffix: '+' },
  ]

  return (
    <section ref={root} className="py-20">
      <div className="container-ff">
        <div className="relative gradient-emerald rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div data-parallax="0.3" className="absolute -top-12 -right-12 w-64 h-64 bg-orange/20 rounded-full blur-2xl" />
          <div data-parallax="0.5" className="absolute -bottom-16 -left-16 w-72 h-72 bg-emerald-soft/30 rounded-full blur-2xl" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, Icon, suffix }) => (
              <div key={label} className="text-center text-oatmeal">
                <Icon className="w-6 h-6 text-orange mx-auto mb-3" />
                <p className="font-display text-4xl sm:text-5xl font-bold leading-none">
                  <span data-counter={value}>0</span>{suffix}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-oatmeal/70 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.12, y: 32 })

  const steps = [
    { Icon: MapPin, title: 'Find a market', body: 'Filter by area, day, or produce type — discover a market that fits your week.' },
    { Icon: Calendar, title: 'Check the season', body: 'See what produce is at its peak, so you shop with the calendar, not against it.' },
    { Icon: Sprout, title: 'Meet the growers', body: 'Every market page lists the typical products, schedule, and an embedded map.' },
    { Icon: Star, title: 'Bookmark & share', body: 'Save your favourites, add notes, and share your harvest plan with friends.' },
  ]

  return (
    <section ref={root} className="py-20">
      <div className="container-ff">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="eyebrow-ff">How FreshFind works</span>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">Four steps to a fresher table</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ Icon, title, body }, i) => (
            <div key={title} data-reveal className="card-ff p-6 hover:shadow-cardHover transition-shadow group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-emerald text-white mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-orange font-bold">Step {i + 1}</p>
              <h3 className="font-display text-lg text-emerald mt-1">{title}</h3>
              <p className="text-sm text-charcoal/70 mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAStrip() {
  const root = useRef(null)
  useGsapReveal(root, { y: 24 })
  return (
    <section ref={root} className="py-20">
      <div className="container-ff">
        <div data-reveal className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-card overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange/10 rounded-full blur-2xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-emerald">Ready to meet your farmer?</h3>
              <p className="text-charcoal/70 mt-2 max-w-xl">
                Bookmark your favourite markets, get seasonal alerts, and never miss a harvest again. It's free.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/markets" className="btn-primary">Browse markets</Link>
              <Link to="/contact" className="btn-ghost">Get in touch</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Highlights />
      <SeasonalPicks />
      <StatsBanner />
      <HowItWorks />
      <CTAStrip />
    </div>
  )
}
