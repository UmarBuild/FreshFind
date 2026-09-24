import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollToTop — scrolls to the top of the page on every route change.
 * Also refreshes ScrollTrigger so animations stay aligned with the new layout.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Defer ScrollTrigger refresh to ensure layout is settled
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [pathname])

  return null
}