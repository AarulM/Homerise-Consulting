import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import confetti from 'canvas-confetti'
import { X, Check, CalendarCheck2, ArrowLeft } from 'lucide-react'
import { Reveal } from '../components/Motion.jsx'
import CalendlyEmbed from '../components/CalendlyEmbed.jsx'
import { confirmBooking, runReminderChecks } from '../lib/email.js'

const points = [
  '30 minutes, fully focused on your business',
  'No pitch — just a clear, actionable plan',
  'A realistic target for booked jobs per month',
  "Honest answer on whether we're a fit",
]

const PREQUAL_KEY = 'homerise_prequal'

/* ─── Pre-qualification gate ────────────────────────────────────────────── */

const REVENUE_OPTIONS = [
  { label: 'Under $250K', value: 'under_250k', disqualify: true },
  { label: '$250K – $500K', value: '250k_500k' },
  { label: '$500K – $1M', value: '500k_1m' },
  { label: '$1M+', value: '1m_plus' },
]

const LEAD_SOURCE_OPTIONS = [
  { label: 'Mainly referrals', value: 'referrals' },
  { label: 'Running some ads', value: 'ads' },
  { label: 'Door-to-door / events', value: 'door_to_door' },
  { label: 'Struggling to get enough', value: 'struggling' },
]

function OptionButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-navy/15 px-4 py-3 text-sm font-medium text-heading transition-all hover:border-electric hover:bg-electric/5 hover:text-electric active:scale-[0.98]"
    >
      {children}
    </button>
  )
}

function BackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-ink/50 transition-colors hover:text-electric"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
      Back
    </button>
  )
}

function StepDots({ current, total }) {
  return (
    <div className="mt-5 flex justify-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? 'w-6 bg-electric' : i < current ? 'w-1.5 bg-electric/40' : 'w-1.5 bg-ink/20'
          }`}
        />
      ))}
    </div>
  )
}

function PreQualForm({ onQualified }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    revenue: '', revenueLabel: '',
    leadSource: '', leadSourceLabel: '',
    city: '', email: '',
  })
  const [disqualified, setDisqualified] = useState(null)

  // Skip form if user already qualified on a previous visit
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PREQUAL_KEY) || 'null')
      if (stored?.qualified) onQualified(stored)
    } catch {}
  }, [onQualified])

  function handleRevenue(opt) {
    if (opt.disqualify) {
      setDisqualified('too_small')
      return
    }
    setAnswers((a) => ({ ...a, revenue: opt.value, revenueLabel: opt.label }))
    setStep(2)
  }

  function handleLeadSource(opt) {
    setAnswers((a) => ({ ...a, leadSource: opt.value, leadSourceLabel: opt.label }))
    setStep(3)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { city, email } = answers
    if (!city.trim() || !email.trim()) return

    const qualified = {
      ...answers,
      city: city.trim(),
      email: email.trim(),
      qualified: true,
      submittedAt: Date.now(),
    }
    localStorage.setItem(PREQUAL_KEY, JSON.stringify(qualified))
    onQualified(qualified)
  }

  if (disqualified === 'not_roofer') {
    return (
      <div className="rounded-2xl border border-navy/10 bg-surface p-6 shadow-card sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Not quite the right fit</p>
        <p className="mt-2 text-base font-bold text-heading">We work exclusively with roofing contractors.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          If that changes or you know a roofer who'd benefit, send them our way at homeriseconsulting.com.
        </p>
        <button
          type="button"
          onClick={() => setDisqualified(null)}
          className="mt-4 text-xs font-semibold text-electric underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          Go back
        </button>
      </div>
    )
  }

  if (disqualified === 'too_small') {
    return (
      <div className="rounded-2xl border border-navy/10 bg-surface p-6 shadow-card sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Not quite there yet</p>
        <p className="mt-2 text-base font-bold text-heading">We typically work with contractors at $250K+ in revenue.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Come back when you're ready to scale and we'd love to help. In the meantime, feel free to reach out directly.
        </p>
        <button
          type="button"
          onClick={() => setDisqualified(null)}
          className="mt-4 text-xs font-semibold text-electric underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-navy/10 bg-surface p-5 shadow-card sm:p-6">
      {step === 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Quick qualifier</p>
          <p className="mt-2 text-base font-bold text-heading">Are you a roofing contractor?</p>
          <p className="mt-1 text-sm text-ink/60">We work exclusively with roofers — this keeps the call focused and valuable.</p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-cta flex-1 py-2.5 text-sm">
              Yes, I'm a roofer
            </button>
            <button
              type="button"
              onClick={() => setDisqualified('not_roofer')}
              className="flex-1 rounded-xl border border-navy/20 py-2.5 text-sm font-semibold text-heading/60 transition-colors hover:border-navy/40 hover:text-heading/80"
            >
              No
            </button>
          </div>
          <StepDots current={0} total={4} />
        </div>
      )}

      {step === 1 && (
        <div>
          <BackLink onClick={() => setStep(0)} />
          <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Quick qualifier</p>
          <p className="mt-2 text-base font-bold text-heading">What's your approximate annual revenue?</p>
          <p className="mt-1 text-sm text-ink/60">This helps us know if we can realistically hit your targets together.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {REVENUE_OPTIONS.map((opt) => (
              <OptionButton key={opt.value} onClick={() => handleRevenue(opt)}>
                {opt.label}
              </OptionButton>
            ))}
          </div>
          <StepDots current={1} total={4} />
        </div>
      )}

      {step === 2 && (
        <div>
          <BackLink onClick={() => setStep(1)} />
          <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Quick qualifier</p>
          <p className="mt-2 text-base font-bold text-heading">How are you currently getting most of your jobs?</p>
          <p className="mt-1 text-sm text-ink/60">No right answer — just helps us prepare for the call.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {LEAD_SOURCE_OPTIONS.map((opt) => (
              <OptionButton key={opt.value} onClick={() => handleLeadSource(opt)}>
                {opt.label}
              </OptionButton>
            ))}
          </div>
          <StepDots current={2} total={4} />
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <BackLink onClick={() => setStep(2)} />
          <p className="text-[11px] font-bold uppercase tracking-widest text-electric">Almost there</p>
          <p className="mt-2 text-base font-bold text-heading">Last two questions</p>
          <p className="mt-1 text-sm text-ink/60">
            We'll confirm your call by email and make sure the call is relevant to your market.
          </p>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              required
              value={answers.city}
              onChange={(e) => setAnswers((a) => ({ ...a, city: e.target.value }))}
              placeholder="Your city / market (e.g. Seattle, WA)"
              className="w-full rounded-xl border border-navy/15 bg-subtle px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric"
            />
            <input
              type="email"
              required
              value={answers.email}
              onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
              placeholder="your@email.com — we'll send confirmation here"
              className="w-full rounded-xl border border-navy/15 bg-subtle px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric"
            />
            <button type="submit" className="btn-cta btn-shimmer w-full">
              See available times →
            </button>
          </div>
          <StepDots current={3} total={4} />
        </form>
      )}
    </div>
  )
}

/* ─── Qualified summary bar shown above calendar ────────────────────────── */

function PreQualSummary({ data, onReset }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-electric/20 bg-frost px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <Check className="h-4 w-4 flex-none text-electric" strokeWidth={2.5} />
        <p className="text-sm font-semibold text-heading">
          You're all set — pick a time below
          <span className="ml-1.5 font-normal text-ink/50">
            ({data.revenueLabel} · {data.city})
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="ml-4 flex-none text-xs font-semibold text-ink/40 underline underline-offset-2 transition-opacity hover:opacity-70"
      >
        Change
      </button>
    </div>
  )
}

/* ─── Bio modal ─────────────────────────────────────────────────────────── */

function BioModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
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
      <div className="absolute inset-0 bg-void/60 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-modal-in relative z-10 w-full max-w-md rounded-2xl bg-surface p-6 shadow-card-hover sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-navy/5 hover:text-ink/80"
        >
          <X className="h-4 w-4" />
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
            <p className="mt-0.5 text-lg font-bold text-heading">Aarul</p>
            <p className="text-sm text-ink/60">Founder, HomeRise Consulting</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-ink/75 sm:text-base">
          I'm Aarul, a student at the University of Washington who builds automation systems — AI
          sales agents, lead qualification tools, things like that. I started this agency to put
          that technical background to real use, helping roofing contractors actually grow instead
          of just running generic ad campaigns. Every system you see here is something I've built
          and tested myself.
        </p>
      </div>
    </div>
  )
}

/* ─── Full-screen success overlay ───────────────────────────────────────── */

function SuccessOverlay({ email, onClose }) {
  useEffect(() => {
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } })
    const t2 = setTimeout(
      () => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.65 } }),
      250,
    )
    const t3 = setTimeout(
      () => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.65 } }),
      450,
    )
    return () => {
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-void/70 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Booking confirmed"
    >
      <motion.div
        initial={{ scale: 0.85, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
        className="w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-card-hover sm:p-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5">
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>
        <h2 className="mt-6 text-2xl font-black tracking-tight text-heading">You're booked!</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
          Your 30-minute strategy call is confirmed.
          {email
            ? ` A confirmation is on its way to ${email}, along with reminders before the call.`
            : ' Check your inbox for the calendar invite.'}
        </p>
        <button type="button" onClick={onClose} className="btn-cta btn-shimmer mt-7 w-full">
          Done
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Book() {
  const [bioOpen, setBioOpen] = useState(false)
  const [prequalData, setPrequalData] = useState(null)
  const [booked, setBooked] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)

  // Send any due confirmation / 24h / 1h reminders for stored bookings
  useEffect(() => {
    runReminderChecks()
  }, [])

  function handleScheduled() {
    setBooked(true)
    setOverlayOpen(true)
    if (prequalData?.email) confirmBooking(prequalData.email, 'book_page').catch(() => {})
  }

  function handleReset() {
    localStorage.removeItem(PREQUAL_KEY)
    setPrequalData(null)
  }

  return (
    <>
      <section
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(70% 50% at 50% -8%, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0) 60%), rgb(var(--color-paper))',
        }}
      >
        <div className="container-x px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
          {/* Page header */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-up text-3xl font-black leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl">
              Book Your Free Strategy Call
            </h1>
            <p className="animate-fade-up anim-delay-200 mx-auto mt-4 max-w-xl text-base text-ink/70 sm:text-lg md:text-xl">
              30 minutes. No pitch. Just a plan for 6–8 more jobs per month.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl space-y-5 sm:mt-10 sm:space-y-6">
            {/* Host + what you'll get */}
            <Reveal from="bottom" delay={100}>
              <div className="rounded-2xl border border-navy/10 bg-surface p-5 shadow-card sm:p-8">
                <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
                  <div className="flex flex-col items-center gap-3 text-center md:items-start md:border-r md:border-navy/10 md:pr-8 md:text-left">
                    <img
                      src="/headshot.png"
                      alt="Aarul, HomeRise Consulting"
                      className="h-20 w-20 flex-none rounded-full object-cover object-top shadow-card ring-2 ring-white sm:h-24 sm:w-24"
                      style={{ objectPosition: '50% 25%' }}
                    />
                    <button
                      type="button"
                      onClick={() => setBioOpen(true)}
                      className="text-xs font-semibold text-electric underline underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      About Aarul
                    </button>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-electric sm:text-xs">
                        Your call is with
                      </p>
                      <p className="text-base font-bold text-heading sm:text-lg">Aarul</p>
                      <p className="text-xs text-ink/60 sm:text-sm">
                        Founder &amp; Owner, HomeRise Consulting
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-heading sm:text-lg">What you'll walk away with</h2>
                    <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                      {points.map((p, i) => (
                        <Reveal key={p} as="li" from="left" delay={i * 80}>
                          <span className="flex items-start gap-2.5 sm:gap-3">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-electric sm:h-5 sm:w-5" strokeWidth={2.5} />
                            <span className="text-sm text-ink/80 sm:text-base">{p}</span>
                          </span>
                        </Reveal>
                      ))}
                    </ul>
                    <Reveal from="bottom" delay={200}>
                      <div className="mt-4 rounded-xl bg-frost p-3.5 text-xs leading-relaxed text-ink/70 sm:mt-5 sm:p-4 sm:text-sm">
                        <span className="font-semibold text-heading">Our guarantee:</span> if we take
                        you on and miss the target, we work free until we hit it.
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

            {/* Pre-qual form or qualified summary */}
            <Reveal from="bottom" delay={140}>
              {prequalData ? (
                <PreQualSummary data={prequalData} onReset={handleReset} />
              ) : (
                <PreQualForm onQualified={setPrequalData} />
              )}
            </Reveal>

            {/* Calendar — only rendered after qualification */}
            {prequalData && (
              <Reveal from="bottom" delay={160}>
                <div
                  id="booking-calendar"
                  className="scroll-mt-28 rounded-2xl border border-navy/10 bg-surface p-2.5 shadow-card sm:p-5"
                >
                  <div className="w-full overflow-hidden rounded-xl">
                    <CalendlyEmbed
                      email={prequalData.email}
                      customAnswers={{
                        a1: 'Yes – roofing contractor',
                        a2: prequalData.revenueLabel || '',
                        a3: prequalData.leadSourceLabel || '',
                        a4: prequalData.city || '',
                      }}
                      height={700}
                      onScheduled={handleScheduled}
                    />
                  </div>
                </div>
              </Reveal>
            )}

            {booked && (
              <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-green-500/25 bg-green-500/5 px-5 py-4">
                <CalendarCheck2 className="h-5 w-5 flex-none text-green-600" />
                <p className="text-sm font-semibold text-heading">
                  Booking confirmed{prequalData?.email ? ` — details sent to ${prequalData.email}` : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {bioOpen && <BioModal onClose={() => setBioOpen(false)} />}

      <AnimatePresence>
        {overlayOpen && (
          <SuccessOverlay email={prequalData?.email} onClose={() => setOverlayOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
