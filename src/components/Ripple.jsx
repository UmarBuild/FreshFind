import { useRef } from 'react'

/**
 * Ripple — wraps any element to add a Material-style ripple effect on click.
 * The ripple spawns from the click position and expands to fill the element.
 *
 * Usage:
 *   <Ripple><button className="btn-primary">Click me</button></Ripple>
 *   <Ripple><Link to="...">...</Link></Ripple>
 *
 * The wrapped element must have `position: relative` and `overflow: hidden`
 * (most buttons already do via .btn-primary etc. — but Ripple adds them
 * via the wrapper class as well).
 */
export default function Ripple({ children, className = '', color = 'rgba(255,255,255,0.45)' }) {
  const ref = useRef(null)

  const handleClick = (e) => {
    const container = ref.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const span = document.createElement('span')
    span.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      transform: scale(0);
      opacity: 1;
      pointer-events: none;
      z-index: 0;
      animation: ripple-ff 0.6s ease-out forwards;
    `
    container.appendChild(span)
    setTimeout(() => span.remove(), 650)
  }

  return (
    <span
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {children}
      <style>{`
        @keyframes ripple-ff {
          to { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </span>
  )
}
