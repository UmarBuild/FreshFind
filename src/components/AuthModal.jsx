import { useEffect, useRef, useState } from 'react'
import { X, Mail, Lock, User, Sprout, Loader2, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { isModalOpen, modalMode, closeModal, openModal, login } = useAuth()
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  // Animate modal in/out
  useEffect(() => {
    if (!isModalOpen) return
    setDone(false)
    setSubmitting(false)
    setForm({ name: '', email: '', password: '' })

    const tl = gsap.timeline()
    tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(panelRef.current, { y: 24, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }, '-=0.1')

    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isModalOpen, closeModal, modalMode])

  if (!isModalOpen) return null

  const isSignup = modalMode === 'signup'

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulated auth
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      setTimeout(() => {
        login({ name: form.name || (form.email ? form.email.split('@')[0] : 'Friend'), email: form.email || 'friend@freshfind.app' })
      }, 700)
    }, 1100)
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-emerald-deep/40 backdrop-blur-md" onClick={closeModal} />
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-oatmeal rounded-3xl shadow-cardHover overflow-hidden"
      >
        {/* Decorative top */}
        <div className="h-2 gradient-orange" />
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-card text-charcoal hover:text-orange transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-emerald text-white">
              <Sprout className="w-4 h-4" />
            </span>
            <span className="font-display font-bold text-xl text-emerald">FreshFind</span>
          </div>
          <h2 className="font-display text-2xl text-emerald mt-3">
            {isSignup ? 'Join the harvest' : 'Welcome back'}
          </h2>
          <p className="text-charcoal/60 text-sm mt-1">
            {isSignup
              ? 'Create an account to sync bookmarks, get seasonal alerts, and save your favourite markets.'
              : 'Log in to pick up where you left off — your bookmarks are waiting.'}
          </p>

          {done ? (
            <div className="mt-6 flex flex-col items-center text-center py-6">
              <CheckCircle2 className="w-14 h-14 text-emerald animate-float" />
              <p className="mt-3 font-semibold text-emerald">All set!</p>
              <p className="text-xs text-charcoal/60 mt-1">Taking you to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              {isSignup && (
                <div>
                  <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Mara Quinn"
                      className="input-ff pl-10"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="input-ff pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/70 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="input-ff pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full mt-2 py-3 disabled:opacity-70"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Please wait…</>
                ) : isSignup ? (
                  'Create account'
                ) : (
                  'Log in'
                )}
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-emerald/10" />
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40">or</span>
                <div className="flex-1 h-px bg-emerald/10" />
              </div>

              <button
                type="button"
                onClick={() => login({ name: 'Guest Explorer', email: 'guest@freshfind.app' })}
                className="btn-ghost w-full py-2.5 text-sm"
              >
                Continue as guest
              </button>
            </form>
          )}

          <p className="text-xs text-center text-charcoal/60 mt-5">
            {isSignup ? 'Already have an account?' : 'New to FreshFind?'}{' '}
            <button
              onClick={() => openModal(isSignup ? 'login' : 'signup')}
              className="text-orange font-semibold hover:underline"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
