import { Helmet } from 'react-helmet-async'
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
  sameAs: ['https://www.linkedin.com/in/nikola-gajski/'],
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

      <div className="pt-[calc(72px+60px)] pb-20">
        <div className="w-full max-w-[1120px] mx-auto px-6">
          <h1
            className="font-bold tracking-[-0.02em] mb-2"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Let&apos;s talk
          </h1>
          <p className="text-text-muted text-[1.05rem] mb-12">
            Have a project in mind? Drop us a message and we&apos;ll get back to
            you within 24 hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  )
}
