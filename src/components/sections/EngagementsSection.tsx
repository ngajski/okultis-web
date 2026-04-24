import { Link } from 'react-router-dom'
import SectionFrame from '@/components/ui/SectionFrame'
import { engagements } from '@/data/engagements'

export default function EngagementsSection() {
  return (
    <SectionFrame
      id="engagements"
      label="Work with us"
      title={
        <>
          Three ways we{' '}
          <span className="display-italic">show up.</span>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {engagements.map((engagement) => (
          <article key={engagement.title}>
            <h3 className="display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] text-text mb-5">
              {engagement.title}
            </h3>
            <p className="text-text-soft text-[0.98rem] leading-[1.7] mb-8">
              {engagement.description}
            </p>
            <ul className="space-y-2.5">
              {engagement.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-[0.92rem] text-text"
                >
                  <span className="text-accent shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-20 md:mt-24">
        <Link to="/contact" className="ink-link text-text">
          <span>Open a conversation</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </SectionFrame>
  )
}
