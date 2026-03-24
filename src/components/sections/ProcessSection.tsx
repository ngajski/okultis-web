import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'
import { processSteps } from '@/data/process'

export default function ProcessSection() {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <section id="process" className="py-[100px] md:py-[72px]">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          How we work
        </h2>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`relative transition-all duration-[600ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Vertical connector line */}
          <div className="absolute left-[23px] top-10 bottom-10 w-px bg-border hidden md:block" />

          <div className="grid grid-cols-1 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="flex gap-6 items-start"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Number badge */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,119,182,0.1)]">
                  <span className="text-accent font-semibold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-bg-card border border-border rounded-[12px] p-6 flex-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40">
                  <h3 className="text-[1.1rem] font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-[0.95rem] leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
