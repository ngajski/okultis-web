import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ClientsSection from '@/components/sections/ClientsSection'
import ContactFormSection from '@/components/sections/ContactFormSection'

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
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <ContactFormSection />
    </>
  )
}
