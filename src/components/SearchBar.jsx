import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Apple, ChevronDown } from 'lucide-react'
import { AREAS, DAYS_OF_WEEK, PRODUCE_CATEGORIES, MARKETS } from '../data/dummyData'

/**
 * SearchBar — dynamic home-page search bar with three filters:
 * Area, Day of Week, Produce Type. Submitting navigates to /markets?q=...
 */
export default function SearchBar({ variant = 'hero' }) {
  const navigate = useNavigate()
  const [area, setArea] = useState('')
  const [day, setDay] = useState('')
  const [type, setType] = useState('')

  // Areas actually present in data
  const areas = useMemo(() => AREAS.filter((a) => MARKETS.some((m) => m.area === a)), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (area) params.set('area', area)
    if (day) params.set('day', day)
    if (type) params.set('type', type)
    navigate(`/markets?${params.toString()}`)
  }

  const selectCls =
    'appearance-none bg-oatmeal/80 border border-emerald/10 rounded-xl pl-9 pr-8 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange/30 transition cursor-pointer'

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-cardHover p-3 ${variant === 'hero' ? 'sm:p-4' : ''}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Area */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald/70 pointer-events-none" />
          <select value={area} onChange={(e) => setArea(e.target.value)} className={selectCls + ' w-full'}>
            <option value="">All Areas</option>
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/40 pointer-events-none" />
        </div>
        {/* Day */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald/70 pointer-events-none" />
          <select value={day} onChange={(e) => setDay(e.target.value)} className={selectCls + ' w-full'}>
            <option value="">Any Day</option>
            {DAYS_OF_WEEK.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/40 pointer-events-none" />
        </div>
        {/* Produce type */}
        <div className="relative">
          <Apple className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald/70 pointer-events-none" />
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls + ' w-full'}>
            <option value="">All Produce</option>
            {PRODUCE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/40 pointer-events-none" />
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary w-full mt-2.5 py-3"
      >
        <Search className="w-4 h-4" />
        Find markets
      </button>
    </form>
  )
}
