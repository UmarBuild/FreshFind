import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Leaf, Calendar, Sparkles } from 'lucide-react'
import ProduceCard from '../components/ProduceCard'
import ProduceModal from '../components/ProduceModal'
import { useGsapReveal } from '../hooks/useGsap'
import { PRODUCE, PRODUCE_CATEGORIES, SEASONS } from '../data/dummyData'

const SEASON_EMOJI = {
  Spring: '🌱', Summer: '☀️', Autumn: '🍂', Winter: '❄️',
}

export default function ProduceGuide() {
  const [params, setParams] = useSearchParams()
  const root = useRef(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [season, setSeason] = useState('')
  const [activeId, setActiveId] = useState(params.get('p') || null)

  // Open modal from URL ?p=...
  useEffect(() => {
    const p = params.get('p')
    if (p) setActiveId(p)
  }, [params])

  // When activeId changes, sync URL
  useEffect(() => {
    const next = new URLSearchParams(params)
    if (activeId) next.set('p', activeId)
    else next.delete('p')
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  const filtered = useMemo(() => {
    let list = [...PRODUCE]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q))
    }
    if (category) list = list.filter((p) => p.category === category)
    if (season) list = list.filter((p) => p.seasons.includes(season))
    return list
  }, [search, category, season])

  useGsapReveal(root, { stagger: 0.04, y: 24 })

  const clearAll = () => { setSearch(''); setCategory(''); setSeason('') }
  const activeFilterCount = [category, season].filter(Boolean).length

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <section className="bg-cream border-b border-emerald/5">
        <div className="container-ff py-12">
          <span className="eyebrow-ff">Produce guide</span>
          <h1 className="font-display text-4xl sm:text-5xl text-emerald mt-2">
            {PRODUCE.length} seasonal items, tracked year-round
          </h1>
          <p className="text-charcoal/70 mt-3 max-w-2xl">
            Browse fruits, vegetables, herbs, and dairy from across the FreshFind network. Click any item for nutrition, storage tips, and the markets where you'll find it.
          </p>
        </div>
      </section>

      <div className="container-ff py-10">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-card p-4 sticky top-20 z-20 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search produce by name or description…"
                className="w-full bg-oatmeal/60 border border-emerald/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-sm bg-oatmeal/60 border border-emerald/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange/30">
                <option value="">All categories</option>
                {PRODUCE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className="text-sm bg-oatmeal/60 border border-emerald/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange/30">
                <option value="">All seasons</option>
                {SEASONS.map((s) => <option key={s} value={s}>{SEASON_EMOJI[s]} {s}</option>)}
              </select>
            </div>
          </div>

          {/* Quick season chips */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald/5 flex-wrap">
            <span className="text-xs text-charcoal/60 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange" /> Quick filter:
            </span>
            {SEASONS.map((s) => (
              <button
                key={s}
                onClick={() => setSeason(season === s ? '' : s)}
                className={`chip-ff transition ${
                  season === s ? 'bg-emerald text-white' : 'bg-emerald/10 text-emerald hover:bg-emerald/20'
                }`}
              >
                {SEASON_EMOJI[s]} {s}
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="ml-auto text-xs text-orange hover:underline">Clear all</button>
            )}
            <span className={`text-xs text-charcoal/60 ${activeFilterCount === 0 ? 'ml-auto' : ''}`}>
              Showing <span className="font-semibold text-emerald">{filtered.length}</span> of {PRODUCE.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div ref={root}>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-4">
                <Leaf className="w-7 h-7 text-emerald/60" />
              </div>
              <h3 className="font-display text-xl text-emerald">No produce matches your filters</h3>
              <p className="text-charcoal/60 mt-2 mb-4">Try a different category or season.</p>
              <button onClick={clearAll} className="btn-ghost">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProduceCard
                  key={p.id}
                  produce={p}
                  onClick={() => setActiveId(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {activeId && (
        <ProduceModal produceId={activeId} onClose={() => setActiveId(null)} />
      )}
    </div>
  )
}
