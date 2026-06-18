import { useEffect, useState } from 'react'
import { Reveal } from '../components/Motion.jsx'

const points = [
  '30 minutes, fully focused on your business',
  'No pitch — just a clear, actionable plan',
  'A realistic target for booked jobs per month',
  'Honest answer on whether we\'re a fit',
]

const GHL_EMBED_SRC = 'https://link.msgsndr.com/js/form_embed.js'

function BioModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="animate-backdrop-in fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="About Aarul"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="animate-modal-in relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-card-hover sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-navy/5 hover:text-ink/80"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex items-start gap-4">
          <img
            src="/headshot.png"
            alt="Aarul"
            className="h-14 w-14 flex-none rounded-full object-cover ring-2 ring-electric/20"
            style={{ objectPosition: '50% 25%' }}
          />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-electric">About</p>
            <p className="mt-0.5 text-lg font-bold text-navy">Aarul</p>
            <p className="text-sm text-ink/60">Founder, HomeRise Consulting</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink/75 sm:text-base">
          I'm Aarul, a student at the University of Washington who builds automation systems —
          AI sales agents, lead qualification tools, things like that. I started this agency to
          put that technical background to real use, helping roofing contractors actually grow
          instead of just running generic ad campaigns. Every system you see here is something
          I've built and tested myself.
        </p>
      </div>
    </div>
  )
}

export default function Book() {
  const [bioOpen, setBioOpen] = useState(false)

  useEffect(() => {
    if (document.querySelector(`script[src="${GHL_EMBED_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = GHL_EMBED_SRC
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <section
        className="bg-subtle"
        style={{
          background:
            'radial-gradient(70% 50% at 50% -8%, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0) 60%), #F8F9FA',
        }}
      >
        <div className="container-x px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10 md:pb-16">

          {/* Page header */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-up text-3xl font-black leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
              Book Your Free Strategy Call
            </h1>
            <p className="animate-fade-up anim-delay-200 mx-auto mt-4 max-w-xl text-base text-ink/70 sm:text-lg md:text-xl">
              30 minutes. No pitch. Just a plan for 6–8 more jobs per month.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl space-y-5 sm:mt-10 sm:space-y-6">

            {/* Host + what you'll get */}
            <Reveal from="bottom" delay={100}>
              <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card sm:p-8">
                <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">

                  {/* Host */}
                  <div className="flex flex-col items-center gap-3 text-center md:items-start md:border-r md:border-navy/10 md:pr-8 md:text-left">
                    <img
                      src="/headshot.png"
                      alt="Aarul, HomeRise Consulting"
                      className="h-20 w-20 flex-none rounded-full object-cover object-top shadow-card ring-2 ring-white sm:h-24 sm:w-24"
                      style={{ objectPosition: '50% 25%' }}
                    />
                    {/* About Aarul link — sits directly under the photo */}
                    <button
                      type="button"
                      onClick={() => setBioOpen(true)}
                      className="text-xs font-semibold text-electric underline underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      About Aarul
                    </button>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-electric sm:text-xs">Your call is with</p>
                      <p className="text-base font-bold text-navy sm:text-lg">Aarul</p>
                      <p className="text-xs text-ink/60 sm:text-sm">Founder &amp; Owner, HomeRise Consulting</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h2 className="text-base font-bold text-navy sm:text-lg">What you'll walk away with</h2>
                    <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                      {points.map((p, i) => (
                        <Reveal key={p} as="li" from="left" delay={i * 80} className="flex items-start gap-2.5 sm:gap-3">
                          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-none text-electric sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-ink/80 sm:text-base">{p}</span>
                        </Reveal>
                      ))}
                    </ul>
                    <Reveal from="bottom" delay={200}>
                      <div className="mt-4 rounded-xl bg-subtle p-3.5 text-xs leading-relaxed text-ink/70 sm:mt-5 sm:p-4 sm:text-sm">
                        <span className="font-semibold text-navy">Our guarantee:</span> if we take you on and
                        miss the target, we work free until we hit it.
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Policy note */}
            <Reveal from="bottom" delay={80}>
              <p className="text-center text-xs font-medium text-ink/50 sm:text-sm">
                Please show up on time — we keep our calendar tight to respect everyone's schedule.
              </p>
            </Reveal>

            {/* Calendar embed */}
            <Reveal from="bottom" delay={160}>
              <div id="booking-calendar" className="rounded-2xl border border-navy/10 bg-white p-2.5 shadow-card sm:p-5">
                <div className="w-full overflow-hidden rounded-xl">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/LFgiAcxKBxdWk0qJW6uq"
                    title="Book a strategy call with HomeRise Consulting"
                    className="block w-full"
                    style={{ border: 'none', minHeight: '760px' }}
                    scrolling="no"
                    id="LFgiAcxKBxdWk0qJW6uq_1781557740998"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {bioOpen && <BioModal onClose={() => setBioOpen(false)} />}
    </>
  )
}
