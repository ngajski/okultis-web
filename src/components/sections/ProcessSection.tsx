import SectionFrame from '@/components/ui/SectionFrame'
import { processSteps } from '@/data/process'

export default function ProcessSection() {
  return (
    <SectionFrame
      id="process"
      label="How we work"
      title={
        <>
          From blank page{' '}
          <span className="display-italic">to running system.</span>
        </>
      }
    >
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20">
        {processSteps.map((step) => (
          <li key={step.number} className="flex gap-6">
            <span className="mono text-[0.78rem] tracking-[0.18em] text-accent pt-2 shrink-0">
              0{step.number}
            </span>
            <div>
              <h3 className="display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] text-text mb-4">
                {step.title}
              </h3>
              <p className="text-text-soft text-[0.98rem] leading-[1.7] max-w-[42ch]">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionFrame>
  )
}
