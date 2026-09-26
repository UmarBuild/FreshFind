import { useEffect, useState } from 'react'
import { Clock, Users, MapPin, X } from 'lucide-react'

/**
 * StatusBadge — determines whether a market is "Open Right Now" based on
 * the current day/time vs. the market's operating days & hours.
 *
 * SRS: 'Open Right Now' status badge is required.
 *
 * Props: market = { days: ['Mon','Wed',...], openTime, closeTime }
 */
function computeIsOpen(market, now) {
  if (!market?.days?.length) return { open: false, label: 'Closed' }
  const jsDay = now.getDay()
  const label = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][jsDay]
  if (!market.days.includes(label)) return { open: false, label: 'Closed today' }

  const [oh, om] = market.openTime.split(':').map(Number)
  const [ch, cm] = market.closeTime.split(':').map(Number)
  const open = now.getHours() * 60 + now.getMinutes()
  const start = oh * 60 + om
  const end = ch * 60 + cm
  if (open >= start && open < end) {
    return { open: true, label: `Open until ${market.closeTime}` }
  }
  if (open < start) return { open: false, label: `Opens ${market.openTime}` }
  return { open: false, label: 'Closed today' }
}

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function useLiveVisitors(base = 247) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const drift = Math.floor(Math.random() * 7) - 3
        return Math.max(180, Math.min(420, c + drift))
      })
    }, 4000)
    return () => clearInterval(id)
  }, [])
  return count
}

export default function StatusBadge({ market, size = 'md' }) {
  const now = useNow()
  const { open, label } = computeIsOpen(market, now)

  const sizeCls = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`chip-ff ${sizeCls} ${open ? 'bg-emerald/10 text-emerald' : 'bg-charcoal/10 text-charcoal/70'}`}
    >
      <span className={`relative inline-flex h-1.5 w-1.5 ${open ? '' : 'opacity-50'}`}>
        {open && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-pulseRing" />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${open ? 'bg-emerald' : 'bg-charcoal/60'}`} />
      </span>
      {label}
    </span>
  )
}

/**
 * HeaderStatusStrip — SRS-required cross-page header widget with:
 *   1. Real-time clock (updates every second)
 *   2. Simulated visitor counter (live, drifts every 4s)
 *   3. Browser geolocation button (uses navigator.geolocation)
 * These three pieces are explicitly required by the SRS for the
 * "Quick Search & Real-time Status" cross-page utility.
 */
export function HeaderStatusStrip() {
  const now = useNow(1000)
  const visitors = useLiveVisitors()
  const [geo, setGeo] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState(false)

  const fmtTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  const fmtDate = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const handleGeo = () => {
    if (!navigator.geolocation) {
      setGeoError(true)
      setTimeout(() => setGeoError(false), 2000)
      return
    }
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude.toFixed(3), lng: pos.coords.longitude.toFixed(3) })
        setGeoLoading(false)
      },
      () => {
        setGeoError(true)
        setGeoLoading(false)
        setTimeout(() => setGeoError(false), 2000)
      },
      { enableHighAccuracy: false, timeout: 5000 }
    )
  }

  return (
    <div className="flex items-center gap-3 text-[11px] font-medium">
      {/* Real-time clock — updates every second */}
      <span className="hidden sm:inline-flex items-center gap-1.5 text-charcoal/70" suppressHydrationWarning>
        <Clock className="w-3 h-3 text-orange" />
        <span>{fmtDate}</span>
        <span className="tabular-nums text-emerald font-semibold">{fmtTime}</span>
      </span>

      {/* Simulated live visitor counter */}
      <span className="hidden md:inline-flex items-center gap-1.5 text-charcoal/70">
        <Users className="w-3 h-3 text-orange" />
        <span className="tabular-nums">{visitors.toLocaleString()} online</span>
      </span>

      {/* Browser geolocation button */}
      <button
        onClick={handleGeo}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald hover:text-white transition-colors"
        title="Find markets near me"
        disabled={geoLoading}
      >
        {geoLoading ? (
          <MapPin className="w-3 h-3 animate-pulse" />
        ) : geoError ? (
          <X className="w-3 h-3 text-red-500" />
        ) : (
          <MapPin className="w-3 h-3" />
        )}
        <span className="hidden lg:inline">
          {geo ? `${geo.lat}, ${geo.lng}` : geoError ? 'Unavailable' : 'Near me'}
        </span>
      </button>
    </div>
  )
}
