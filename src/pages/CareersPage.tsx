import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ApplicationForm from '@/components/ApplicationForm'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
}

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers -- Okultis</title>
        <meta
          name="description"
          content="Join the Okultis team. We are a small, focused software engineering studio building products for ambitious clients."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://okultis.com/careers" />
      </Helmet>

      <motion.div
        className="pt-[calc(72px+80px)] pb-24 relative"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
          <motion.p variants={fadeUp} className="eyebrow mb-6">
            Careers
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="display text-[clamp(2.6rem,6.5vw,4.2rem)] leading-[0.98] text-text max-w-[16ch]"
          >
            A small room.{' '}
            <span className="display-italic">A long bench.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[52ch] text-text-soft text-[1.05rem] md:text-[1.15rem] leading-[1.6]"
          >
            We hire people who care about the details, ship with intent, and
            treat craft like a habit -- not a deadline concern. Most of the
            team touches design, code, and client conversation in the same
            week.
          </motion.p>

          {/* Values */}
          <motion.section variants={fadeUp} className="mt-24">
            <p className="eyebrow mb-10">What we value</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {VALUES.map((value) => (
                <div key={value.title}>
                  <h3 className="display text-[1.4rem] leading-[1.05] text-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-soft text-[0.92rem] leading-[1.6]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Positions + application */}
          <motion.div
            variants={fadeUp}
            className="mt-24 grid grid-cols-12 gap-10 md:gap-16 items-start"
          >
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow mb-10">Open positions</p>

              <Position
                role="Product Manager"
                meta="Zagreb / Remote · Freelance / B2B"
                summary="Bridge the gap between clients and engineering teams. Run discovery workshops, translate business requirements into actionable specs, own the product backlog, and drive delivery of custom software projects from kickoff to launch."
                bullets={[
                  'Lead client discovery to understand goals, map processes, and define project scope',
                  'Translate requirements into user stories, acceptance criteria, and technical specs',
                  'Own the backlog and prioritize across multiple client projects',
                  'Coordinate between clients, designers, and engineers to keep delivery on track',
                ]}
                requirements={[
                  '5+ years of product management in custom software delivery',
                  "Bachelor's degree in a relevant field",
                  'Hands-on experience working directly with external clients',
                  'Strong negotiation -- pushing back politely to protect the team',
                  'Calm under pressure; you manage timelines without passing stress down',
                ]}
              />

              <div className="mt-16">
                <h3 className="display text-[1.5rem] leading-[1.05] text-text mb-3">
                  Didn't see your role?
                </h3>
                <p className="text-text-soft text-[0.95rem] leading-[1.7] max-w-[48ch]">
                  We are always interested in talented people. Send us your
                  story -- what you build, what you want to build next, and
                  what a good day at work looks like to you.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5">
              <p className="eyebrow mb-10">Apply</p>
              <ApplicationForm positions={OPEN_POSITIONS} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

function Position({
  role,
  meta,
  summary,
  bullets,
  requirements,
}: {
  role: string
  meta: string
  summary: string
  bullets: string[]
  requirements: string[]
}) {
  return (
    <article className="pb-12 border-b border-border-soft">
      <header className="flex items-baseline justify-between mb-5 gap-4 flex-wrap">
        <h3 className="display text-[clamp(1.6rem,2.6vw,2rem)] leading-[1.05] text-text">
          {role}
        </h3>
        <span className="text-[0.85rem] text-text-muted">
          {meta}
        </span>
      </header>

      <p className="text-text-soft text-[1rem] leading-[1.7] mb-8 max-w-[64ch]">
        {summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="eyebrow mb-4">What you'll do</p>
          <ul className="space-y-2.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-baseline gap-3 text-[0.92rem] text-text leading-[1.65]"
              >
                <span className="text-accent shrink-0">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Requirements</p>
          <ul className="space-y-2.5">
            {requirements.map((r) => (
              <li
                key={r}
                className="flex items-baseline gap-3 text-[0.92rem] text-text leading-[1.65]"
              >
                <span className="text-accent shrink-0">—</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

interface ValueDef {
  title: string
  description: string
}

const VALUES: ValueDef[] = [
  {
    title: 'Motivation',
    description:
      'We look for people who bring energy and genuine enthusiasm to the work. That drive is what lifts the whole team.',
  },
  {
    title: 'Curiosity',
    description:
      'The best people on the team are always learning. We make space for that growth.',
  },
  {
    title: 'Ownership',
    description:
      'Everyone on the team owns outcomes, not just tasks. You ship it, you support it.',
  },
  {
    title: 'Craft',
    description:
      'We take pride in the details. Quality is a habit, not a deadline concern.',
  },
]

const OPEN_POSITIONS: string[] = ['Product Manager', 'Open Application']
