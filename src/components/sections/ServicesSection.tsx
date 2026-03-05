import type { ReactNode } from 'react'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'
import { services } from '@/data/services'

export default function ServicesSection() {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <section id="services" className="py-[100px] md:py-[72px]">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          What we do
        </h2>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-[600ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-bg-card border border-border rounded-[12px] p-9 transition-all duration-300 hover:-translate-y-1 hover:border-accent group">
      <div className="mb-5">{icon}</div>
      <h3 className="text-[1.2rem] font-semibold mb-3">{title}</h3>
      <p className="text-text-muted text-[0.95rem] leading-[1.65]">{description}</p>
    </div>
  )
}
