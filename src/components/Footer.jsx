import { Link } from 'react-router-dom'

export default function Footer() {
  const year = 2026
  return (
    <footer className="border-t border-navy/10 bg-navy text-white/80">
      <div className="container-x px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
                <img src="/logo.png" alt="" className="h-full w-full object-contain" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                HomeRise Consulting
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Done-for-you Facebook ad campaigns built exclusively for roofing contractors.
              More booked jobs, less time chasing leads.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="/#how-it-works" className="transition-colors hover:text-white">How it Works</a></li>
                <li><a href="/#services" className="transition-colors hover:text-white">Services</a></li>
                <li><a href="/#faq" className="transition-colors hover:text-white">FAQ</a></li>
                <li><Link to="/book" className="transition-colors hover:text-white">Book a Call</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Legal</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link to="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HomeRise Consulting. All rights reserved.</p>
          <p>Precision marketing built exclusively for the roofing industry.</p>
        </div>
      </div>
    </footer>
  )
}
