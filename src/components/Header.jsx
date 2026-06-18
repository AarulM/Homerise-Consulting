import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Services', href: '/#services' },
  { label: 'Results', href: '/#results' },
  { label: 'FAQ', href: '/#faq' },
]

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="HomeRise Consulting home">
      <img src="/logo-icon.png" alt="" className="h-9 w-9 flex-none object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] sm:h-[48px] sm:w-[48px]" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-lg font-black tracking-tight text-navy sm:text-2xl">
          HomeRise <span className="font-bold text-navy/80">Consulting</span>
        </span>
        <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:text-[11px]">
          Roofing Growth Agency
        </span>
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
    // Hysteresis: 30px down to enter scrolled, 8px up to exit.
    // Prevents rapid toggling and the visible shake near the boundary.
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => (y > 30 ? true : y < 8 ? false : prev))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  function handleBookClick(e) {
    // If already on /book, scroll to the calendar instead of re-navigating to top
    if (isBook) {
      e.preventDefault()
      document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      {/* Height and padding are FIXED — only background/shadow transition on scroll.
          Changing layout-affecting properties causes the visible shake. */}
      <div
        className={`nav-glow-border animate-nav-drop container-x relative flex h-[70px] items-center justify-between rounded-full border border-white/60 px-5 ring-1 ring-navy/5 transition-[background-color,box-shadow] duration-300 ease-out sm:px-7 ${
          scrolled
            ? 'bg-white/55 shadow-[0_6px_24px_-6px_rgba(30,58,95,0.18)] backdrop-blur-2xl backdrop-saturate-150'
            : 'bg-white/70 shadow-[0_10px_44px_-8px_rgba(30,58,95,0.20),0_2px_8px_rgba(30,58,95,0.06)] backdrop-blur-xl backdrop-saturate-150'
        }`}
      >
        {/* soft top highlight for a glass sheen */}
        <span
          className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
        />
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex lg:gap-12">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/book" onClick={handleBookClick} className="btn-cta px-5 py-2.5 text-[15px]">
            Book a Strategy Call
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-card-hover backdrop-blur-2xl md:hidden">
            <nav className="flex flex-col px-5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 text-base font-bold text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link to="/book" onClick={handleBookClick} className="btn-cta mt-3">
                Book a Strategy Call
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
