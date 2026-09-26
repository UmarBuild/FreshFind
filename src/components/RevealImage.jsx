import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * RevealImage — an image that reveals itself with a clip-path animation
 * when scrolled into view. Direction can be 'left', 'right', 'top', 'bottom'.
 *
 * Usage:
 *   <RevealImage src="/images/..." alt="..." direction="left" />
 */
export default function RevealImage({
  src,
  alt = '',
  className = '',
  direction = 'left',
  delay = 0,
  overlay = false,
}) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    // Initial clip-path: fully hidden
    const clipStart = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      top: 'inset(0 0 100% 0)',
      bottom: 'inset(100% 0 0 0)',
    }[direction] || 'inset(0 100% 0 0)'

    const clipEnd = 'inset(0 0 0 0)'

    gsap.set(wrap, { clipPath: clipStart, webkitClipPath: clipStart })
    gsap.set(img, { scale: 1.4 })

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ delay })
        tl.to(wrap, {
          clipPath: clipEnd,
          webkitClipPath: clipEnd,
          duration: 1.1,
          ease: 'power4.out',
        }).to(img, {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, 0)
      },
    })

    return () => st.kill()
  }, [direction, delay])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
    </div>
  )
}
