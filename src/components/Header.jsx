import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Typewriter from './Typewriter.jsx'

const navLinks = [
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Services', href: '/#services' },
  { label: 'Results', href: '/#results' },
  { label: 'FAQ', href: '/#faq' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="HomeRise Consulting home">
      <img src="/logo-icon.png" alt="" className="h-[52px] w-[52px] flex-none object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
      <span className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tight text-navy">
          HomeRise <span className="font-semibold text-navy/75">Consulting</span>
        </span>
        <Typewriter className="mt-1 text-xs font-semibold tracking-wide text-electric" />
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={`container-x relative flex items-center justify-between rounded-full border border-navy/10 transition-all duration-300 ease-out ${
          scrolled
            ? 'h-[58px] bg-white/75 px-4 shadow-card-hover backdrop-blur-2xl backdrop-saturate-150 sm:px-5'
            : 'h-[72px] bg-white/65 px-5 shadow-card backdrop-blur-md backdrop-saturate-150 sm:px-7'
        }`}
      >
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/book" className={`btn-cta text-[15px] transition-all duration-300 ${scrolled ? 'px-5 py-2.5' : 'px-6 py-3'}`}>
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

        {/* Thin animated gradient line under the floating header */}
        <span className="pointer-events-none absolute inset-x-5 -bottom-px h-px overflow-hidden rounded-full">
          <span className="animate-gradient-x block h-full w-full bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.9),transparent)]" />
        </span>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-card-hover backdrop-blur-2xl md:hidden">
            <nav className="flex flex-col px-5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 text-base font-semibold text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link to="/book" className="btn-cta mt-3" onClick={() => setOpen(false)}>
                Book a Strategy Call
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
