import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

/**
 * PageTransition — wraps page content and plays an "out-of-the-box" entrance
 * animation on every route change:
 *   1. Whole page fades in
 *   2. Subtle scale-up + slight Y movement
 *   3. A quick blur-to-sharp transition
 *
 * IMPORTANT: After the animation completes, we reset `filter: none` so it
 * doesn't create a persistent stacking context that would trap modals
 * (ProduceModal, AuthModal) below the header.
 */
export default function PageTransition({ children }) {
  const ref = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up — remove filter so it doesn't trap child modals
        gsap.set(el, { clearProps: 'filter' })
      },
    })
    tl.set(el, { filter: 'blur(12px)', opacity: 0, scale: 0.98, y: 16 })
      .to(el, {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

    return () => { tl.kill() }
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
