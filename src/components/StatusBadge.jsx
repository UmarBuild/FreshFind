import { useEffect, useState } from 'react'

/**
 * StatusBadge — determines whether a market is "Open Right Now" based on
 * the current day/time vs. the market's operating days & hours.
 *
 * SRS: 'Open Right Now' status badge is required. Live clock + visitor
 * counter + geolocation are NOT in the SRS — those have been removed.
 *
 * Props: market = { days: ['Mon','Wed',...], openTime, closeTime }
 */
function computeIsOpen(market, now) {
  if (!market?.days?.length) return { open: false, label: 'Closed' }
  // JS getDay(): Sun=0..Sat=6 ; our DAYS_OF_WEEK = ['Mon',...'Sun'] (Mon=0..Sun=6)
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

function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
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
