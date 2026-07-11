import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

const OFFSETS = {
  bottom: { y: 32, x: 0 },
  top: { y: -24, x: 0 },
  left: { y: 0, x: -40 },
  right: { y: 0, x: 40 },
  scale: { y: 0, x: 0, scale: 0.94 },
}

/**
 * Reveal — fades/slides children in once they enter the viewport.
 * from: 'bottom' | 'top' | 'left' | 'right' | 'scale'
 */
export function Reveal({ children, className = '', delay = 0, from = 'bottom', as = 'div' }) {
  const offset = OFFSETS[from] ?? OFFSETS.bottom
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -48px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </Tag>
  )
}

/**
 * Stagger — container that animates children in sequence (100ms apart).
 * Wrap items in <StaggerItem>.
 */
export function Stagger({ children, className = '', delay = 0, gap = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -48px 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay / 1000 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', from = 'bottom' }) {
  const offset = OFFSETS[from] ?? OFFSETS.bottom
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.7, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * SplitText — splits text into characters that spring in one by one.
 */
export function SplitText({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const chars = Array.from(text)
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.025, delayChildren: delay / 1000 } },
      }}
      aria-label={text}
      role="text"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, y: 26, rotateX: -40 },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 320, damping: 26 },
            },
          }}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * Counter — eases a number up from `from` to `to` when scrolled into view.
 * Accepts decimals; formats with toLocaleString.
 */
export function Counter({ to, from = 0, duration = 1.6, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, from, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

/**
 * Magnetic — child subtly follows the cursor while hovered.
 */
export function Magnetic({ children, className = '', strength = 0.25 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 20 })
  const sy = useSpring(y, { stiffness: 260, damping: 20 })

  function onMove(e) {
    if (reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax — shifts children vertically as the page scrolls past them.
 */
export function Parallax({ children, className = '', distance = 60 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yRange = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div ref={ref} style={{ y: reduced ? 0 : yRange }} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * DrawCheck — checkmark that draws itself when scrolled into view.
 */
export function DrawCheck({ className = '', delay = 0 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <motion.path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -24px 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: delay / 1000 }}
      />
    </svg>
  )
}

export { motion, EASE }
