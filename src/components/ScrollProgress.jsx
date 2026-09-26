import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollProgress — a thin gradient bar fixed at the very top of the viewport
 * that fills as the user scrolls down the page. Uses ScrollTrigger to update
 * smoothly with the scroll position.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: true,
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background: 'linear-gradient(90deg, #064E3B 0%, #EA580C 50%, #FB923C 100%)',
        }}
      />
    </div>
  )
}
