import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Sprout, Menu, X, ChevronRight, Home as HomeIcon, Store, Apple, Mail, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { HeaderStatusStrip } from './StatusBadge'

const NAV = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/markets', label: 'Markets', icon: Store },
  { to: '/produce', label: 'Produce', icon: Apple },
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Mail },
]

function Crumbs() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const parts = pathname.split('/').filter(Boolean)
  return (
    <nav className="hidden md:flex items-center gap-1 text-[11px] text-charcoal/50 mt-0.5" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-emerald transition-colors">Home</Link>
      {parts.map((p, i) => {
        const isLast = i === parts.length - 1
        const path = '/' + parts.slice(0, i + 1).join('/')
        return (
          <span key={path} className="inline-flex items-center gap-1">
            <ChevronRight className="w-3 h-3 opacity-60" />
            {isLast ? (
              <span className="text-emerald font-medium capitalize">{decodeURIComponent(p)}</span>
            ) : (
              <Link to={path} className="hover:text-emerald transition-colors capitalize">{decodeURIComponent(p)}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, openModal, logout } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}>
      <div className="container-ff">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5" data-hover>
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-emerald text-white shadow-card transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Sprout className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-orange border-2 border-oatmeal" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg text-emerald">FreshFind</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal/50 -mt-0.5">Farmers Markets</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald text-white shadow-card'
                      : 'text-charcoal/80 hover:text-emerald hover:bg-emerald/5'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster — SRS-required real-time status strip + auth */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <HeaderStatusStrip />
            </div>
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-charcoal/70">Hi, <span className="text-emerald font-semibold">{user.name}</span></span>
                <button onClick={logout} className="btn-ghost text-xs px-3 py-1.5">Sign out</button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => openModal('login')} className="btn-ghost text-xs px-3.5 py-1.5">Log in</button>
                <button onClick={() => openModal('signup')} className="btn-primary text-xs px-4 py-1.5">Sign up</button>
              </div>
            )}
            <button
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald/10 text-emerald"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Crumbs */}
        <div className="pb-2"><Crumbs /></div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-ff pb-4">
          <div className="glass rounded-2xl p-4 shadow-card space-y-2">
            <div className="pb-2"><HeaderStatusStrip /></div>
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-emerald text-white' : 'text-charcoal hover:bg-emerald/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2">
              {user ? (
                <button onClick={logout} className="flex-1 btn-ghost text-xs py-2">Sign out ({user.name})</button>
              ) : (
                <>
                  <button onClick={() => { setMobileOpen(false); openModal('login') }} className="flex-1 btn-ghost text-xs py-2">Log in</button>
                  <button onClick={() => { setMobileOpen(false); openModal('signup') }} className="flex-1 btn-primary text-xs py-2">Sign up</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
