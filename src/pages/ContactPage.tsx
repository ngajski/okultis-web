import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

const EASE = [0.22, 1, 0.36, 1] as const

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

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact -- Okultis</title>
        <meta
          name="description"
          content="Get in touch with Okultis. Send us a message and we'll reply within 24 hours."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://okultis.com/contact" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <motion.div
        className="pt-[calc(72px+80px)] pb-24 relative"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
          <motion.p variants={fadeUp} className="eyebrow mb-6">
            Contact
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="display text-[clamp(2.6rem,6.5vw,4.2rem)] text-text leading-[0.98] max-w-[18ch]"
          >
            Write to us.{' '}
            <span className="display-italic">
              We answer every note.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[52ch] text-text-soft text-[1.05rem] md:text-[1.15rem] leading-[1.6]"
          >
            New projects, old code looking for a second opinion, or just a
            question. It all lands in the same inbox, and it all gets a reply
            within 24 hours on weekdays.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-20 md:mt-24 grid grid-cols-12 gap-10 md:gap-16 items-start"
          >
            <div className="col-span-12 md:col-span-7">
              <ContactForm />
            </div>
            <div className="col-span-12 md:col-span-5">
              <ContactInfo />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
