import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * CustomCursor — desktop-only custom cursor with magnetic hover state.
 * Two layers: a large ring (.cursor-ff) and a small dot (.cursor-dot-ff).
 * Hovering interactive elements (a, button, [data-hover]) scales the ring.
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor-active')

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' })

    const onMove = (e) => {
      xRing(e.clientX); yRing(e.clientY)
      xDot(e.clientX); yDot(e.clientY)
    }

    const onOver = (e) => {
      const t = e.target
      if (t.closest('a, button, input, textarea, select, [data-hover]')) {
        ring.classList.add('hovering')
      }
    }
    const onOut = (e) => {
      const t = e.target
      if (t.closest('a, button, input, textarea, select, [data-hover]')) {
        ring.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ff" aria-hidden />
      <div ref={dotRef} className="cursor-dot-ff" aria-hidden />
    </>
  )
}
