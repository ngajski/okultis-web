import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ClientsSection from '@/components/sections/ClientsSection'
import ContactFormSection from '@/components/sections/ContactFormSection'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Okultis',
  url: 'https://okultis.com',
  email: 'hello@okultis.com',
  logo: 'https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zavrtnica 17',
    addressLocality: 'Zagreb',
    addressCountry: 'HR',
  },
  sameAs: ['https://www.linkedin.com/in/nikola-gajski/'],
}

const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI & Intelligent Systems',
    description:
      'We build AI agents and adapt them to your specific business needs. RAG pipelines, multi-agent workflows, and frontier models -integrated into your existing tools and processes to deliver real operational value.',
    provider: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Software Engineering',
    description:
      'Full-stack applications engineered for scale. APIs, real-time systems, and data-intensive platforms -built with disciplined architecture and shipped on time.',
    provider: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Product Design',
    description:
      'Interfaces shaped by research and tested with real users. From AI-native UX patterns to complete design systems -we design products people want to use.',
    provider: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cloud & Platform Engineering',
    description:
      'Production-grade infrastructure from day one. CI/CD pipelines, container orchestration, observability, and cost optimization -so your team ships faster without firefighting.',
    provider: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' },
  },
]

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Okultis - From Fiction to Reality</title>
        <meta
          name="description"
          content="Okultis delivers AI systems, software engineering, product design, and cloud platform engineering to turn your boldest ideas into reality."
        />
        <meta property="og:title" content="Okultis - From Fiction to Reality" />
        <meta
          property="og:description"
          content="AI systems, software engineering, product design, and cloud platform engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://okultis.com" />
        <meta
          property="og:image"
          content="https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp"
        />
        <script type="application/ld+json">
          {JSON.stringify([organizationSchema, ...serviceSchemas])}
        </script>
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <ContactFormSection />
    </>
  )
}
