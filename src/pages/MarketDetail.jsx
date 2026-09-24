import { useEffect, useMemo, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, MapPin, Clock, Phone, Mail, Calendar, Star, Users,
  Store, BadgeCheck, Bookmark, Share2, CheckCircle2, ChevronRight,
  Navigation, Coffee, ParkingCircle, Music, Wifi, Baby,
} from 'lucide-react'
import { MARKET_BY_ID, MARKETS, PRODUCE_BY_ID, DAYS_OF_WEEK } from '../data/dummyData'
import { useBookmarks } from '../context/BookmarkContext'
import StatusBadge from '../components/StatusBadge'
import { useGsapReveal, useGsapParallax } from '../hooks/useGsap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const AMENITY_ICONS = {
  Parking: ParkingCircle,
  Restrooms: Users,
  'Pet-friendly': Baby,
  'Live Music': Music,
  ATM: Store,
  'Wi-Fi': Wifi,
  Coffee: Coffee,
}

function NotFound() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-ff text-center">
        <h1 className="font-display text-4xl text-emerald">Market not found</h1>
        <p className="text-charcoal/70 mt-2">We couldn't find this market. It may have been removed.</p>
        <Link to="/markets" className="btn-primary mt-6">Back to directory</Link>
      </div>
    </div>
  )
}

export default function MarketDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const market = MARKET_BY_ID[id]
  const root = useRef(null)
  const heroRef = useRef(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-hero-stagger]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 })
  }, { scope: heroRef, dependencies: [id] })

  useGsapReveal(root, { stagger: 0.06, y: 24 })
  useGsapParallax(heroRef, 0.25)

  if (!market) return <NotFound />

  const saved = isBookmarked('market', market.id)
  const relatedProduce = market.typicalProducts.map((pid) => PRODUCE_BY_ID[pid]).filter(Boolean)

  // Build a 7-day schedule row for the current week
  const today = new Date()
  const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const weekSchedule = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const label = dayLabels[d.getDay()]
    const isOpen = market.days.includes(label)
    return { date: d, label, isOpen }
  })

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: market.name, url })
      else { await navigator.clipboard.writeText(url); alert('Link copied to clipboard!') }
    } catch (_) {}
  }

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-emerald" />
        <div data-parallax="0.4" className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div data-parallax="0.6" className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-soft/40 rounded-full blur-3xl pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <circle cx="950" cy="80" r="120" fill="white" />
          <circle cx="180" cy="320" r="80" fill="white" />
        </svg>

        <div className="container-ff relative py-12 sm:py-16">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-oatmeal/70 hover:text-oatmeal transition-colors mb-6"
            data-hero-stagger
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3" data-hero-stagger>
                {market.verifiedOrganic && (
                  <span className="chip-ff bg-orange/20 text-oatmeal backdrop-blur-sm">
                    <BadgeCheck className="w-3 h-3" /> Verified Organic
                  </span>
                )}
                <StatusBadge market={market} />
                <span className="chip-ff bg-white/10 text-oatmeal backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-orange text-orange" /> {market.rating} ({market.reviewsCount})
                </span>
              </div>
              <h1 data-hero-stagger className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-oatmeal leading-[1.05]">
                {market.name}
              </h1>
              <p data-hero-stagger className="mt-3 text-oatmeal/80 inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange" /> {market.location.address}
              </p>
              <p data-hero-stagger className="mt-5 text-oatmeal/85 leading-relaxed max-w-2xl">
                {market.longDesc}
              </p>

              <div data-hero-stagger className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleBookmark('market', market.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    saved ? 'bg-orange text-white' : 'bg-oatmeal text-emerald hover:bg-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
                  {saved ? 'Saved' : 'Bookmark'}
                </button>
                <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-oatmeal/15 text-oatmeal hover:bg-oatmeal/25 transition">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Quick facts card */}
            <div data-hero-stagger className="bg-oatmeal rounded-2xl p-5 shadow-cardHover">
              <h3 className="font-display text-lg text-emerald mb-3">Quick facts</h3>
              <dl className="space-y-2.5 text-sm">
                <Row icon={MapPin} label="Area" value={market.area} />
                <Row icon={Clock} label="Hours" value={`${market.openTime} – ${market.closeTime}`} />
                <Row icon={Calendar} label="Days" value={market.days.join(', ')} />
                <Row icon={Store} label="Stalls" value={`${market.stalls} vendors`} />
                <Row icon={Users} label="Established" value={market.established} />
              </dl>
              <div className="mt-3 pt-3 border-t border-emerald/10 space-y-1.5 text-sm">
                <a href={`tel:${market.contact.phone}`} className="flex items-center gap-2 text-charcoal hover:text-emerald">
                  <Phone className="w-3.5 h-3.5 text-orange" /> {market.contact.phone}
                </a>
                <a href={`mailto:${market.contact.email}`} className="flex items-center gap-2 text-charcoal hover:text-emerald truncate">
                  <Mail className="w-3.5 h-3.5 text-orange shrink-0" /> <span className="truncate">{market.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={root} className="container-ff mt-12 space-y-12">
        {/* Schedule */}
        <section data-reveal>
          <h2 className="font-display text-2xl text-emerald mb-1">This week's schedule</h2>
          <p className="text-sm text-charcoal/60 mb-5">Next 7 days — green days are open.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weekSchedule.map(({ date, label, isOpen }) => {
              const dayNum = date.getDate()
              const month = date.toLocaleDateString('en-US', { month: 'short' })
              return (
                <div
                  key={date.toISOString()}
                  className={`rounded-2xl p-4 text-center transition-all ${
                    isOpen ? 'gradient-emerald text-oatmeal shadow-card' : 'bg-white shadow-card text-charcoal'
                  }`}
                >
                  <p className={`text-[10px] uppercase tracking-widest ${isOpen ? 'text-oatmeal/70' : 'text-charcoal/50'}`}>{label}</p>
                  <p className="font-display text-2xl font-bold mt-1">{dayNum}</p>
                  <p className={`text-[10px] ${isOpen ? 'text-oatmeal/70' : 'text-charcoal/50'}`}>{month}</p>
                  {isOpen ? (
                    <p className="text-xs mt-2 font-semibold">{market.openTime}–{market.closeTime}</p>
                  ) : (
                    <p className="text-xs mt-2 text-charcoal/40">Closed</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Map + amenities */}
        <section data-reveal className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-emerald/5">
              <div>
                <h3 className="font-display text-lg text-emerald inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange" /> Live location
                </h3>
                <p className="text-xs text-charcoal/60 mt-0.5">{market.location.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps?q=${market.location.lat},${market.location.lng}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs py-1.5"
              >
                <Navigation className="w-3 h-3" /> Directions
              </a>
            </div>
            <iframe
              title={`Map of ${market.name}`}
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${market.location.lng - 0.01}%2C${market.location.lat - 0.008}%2C${market.location.lng + 0.01}%2C${market.location.lat + 0.008}&layer=mapnik&marker=${market.location.lat}%2C${market.location.lng}`}
              className="block"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-display text-lg text-emerald mb-3">Amenities</h3>
            <ul className="space-y-2.5">
              {market.amenities.map((a) => {
                const Icon = AMENITY_ICONS[a] || CheckCircle2
                return (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-charcoal/80">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald/8 text-emerald">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {a}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Typical products */}
        <section data-reveal>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl text-emerald">Typical products</h2>
              <p className="text-sm text-charcoal/60 mt-1">What you'll usually find at this market.</p>
            </div>
            <Link to="/produce" className="hidden sm:inline-flex btn-ghost text-xs">
              Browse all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedProduce.map((p) => (
              <Link
                key={p.id}
                to={`/produce?p=${p.id}`}
                data-hover
                className="card-ff p-4 text-center hover:shadow-cardHover hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{p.icon}</div>
                <p className="font-semibold text-emerald group-hover:text-orange text-sm transition-colors leading-tight">{p.name}</p>
                <p className="text-[10px] text-charcoal/50 mt-1">{p.category}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Other markets */}
        <section data-reveal>
          <h2 className="font-display text-2xl text-emerald mb-5">Also in {market.area}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKETS.filter((m) => m.area === market.area && m.id !== market.id).slice(0, 3).map((m) => (
              <Link
                key={m.id}
                to={`/market/${m.id}`}
                className="card-ff p-4 hover:shadow-cardHover hover:-translate-y-1 transition-all group flex items-center gap-3"
                data-hover
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-emerald text-white font-display text-xl">
                  {m.name.charAt(0)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-emerald group-hover:text-orange transition-colors truncate">{m.name}</p>
                  <p className="text-xs text-charcoal/60">{m.days.join(', ')} · {m.openTime}–{m.closeTime}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal/30 group-hover:text-orange group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="inline-flex items-center gap-1.5 text-charcoal/60">
        <Icon className="w-3.5 h-3.5 text-orange" /> {label}
      </dt>
      <dd className="font-semibold text-emerald text-right">{value}</dd>
    </div>
  )
}
