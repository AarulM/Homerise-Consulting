import { useEffect } from 'react'

const points = [
  '30 minutes, fully focused on your business',
  'No pitch — just a clear, actionable plan',
  'A realistic target for booked jobs per month',
  'Honest answer on whether we\'re a fit',
]

const GHL_EMBED_SRC = 'https://link.msgsndr.com/js/form_embed.js'

export default function Book() {
  useEffect(() => {
    // Load GoHighLevel embed script once so the calendar iframe auto-resizes.
    if (document.querySelector(`script[src="${GHL_EMBED_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = GHL_EMBED_SRC
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <section className="bg-subtle">
      <div className="container-x px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Free strategy call</span>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-navy sm:text-5xl">
            Book Your Free Strategy Call
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70 sm:text-xl">
            30 minutes. No pitch. Just a plan for 6–8 more jobs per month.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-7">
          {/* Host + what you'll get — compact strip on top */}
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-7 md:grid-cols-[260px_1fr] md:gap-10">
              {/* Host */}
              <div className="flex items-center gap-4 md:items-start md:border-r md:border-navy/10 md:pr-8">
                <img
                  src="/headshot.png"
                  alt="Aarul, HomeRise Consulting"
                  className="h-16 w-16 flex-none rounded-full object-cover object-top shadow-card ring-2 ring-white md:h-20 md:w-20"
                  style={{ objectPosition: '50% 25%' }}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-electric">Your call is with</p>
                  <p className="text-lg font-bold text-navy">Aarul</p>
                  <p className="text-sm text-ink/60">Founder &amp; Owner, HomeRise Consulting</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-lg font-bold text-navy">What you'll walk away with</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 flex-none text-electric" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base text-ink/80">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-subtle p-4 text-sm leading-relaxed text-ink/70">
                  <span className="font-semibold text-navy">Our guarantee:</span> if we take you on and
                  miss the target, we work free until we hit it.
                </div>
              </div>
            </div>
          </div>

          {/* Calendar embed — full width so time slots open beside the date */}
          <div className="rounded-2xl border border-navy/10 bg-white p-3 shadow-card sm:p-5">
            <div id="ghl-calendar" className="w-full overflow-hidden rounded-xl">
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
        </div>
      </div>
    </section>
  )
}
