import { Link } from 'react-router-dom'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'
import { ocularBiobank } from '@/data/caseStudies'

export default function SelectedWorkSection() {
  const { ref, isVisible } = useScrollFadeIn()
  const { teaser, path } = ocularBiobank

  return (
    <section id="work" className="relative py-16 md:py-20">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible
              ? 'opacity-100 blur-0 translate-y-0'
              : 'opacity-0 blur-[4px] translate-y-4'
          }`}
        >
          <p className="eyebrow mb-5">{teaser.eyebrow}</p>
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] max-w-[560px] text-text">
              {teaser.title}
            </h2>
            <Link to={path} className="ink-link text-text">
              <span>{teaser.linkLabel}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
