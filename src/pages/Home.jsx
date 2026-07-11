import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import {
  Megaphone,
  Filter,
  Search,
  MapPin,
  MousePointerClick,
  Bot,
  Share2,
  Globe,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem, Magnetic, Parallax, DrawCheck } from '../components/Motion.jsx'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion.jsx'

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
    points: ['Copy + creative done for you', 'Targeting dialed to your service area', 'Live in days, not weeks'],
    aside: 'Campaigns live in days — homeowners in your service area see your ads first.',
  },
  {
    n: '02',
    title: 'Leads get qualified automatically before reaching you',
    body: 'Every lead runs through our qualification funnel — budget, timeline, property and intent — so tire-kickers get filtered out before they ever hit your phone.',
    points: ['Budget + timeline screened', 'Property type verified', 'Only serious homeowners get through'],
    aside: 'Tire-kickers filtered automatically. Your phone only rings for real jobs.',
  },
  {
    n: '03',
    title: 'You show up and close',
    body: 'Booked appointments land on your calendar with the homeowner already warmed up and expecting your call. You do what you do best — close the job.',
    points: ['Appointments straight to your calendar', 'Homeowner expecting your call', 'You just close'],
    aside: 'Warm, qualified appointments on your calendar. You close, we keep filling it.',
  },
]

const services = [
  {
    title: 'Facebook Ad Campaigns',
    body: 'Done-for-you ad creative, copy, and targeting built to put your roofing business in front of homeowners ready to buy. The engine of the whole system.',
    icon: Megaphone,
    span: 2,
  },
  {
    title: 'Lead Qualification Funnels',
    body: 'Automated screening that filters out tire-kickers so only serious, budget-ready homeowners reach your phone.',
    icon: Filter,
  },
  {
    title: 'AI Voice Agents',
    body: 'An AI agent that answers and qualifies inbound calls 24/7 so you never miss a lead again.',
    icon: Bot,
  },
  {
    title: 'SEO & Google Ranking',
    body: 'Climb the local search results so homeowners find you first.',
    icon: Search,
  },
  {
    title: 'Google Business Profile',
    body: 'A review-rich profile that wins the map pack and drives free local calls.',
    icon: MapPin,
  },
  {
    title: 'Google Ads Management',
    body: 'High-intent search campaigns that capture homeowners looking to hire right now.',
    icon: MousePointerClick,
  },
  {
    title: 'Social Media Management',
    body: 'Consistent, professional posting that keeps your roofing brand top of mind.',
    icon: Share2,
  },
  {
    title: 'Website Development',
    body: 'Fast, modern, mobile-first sites engineered to turn visitors into booked estimates.',
    icon: Globe,
  },
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

/** Subtle floating particles for the final CTA */
function Particles({ count = 18 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.12 + Math.random() * 0.3,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="animate-float absolute rounded-full bg-electric"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* --------------------------------- Page ---------------------------------- */

export default function Home() {
  return (
    <>
      {/* ============================== HERO ============================== */}
      <section
        className="relative flex min-h-screen flex-col justify-center overflow-hidden"
        style={{
          background:
            'radial-gradient(70% 50% at 50% -8%, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0) 60%), rgb(var(--color-paper))',
        }}
      >
        <div className="container-x relative z-10 px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-36 md:pb-20">
          <Parallax distance={40}>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mx-auto max-w-5xl text-4xl font-black leading-[1.04] tracking-tight text-heading sm:text-6xl md:text-7xl lg:text-8xl"
            >
              More booked roofing jobs.
              <br />
              <span className="text-gradient">Less chasing leads.</span>
            </motion.h1>
          </Parallax>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg md:text-xl"
          >
            We run done-for-you Facebook ad campaigns exclusively for roofing contractors —
            qualifying leads before they hit your phone so every appointment is easier to close.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <Link
                to="/book"
                className="btn-cta btn-shimmer w-full px-7 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4"
              >
                Book a Strategy Call
              </Link>
            </Magnetic>
            <a href="#how-it-works" className="btn-secondary w-full px-7 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4">
              See how it works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 text-xs font-medium text-ink/50 sm:text-sm"
          >
            30-minute call · No pitch · Just a plan for more booked jobs
          </motion.p>

          {/* Stat cards */}
          <div id="results" className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5 sm:scroll-mt-24">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 + i * 0.12 }}
                className="rounded-2xl border border-navy/10 bg-surface p-5 text-left shadow-card sm:p-6"
              >
                <div className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">{s.value}</div>
                <div className="mt-2 text-sm font-bold text-ink/80 sm:text-base">{s.label}</div>
                <div className="mt-1 text-xs text-ink/55 sm:text-sm">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================== */}
      <section id="how-it-works" className="section scroll-mt-24 bg-paper">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How It Works</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl">
                Three steps from kickoff to closed jobs
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                No dashboards to learn. No ads to babysit. We handle the machine — you handle the roofs.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 space-y-20 sm:space-y-28">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`relative grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Giant decorative number */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-14 select-none text-[9rem] font-black leading-none tracking-tighter text-heading/[0.045] sm:-top-20 sm:text-[13rem] ${
                    i % 2 === 1 ? 'right-0' : 'left-0'
                  }`}
                >
                  {step.n}
                </span>

                <Reveal from={i % 2 === 1 ? 'right' : 'left'}>
                  <div className="relative">
                    <span className="text-sm font-black tracking-[0.25em] text-electric">STEP {step.n}</span>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">{step.body}</p>
                    <ul className="mt-6 space-y-3">
                      {step.points.map((p, j) => (
                        <li key={p} className="flex items-center gap-3">
                          <DrawCheck className="h-5 w-5 flex-none text-electric" delay={j * 120} />
                          <span className="text-sm font-medium text-ink/75 sm:text-base">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal from={i % 2 === 1 ? 'left' : 'right'} delay={120}>
                  <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-frost p-8 shadow-card sm:p-10">
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)' }}
                    />
                    <span className="text-7xl font-black tracking-tighter text-electric/15 sm:text-8xl">
                      {step.n}
                    </span>
                    <p className="mt-4 text-lg font-bold leading-snug text-heading sm:text-xl">{step.aside}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== A NOTE FROM THE FOUNDER ==================== */}
      <section className="section bg-surface">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-3xl border border-navy/10 bg-surface shadow-card">
                <div className="border-b border-navy/10 bg-frost px-6 py-5 sm:px-10">
                  <span className="eyebrow mb-0">A note from the founder</span>
                </div>
                <div className="px-6 py-8 sm:px-10 sm:py-10">
                  <div className="flex items-center gap-4">
                    <img
                      src="/headshot.png"
                      alt="Aarul, founder of HomeRise Consulting"
                      className="h-16 w-16 flex-none rounded-full object-cover shadow-card ring-2 ring-electric/15 sm:h-20 sm:w-20"
                      style={{ objectPosition: '50% 25%' }}
                    />
                    <div>
                      <p className="text-lg font-bold text-heading">Aarul</p>
                      <p className="text-sm text-ink/60">Founder &amp; Owner, HomeRise Consulting</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80 sm:text-lg">
                    <p>
                      I'm Aarul. I build automation systems for a living — AI sales agents, lead
                      qualification tools, the works. I started HomeRise to put that technical edge
                      to work for roofers, instead of running the same tired ad campaigns every
                      other agency sells.
                    </p>
                    <p>
                      When you work with HomeRise, you work with{' '}
                      <span className="font-semibold text-heading">me</span> — not a junior account
                      manager three layers removed from your account. Every system on this page is
                      something I built and tested myself.
                    </p>
                    <p>
                      And if we're not the right fit, I'll tell you that on the call. I'd rather
                      keep my calendar honest than waste your afternoon.
                    </p>
                  </div>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[
                      'You work directly with the founder',
                      'Roofing-only — not a general agency',
                      'Systems built & tested in-house',
                      'Backed by a no-risk guarantee',
                    ].map((point, i) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <DrawCheck className="mt-0.5 h-5 w-5 flex-none text-electric" delay={i * 100} />
                        <span className="text-sm font-medium text-ink/80 sm:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-navy/10 pt-6 sm:flex-row sm:items-center">
                    <p className="font-serif text-2xl italic text-heading">— Aarul</p>
                    <Link to="/book" className="btn-cta btn-shimmer px-6 py-3 text-sm sm:text-base">
                      Book a call with Aarul
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== SERVICES BENTO GRID ====================== */}
      <section id="services" className="section scroll-mt-24 bg-paper">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Services</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl">
                Everything your roofing business needs to grow
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                Lead generation is the core. The rest is here when you're ready to dominate your market.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {services.map((svc) => {
              const Icon = svc.icon
              return (
                <StaggerItem key={svc.title} className={svc.span === 2 ? 'sm:col-span-2' : ''}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-heading transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-heading sm:text-lg">{svc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{svc.body}</p>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ======================== GUARANTEE STATEMENT ==================== */}
      <section className="section bg-surface">
        <div className="container-x">
          <Reveal from="scale">
            <div className="border-sweep grain relative overflow-hidden rounded-3xl bg-void px-6 py-16 text-center sm:px-12 sm:py-24">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(70% 90% at 50% 110%, rgba(37,99,235,0.22) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-electric sm:text-sm">
                  Our guarantee
                </p>
                <p className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
                  If we don't hit your target, we keep working{' '}
                  <span className="text-gradient">free</span> until we do.
                </p>
                <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
                  {['You own your ad account', 'No long-term contract', 'Cancel anytime'].map((g, i) => (
                    <span key={g} className="flex items-center gap-2.5 text-sm font-semibold text-white/70 sm:text-base">
                      <DrawCheck className="h-5 w-5 flex-none text-electric" delay={i * 150} />
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ PRICING ============================ */}
      <section id="pricing" className="section scroll-mt-24 bg-paper">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Pricing</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl">
                One plan. Everything included.
              </h2>
              <p className="mt-4 text-base text-ink/70 sm:text-lg">
                No tiers, no upsells to unlock results. One flat monthly investment, fully guaranteed.
              </p>
            </div>
          </Reveal>

          <Reveal from="scale" delay={120}>
            <div className="grain relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl bg-void shadow-card-hover">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(60% 80% at 20% 0%, rgba(37,99,235,0.18) 0%, transparent 55%)',
                }}
              />
              <div className="relative z-10 grid md:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <span className="inline-flex items-center rounded-full bg-electric px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-cta">
                    Growth Plan
                  </span>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">$3,000</span>
                    <span className="mb-1.5 text-lg font-semibold text-white/50">/month</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                    Done-for-you Facebook ads + lead qualification, built to add 6–8 booked roofing
                    jobs every month.
                  </p>
                  <Magnetic className="mt-8 block">
                    <Link to="/book" className="btn-cta btn-shimmer w-full">
                      Book a Strategy Call
                    </Link>
                  </Magnetic>
                  <p className="mt-4 text-center text-xs text-white/40 sm:text-sm">
                    No long-term contract · Cancel anytime
                  </p>
                </div>

                <div className="border-t border-white/10 p-8 sm:p-10 md:border-l md:border-t-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/35 sm:text-sm">
                    What's included
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {included.map((item, i) => (
                      <li key={item} className="flex items-start gap-3">
                        <DrawCheck className="mt-0.5 h-5 w-5 flex-none text-electric" delay={i * 90} />
                        <span className="text-sm text-white/75 sm:text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section id="faq" className="section scroll-mt-24 bg-surface">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl">
                What roofing contractors ask us first
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-0"
              className="mx-auto mt-10 max-w-3xl space-y-3 sm:space-y-4"
            >
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <span className="flex items-baseline gap-4">
                      <span className="flex-none text-sm font-black tabular-nums text-electric/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-bold text-heading sm:text-base lg:text-lg">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-9 text-sm leading-relaxed text-ink/70 sm:text-base">{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* =========================== FINAL CTA =========================== */}
      <section className="section bg-paper">
        <div className="container-x">
          <Reveal from="scale">
            <div className="grain relative overflow-hidden rounded-3xl bg-void px-6 py-16 text-center sm:px-8 sm:py-24">
              <Particles />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(80% 120% at 50% 0%, rgba(37,99,235,0.20) 0%, transparent 55%)',
                }}
              />
              <div className="relative z-10">
                <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to add 6–8 more jobs per month?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
                  Book a free 30-minute strategy call. We'll map out exactly how we'd fill your
                  calendar — no pitch, no pressure.
                </p>
                <div className="mt-9">
                  <Magnetic>
                    <Link to="/book" className="btn-cta btn-shimmer px-8 py-4 text-base sm:text-lg">
                      Book a Strategy Call
                    </Link>
                  </Magnetic>
                </div>
                <p className="mt-5 text-xs font-medium text-white/35 sm:text-sm">
                  Backed by our guarantee — if we miss the target, we work free until we hit it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
