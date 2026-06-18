import { useEffect, useRef, useState } from 'react'

const HIDDEN = {
  bottom: 'translate-y-8 opacity-0',
  top: '-translate-y-6 opacity-0',
  left: '-translate-x-10 opacity-0',
  right: 'translate-x-10 opacity-0',
  scale: 'scale-[0.94] opacity-0',
}
const SHOWN = 'translate-y-0 translate-x-0 scale-100 opacity-100'

/**
 * Reveal — slides/fades children in when they scroll into view.
 * from: 'bottom' | 'top' | 'left' | 'right' | 'scale'
 */
export function Reveal({ children, className = '', delay = 0, from = 'bottom', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        // No disconnect — keep watching so elements animate back out
        // when scrolled past and animate back in when scrolled back down.
        setShown(entry.isIntersecting)
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? SHOWN : (HIDDEN[from] ?? HIDDEN.bottom)
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

/**
 * Counter — counts up from `from` to `to` once it scrolls into view.
 */
export function Counter({ to, from = 0, duration = 1600, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(from)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(from + (to - from) * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [from, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
