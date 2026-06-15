const expect = [
  {
    title: 'A look at your current setup',
    body: 'We\'ll quickly review how you generate jobs today and where leads are slipping through the cracks.',
  },
  {
    title: 'Your custom growth plan',
    body: 'We\'ll map out exactly how we\'d run your Facebook ads and qualify leads to hit 6–8 booked jobs per month.',
  },
  {
    title: 'Straight numbers',
    body: 'Realistic targets, timeline, and investment — so you know precisely what to expect before you commit to anything.',
  },
  {
    title: 'No pressure',
    body: 'If we\'re not the right fit, we\'ll tell you. The call is about a plan, not a hard sell.',
  },
]

export default function PreCall() {
  return (
    <section className="bg-subtle">
      <div className="container-x px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-electric text-[11px] font-bold text-white">2</span>
            Step 2 of 2
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
            Watch This Before Our Call
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70 sm:text-xl">
            3 minute video. Check your email for the meeting link.
          </p>
        </div>

        {/* Video embed */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-2xl border border-navy/10 bg-white p-3 shadow-card-hover sm:p-4">
            {/* VSL video embed code goes inside this div */}
            <div
              id="vsl-video"
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-navy"
            >
              <div className="text-center">
                <button
                  type="button"
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-electric text-white shadow-cta transition-transform duration-200 hover:scale-105"
                  aria-label="Play video"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="mt-4 text-sm font-medium text-white/60">Video will load here</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-ink/50">
            ⏱ Just 3 minutes — it'll make our call twice as valuable.
          </p>
        </div>

        {/* What to expect */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-navy">
            What to expect on the call
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {expect.map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/10 text-base font-extrabold text-electric">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/70">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-navy p-6 text-center text-white/80 shadow-card md:p-8">
            <p className="text-base">
              <span className="font-bold text-white">Can't find the meeting link?</span> Check your
              spam folder, then reply to our confirmation email and we'll resend it right away.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
