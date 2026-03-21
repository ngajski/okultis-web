import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Okultis',
  url: 'https://okultis.com',
  email: 'hello@okultis.com',
  image: 'https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zavrtnica 17',
    addressLocality: 'Zagreb',
    addressCountry: 'HR',
  },
  location: {
    '@type': 'Place',
    name: 'WESPA Spaces',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zavrtnica 17',
      addressLocality: 'Zagreb',
      addressCountry: 'HR',
    },
  },
  sameAs: ['https://www.linkedin.com/company/okultis-it'],
}

const veilVariants = {
  initial: { clipPath: 'circle(0% at 50% 40%)' },
  animate: {
    clipPath: 'circle(150% at 50% 40%)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - Okultis</title>
        <meta
          name="description"
          content="Get in touch with Okultis. Visit us at WESPA Spaces, Zagreb or send us a message."
        />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
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
            Let&apos;s talk
          </motion.h1>
          <motion.p
            className="text-text-muted text-[1.05rem] mb-12"
            variants={fadeUp}
          >
            Have a project in mind? Drop us a message and we&apos;ll get back to
            you within 24 hours.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            variants={fadeUp}
          >
            <ContactForm />
            <ContactInfo />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
