import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, MapPin, Clock, Star, ChevronRight, BadgeCheck } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import StatusBadge from './StatusBadge'

// Real photo thumbnail with gradient overlay + shine sweep on hover
function Thumbnail({ market }) {
  const palettes = {
    riverside: ['#064E3B', '#0A6B52'],
    riverside2: ['#0A6B52', '#064E3B'],
    hillcrest: ['#EA580C', '#FB923C'],
    greenfield: ['#064E3B', '#0A6B52'],
    greenfield2: ['#0A6B52', '#064E3B'],
    oldtown: ['#C2410C', '#EA580C'],
    marina: ['#0A6B52', '#064E3B'],
    sunset: ['#EA580C', '#C2410C'],
    northgate: ['#053E2F', '#0A6B52'],
    lakeside: ['#064E3B', '#0A6B52'],
    brookhaven: ['#0A6B52', '#064E3B'],
    maplegrove: ['#C2410C', '#EA580C'],
  }
  const [c1, c2] = palettes[market.thumbnail] || ['#064E3B', '#0A6B52']

  return (
    <div className="relative h-44 sm:h-48 overflow-hidden">
      {/* Real photo */}
      <img
        src={market.image}
        alt={market.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      {/* Gradient overlay — keeps palette identity + ensures text legibility */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-multiply"
        style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Moving shine sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Top-left badges */}
      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
        {market.verifiedOrganic && (
          <span className="chip-ff bg-white/85 text-emerald backdrop-blur-sm">
            <BadgeCheck className="w-3 h-3" /> Organic
          </span>
        )}
        <StatusBadge market={market} size="sm" />
      </div>

      {/* Bottom-right rating */}
      <span className="absolute bottom-2.5 right-2.5 chip-ff bg-black/40 text-white backdrop-blur-sm">
        <Star className="w-3 h-3 fill-orange text-orange" /> {market.rating}
      </span>
    </div>
  )
}

export default function MarketCard({ market, style }) {
  const ref = useRef(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked('market', market.id)

  return (
    <article
      ref={ref}
      className="card-ff overflow-hidden hover:shadow-cardHover hover:-translate-y-2 group flex flex-col transition-all duration-500"
      style={style}
      data-hover
    >
      <div className="relative overflow-hidden">
        <Thumbnail market={market} />
        <button
          onClick={(e) => { e.preventDefault(); toggleBookmark('market', market.id) }}
          className={`absolute top-2.5 right-2.5 inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            saved ? 'bg-orange text-white' : 'bg-white/30 text-white hover:bg-white/55'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save market'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-lg text-emerald group-hover:text-orange transition-colors leading-tight">
            {market.name}
          </h3>
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-charcoal/70">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange" /> {market.area}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange" /> {market.openTime}–{market.closeTime}
          </span>
        </div>
        <p className="mt-3 text-sm text-charcoal/80 leading-relaxed line-clamp-2">{market.shortDesc}</p>

        {/* Days badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {market.days.map((d) => (
            <span key={d} className="chip-ff bg-emerald/8 text-emerald">{d}</span>
          ))}
          <span className="chip-ff bg-charcoal/8 text-charcoal/70">{market.stalls} stalls</span>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald/10 flex items-center justify-between">
          <Link
            to={`/market/${market.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald group-hover:text-orange transition-colors"
          >
            View details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] text-charcoal/40">Est. {market.established}</span>
        </div>
      </div>
    </article>
  )
}
