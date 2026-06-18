import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function BookingPopup() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  // Appear a few seconds after load. No auto-dismiss — it stays until the
  // user clicks the X, and returns fresh on every page refresh.
  useEffect(() => {
    if (pathname === '/book' || dismissed) return
    const t = setTimeout(() => setOpen(true), 4000)
    return () => clearTimeout(t)
  }, [pathname, dismissed])

  // Watch the LeadConnector chat widget. When its window is expanded (tall),
  // move the popup out of the way so it never covers the chatbot.
  useEffect(() => {
    const isChatOpen = () => {
      const nodes = document.querySelectorAll(
        'chat-widget, [id*="chat-widget"], [class*="chat-widget"], [id*="lc_text"], [class*="lc_text"], iframe[src*="leadconnector"], iframe[src*="msgsndr"], iframe[src*="chat-widget"]',
      )
      for (const el of nodes) {
        const r = el.getBoundingClientRect()
        // A collapsed launcher bubble is small (~60px); the open chat panel is large.
        if (r.height > 240 && r.width > 200) return true
      }
      return false
    }
    const update = () => setChatOpen(isChatOpen())
    update()
    const id = setInterval(update, 350)
    return () => clearInterval(id)
  }, [])

  const close = () => {
    setOpen(false)
    setDismissed(true)
  }

  if (pathname === '/book' || dismissed) return null

  // Hide entirely while the chat panel is open so it can never cover the chatbot.
  const visible = open && !chatOpen

  return (
    <div
      role="dialog"
      aria-label="Book a strategy call"
      className={`fixed bottom-5 left-4 right-4 z-[9999] max-w-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-auto sm:left-auto sm:right-5 sm:top-24 sm:w-[calc(100%-2.5rem)] sm:max-w-[15rem] ${
        visible
          ? 'translate-y-0 opacity-100 sm:translate-x-0'
          : 'pointer-events-none translate-y-[140%] opacity-0 sm:translate-y-0 sm:translate-x-[120%]'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy p-4 shadow-card-hover">
        {/* texture + glow */}
        <div className="bg-stripes pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45) 0%, rgba(37,99,235,0) 70%)' }}
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-1.5 top-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative">
          <p className="pr-8 text-[11px] font-extrabold uppercase tracking-[0.18em] text-electric">Free Strategy Call</p>
          <h3 className="mt-1.5 text-base font-black leading-snug tracking-tight text-white">
            Ready for 6–8 more jobs a month?
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-white/70">
            Grab a free 30-minute call — no pitch, just a clear plan to fill your calendar.
          </p>
          <Link to="/book" onClick={close} className="btn-cta mt-3.5 w-full text-sm">
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  )
}
