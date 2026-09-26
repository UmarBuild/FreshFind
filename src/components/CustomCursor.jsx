import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomCursor — desktop-only custom cursor with morphing states.
 * - Default: small dot + ring
 * - Hover (a/button): ring grows
 * - View (cards/images with data-cursor="view"): ring morphs to "VIEW" pill
 * - Drag (scrollable with data-cursor="drag"): ring morphs to "DRAG"
 *
 * Add data-cursor="view|drag|open|play" to any element to trigger label mode.
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor-active')

    const ring = ringRef.current
    const dot = dotRef.current
    const labelEl = labelRef.current
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
      const interactive = t.closest('a, button, input, textarea, select, [data-hover]')
      const labeled = t.closest('[data-cursor]')

      ring.classList.remove('hovering', 'labeled')
      if (labelEl) labelEl.style.opacity = '0'
      setLabel('')

      if (labeled) {
        const text = labeled.getAttribute('data-cursor')
        ring.classList.add('labeled')
        setLabel(text)
        if (labelEl) {
          labelEl.textContent = text
          gsap.to(labelEl, { opacity: 1, duration: 0.2 })
        }
      } else if (interactive) {
        ring.classList.add('hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ff" aria-hidden>
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-orange opacity-0 pointer-events-none"
          aria-hidden
        />
      </div>
      <div ref={dotRef} className="cursor-dot-ff" aria-hidden />
    </>
  )
}
