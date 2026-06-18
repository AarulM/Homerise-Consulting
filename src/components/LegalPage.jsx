import { Reveal } from './Motion.jsx'

export default function LegalPage({ title, updated, children }) {
  const sections = Array.isArray(children) ? children : [children]

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(60% 50% at 50% -8%, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0) 60%), #F8F9FA',
        }}
      >
        <div className="container-x px-5 pb-6 pt-8 sm:px-8 sm:pb-8 md:pt-12 md:pb-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="animate-fade-up anim-delay-100 mt-1 text-3xl font-black tracking-tight text-navy sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="animate-fade-up anim-delay-200 mt-3 text-sm font-medium text-ink/50">
              Last updated: {updated}
            </p>
          </div>
        </div>
      </section>

      {/* Sections — each clause card slides in as you scroll */}
      <section className="px-5 pb-12 pt-4 sm:px-8 sm:pb-16 sm:pt-6 md:pb-20 md:pt-8">
        <div className="container-x px-5 sm:px-8">
          <div className="mx-auto max-w-3xl space-y-5">
            {sections.map((child, i) => (
              <Reveal key={i} from="bottom" delay={i * 45}>
                <div className="rounded-2xl border border-navy/8 bg-white p-7 shadow-card sm:p-8
                  [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy
                  [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink/70
                  [&_a]:font-semibold [&_a]:text-electric
                  [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-base [&_ul]:text-ink/70">
                  {child}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
