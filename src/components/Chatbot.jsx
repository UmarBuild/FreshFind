import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react'
import gsap from 'gsap'
import { FAQS, CHATBOT_QUICK_REPLIES, MARKET_BY_ID, PRODUCE_BY_ID, MARKETS } from '../data/dummyData'

function matchFaq(text) {
  const t = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const f of FAQS) {
    let score = 0
    for (const k of f.keywords) if (t.includes(k.toLowerCase())) score += 1
    if (t.includes(f.q.toLowerCase().slice(0, 12))) score += 2
    if (score > bestScore) { bestScore = score; best = f }
  }
  return bestScore > 0 ? best : null
}

function produceSuggestions(text) {
  const t = text.toLowerCase()
  const hits = []
  for (const p of Object.values(PRODUCE_BY_ID)) {
    if (t.includes(p.name.toLowerCase().split(' ')[0])) {
      hits.push({ type: 'produce', id: p.id, label: p.name })
    }
  }
  for (const m of MARKETS) {
    if (t.includes(m.name.toLowerCase().split(' ')[0].toLowerCase()) || t.includes(m.area.toLowerCase())) {
      hits.push({ type: 'market', id: m.id, label: m.name })
    }
  }
  return hits.slice(0, 3)
}

const INITIAL_MSG = {
  role: 'bot',
  text: "Hi, I'm Sage — your FreshFind guide. Ask me about market hours, what's in season, or where to find organic produce near you.",
  suggestions: CHATBOT_QUICK_REPLIES.slice(0, 3),
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const panelRef = useRef(null)
  const fabRef = useRef(null)
  const scrollRef = useRef(null)

  // Animate open/close
  useEffect(() => {
    if (!panelRef.current || !fabRef.current) return
    if (open) {
      gsap.fromTo(panelRef.current,
        { y: 24, scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }
      )
      gsap.to(fabRef.current, { scale: 0, duration: 0.2, ease: 'power2.in' })
    } else {
      gsap.to(fabRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.6)' })
    }
  }, [open])

  // Auto-scroll on new message
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing])

  const send = (text) => {
    if (!text?.trim()) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const faq = matchFaq(text)
      const sugs = produceSuggestions(text)
      let reply
      if (faq) {
        reply = { role: 'bot', text: faq.a, suggestions: CHATBOT_QUICK_REPLIES.filter((q) => q !== faq.q).slice(0, 2), related: sugs }
      } else if (sugs.length) {
        reply = {
          role: 'bot',
          text: `I found some matching results for "${text}":`,
          related: sugs,
          suggestions: ['What are the typical market hours?', 'Which days are markets open?'],
        }
      } else {
        reply = {
          role: 'bot',
          text: "I'm a small rule-based assistant — I can help with market hours, opening days, organic certification, parking, dogs, payment methods, what's in season, and how to use FreshFind. Try one of the quick replies below!",
          suggestions: CHATBOT_QUICK_REPLIES.slice(0, 3),
        }
      }
      setTyping(false)
      setMessages((m) => [...m, reply])
    }, 700 + Math.random() * 400)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full gradient-emerald text-white shadow-cardHover hover:shadow-glow transition-shadow"
        aria-label="Open chat"
        style={{ transformOrigin: 'center' }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-40 animate-pulseRing" />
        <MessageCircle className="relative w-6 h-6" />
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-orange text-[10px] font-bold text-white">AI</span>
      </button>

      {/* Chat Panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] max-h-[600px] h-[80vh] bg-oatmeal rounded-3xl shadow-cardHover flex flex-col overflow-hidden origin-bottom-left ${open ? '' : 'pointer-events-none'}`}
        style={{ opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden' }}
        role="dialog"
        aria-label="FreshFind Assistant"
      >
        {/* Header */}
        <div className="gradient-emerald text-oatmeal p-4 flex items-center gap-3">
          <div className="relative">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-oatmeal/15">
              <Bot className="w-5 h-5" />
            </span>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-orange border-2 border-emerald" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold leading-tight">Sage</p>
            <p className="text-[11px] text-oatmeal/70">FreshFind Assistant · Online</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-oatmeal/10 hover:bg-oatmeal/20 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-oatmeal">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${m.role === 'user' ? '' : 'space-y-2'}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald text-oatmeal rounded-br-md'
                      : 'bg-white text-charcoal rounded-bl-md shadow-card'
                  }`}
                >
                  {m.text}
                </div>
                {m.related && m.related.length > 0 && (
                  <div className="space-y-1.5">
                    {m.related.map((r) => (
                      <a
                        key={`${r.type}-${r.id}`}
                        href={r.type === 'market' ? `#/market/${r.id}` : `#/produce?p=${r.id}`}
                        className="block px-3 py-2 rounded-xl bg-white border border-orange/20 text-xs text-emerald hover:border-orange hover:bg-orange/5 transition"
                      >
                        <Sparkles className="inline w-3 h-3 mr-1.5 -mt-0.5 text-orange" />
                        {r.type === 'market' ? 'Market' : 'Produce'}: <span className="font-semibold">{r.label}</span>
                      </a>
                    ))}
                  </div>
                )}
                {m.suggestions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="chip-ff bg-emerald/10 text-emerald hover:bg-emerald hover:text-oatmeal transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white shadow-card flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-emerald/50"
                    style={{ animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick replies (always visible at bottom when conversation is short) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-oatmeal">
            {CHATBOT_QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="chip-ff bg-white text-emerald border border-emerald/10 hover:border-orange hover:text-orange transition"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-emerald/10 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about markets, hours, produce…"
              className="flex-1 min-w-0 bg-oatmeal/60 border border-emerald/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl gradient-orange text-white disabled:opacity-40 hover:scale-105 active:scale-95 transition-transform"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
