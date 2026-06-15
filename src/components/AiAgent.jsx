import { useState } from 'react'

export default function AiAgent() {
  const [open, setOpen] = useState(false)

  return (
    <>

      {/* Panel — slides down from the top-right corner */}
      <div
        role="dialog"
        aria-label="AI assistant"
        style={{ top: '80px', right: '20px' }}
        className={`fixed z-[60] w-[min(92vw,380px)] origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-4 translate-x-6 scale-90 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card-hover">
          {/* Header bar */}
          <div className="flex items-center justify-between bg-navy px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-electric/20 text-electric ring-1 ring-electric/40">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.8-5.4A8.5 8.5 0 1 1 21 11.5z" />
                </svg>
              </span>
              <span className="text-sm font-bold">HomeRise Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* GHL AI agent embed goes inside this div */}
          <div id="ai-agent-embed" className="h-[62vh] max-h-[560px] w-full bg-subtle" />
        </div>
      </div>
    </>
  )
}
