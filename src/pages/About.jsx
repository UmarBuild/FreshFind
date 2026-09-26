import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sprout, Heart, Target, Recycle, Globe, TrendingUp, Leaf, Quote, Crown, Code, Handshake, Palette } from 'lucide-react'
import { useGsapReveal, useGsapParallax } from '../hooks/useGsap'
import { TEAM, SUSTAINABILITY_STATS, APP_META } from '../data/dummyData'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function StatCounter({ value, suffix }) {
  const ref = useRef(null)
  useGSAP(() => {
    const obj = { v: 0 }
    gsap.to(obj, {
      v: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => {
        ref.current.textContent = (value >= 1000 ? Math.floor(obj.v).toLocaleString() : Math.floor(obj.v)) + suffix
      },
    })
  }, { scope: ref, dependencies: [value, suffix] })
  return <span ref={ref} className="tabular-nums">0{suffix}</span>
}

export default function About() {
  const root = useRef(null)
  const heroRef = useRef(null)

  useGSAP(() => {
    gsap.from('[data-hero-stagger]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
  }, { scope: heroRef })

  useGsapReveal(root, { stagger: 0.08, y: 28 })
  useGsapParallax(heroRef, 0.25)

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div data-parallax="0.3" className="absolute top-10 -right-20 w-96 h-96 bg-orange/15 rounded-full blur-3xl" />
        <div data-parallax="0.5" className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald/15 rounded-full blur-3xl" />
        <div className="container-ff relative py-20">
          <div className="max-w-3xl">
            <span data-hero-stagger className="eyebrow-ff">
              <Sprout className="inline w-3 h-3 mr-1" />
              Our story
            </span>
            <h1 data-hero-stagger className="font-display text-4xl sm:text-5xl lg:text-6xl text-emerald mt-3 leading-[1.05] text-balance">
              We're building the connective tissue between farms and forks.
            </h1>
            <p data-hero-stagger className="mt-5 text-lg text-charcoal/80 leading-relaxed">
              FreshFind started as a weekend spreadsheet of Mara's favourite farm stalls. Six years later, it's a platform that helps tens of thousands of households discover {APP_META.totalMarkets} markets, {APP_META.organicFarms} organic farms, and the seasonal rhythm of fresh, local food.
            </p>
            <div data-hero-stagger className="mt-7 flex flex-wrap gap-3">
              <span className="chip-ff bg-emerald text-oatmeal"><Leaf className="w-3 h-3" /> Built for {APP_META.championship}</span>
              <span className="chip-ff bg-white text-emerald shadow-card">Midnight Harvest Theme</span>
            </div>
          </div>
        </div>
      </section>

      <div ref={root} className="container-ff py-16 space-y-20">
        {/* Mission */}
        <section data-reveal className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <span className="eyebrow-ff">Mission</span>
            <h2 className="font-display text-3xl text-emerald mt-2">Why FreshFind exists</h2>
          </div>
          <div className="lg:col-span-2 space-y-4 text-charcoal/80 leading-relaxed">
            <p>
              The modern food system is opaque. A tomato on a supermarket shelf could have travelled 2,000 kilometres, been picked two weeks ago, and been grown from a variety chosen for shelf life rather than flavour. We think there's a better way.
            </p>
            <p>
              Farmers markets offer an alternative — food that's grown locally, picked at peak ripeness, sold by the people who grew it. But finding these markets, knowing when they're open, and understanding what's in season has historically been a word-of-mouth affair. FreshFind fixes that.
            </p>
            <p>
              We catalogue every farmers market we can find, surface what's at its seasonal peak, and link each market to the people who run it. No middlemen. No advertising. No data selling. Just an honest, beautifully-designed guide to your local food shed.
            </p>
          </div>
        </section>

        {/* Values */}
        <section data-reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow-ff">Values</span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Heart, title: 'Honesty', body: 'No paid placements, no greenwashing. If a market is listed as "verified organic," that means we\'ve checked.' },
              { Icon: Target, title: 'Locality', body: 'We celebrate what grows within a 100-mile radius — the food shed that defines a place and its seasons.' },
              { Icon: Recycle, title: 'Sustainability', body: 'Local food means fewer food miles, less packaging, and a stronger market for regenerative growers.' },
              { Icon: Globe, title: 'Accessibility', body: 'FreshFind is free, fast, and works on any device. Good food information shouldn\'t sit behind a paywall.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} data-reveal className="card-ff p-6 hover:shadow-cardHover transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-emerald text-white mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg text-emerald">{title}</h3>
                <p className="text-sm text-charcoal/70 mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability stats */}
        <section data-reveal className="relative gradient-emerald rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div data-parallax="0.3" className="absolute top-0 right-0 w-72 h-72 bg-orange/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="eyebrow-ff text-orange-soft">Impact</span>
              <h2 className="font-display text-3xl sm:text-4xl text-oatmeal mt-2">Sustainability, by the numbers</h2>
              <p className="text-oatmeal/70 mt-3">Real impact reported by our partner markets over the last 12 months.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {SUSTAINABILITY_STATS.map((s) => (
                <div key={s.label} data-reveal className="text-center text-oatmeal">
                  <TrendingUp className="w-5 h-5 text-orange mx-auto mb-2" />
                  <p className="font-display text-3xl sm:text-4xl font-bold">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-oatmeal/70 mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section data-reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow-ff">Team</span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald mt-2">The people behind FreshFind</h2>
            <p className="text-charcoal/70 mt-3">A small, opinionated team of food lovers, engineers, and designers.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => {
              const RoleIcon = { 'Founder & CEO': Crown, 'Head of Engineering': Code, 'Director of Partnerships': Handshake, 'Lead Designer': Palette }[member.role] || Sprout
              return (
                <div key={member.id} data-reveal className="card-ff p-6 text-center hover:shadow-cardHover hover:-translate-y-1 transition-all group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-emerald text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <RoleIcon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-lg text-emerald">{member.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-orange font-semibold mt-0.5">{member.role}</p>
                  <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">{member.bio}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Quote */}
        <section data-reveal className="bg-cream rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <Quote className="w-10 h-10 text-orange/30 mx-auto mb-4" />
          <p className="font-display text-2xl sm:text-3xl text-emerald max-w-3xl mx-auto leading-snug text-balance">
            "Every basket of tomatoes bought at a farmers market is a vote for a food system that tastes better, pays growers fairly, and treads lightly on the planet."
          </p>
          <p className="text-sm text-charcoal/60 mt-4">— Mara Quinn, Founder</p>
        </section>
      </div>
    </div>
  )
}
