import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useTilt3D — adds a 3D mouse-follow tilt effect to any element.
 * The element rotates on X/Y axis based on cursor position.
 * On mouse leave, it smoothly resets.
 *
 * Usage:
 *   const ref = useRef(null)
 *   useTilt3D(ref, { max: 12, scale: 1.04 })
 *   <div ref={ref} className="[perspective:1000px]">...</div>
 *
 * Make sure the element has `transform-style: preserve-3d` (Tailwind: `[transform-style:preserve-3d]`)
 * and the parent has perspective set.
 */
export function useTilt3D(ref, opts = {}) {
  const max = opts.max ?? 12
  const scale = opts.scale ?? 1.03
  const speed = opts.speed ?? 0.4

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return

    // Ensure parent has perspective
    el.style.transformStyle = 'preserve-3d'
    if (!el.parentElement.style.perspective) {
      el.parentElement.style.perspective = '1000px'
    }

    const xTo = gsap.quickTo(el, 'rotationY', { duration: speed, ease: 'power2.out' })
    const yTo = gsap.quickTo(el, 'rotationX', { duration: speed, ease: 'power2.out' })
    const sTo = gsap.quickTo(el, 'scale', { duration: speed, ease: 'power2.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rotY = (px - 0.5) * 2 * max
      const rotX = -(py - 0.5) * 2 * max
      xTo(rotY); yTo(rotX); sTo(scale)
    }
    const onLeave = () => {
      xTo(0); yTo(0); sTo(1)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, max, scale, speed])
}
