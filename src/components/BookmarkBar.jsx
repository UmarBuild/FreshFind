import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bookmark,
  X,
  Trash2,
  Download,
  Share2,
  StickyNote,
  Store,
  Apple,
  ChevronRight,
  Save,
  CheckCircle2,
} from 'lucide-react'
import gsap from 'gsap'
import { useBookmarks } from '../context/BookmarkContext'
import { MARKET_BY_ID, PRODUCE_BY_ID } from '../data/dummyData'

function ShareMenu({ onClose }) {
  const items = [
    { label: 'Twitter', href: 'https://twitter.com/intent/tweet?text=My%20FreshFind%20bookmarks' },
    { label: 'Facebook', href: 'https://facebook.com/sharer/sharer.php?u=https://freshfind.app' },
    { label: 'LinkedIn', href: 'https://linkedin.com/sharing/share-offsite/?url=https://freshfind.app' },
    { label: 'WhatsApp', href: 'https://wa.me/?text=My%20FreshFind%20bookmarks' },
  ]
  return (
    <div className="mt-2 bg-white rounded-xl shadow-card border border-emerald/10 p-2">
      <p className="px-2 pb-1 text-[10px] uppercase tracking-widest text-charcoal/50">Share via</p>
      <div className="grid grid-cols-2 gap-1">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="block px-2.5 py-2 text-xs font-medium text-charcoal hover:bg-emerald/5 hover:text-emerald rounded-lg transition-colors text-center"
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function BookmarkBar() {
  const {
    items, count, isBarOpen, setIsBarOpen,
    removeBookmark, updateNote, clearAll, exportList,
  } = useBookmarks()

  const panelRef = useRef(null)
  const fabRef = useRef(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Animate open/close
  useEffect(() => {
    if (!panelRef.current || !fabRef.current) return
    if (isBarOpen) {
      gsap.fromTo(panelRef.current,
        { x: 24, scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }
      )
    }
  }, [isBarOpen])

  // Count badge pop on change
  useEffect(() => {
    if (!fabRef.current) return
    gsap.fromTo(fabRef.current, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.inOut' })
  }, [count])

  const handleExport = () => {
    const text = exportList()
    const blob = new Blob([`# FreshFind Bookmarks\n\n${text}\n`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `freshfind-bookmarks-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(exportList())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      {/* Floating Action Button (right side) */}
      <button
        ref={fabRef}
        onClick={() => setIsBarOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-emerald shadow-cardHover hover:shadow-glow transition-shadow"
        aria-label="Open bookmarks"
        style={{ transformOrigin: 'center' }}
      >
        <Bookmark className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-orange text-white text-[11px] font-bold border-2 border-oatmeal">
            {count}
          </span>
        )}
        <span className="sr-only">{count} bookmarked</span>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] max-h-[600px] h-[80vh] bg-oatmeal rounded-3xl shadow-cardHover flex flex-col overflow-hidden origin-bottom-right ${isBarOpen ? '' : 'pointer-events-none'}`}
        style={{ opacity: isBarOpen ? 1 : 0, visibility: isBarOpen ? 'visible' : 'hidden' }}
        role="dialog"
        aria-label="My bookmarks"
      >
        {/* Header */}
        <div className="gradient-emerald text-oatmeal p-4 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-oatmeal/15">
            <Bookmark className="w-5 h-5 fill-orange text-orange" />
          </span>
          <div className="flex-1">
            <p className="font-display font-bold leading-tight">My Bookmarks</p>
            <p className="text-[11px] text-oatmeal/70">{count} saved · session only</p>
          </div>
          <button
            onClick={() => setIsBarOpen(false)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-oatmeal/10 hover:bg-oatmeal/20 transition-colors"
            aria-label="Close bookmarks"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-oatmeal">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-3">
                <Bookmark className="w-7 h-7 text-emerald/60" />
              </div>
              <p className="font-semibold text-emerald">No bookmarks yet</p>
              <p className="text-xs text-charcoal/60 mt-1 max-w-[240px]">
                Tap the bookmark icon on any market card or produce item to save it here. Add notes, export, or share with friends.
              </p>
              <Link
                to="/markets"
                onClick={() => setIsBarOpen(false)}
                className="btn-ghost mt-4 text-xs py-2"
              >
                Browse markets <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const rec = item.type === 'market' ? MARKET_BY_ID[item.id] : PRODUCE_BY_ID[item.id]
              if (!rec) return null
              const to = item.type === 'market' ? `/market/${item.id}` : `/produce?p=${item.id}`
              return (
                <div key={`${item.type}-${item.id}`} className="bg-white rounded-2xl p-3 shadow-card hover:shadow-cardHover transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-white ${item.type === 'market' ? 'gradient-emerald' : 'gradient-orange'}`}>
                      {item.type === 'market' ? <Store className="w-4 h-4" /> : <Apple className="w-4 h-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link to={to} onClick={() => setIsBarOpen(false)} className="block">
                        <p className="font-semibold text-emerald text-sm truncate hover:text-orange transition-colors">
                          {rec.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-charcoal/50">
                          {item.type === 'market' ? `${rec.area} · Market` : `${rec.category} · Produce`}
                        </p>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeBookmark(item.type, item.id)}
                      className="text-charcoal/40 hover:text-orange transition-colors p-1"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Note */}
                  <div className="mt-2.5 flex items-start gap-2">
                    <StickyNote className="w-3 h-3 text-orange mt-1.5 shrink-0" />
                    {editingId === `${item.type}-${item.id}` ? (
                      <div className="flex-1 flex gap-1.5">
                        <textarea
                          autoFocus
                          defaultValue={item.note}
                          onBlur={(e) => { updateNote(item.type, item.id, e.target.value); setEditingId(null) }}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.target.blur() } }}
                          rows={2}
                          placeholder="Add a note (e.g. 'Saturday 8am, bring cash')"
                          className="flex-1 text-xs bg-oatmeal/60 border border-emerald/10 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange/40"
                        />
                        <button
                          onClick={(e) => { const ta = e.target.previousSibling; updateNote(item.type, item.id, ta.value); setEditingId(null) }}
                          className="text-emerald hover:text-orange p-1"
                          aria-label="Save note"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingId(`${item.type}-${item.id}`)}
                        className="flex-1 text-left text-xs text-charcoal/70 hover:text-emerald italic min-h-[1.5rem] transition-colors"
                      >
                        {item.note || <span className="text-charcoal/40 not-italic">+ Add a note</span>}
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-3 border-t border-emerald/10 bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald bg-emerald/5 hover:bg-emerald/10 rounded-xl py-2.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button
                onClick={() => setShareOpen((o) => !o)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl py-2.5 px-3 transition-colors ${
                  shareOpen ? 'bg-orange text-white' : 'text-orange bg-orange/10 hover:bg-orange/15'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" /> {shareOpen ? 'Close' : 'Share'}
              </button>
              <button
                onClick={handleCopyShare}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal bg-charcoal/5 hover:bg-charcoal/10 rounded-xl py-2.5 px-3 transition-colors"
              >
                {copied ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> Copied</> : 'Copy'}
              </button>
              <button
                onClick={clearAll}
                className="inline-flex items-center justify-center w-10 text-charcoal/60 hover:text-orange rounded-xl py-2.5 transition-colors"
                aria-label="Clear all"
                title="Clear all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Inline share menu — expands below the buttons row, stays inside the panel */}
            {shareOpen && <ShareMenu onClose={() => setShareOpen(false)} />}
          </div>
        )}
      </div>
    </>
  )
}
