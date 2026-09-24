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
      className="card-ff overflow-hidden hover:shadow-cardHover hover:-translate-y-1 group cursor-pointer flex flex-col"
      style={style}
      data-hover
    >
      <div className="relative h-32 flex items-center justify-center bg-gradient-to-br from-oatmeal to-cream">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-500" aria-hidden>
          {produce.icon}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); toggleBookmark('produce', produce.id) }}
          className={`absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            saved ? 'bg-orange text-white' : 'bg-white text-charcoal/40 hover:text-orange shadow-card'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save produce'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
        </button>
        <span className="absolute bottom-2 left-2 chip-ff bg-white/80 backdrop-blur-sm text-charcoal/70">
          {produce.category}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-base text-emerald group-hover:text-orange transition-colors leading-tight">
          {produce.name}
        </h3>
        <p className="mt-1.5 text-xs text-charcoal/70 leading-relaxed line-clamp-2 flex-1">{produce.shortDesc}</p>
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
