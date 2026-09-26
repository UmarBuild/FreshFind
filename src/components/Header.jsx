import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Sprout, Menu, X, ChevronRight, Home as HomeIcon, Store, Apple, Mail, Info, LogIn, UserPlus, LogOut } from 'lucide-react'
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
    <nav className="hidden sm:flex items-center gap-1 text-[11px] text-charcoal/50 mt-0.5" aria-label="Breadcrumb">
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
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, openModal, logout } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}>
      <div className="container-ff">
        <div className="flex items-center justify-between gap-2 sm:gap-3 py-3">
          {/* Logo — always visible */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0" data-hover>
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-emerald text-white shadow-card transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Sprout className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-orange border-2 border-oatmeal" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-base sm:text-lg text-emerald">FreshFind</span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-charcoal/50 -mt-0.5 hidden sm:block">Farmers Markets</span>
            </span>
          </Link>

          {/* ===========================================
              DESKTOP LAYOUT (lg+ 1024px and up)
              Logo + Nav links + Status strip + Auth
              =========================================== */}
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

          {/* Right cluster — DESKTOP ONLY (lg+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <HeaderStatusStrip />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-charcoal/70 hidden xl:inline">Hi, <span className="text-emerald font-semibold">{user.name}</span></span>
                <button onClick={logout} className="btn-ghost text-xs px-3 py-1.5">Sign out</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => openModal('login')} className="btn-ghost text-xs px-3.5 py-1.5">Log in</button>
                <button onClick={() => openModal('signup')} className="btn-primary text-xs px-4 py-1.5">Sign up</button>
              </div>
            )}
          </div>

          {/* ===========================================
              MOBILE/TABLET HAMBURGER (below lg 1024px)
              =========================================== */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald/10 text-emerald hover:bg-emerald/20 transition-colors shrink-0"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Crumbs */}
        <div className="pb-2"><Crumbs /></div>
      </div>

      {/* ===========================================
          MOBILE/TABLET DROPDOWN MENU (below lg 1024px)
          =========================================== */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-ff pb-4">
          <div className="glass rounded-2xl p-4 shadow-card space-y-2 max-h-[75vh] overflow-y-auto">
            {/* Status strip — at top of menu */}
            <div className="pb-3 border-b border-emerald/10">
              <HeaderStatusStrip />
            </div>

            {/* Nav links */}
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-emerald text-white shadow-card' : 'text-charcoal hover:bg-emerald/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            {/* Auth section — at bottom of menu */}
            <div className="flex gap-2 pt-3 border-t border-emerald/10">
              {user ? (
                <button onClick={() => { setMenuOpen(false); logout() }} className="flex-1 inline-flex items-center justify-center gap-1.5 btn-ghost text-xs py-2.5">
                  <LogOut className="w-3.5 h-3.5" /> Sign out ({user.name})
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setMenuOpen(false); openModal('login') }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 btn-ghost text-xs py-2.5"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Log in
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); openModal('signup') }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 btn-primary text-xs py-2.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
