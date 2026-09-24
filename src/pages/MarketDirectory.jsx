import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SortAsc, X, Store, Search, SlidersHorizontal } from 'lucide-react'
import MarketCard from '../components/MarketCard'
import { useGsapReveal } from '../hooks/useGsap'
import { MARKETS, AREAS, DAYS_OF_WEEK, PRODUCE_CATEGORIES } from '../data/dummyData'

const SORT_OPTIONS = [
  { value: 'alpha', label: 'Alphabetical (A–Z)' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'next', label: 'Next open day' },
  { value: 'stalls', label: 'Most stalls' },
]

export default function MarketDirectory() {
  const [params, setParams] = useSearchParams()
  const root = useRef(null)
  const [search, setSearch] = useState('')
  const [area, setArea] = useState(params.get('area') || '')
  const [day, setDay] = useState(params.get('day') || '')
  const [type, setType] = useState(params.get('type') || '')
  const [organic, setOrganic] = useState(false)
  const [sort, setSort] = useState('alpha')
  const [showFilters, setShowFilters] = useState(false)

  // Sync URL params → state once on mount, then write back to URL
  useEffect(() => {
    setArea(params.get('area') || '')
    setDay(params.get('day') || '')
    setType(params.get('type') || '')
  }, [params])

  useEffect(() => {
    const p = new URLSearchParams()
    if (area) p.set('area', area)
    if (day) p.set('day', day)
    if (type) p.set('type', type)
    setParams(p, { replace: true })
  }, [area, day, type, setParams])

  const areas = useMemo(() => AREAS.filter((a) => MARKETS.some((m) => m.area === a)), [])

  const filtered = useMemo(() => {
    let list = [...MARKETS]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.shortDesc.toLowerCase().includes(q) || m.area.toLowerCase().includes(q))
    }
    if (area) list = list.filter((m) => m.area === area)
    if (day) list = list.filter((m) => m.days.includes(day))
    if (type) list = list.filter((m) => m.produceTypes.includes(type))
    if (organic) list = list.filter((m) => m.verifiedOrganic)

    switch (sort) {
      case 'alpha': list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      case 'next': list.sort((a, b) => a.nextOpen - b.nextOpen); break
      case 'stalls': list.sort((a, b) => b.stalls - a.stalls); break
      default: break
    }
    return list
  }, [search, area, day, type, organic, sort])

  useGsapReveal(root, { stagger: 0.04, y: 24 })

  const clearAll = () => {
    setSearch(''); setArea(''); setDay(''); setType(''); setOrganic(false); setSort('alpha')
  }

  const activeFilterCount = [area, day, type].filter(Boolean).length + (organic ? 1 : 0)

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <section className="bg-cream border-b border-emerald/5">
        <div className="container-ff py-12">
          <span className="eyebrow-ff">Market directory</span>
          <h1 className="font-display text-4xl sm:text-5xl text-emerald mt-2">
            {MARKETS.length} markets across {areas.length} neighbourhoods
          </h1>
          <p className="text-charcoal/70 mt-3 max-w-2xl">
            Filter by area, day, or produce type — then sort to find your perfect market. Every entry includes a full schedule, embedded map, and list of typical products.
          </p>
        </div>
      </section>

      <div className="container-ff py-10">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-card p-4 sticky top-20 z-20 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search markets, areas, or produce…"
                className="w-full bg-oatmeal/60 border border-emerald/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30"
              />
            </div>

            {/* Inline selects */}
            <div className="flex flex-wrap gap-2">
              <select value={area} onChange={(e) => setArea(e.target.value)} className="text-sm bg-oatmeal/60 border border-emerald/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange/30">
                <option value="">All areas</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={day} onChange={(e) => setDay(e.target.value)} className="text-sm bg-oatmeal/60 border border-emerald/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange/30">
                <option value="">Any day</option>
                {DAYS_OF_WEEK.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)} className="text-sm bg-oatmeal/60 border border-emerald/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange/30">
                <option value="">All produce</option>
                {PRODUCE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button
                onClick={() => setOrganic((o) => !o)}
                className={`text-sm font-semibold rounded-xl px-3 py-2.5 border transition ${
                  organic ? 'bg-emerald text-white border-emerald' : 'bg-oatmeal/60 text-charcoal border-emerald/10 hover:border-emerald/30'
                }`}
              >
                Organic only
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-emerald/10">
                <SortAsc className="w-4 h-4 text-charcoal/50" />
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm bg-transparent focus:outline-none cursor-pointer">
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Active filters row */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald/5 flex-wrap">
              <span className="text-xs text-charcoal/60">Active:</span>
              {area && <Chip onClear={() => setArea('')}>{area}</Chip>}
              {day && <Chip onClear={() => setDay('')}>{day}</Chip>}
              {type && <Chip onClear={() => setType('')}>{type}</Chip>}
              {organic && <Chip onClear={() => setOrganic(false)}>Organic</Chip>}
              <button onClick={clearAll} className="text-xs text-orange hover:underline ml-1">Clear all</button>
              <span className="ml-auto text-xs text-charcoal/60">
                Showing <span className="font-semibold text-emerald">{filtered.length}</span> of {MARKETS.length}
              </span>
            </div>
          )}
        </div>

        {/* Grid */}
        <div ref={root}>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-4">
                <Store className="w-7 h-7 text-emerald/60" />
              </div>
              <h3 className="font-display text-xl text-emerald">No markets match your filters</h3>
              <p className="text-charcoal/60 mt-2 mb-4">Try widening your search or clearing some filters.</p>
              <button onClick={clearAll} className="btn-ghost">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <div key={m.id} data-reveal>
                  <MarketCard market={m} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Chip({ children, onClear }) {
  return (
    <span className="chip-ff bg-emerald/10 text-emerald">
      {children}
      <button onClick={onClear} className="hover:text-orange" aria-label="Remove filter">
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}
