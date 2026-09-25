import { Bookmark, Calendar, ChevronRight } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'

const SEASON_COLORS = {
  Spring: 'bg-emerald/10 text-emerald',
  Summer: 'bg-orange/15 text-orange-deep',
  Autumn: 'bg-orange/10 text-orange',
  Winter: 'bg-emerald/15 text-emerald-deep',
}

export default function ProduceCard({ produce, onClick, style }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked('produce', produce.id)

  return (
    <article
      onClick={onClick}
      className="card-ff overflow-hidden hover:shadow-cardHover hover:-translate-y-2 group cursor-pointer flex flex-col transition-all duration-500"
      style={style}
      data-hover
    >
      <div className="relative h-36 overflow-hidden">
        {/* Real photo */}
        <img
          src={produce.image}
          alt={produce.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Subtle dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {/* Shine sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Top badges */}
        <span className="absolute top-2 left-2 chip-ff bg-white/85 text-charcoal backdrop-blur-sm">
          {produce.category}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); toggleBookmark('produce', produce.id) }}
          className={`absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
            saved ? 'bg-orange text-white' : 'bg-white/40 text-white hover:bg-white/65 backdrop-blur-sm'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save produce'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom: emoji accent + name on photo */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
          <span className="text-2xl drop-shadow" aria-hidden>{produce.icon}</span>
          <h3 className="font-display font-bold text-base text-white drop-shadow leading-tight flex-1 min-w-0">
            {produce.name}
          </h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-2 flex-1">{produce.shortDesc}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {produce.seasons.map((s) => (
            <span key={s} className={`chip-ff ${SEASON_COLORS[s] || 'bg-emerald/10 text-emerald'}`}>
              <Calendar className="w-2.5 h-2.5" /> {s}
            </span>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-emerald/10 flex items-center justify-between text-xs">
          <span className="text-charcoal/50">{produce.markets.length} markets</span>
          <span className="inline-flex items-center gap-0.5 font-semibold text-emerald group-hover:text-orange transition-colors">
            Details <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  )
}
