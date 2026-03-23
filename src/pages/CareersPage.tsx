import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Gem, Shield, MessageCircle, Sparkles } from 'lucide-react'
import ApplicationForm from '@/components/ApplicationForm'

const veilVariants = {
  initial: { clipPath: 'circle(0% at 50% 40%)' },
  animate: {
    clipPath: 'circle(150% at 50% 40%)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers - Okultis</title>
        <meta
          name="description"
          content="Join the Okultis team. We are a small, focused software engineering studio building products for ambitious clients."
        />
      </Helmet>

      <motion.div
        className="pt-[calc(72px+60px)] pb-20 relative"
        variants={veilVariants}
        initial="initial"
        animate="animate"
      >
        {/* Sigil ring - pulses once and fades */}
        <motion.div
          className="absolute left-1/2 pointer-events-none"
          style={{ top: '40%' }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.15, 0],
            scale: [0.3, 1.2, 1.6],
          }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
        >
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.3"
              strokeDasharray="8 12"
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        <motion.div
          className="w-full max-w-[1120px] mx-auto px-6 relative"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="font-bold tracking-[-0.02em] mb-2"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            variants={fadeUp}
          >
            Work with us
          </motion.h1>
          <motion.p className="text-text-muted text-[1.05rem] mb-12" variants={fadeUp}>
            We are a small, focused team. If you care deeply about craft and want to build things
            that matter, we would love to hear from you.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-[1.15rem] font-semibold text-text mb-5">What we value</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALUES.map((value) => (
                <div key={value.title} className="border border-border rounded-[12px] p-4">
                  <div className="text-accent text-lg mb-2">{value.icon}</div>
                  <h3 className="text-[0.95rem] font-medium text-text mb-1">{value.title}</h3>
                  <p className="text-[0.85rem] text-text-muted leading-[1.6]">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            variants={fadeUp}
          >
            {/* Left column - open positions */}
            <div>
              <h2 className="text-[1.15rem] font-semibold text-text mb-4">Open positions</h2>

              {/* Product Manager listing */}
              <div className="border border-border rounded-[12px] p-5 mb-4">
                <h3 className="text-[1.05rem] font-semibold text-text mb-1">Product Manager / Business Analyst</h3>
                <p className="text-[0.8rem] text-text-muted mb-4">Zagreb / Remote &middot; Freelance / B2B contract</p>
                <p className="text-[0.95rem] text-text-muted leading-[1.7] mb-4">
                  We are looking for someone to bridge the gap between our clients and engineering teams.
                  You will run discovery workshops, gather and translate business requirements into actionable
                  specs, own the product backlog, and drive delivery of custom software projects from
                  kickoff to launch.
                </p>
                <h4 className="text-[0.9rem] font-medium text-text mb-2">What you will do</h4>
                <ul className="space-y-2 mb-5">
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Lead client discovery sessions to understand business goals, map processes, and define project scope
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Translate business requirements into user stories, acceptance criteria, and technical specifications
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Own the product backlog and prioritize work across multiple client projects
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Coordinate between clients, designers, and engineers to keep delivery on track
                  </li>
                </ul>
                <h4 className="text-[0.9rem] font-medium text-text mb-2">Requirements</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    3+ years of experience in product management, business analysis, or a similar role in custom software delivery
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Hands-on experience working directly with external clients - gathering requirements, managing expectations, and presenting deliverables
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Bachelor's degree in a relevant field
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Strong written and verbal communication skills
                  </li>
                  <li className="flex gap-3 text-[0.95rem] text-text-muted leading-[1.7]">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    Comfortable working with cross-functional engineering and design teams in an agile environment
                  </li>
                </ul>
              </div>

              {/* Open Application */}
              <div className="border border-border rounded-[12px] p-5">
                <h3 className="text-[1.05rem] font-semibold text-text mb-1">Open Application</h3>
                <p className="text-[0.95rem] text-text-muted leading-[1.7]">
                  Don't see your role listed? We are always interested in talented people. Send us your
                  application and tell us what you bring.
                </p>
              </div>
            </div>

            {/* Right column - application form */}
            <div>
              <h2 className="text-[1.15rem] font-semibold text-text mb-6">Apply</h2>
              <ApplicationForm positions={OPEN_POSITIONS} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

interface Value {
  icon: React.ReactNode
  title: string
  description: string
}

const VALUES: Value[] = [
  {
    icon: <Gem className="w-5 h-5" />,
    title: 'Craft',
    description: 'We write code we are proud to sign. Quality is a habit, not a deadline concern.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Ownership',
    description:
      'Everyone on the team owns outcomes, not just tasks. You ship it, you support it.',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Clarity',
    description:
      'We communicate directly and document decisions. No politics, no ambiguity left to fester.',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Curiosity',
    description:
      'The best engineers on the team are always learning. We make space for that growth.',
  },
]

const OPEN_POSITIONS: string[] = [
  'Product Manager / Business Analyst',
  'Open Application',
]
