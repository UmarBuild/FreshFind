import { Link } from 'react-router-dom'
import { Sprout, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { APP_META } from '../data/dummyData'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-32 relative">
      {/* Top wave divider */}
      <div className="container-ff">
        <svg viewBox="0 0 1440 80" className="w-full h-12 text-emerald" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L0,80Z" />
        </svg>
      </div>

      <div className="gradient-emerald text-oatmeal">
        <div className="container-ff py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-white">
                  <Sprout className="w-5 h-5" />
                </span>
                <span className="font-display font-bold text-2xl">{APP_META.name}</span>
              </Link>
              <p className="text-oatmeal/70 text-sm leading-relaxed">
                Discover farmers markets, seasonal produce, and verified-organic farms in your neighbourhood.
                Built for the TechWiz 7 World Tech Championship.
              </p>
              <div className="flex items-center gap-2 mt-5">
                {[
                  { Icon: Instagram, href: APP_META.social.instagram, label: 'Instagram' },
                  { Icon: Twitter, href: APP_META.social.twitter, label: 'Twitter' },
                  { Icon: Facebook, href: APP_META.social.facebook, label: 'Facebook' },
                  { Icon: Linkedin, href: APP_META.social.linkedin, label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-oatmeal/10 hover:bg-orange transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-display text-lg mb-4">Explore</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { to: '/markets', label: 'Market Directory' },
                  { to: '/produce', label: 'Produce Guide' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact Us' },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-oatmeal/70 hover:text-orange transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit */}
            <div>
              <h4 className="font-display text-lg mb-4">Visit</h4>
              <ul className="space-y-3 text-sm text-oatmeal/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                  <span>14 Riverbend Promenade, Riverside</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange" />
                  <a href="tel:+14155550100" className="hover:text-orange transition-colors">+1 (415) 555-0100</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange" />
                  <a href="mailto:hello@freshfind.app" className="hover:text-orange transition-colors">hello@freshfind.app</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display text-lg mb-4">Stay in the loop</h4>
              <p className="text-oatmeal/70 text-sm mb-3">Weekly seasonal picks, market news, and recipes.</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-oatmeal/10 text-oatmeal placeholder:text-oatmeal/40 focus:outline-none focus:ring-2 focus:ring-orange/50 text-sm"
                />
                <button className="px-4 py-2 rounded-xl bg-orange hover:bg-orange-deep transition-colors text-sm font-semibold">
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-oatmeal/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-oatmeal/60">
            <p>© {year} {APP_META.name}. Built for {APP_META.championship}.</p>
            <p className="flex items-center gap-2">
              <span>Midnight Harvest Theme</span>
              <span className="inline-block w-2 h-2 rounded-full bg-orange" />
              <span>Crafted with care</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
