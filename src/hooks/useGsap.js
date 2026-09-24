import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGsapReveal — apply a staggered ScrollTrigger reveal to a list of elements.
 * Pass a ref to the parent container. All children with the [data-reveal]
 * attribute will be animated in with a stagger.
 *
 * Usage:
 *   const root = useRef(null)
 *   useGsapReveal(root, { stagger: 0.08, y: 28 })
 *   <div ref={root}>
 *     <div data-reveal>...</div>
 *     <div data-reveal>...</div>
 *   </div>
 */
export function useGsapReveal(ref, opts = {}) {
  const optsRef = useRef(opts)
  optsRef.current = opts

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-reveal]', root)
      if (!items.length) return

      items.forEach((el) => {
        gsap.set(el, { opacity: 0, y: optsRef.current.y ?? 32, scale: 0.96 })
      })

      ScrollTrigger.create({
        trigger: root,
        start: optsRef.current.start ?? 'top 82%',
        once: optsRef.current.once ?? true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: optsRef.current.duration ?? 0.9,
            ease: optsRef.current.ease ?? 'power4.out',
            stagger: optsRef.current.stagger ?? 0.1,
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ref])
}

/**
 * useGsapParallax — apply a subtle vertical parallax to elements with
 * [data-parallax] inside the container.
 */
export function useGsapParallax(ref, speed = 0.2) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray('[data-parallax]', root)
      layers.forEach((layer) => {
        const factor = parseFloat(layer.dataset.parallax) || speed
        gsap.to(layer, {
          y: () => -factor * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [ref, speed])
}
