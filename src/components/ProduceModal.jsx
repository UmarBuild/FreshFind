import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, Calendar, MapPin, ShoppingCart, HeartPulse, Snowflake, Store } from 'lucide-react'
import gsap from 'gsap'
import { PRODUCE_BY_ID, MARKET_BY_ID } from '../data/dummyData'

export default function ProduceModal({ produceId, onClose }) {
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const produce = produceId ? PRODUCE_BY_ID[produceId] : null

  useEffect(() => {
    if (!produce) return

    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    const tl = gsap.timeline()
    tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 })
      .fromTo(panelRef.current,
        { y: 60, scale: 0.85, opacity: 0, rotateX: -15 },
        { y: 0, scale: 1, opacity: 1, rotateX: 0, duration: 0.7, ease: 'back.out(1.5)' },
        '-=0.1'
      )
      .fromTo(panelRef.current.querySelectorAll('[data-modal-stagger]'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      )

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [produce, onClose])

  if (!produce) return null

  const sections = [
    { icon: HeartPulse, label: 'Nutritional Facts', color: 'text-orange', items: Object.entries(produce.nutrition) },
  ]

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-emerald-deep/50 backdrop-blur-md" onClick={onClose} />
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-oatmeal rounded-t-3xl sm:rounded-3xl shadow-cardHover"
      >
        {/* Header */}
        <div className="relative h-32 gradient-emerald overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 80" preserveAspectRatio="none">
            <circle cx="170" cy="20" r="40" fill="white" />
            <circle cx="30" cy="70" r="25" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl drop-shadow-lg" aria-hidden>{produce.icon}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-oatmeal/20 text-oatmeal hover:bg-oatmeal/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div data-modal-stagger>
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
          <div data-modal-stagger className="mt-6">
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
          <div data-modal-stagger className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-emerald mb-2">
              <Snowflake className="w-4 h-4 text-orange" /> Storage Tips
            </h3>
            <p className="text-sm text-charcoal/80 bg-white rounded-xl p-4 shadow-card">{produce.storage}</p>
          </div>

          {/* Linked markets */}
          <div data-modal-stagger className="mt-6">
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
    </div>
  )
}
