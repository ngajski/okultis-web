import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

export default function AboutSection() {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <section id="about" className="py-[100px] md:py-[72px]">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Who we are
        </h2>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`max-w-[680px] transition-all duration-[600ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-text-muted text-[1.05rem] mb-4">
            Okultis is a boutique digital studio that partners with startups and
            small to medium-sized companies to ship software that matters. From
            first concept to live product, we handle the entire lifecycle - code,
            design, strategy, and infrastructure - and deliver MVPs in a matter
            of weeks.
          </p>
          <p className="text-text-muted text-[1.05rem]">
            Based in Croatia and working globally, our team blends engineering
            precision with creative thinking to deliver solutions that look
            great and perform even better.
          </p>
        </div>
      </div>
    </section>
  )
}
