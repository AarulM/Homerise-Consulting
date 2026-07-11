import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Magnetic } from '../components/Motion.jsx'

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-5 text-center">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="mesh-blob mesh-blob-1 left-[15%] top-[20%] h-[36vw] w-[36vw] min-h-[280px] min-w-[280px]" />
        <div className="mesh-blob mesh-blob-2 bottom-[15%] right-[10%] h-[32vw] w-[32vw] min-h-[240px] min-w-[240px]" />
      </div>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient text-8xl font-black tracking-tighter sm:text-9xl"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          This page fell off the roof.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-3 max-w-md text-base text-white/55"
        >
          The page you're looking for doesn't exist — but a plan for 6–8 more booked jobs a month
          does.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <Link to="/" className="btn-cta btn-shimmer">
              Back to home
            </Link>
          </Magnetic>
          <Link to="/book" className="btn-ghost-dark">
            Book a Strategy Call
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
