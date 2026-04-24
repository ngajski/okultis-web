import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
}

const wordIn = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE },
  },
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center min-h-[100svh] pt-[72px] pb-16 overflow-hidden"
    >
      <motion.div
        className="relative w-full max-w-[1120px] mx-auto px-6 md:px-10"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <h1 className="display text-[clamp(3rem,10vw,7.5rem)] text-text max-w-[14ch]">
          <motion.span className="block overflow-hidden">
            <motion.span className="block" variants={wordIn}>
              From fiction,
            </motion.span>
          </motion.span>
          <motion.span className="block overflow-hidden">
            <motion.span
              className="display-italic block"
              variants={wordIn}
              transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            >
              to reality.
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-12 md:mt-14 max-w-[46ch] text-text-soft text-[1.1rem] md:text-[1.2rem] leading-[1.6]"
        >
          A boutique studio building AI systems, custom software, and product
          design for teams that treat shipping like a craft.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-14 md:mt-16 flex flex-wrap items-center gap-8"
        >
          <Link to="/contact" className="btn-accent">
            <span>Start a project</span>
            <span aria-hidden>→</span>
          </Link>
          <a href="#services" className="ink-link text-text">
            <span>See what we do</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
