import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Sprout, ArrowRight, MapPin, Calendar, Leaf, Star, Store,
  TrendingUp, BadgeCheck, ChevronRight, Sparkles, Wheat, Carrot, Apple,
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import MarketCard from '../components/MarketCard'
import { useGsapReveal, useGsapParallax } from '../hooks/useGsap'
import { APP_META, MARKETS, PRODUCE } from '../data/dummyData'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ──────────────────────────────────────────────────────────────
   HERO  — explosive GSAP entrance: title stagger + parallax bg
   + floating produce icons + magnetic CTA + scroll-driven fade
   ────────────────────────────────────────────────────────────── */
function Hero() {
  const root = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Eyebrow slides + fades
    tl.from('[data-hero="eyebrow"]', { y: 30, opacity: 0, duration: 0.7 })

    // Title: each line scales + rises + fades with a punchy stagger
      .from('[data-hero="title"] > span', {
        yPercent: 110,
        opacity: 0,
        rotateX: -45,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      }, '-=0.2')

      // Subtitle fades + rises
      .from('[data-hero="subtitle"]', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')

      // CTA buttons pop in with back.out
      .from('[data-hero="cta"] > *', {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)',
      }, '-=0.4')

      // Search bar slides up
      .from('[data-hero="search"]', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

      // Stats cascade in
      .from('[data-hero="stats"] > *', {
        y: 24,
        opacity: 0,
        scale: 0.92,
        duration: 0.55,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }, '-=0.3')

    // Floating produce icons — infinite yoyo drift
    gsap.utils.toArray('[data-float]').forEach((el, i) => {
      gsap.to(el, {
        y: () => '+=' + (20 + i * 8),
        rotation: () => (i % 2 ? 8 : -8),
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      })
    })

    // Parallax on the background blobs as you scroll
    gsap.to('[data-hero-blob]', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Hero title subtle parallax on scroll
    gsap.to('[data-hero="title"]', {
      yPercent: -12,
      opacity: 0.65,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Magnetic CTA buttons
    const magnetic = gsap.utils.toArray('[data-magnetic]', root.current)
    magnetic.forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })
      const onMove = (e) => {
        const r = btn.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        xTo(x * 0.3); yTo(y * 0.4)
      }
      const onLeave = () => { xTo(0); yTo(0) }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
    })
  }, { scope: root })

  return (
    <section ref={root} className="relative pt-32 pb-20 overflow-hidden gradient-hero">
      {/* Hero background image with parallax + soft overlay */}
      <div data-hero-blob className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero/hero-fm-panorama.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-25"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-oatmeal/70 via-oatmeal/80 to-oatmeal" />
      </div>

      {/* Parallax decorative blobs */}
      <div data-hero-blob className="absolute top-24 -left-20 w-72 h-72 bg-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div data-hero-blob className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />

      {/* Floating produce emojis */}
      <span data-float className="absolute top-32 right-[8%] text-6xl opacity-30 hidden md:block select-none">🍅</span>
      <span data-float className="absolute top-1/2 right-[18%] text-5xl opacity-25 hidden lg:block select-none">🥕</span>
      <span data-float className="absolute bottom-32 right-[6%] text-7xl opacity-20 hidden md:block select-none">🍎</span>
      <span data-float className="absolute top-40 left-[5%] text-5xl opacity-25 hidden lg:block select-none">🌿</span>

      <div className="container-ff relative">
        <div className="max-w-3xl">
          <span data-hero="eyebrow" className="eyebrow-ff">
            <Sparkles className="inline w-3 h-3 mr-1" />
            {APP_META.championship}
          </span>

          {/* Title with overflow-hidden masks so each line slides up cleanly */}
          <h1 data-hero="title" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald mt-4 leading-[1.05] text-balance">
            <span className="block overflow-hidden"><span className="block">From the soil</span></span>
            <span className="block overflow-hidden"><span className="block text-orange">to your table</span></span>
            <span className="block overflow-hidden"><span className="block">in under a day.</span></span>
          </h1>

          <p data-hero="subtitle" className="mt-6 text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            FreshFind connects you to {APP_META.totalMarkets} farmers markets, {APP_META.organicFarms} verified-organic farms,
            and a rotating cast of {APP_META.totalProduce}+ seasonal produce items — all in your neighbourhood. Discover where your food comes from.
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/markets" data-magnetic className="btn-primary">
              Explore markets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/produce" data-magnetic className="btn-secondary">
              Browse produce
            </Link>
          </div>

          <div data-hero="search" className="mt-10 max-w-2xl">
            <SearchBar variant="hero" />
          </div>

          {/* Inline stats — only SRS-allowed ones */}
          <div data-hero="stats" className="mt-10 grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { Icon: Store, label: 'Markets', value: APP_META.totalMarkets },
              { Icon: BadgeCheck, label: 'Organic farms', value: APP_META.organicFarms },
              { Icon: Leaf, label: 'Produce items', value: `${APP_META.totalProduce}+` },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-3 sm:p-4 shadow-card">
                <Icon className="w-4 h-4 text-orange mb-1" />
                <p className="font-display text-2xl sm:text-3xl text-emerald leading-none">{value}</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   HIGHLIGHTS — staggered scroll reveal + card hover lift
   ────────────────────────────────────────────────────────────── */
function Highlights() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.12, y: 40, duration: 0.9 })

  const featured = MARKETS.filter((m) => m.featured).slice(0, 3)
  return (
    <section ref={root} className="py-24">
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

/* ──────────────────────────────────────────────────────────────
   MARQUEE — infinite scrolling band of seasonal produce
   ────────────────────────────────────────────────────────────── */
function Marquee() {
  const items = [
    { icon: '🍓', label: 'Strawberries' },
    { icon: '🍅', label: 'Heirloom Tomatoes' },
    { icon: '🥕', label: 'Rainbow Carrots' },
    { icon: '🍎', label: 'Heritage Apples' },
    { icon: '🌿', label: 'Genovese Basil' },
    { icon: '🧀', label: 'Raw-Milk Cheese' },
    { icon: '🥬', label: 'Lacinato Kale' },
    { icon: '🧄', label: 'Hardneck Garlic' },
    { icon: '🍯', label: 'Wildflower Honey' },
    { icon: '🍑', label: 'Sun-Ripened Peaches' },
  ]
  const doubled = [...items, ...items]
  return (
    <section className="py-6 bg-emerald text-oatmeal overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap will-change-transform animate-[marquee_40s_linear_infinite]"
           style={{ animationName: 'marquee' }}>
        {doubled.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-display text-2xl sm:text-3xl">
            <span className="text-3xl">{it.icon}</span>
            {it.label}
            <span className="text-orange">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   SEASONAL PICKS — grid with staggered reveal + hover lift
   ────────────────────────────────────────────────────────────── */
function SeasonalPicks() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.07, y: 32, duration: 0.8 })

  const month = new Date().getMonth()
  const currentSeason =
    (month >= 2 && month <= 4) ? 'Spring'
    : (month >= 5 && month <= 7) ? 'Summer'
    : (month >= 8 && month <= 10) ? 'Autumn'
    : 'Winter'

  const picks = PRODUCE.filter((p) => p.seasons.includes(currentSeason)).slice(0, 6)

  return (
    <section ref={root} className="py-24 bg-cream relative overflow-hidden">
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
              className="card-ff overflow-hidden hover:shadow-cardHover hover:-translate-y-2 transition-all duration-500 group block"
            >
              <div className="relative h-24 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald/70 via-emerald/20 to-transparent" />
                <span className="absolute top-1.5 right-1.5 text-2xl drop-shadow" aria-hidden>{p.icon}</span>
              </div>
              <div className="p-3 text-center">
                <p className="font-semibold text-emerald group-hover:text-orange transition-colors text-sm leading-tight">{p.name}</p>
                <p className="text-[10px] text-charcoal/50 mt-0.5">{p.category}</p>
              </div>
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

/* ──────────────────────────────────────────────────────────────
   STATS BANNER — count-up on scroll + parallax glow blobs
   ────────────────────────────────────────────────────────────── */
function StatsBanner() {
  const root = useRef(null)

  useGSAP(() => {
    const counters = gsap.utils.toArray('[data-counter]', root.current)
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.counter)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          const formatted = target >= 1000 ? Math.floor(obj.v).toLocaleString() : Math.floor(obj.v)
          el.textContent = formatted
        },
      })
    })
  }, { scope: root })

  useGsapParallax(root, 0.18)

  const stats = [
    { label: 'Total markets', value: APP_META.totalMarkets, Icon: Store, suffix: '' },
    { label: 'Verified organic farms', value: APP_META.organicFarms, Icon: BadgeCheck, suffix: '' },
    { label: 'Produce items tracked', value: APP_META.totalProduce, Icon: Leaf, suffix: '+' },
    { label: 'Areas covered', value: 10, Icon: MapPin, suffix: '' },
  ]

  return (
    <section ref={root} className="py-24">
      <div className="container-ff">
        <div className="relative gradient-emerald rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div data-parallax="0.3" className="absolute -top-12 -right-12 w-64 h-64 bg-orange/25 rounded-full blur-2xl" />
          <div data-parallax="0.5" className="absolute -bottom-16 -left-16 w-72 h-72 bg-emerald-soft/40 rounded-full blur-2xl" />

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

/* ──────────────────────────────────────────────────────────────
   HOW IT WORKS — 4-step grid with staggered reveal + icon bounce
   ────────────────────────────────────────────────────────────── */
function HowItWorks() {
  const root = useRef(null)
  useGsapReveal(root, { stagger: 0.14, y: 40, duration: 0.9 })

  const steps = [
    { Icon: MapPin, title: 'Find a market', body: 'Filter by area, day, or produce type — discover a market that fits your week.' },
    { Icon: Calendar, title: 'Check the season', body: 'See what produce is at its peak, so you shop with the calendar, not against it.' },
    { Icon: Sprout, title: 'Meet the growers', body: 'Every market page lists the typical products, schedule, and an embedded map.' },
    { Icon: Star, title: 'Bookmark & share', body: 'Save your favourites, add notes, and share your harvest plan with friends.' },
  ]

  return (
    <section ref={root} className="py-24">
      <div className="container-ff">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="eyebrow-ff">How FreshFind works</span>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">Four steps to a fresher table</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ Icon, title, body }, i) => (
            <div key={title} data-reveal className="card-ff p-6 hover:shadow-cardHover hover:-translate-y-2 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-emerald text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
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

/* ──────────────────────────────────────────────────────────────
   CTA STRIP — final punch
   ────────────────────────────────────────────────────────────── */
function CTAStrip() {
  const root = useRef(null)
  useGsapReveal(root, { y: 32, duration: 0.9 })
  return (
    <section ref={root} className="py-24">
      <div className="container-ff">
        <div data-reveal className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-card overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald/10 rounded-full blur-2xl" />
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
      <Marquee />
      <SeasonalPicks />
      <StatsBanner />
      <HowItWorks />
      <CTAStrip />
    </div>
  )
}
