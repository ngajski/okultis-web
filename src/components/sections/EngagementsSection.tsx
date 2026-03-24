import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'
import { engagements } from '@/data/engagements'

export default function EngagementsSection() {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <section id="engagements" className="py-[100px] md:py-[72px]">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Work with us
        </h2>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-[600ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {engagements.map((engagement) => (
            <EngagementCard
              key={engagement.title}
              icon={engagement.icon}
              title={engagement.title}
              description={engagement.description}
              highlights={engagement.highlights}
            />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link
            to="/contact"
            className="text-accent border border-accent rounded-full px-8 py-3 text-sm font-medium transition-colors duration-300 hover:bg-accent hover:text-white"
          >
            Let's talk
          </Link>
        </div>
      </div>
    </section>
  )
}

interface EngagementCardProps {
  icon: LucideIcon
  title: string
  description: string
  highlights: string[]
}

function EngagementCard({ icon: Icon, title, description, highlights }: EngagementCardProps) {
  return (
    <div className="bg-bg-card border border-border rounded-[12px] p-9 transition-all duration-300 hover:-translate-y-1 hover:border-accent group flex flex-col">
      <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,119,182,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,119,182,0.2)] group-hover:border-accent/40">
        <Icon size={28} className="text-accent" />
      </div>
      <h3 className="text-[1.2rem] font-semibold mb-3">{title}</h3>
      <p className="text-text-muted text-[0.95rem] leading-[1.65] mb-5">{description}</p>
      <ul className="mt-auto space-y-2">
        {highlights.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[0.9rem] text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
