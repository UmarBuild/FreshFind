import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2,
  Twitter, Instagram, Facebook, Loader2,
} from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsap'
import { APP_META } from '../data/dummyData'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Contact() {
  const root = useRef(null)
  const heroRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })

  useGSAP(() => {
    gsap.from('[data-hero-stagger]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
  }, { scope: heroRef })

  useGsapReveal(root, { stagger: 0.08, y: 28 })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setForm({ name: '', email: '', subject: 'General enquiry', message: '' })
      setTimeout(() => setSent(false), 4500)
    }, 1200)
  }

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-cream border-b border-emerald/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl" />
        <div className="container-ff relative py-16">
          <span data-hero-stagger className="eyebrow-ff">Get in touch</span>
          <h1 data-hero-stagger className="font-display text-4xl sm:text-5xl text-emerald mt-2 max-w-2xl">
            Questions, partnerships, or just saying hello?
          </h1>
          <p data-hero-stagger className="text-charcoal/70 mt-4 max-w-xl">
            We'd love to hear from you. Whether you're a grower looking to join the network, a developer with feedback, or a curious eater — drop us a line.
          </p>
        </div>
      </section>

      <div ref={root} className="container-ff py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div data-reveal className="lg:col-span-2 bg-white rounded-3xl shadow-card p-6 sm:p-8">
            <h2 className="font-display text-2xl text-emerald">Send us a message</h2>
            <p className="text-sm text-charcoal/60 mt-1 mb-6">We typically reply within one business day.</p>

            {sent ? (
              <div className="rounded-2xl bg-emerald/8 border border-emerald/15 p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald mx-auto mb-3 animate-float" />
                <h3 className="font-display text-lg text-emerald">Message sent!</h3>
                <p className="text-sm text-charcoal/70 mt-1">Thanks for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-ff"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className="input-ff"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input-ff cursor-pointer"
                  >
                    <option>General enquiry</option>
                    <option>Market partnership</option>
                    <option>Press / media</option>
                    <option>Bug report</option>
                    <option>Feature request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind…"
                    className="input-ff resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-70"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side panel */}
          <div data-reveal className="space-y-4">
            {/* Contact details */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-display text-lg text-emerald mb-3">Contact details</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/8 text-emerald shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">Visit</p>
                    <p className="text-charcoal/60 text-xs">14 Riverbend Promenade, Riverside</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/8 text-emerald shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">Email</p>
                    <a href="mailto:hello@freshfind.app" className="text-charcoal/60 text-xs hover:text-orange">hello@freshfind.app</a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/8 text-emerald shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">Phone</p>
                    <a href="tel:+14155550100" className="text-charcoal/60 text-xs hover:text-orange">+1 (415) 555-0100</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Support hours */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-display text-lg text-emerald mb-3 inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange" /> Support hours
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-charcoal/70">Mon – Fri</span>
                  <span className="font-semibold text-emerald">9:00 – 18:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-charcoal/70">Saturday</span>
                  <span className="font-semibold text-emerald">10:00 – 14:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-charcoal/70">Sunday</span>
                  <span className="font-semibold text-charcoal/40">Closed</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-display text-lg text-emerald mb-3 inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-orange" /> Follow along
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { Icon: Instagram, href: APP_META.social.instagram, label: 'Instagram' },
                  { Icon: Twitter, href: APP_META.social.twitter, label: 'Twitter' },
                  { Icon: Facebook, href: APP_META.social.facebook, label: 'Facebook' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center h-11 rounded-xl bg-emerald/8 text-emerald hover:bg-emerald hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div data-reveal className="mt-8 bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="p-5 border-b border-emerald/5">
            <h3 className="font-display text-lg text-emerald inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange" /> Find us
            </h3>
            <p className="text-xs text-charcoal/60 mt-0.5">FreshFind HQ — Riverside</p>
          </div>
          <iframe
            title="FreshFind HQ"
            width="100%"
            height="320"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4164%2C37.7758%2C-122.3964%2C37.7958&layer=mapnik&marker=37.7858%2C-122.4064"
          />
        </div>
      </div>
    </div>
  )
}
