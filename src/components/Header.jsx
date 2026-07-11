import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Magnetic } from './Motion.jsx'

const navLinks = [
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Services', href: '/#services' },
  { label: 'Results', href: '/#results' },
  { label: 'FAQ', href: '/#faq' },
]

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="HomeRise Consulting home">
      <img
        src="/logo-icon.png"
        alt=""
        className="h-9 w-9 flex-none object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:h-10 sm:w-10"
      />
      <span className="truncate text-base font-black tracking-tight text-white sm:text-lg">
        HomeRise <span className="font-semibold text-white/60">Consulting</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isBook = location.pathname === '/book'

  useEffect(() => {
    // Hysteresis prevents rapid toggling near the boundary
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => (y > 40 ? true : y < 10 ? false : prev))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  function handleBookClick(e) {
    if (isBook) {
      e.preventDefault()
      document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-glow-border container-x relative flex items-center justify-between rounded-full border border-white/10 px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
          scrolled ? 'h-[60px]' : 'h-[70px]'
        }`}
        style={{
          background: 'rgba(9, 9, 11, 0.72)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          boxShadow:
            '0 8px 32px rgba(9, 9, 11, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.07)',
        }}
      >
        {/* glass sheen */}
        <span
          className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
        />
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex lg:gap-10">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link text-white/65 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic strength={0.2}>
            <Link to="/book" onClick={handleBookClick} className="btn-cta btn-shimmer px-5 py-2.5 text-[15px]">
              Book a Strategy Call
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/10 shadow-card-hover md:hidden"
              style={{
                background: 'rgba(9, 9, 11, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <nav className="flex flex-col px-5 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-3 text-base font-bold text-white/80 transition-colors hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Link to="/book" onClick={handleBookClick} className="btn-cta btn-shimmer mt-3">
                  Book a Strategy Call
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
