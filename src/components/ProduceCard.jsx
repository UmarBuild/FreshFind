import { useRef } from 'react'
import { Bookmark, Calendar, ChevronRight, Eye } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import { useTilt3D } from '../hooks/useTilt3D'

const SEASON_COLORS = {
  Spring: 'bg-emerald/10 text-emerald',
  Summer: 'bg-orange/15 text-orange-deep',
  Autumn: 'bg-orange/10 text-orange',
  Winter: 'bg-emerald/15 text-emerald-deep',
}

export default function ProduceCard({ produce, onClick, style }) {
  const ref = useRef(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked('produce', produce.id)

  // 3D mouse-follow tilt — same as MarketCard
  useTilt3D(ref, { max: 8, scale: 1.02, speed: 0.5 })

  // Whole card is clickable — opens produce modal
  const handleCardClick = (e) => {
    if (e.target.closest('[data-bookmark-btn]')) return
    onClick?.(produce.id)
  }

  return (
    <article
      ref={ref}
      onClick={handleCardClick}
      className="card-ff overflow-hidden hover:shadow-cardHover group cursor-pointer flex flex-col transition-shadow duration-500 [transform-style:preserve-3d]"
      style={style}
      data-hover
      data-cursor="Open"
    >
      <div className="relative h-40 sm:h-44 overflow-hidden">
        {/* Real photo */}
        <img
          src={produce.image}
          alt={produce.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {/* Shine sweep — same as MarketCard */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Top-left: category chip (white bg, dark text — clearly visible) */}
        <span className="absolute top-2.5 left-2.5 chip-ff bg-white/90 text-charcoal backdrop-blur-sm">
          {produce.category}
        </span>

        {/* Top-right: bookmark button */}
        <button
          data-bookmark-btn
          onClick={(e) => { e.stopPropagation(); toggleBookmark('produce', produce.id) }}
          className={`absolute top-2.5 right-2.5 inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10 ${
            saved ? 'bg-orange text-white' : 'bg-white/30 text-white hover:bg-white/55'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save produce'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom: emoji accent + name on photo */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2">
          <span className="text-3xl drop-shadow-lg" aria-hidden>{produce.icon}</span>
          <h3 className="font-display font-bold text-lg text-white drop-shadow-lg leading-tight flex-1 min-w-0">
            {produce.name}
          </h3>
        </div>

        {/* Hover overlay — "View Details" pill — same as MarketCard style */}
        <div className="absolute inset-0 flex items-center justify-center bg-emerald/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-emerald font-semibold text-xs shadow-cardHover">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm text-charcoal/80 leading-relaxed line-clamp-2 flex-1">{produce.shortDesc}</p>

        {/* Season badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {produce.seasons.map((s) => (
            <span key={s} className={`chip-ff ${SEASON_COLORS[s] || 'bg-emerald/10 text-emerald'}`}>
              <Calendar className="w-2.5 h-2.5" /> {s}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-emerald/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald group-hover:text-orange transition-colors">
            View details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-[10px] text-charcoal/40">{produce.markets.length} markets</span>
        </div>
      </div>
    </article>
  )
}
