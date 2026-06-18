import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Reveal } from '../components/Motion.jsx'

/* ---------------------------------- Data --------------------------------- */

const stats = [
  { value: '6–8', label: 'booked jobs added per month', sub: 'qualified, ready-to-close appointments' },
  { value: '~14 days', label: 'from kickoff to first lead', sub: 'campaigns live and producing fast' },
  { value: '100%', label: 'you own your ad account', sub: 'your data, your audience — always' },
]

const steps = [
  {
    n: '01',
    title: 'We build and launch your Facebook ads',
    body: 'We write the copy, design the creative, and launch campaigns targeted at homeowners in your service area who need a roof — so you never touch the ads manager.',
  },
  {
    n: '02',
    title: 'Leads get qualified automatically before reaching you',
    body: 'Every lead runs through our qualification funnel — budget, timeline, property and intent — so tire-kickers get filtered out before they ever hit your phone.',
  },
  {
    n: '03',
    title: 'You show up and close',
    body: 'Booked appointments land on your calendar with the homeowner already warmed up and expecting your call. You do what you do best — close the job.',
  },
]

const services = [
  { title: 'Facebook Ad Campaigns', body: 'Done-for-you ad creative, copy, and targeting built to put your roofing business in front of homeowners ready to buy.', featured: true },
  { title: 'Lead Qualification Funnels', body: 'Automated screening that filters out tire-kickers so only serious, budget-ready homeowners reach your phone.', featured: true },
  { title: 'SEO & Google Ranking', body: 'Climb the local search results so homeowners find you first when they search for a roofer in your area.' },
  { title: 'Google Business Profile Management', body: 'A fully optimized, review-rich profile that wins the map pack and drives free local calls.' },
  { title: 'Google Ads Management', body: 'High-intent search campaigns that capture homeowners actively looking to hire a roofer right now.' },
  { title: 'AI Voice Agents', body: 'An add-on AI agent that answers and qualifies inbound calls 24/7 so you never miss a lead again.', badge: 'Add-on' },
  { title: 'Social Media Management', body: 'Consistent, professional posting that builds trust and keeps your roofing brand top of mind.' },
  { title: 'Website Development', body: 'Fast, modern, mobile-first sites engineered to turn visitors into booked estimates.' },
]

const included = [
  'Done-for-you Facebook ad campaign management',
  'Custom ad creative & copywriting',
  'Automated lead qualification funnel',
  'Appointments booked straight to your calendar',
  'Dedicated account manager & weekly reporting',
  'You keep 100% ownership of your ad account',
  'No long-term lock-in contracts',
  'Performance guarantee — we work free until we hit target',
]

const faqs = [
  {
    q: "I've been burned by marketing agencies before. How is this different?",
    a: "Fair — most agencies sell to everyone. We work exclusively with roofing contractors, so the campaigns, funnels, and messaging are already proven in your industry. On top of that, you own your ad account, there's no long-term lock-in, and we back the work with a performance guarantee. If we miss the target, we keep working for free until we hit it.",
  },
  {
    q: 'What if the leads are low quality or just tire-kickers?',
    a: "That's exactly the problem we built our funnel to solve. Every lead is screened for budget, timeline, property type, and genuine intent before it ever reaches you. You spend your time on homeowners who are actually ready to move forward — not chasing dead ends.",
  },
  {
    q: 'How fast will I actually see results?',
    a: 'Most clients have campaigns live within days of kickoff and start seeing qualified leads come through in about 14 days. Roofing has strong, consistent homeowner demand, so once the ads are dialed in the pipeline fills quickly.',
  },
  {
    q: 'Do I have to be good at tech or run the ads myself?',
    a: 'No. This is fully done-for-you. We handle the ad account, creative, targeting, and qualification end to end. Booked appointments simply show up on your calendar — you just show up and close.',
  },
  {
    q: 'Is $3,000/month really worth it for my business?',
    a: "One roofing job often covers the entire month. We aim to add 6–8 booked jobs per month, so the math typically works many times over. And because we guarantee the target, your downside is protected — if we don't deliver, we work for free until we do.",
  },
]

/* ------------------------------- Components ------------------------------- */

function Check({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-navy sm:text-base lg:text-lg">{q}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 flex-none text-electric transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 sm:px-6 sm:pb-6 sm:text-base">{a}</p>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- Page ---------------------------------- */

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section
        className="relative overflow-hidden bg-subtle"
        style={{
          background:
            'radial-gradient(75% 60% at 50% -10%, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0) 60%), #F8F9FA',
        }}
      >
        <div className="container-x px-5 pb-10 pt-12 text-center sm:px-8 sm:pb-14 sm:pt-16 md:pb-16 md:pt-20">

          <h1 className="animate-fade-up anim-delay-100 mx-auto max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
            More booked roofing jobs.{' '}
            <span className="text-electric">Less time chasing leads.</span>
          </h1>

          <p className="animate-fade-up anim-delay-200 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg md:text-xl">
            We run done-for-you Facebook ad campaigns exclusively for roofing contractors —
            qualifying leads before they hit your phone so every appointment is easier to close.
          </p>

          <div className="animate-fade-up anim-delay-300 mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/book" className="btn-cta w-full px-6 py-3 text-sm sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
              Book a Strategy Call
            </Link>
            <a href="#how-it-works" className="btn-secondary w-full px-6 py-3 text-sm sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
              See how it works
            </a>
          </div>

          <p className="animate-fade-up anim-delay-400 mt-5 text-xs font-medium text-ink/50 sm:text-sm">
            30-minute call · No pitch · Just a plan for more booked jobs
          </p>

          {/* Stat boxes */}
          <div id="results" className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5 sm:scroll-mt-24">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} from="bottom">
                <div className="h-full rounded-2xl border border-navy/10 bg-white p-5 text-left shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-7">
                  <div className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{s.value}</div>
                  <div className="mt-2 text-sm font-bold text-ink sm:text-base">{s.label}</div>
                  <div className="mt-1 text-xs text-ink/60 sm:text-sm">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= GUARANTEE BANNER ====================== */}
      <section className="px-5 py-5 sm:px-8 sm:py-6">
        <div className="container-x">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-2xl bg-navy px-5 py-7 shadow-card-hover sm:px-7 sm:py-8 md:px-12 md:py-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{ background: 'linear-gradient(110deg, #1E3A5F 0%, #234a7a 100%)' }}
              />
              <div className="relative flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-8 md:text-left">
                <div className="md:border-r md:border-white/15 md:pr-8">
                  <p className="text-3xl font-black leading-none tracking-tight text-white sm:text-4xl">100%</p>
                  <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-electric sm:text-xs">Guarantee</p>
                </div>
                <p className="max-w-xl text-lg font-semibold leading-snug text-white/90 sm:text-xl md:text-2xl">
                  If we don't hit your target, we keep working <span className="text-white">free</span> until we do.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================== */}
      <section id="how-it-works" className="section scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How It Works</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
                Three steps from kickoff to closed jobs
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                No dashboards to learn. No ads to babysit. We handle the machine — you handle the roofs.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 130} from="bottom">
                <div className="relative h-full rounded-2xl border border-navy/10 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-base font-extrabold text-electric sm:h-12 sm:w-12 sm:text-lg">
                    {step.n}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy sm:mt-6 sm:text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:mt-3 sm:text-base">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== SERVICES ============================ */}
      <section id="services" className="section scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Services</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
                Everything your roofing business needs to grow
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                Lead generation is the core. The rest is here when you're ready to dominate your market.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 55} from="bottom">
                <div
                  className={`group relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-6 ${
                    svc.featured ? 'border-electric/30 ring-1 ring-electric/20' : 'border-navy/10'
                  }`}
                >
                  {svc.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-electric sm:right-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      Core
                    </span>
                  )}
                  {svc.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy sm:right-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      {svc.badge}
                    </span>
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-electric/10 group-hover:text-electric">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy sm:mt-5 sm:text-lg">{svc.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/70 sm:mt-2 sm:text-sm">{svc.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PRICING ============================ */}
      <section id="pricing" className="section scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Pricing</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
                One plan. Everything included.
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                No tiers, no upsells to unlock results. One flat monthly investment, fully guaranteed.
              </p>
            </div>
          </Reveal>

          <Reveal from="scale" delay={120} className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-card-hover">
            <div className="grid md:grid-cols-2">
              <div className="bg-navy p-7 text-white sm:p-9 md:p-10">
                <span className="inline-flex items-center rounded-full bg-electric px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_4px_14px_rgba(37,99,235,0.45)]">
                  Growth Plan
                </span>
                <div className="mt-5 flex items-end gap-1 sm:mt-6">
                  <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">$3,000</span>
                  <span className="mb-1 text-base font-semibold text-white/60 sm:mb-1.5 sm:text-lg">/month</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
                  Done-for-you Facebook ads + lead qualification, built to add 6–8 booked roofing jobs every month.
                </p>
                <Link to="/book" className="btn-cta mt-7 w-full sm:mt-8">
                  Book a Strategy Call
                </Link>
                <p className="mt-4 text-center text-xs text-white/50 sm:text-sm">No long-term contract · Cancel anytime</p>
              </div>

              <div className="p-7 sm:p-9 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-ink/40 sm:text-sm">What's included</p>
                <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                      <Check className="mt-0.5 text-electric" />
                      <span className="text-sm text-ink/80 sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section id="faq" className="section scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
                What roofing contractors ask us first
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 65} from="bottom">
                <FaqItem
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== FINAL CTA =========================== */}
      <section className="section">
        <div className="container-x">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-3xl px-5 py-12 text-center sm:px-8 sm:py-16 md:px-12 md:py-20">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(80% 120% at 50% 0%, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0) 55%), linear-gradient(160deg, #1E3A5F 0%, #16293f 100%)',
                }}
              />
              <h2 className="mx-auto max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Ready to add 6–8 more jobs per month?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:mt-5 sm:text-lg">
                Book a free 30-minute strategy call. We'll map out exactly how we'd fill your
                calendar — no pitch, no pressure.
              </p>
              <div className="mt-7 sm:mt-9">
                <Link to="/book" className="btn-cta px-7 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg">
                  Book a Strategy Call
                </Link>
              </div>
              <p className="mt-5 text-xs font-medium text-white/50 sm:text-sm">
                Backed by our guarantee — if we miss the target, we work free until we hit it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
