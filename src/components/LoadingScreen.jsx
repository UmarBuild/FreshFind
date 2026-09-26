import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Sprout } from 'lucide-react'

/**
 * LoadingScreen — premium full-screen intro shown on first visit.
 *
 * Animation sequence (dhamakedar 2D/3D mix):
 *  1. Two rotating 3D rings (perspective + rotateX/Y) counter-rotate
 *  2. Logo scales up + rotates from -180deg with back.out ease
 *  3. Counter 0 → 100 ticks up
 *  4. "FreshFind" name slides in per-character
 *  5. Particle dots burst outward from logo
 *  6. Curtain exit — whole screen slides up (yPercent -100)
 */
export default function LoadingScreen() {
  const rootRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const leafRef = useRef(null)
  const numRef = useRef(null)
  const particleRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()

    // Continuous 3D ring rotations — counter-rotating
    gsap.to(ring1Ref.current, {
      rotation: 360,
      transformOrigin: 'center center',
      duration: 8,
      repeat: -1,
      ease: 'none',
    })
    gsap.to(ring2Ref.current, {
      rotation: -360,
      transformOrigin: 'center center',
      duration: 6,
      repeat: -1,
      ease: 'none',
    })
    // Subtle 3D tilt oscillation on the rings
    gsap.to([ring1Ref.current, ring2Ref.current], {
      rotationX: 30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Counter 0 → 100
    const counter = { v: 0 }
    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.floor(counter.v)
      },
    }, 0)

    // Logo scales up + rotates with back.out
    tl.fromTo(leafRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' },
      0
    )

    // Logo name slides in per-character
    tl.from('[data-load="name"] > span', {
      y: 30,
      opacity: 0,
      rotateX: -90,
      duration: 0.5,
      stagger: 0.04,
      ease: 'back.out(1.5)',
    }, 0.4)

    tl.from('[data-load="tagline"]', {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 1)

    // Particle burst — 12 dots fly outward from center
    const particles = particleRef.current?.children || []
    if (particles.length) {
      tl.fromTo(particles,
        { scale: 0, x: 0, y: 0, opacity: 1 },
        {
          scale: 1,
          x: (i) => Math.cos((i / particles.length) * Math.PI * 2) * 120,
          y: (i) => Math.sin((i / particles.length) * Math.PI * 2) * 120,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.02,
        },
        0.8
      )
    }

    // Curtain exit — slide whole screen up
    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => setDone(true),
    }, '+=0.3')

    return () => { tl.kill() }
  }, [])

  if (done) return null

  // Split name into chars for per-character reveal
  const nameChars = 'FreshFind'.split('')

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-emerald overflow-hidden"
      style={{ perspective: '800px' }}
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 grain opacity-20" />

      {/* Rotating 3D rings — counter-rotating, oscillating tilt */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={ring1Ref}
          className="w-[420px] h-[420px] rounded-full border-2 border-orange/20"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <div
          ref={ring2Ref}
          className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-orange/30"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <div className="absolute w-[220px] h-[220px] rounded-full border border-oatmeal/10" />
      </div>

      {/* Particle burst container */}
      <div ref={particleRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange"
            style={{ boxShadow: '0 0 8px rgba(234,88,12,0.6)' }}
          />
        ))}
      </div>

      {/* Center logo + name */}
      <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={leafRef}
          className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-orange text-white shadow-2xl mb-6"
          style={{ boxShadow: '0 20px 60px -10px rgba(234,88,12,0.6)' }}
        >
          <Sprout className="w-10 h-10" />
        </div>

        <h1
          data-load="name"
          className="font-display text-5xl font-bold text-oatmeal tracking-tight flex"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {nameChars.map((ch, i) => (
            <span key={i} className="inline-block">{ch}</span>
          ))}
        </h1>

        <p data-load="tagline" className="text-oatmeal/60 text-xs uppercase tracking-[0.4em] mt-2">
          Farmers Markets
        </p>

        {/* Counter */}
        <div className="mt-8 flex items-baseline gap-1">
          <span ref={numRef} className="font-display text-5xl font-bold text-orange tabular-nums">0</span>
          <span className="font-display text-2xl text-oatmeal/70">%</span>
        </div>
      </div>

      {/* Bottom signature */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-oatmeal/40">
          TechWiz 7 · Web Innovation Unleashed
        </p>
      </div>
    </div>
  )
}
