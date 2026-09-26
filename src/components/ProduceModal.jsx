import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X, Calendar, MapPin, ShoppingCart, HeartPulse, Snowflake, Store } from 'lucide-react'
import gsap from 'gsap'
import { PRODUCE_BY_ID, MARKET_BY_ID } from '../data/dummyData'

export default function ProduceModal({ produceId, onClose }) {
  const panelRef = useRef(null)
  const produce = produceId ? PRODUCE_BY_ID[produceId] : null

  useEffect(() => {
    if (!produce) return

    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    // Simple GSAP entrance — panel scales in
    if (panelRef.current) {
      gsap.fromTo(panelRef.current,
        { y: 40, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
      )
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [produceId, onClose])

  if (!produce) return null

  // Use portal to render at document.body level — escapes any stacking context
  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-emerald-deep/60 backdrop-blur-md" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-oatmeal rounded-t-3xl sm:rounded-3xl shadow-cardHover"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — real photo with overlay */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-3xl">
          <img
            src={produce.image}
            alt={produce.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald/40 to-emerald/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl drop-shadow-2xl">{produce.icon}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-oatmeal/25 text-oatmeal hover:bg-oatmeal/40 backdrop-blur-sm transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div>
            <span className="eyebrow-ff">{produce.category}</span>
            <h2 className="font-display text-3xl text-emerald mt-1">{produce.name}</h2>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {produce.seasons.map((s) => (
                <span key={s} className="chip-ff bg-emerald/10 text-emerald">
                  <Calendar className="w-3 h-3" /> {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-charcoal/80 leading-relaxed">{produce.description}</p>
          </div>

          {/* Nutrition */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-emerald mb-3">
              <HeartPulse className="w-4 h-4 text-orange" /> Nutritional Facts
              <span className="text-xs font-sans font-normal text-charcoal/50">(per 100g, raw)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(produce.nutrition).map(([k, v]) => (
                <div key={k} className="bg-white rounded-xl p-3 shadow-card text-center">
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/50">{k.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-display text-lg text-emerald mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-emerald mb-2">
              <Snowflake className="w-4 h-4 text-orange" /> Storage Tips
            </h3>
            <p className="text-sm text-charcoal/80 bg-white rounded-xl p-4 shadow-card">{produce.storage}</p>
          </div>

          {/* Linked markets */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-emerald mb-3">
              <Store className="w-4 h-4 text-orange" /> Available at {produce.markets.length} Market{produce.markets.length !== 1 ? 's' : ''}
            </h3>
            <div className="space-y-2">
              {produce.markets.map((mid) => {
                const m = MARKET_BY_ID[mid]
                if (!m) return null
                return (
                  <Link
                    key={mid}
                    to={`/market/${mid}`}
                    onClick={onClose}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card hover:shadow-cardHover hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-emerald text-white">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-emerald group-hover:text-orange transition-colors text-sm truncate">{m.name}</p>
                      <p className="text-[11px] text-charcoal/60">{m.area} · {m.days.join(', ')} · {m.openTime}–{m.closeTime}</p>
                    </div>
                    <ShoppingCart className="w-4 h-4 text-charcoal/30 group-hover:text-orange transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
