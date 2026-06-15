export default function LegalPage({ title, updated, children }) {
  return (
    <section className="bg-white">
      <div className="container-x px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight text-navy sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm font-medium text-ink/50">Last updated: {updated}</p>
          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/75 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mb-2 [&_a]:font-semibold [&_a]:text-electric [&_ul]:mt-2 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
