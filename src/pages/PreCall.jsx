import { Reveal } from '../components/Motion.jsx'

const expect = [
  {
    title: 'A look at your current setup',
    body: "We'll quickly review how you generate jobs today and where leads are slipping through the cracks.",
  },
  {
    title: 'Your custom growth plan',
    body: "We'll map out exactly how we'd run your Facebook ads and qualify leads to hit 6–8 booked jobs per month.",
  },
  {
    title: 'Straight numbers',
    body: 'Realistic targets, timeline, and investment — so you know precisely what to expect before you commit to anything.',
  },
  {
    title: 'No pressure',
    body: "If we're not the right fit, we'll tell you. The call is about a plan, not a hard sell.",
  },
]

export default function PreCall() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(60% 50% at 50% -8%, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0) 60%), #F8F9FA',
      }}
    >
      <div className="container-x px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10 md:pb-20">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-sm sm:px-4 sm:text-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-electric text-[10px] font-bold text-white sm:h-5 sm:w-5 sm:text-[11px]">2</span>
              Step 2 of 2
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-2xl font-black leading-tight tracking-tight text-navy sm:text-3xl md:text-4xl lg:text-5xl">
              Watch This Before Our Call
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink/70 sm:text-lg md:text-xl">
              3 minute video. Check your email for the meeting link.
            </p>
          </Reveal>
        </div>

        {/* Video embed */}
        <Reveal from="scale" delay={100} className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <div className="rounded-2xl border border-navy/10 bg-white p-2.5 shadow-card-hover sm:p-4">
            <div
              id="vsl-video"
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-navy"
            >
              <div className="text-center">
                <button
                  type="button"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-electric text-white shadow-cta transition-transform duration-200 hover:scale-105 sm:h-16 sm:w-16"
                  aria-label="Play video"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 sm:h-7 sm:w-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="mt-3 text-xs font-medium text-white/60 sm:mt-4 sm:text-sm">Video will load here</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-ink/50 sm:text-sm">
            Just 3 minutes — it'll make our call twice as valuable.
          </p>
        </Reveal>

        {/* What to expect */}
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <Reveal>
            <h2 className="text-center text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
              What to expect on the call
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 sm:mt-8">
            {expect.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} from="bottom">
                <div className="h-full rounded-2xl border border-navy/10 bg-white p-5 shadow-card sm:p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-sm font-extrabold text-electric sm:h-10 sm:w-10 sm:text-base">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-navy sm:mt-4 sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70 sm:mt-2 sm:text-base">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal from="bottom" delay={120}>
            <div className="mt-6 rounded-2xl bg-navy p-5 text-center text-white/80 shadow-card sm:mt-8 sm:p-6 md:p-8">
              <p className="text-sm sm:text-base">
                <span className="font-bold text-white">Can't find the meeting link?</span> Check your
                spam folder, then reply to our confirmation email and we'll resend it right away.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
