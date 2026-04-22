import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import EngagementsSection from "@/components/sections/EngagementsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactFormSection from "@/components/sections/ContactFormSection";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Okultis",
  url: "https://okultis.com",
  email: "hello@okultis.com",
  logo: "https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zavrtnica 17",
    addressLocality: "Zagreb",
    addressCountry: "HR",
  },
  sameAs: ["https://www.linkedin.com/company/okultis-it"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Okultis",
  url: "https://okultis.com",
  description:
    "Okultis is a software company building AI systems, custom software, product design, and cloud platforms.",
};

const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI & Intelligent Systems",
    description:
      "We build AI agents and adapt them to your specific business needs. RAG pipelines, multi-agent workflows, and frontier models integrated into your existing tools and processes. From automating repetitive workflows to replacing entire manual pipelines, we deliver real operational value.",
    provider: {
      "@type": "Organization",
      name: "Okultis",
      url: "https://okultis.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Software Engineering & Consulting",
    description:
      "We engineer the systems behind ambitious products. Real-time platforms, high-throughput APIs, and complex integrations. Secure by default, built with modern tooling, and delivered fast enough to keep pace with your roadmap.",
    provider: {
      "@type": "Organization",
      name: "Okultis",
      url: "https://okultis.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Product Design",
    description:
      "Design that drives adoption, not just looks good. User research, rapid prototyping, and iterative testing to find what works. From AI-native interaction patterns to full design systems built for product teams that move fast.",
    provider: {
      "@type": "Organization",
      name: "Okultis",
      url: "https://okultis.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud & Platform Engineering",
    description:
      "We build infrastructure your team and your legal department can trust. CI/CD pipelines, container orchestration, observability, and cost optimization. Tech stack audits, architecture advisory, and compliance with local regulations baked in from the start.",
    provider: {
      "@type": "Organization",
      name: "Okultis",
      url: "https://okultis.com",
    },
  },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Okultis · AI & Software Solutions for Modern Businesses</title>
        <meta
          name="description"
          content="Okultis delivers tailored AI and software solutions, digital products, and cloud platforms that improve efficiency, unlock growth, and create lasting business value."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://okultis.com/" />
        <meta
          property="og:title"
          content="Okultis · AI & Software Solutions for Modern Businesses"
        />
        <meta
          property="og:description"
          content="Okultis delivers tailored AI and software solutions, digital products, and cloud platforms that improve efficiency, unlock growth, and create lasting business value."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://okultis.com" />
        <meta property="og:site_name" content="Okultis" />
        <meta
          property="og:image"
          content="https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Okultis · AI & Software Solutions for Modern Businesses"
        />
        <meta
          name="twitter:description"
          content="Okultis delivers tailored AI and software solutions, digital products, and cloud platforms that improve efficiency, unlock growth, and create lasting business value."
        />
        <meta
          name="twitter:image"
          content="https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp"
        />
        <script type="application/ld+json">
          {JSON.stringify([
            organizationSchema,
            websiteSchema,
            ...serviceSchemas,
          ])}
        </script>
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <EngagementsSection />
      <ClientsSection />
      <ContactFormSection />
    </>
  );
}
