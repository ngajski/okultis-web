import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProceduralGroundBackground from '@/components/ProceduralGroundBackground'

const stagger = {
  animate: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const glowIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.9 },
  },
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen pt-[72px] overflow-hidden"
    >
      <ProceduralGroundBackground />

      {/* Sigil rings - mystical entrance */}
      <motion.div
        className="absolute left-1/2 top-1/2 pointer-events-none -z-[5]"
        initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
        animate={{
          opacity: [0, 0.12, 0],
          scale: [0.2, 1.4, 1.8],
          rotate: [0, 45, 90],
        }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.1 }}
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          className="-translate-x-1/2 -translate-y-1/2"
        >
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
          />
          <circle
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.3"
            strokeDasharray="4 16"
          />
          <circle
            cx="300"
            cy="300"
            r="160"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            strokeDasharray="1 8"
          />
          <circle
            cx="300"
            cy="300"
            r="100"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.4"
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-[1120px] mx-auto px-6"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-[720px]">
          <motion.h1
            className="font-bold leading-[1.1] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            variants={fadeUp}
          >
            Okultis builds AI systems
            <br />
            <motion.span
              className="text-accent inline-block"
              initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
              animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.8,
              }}
            >
              and custom software.
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-text-muted mb-10 max-w-[560px]"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}
            variants={fadeUp}
          >
            Okultis is a software company in Zagreb that designs products,
            engineers platforms, and turns ambitious ideas into real digital
            products.
          </motion.p>
          <motion.div variants={glowIn}>
            <Link
              to="/contact"
              className="inline-block px-9 py-3.5 bg-accent text-white font-semibold rounded-[12px] transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
