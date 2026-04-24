import type { ReactNode } from 'react'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface SectionFrameProps {
  id?: string
  label?: string
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Editorial frame for homepage sections. Minimal: a quiet eyebrow,
 * a display heading, optional subtitle, then content. No hairline rule,
 * no chapter numbers — typography and whitespace carry the rhythm.
 */
export default function SectionFrame({
  id,
  label,
  title,
  subtitle,
  children,
  className = '',
}: SectionFrameProps) {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <section id={id} className={`relative py-28 md:py-40 ${className}`}>
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible
              ? 'opacity-100 blur-0 translate-y-0'
              : 'opacity-0 blur-[4px] translate-y-4'
          }`}
        >
          <header className="mb-16 md:mb-24 max-w-[32ch]">
            {label && <p className="eyebrow mb-5">{label}</p>}
            <h2 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-text">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-6 max-w-[48ch] text-text-soft text-[1.05rem] leading-[1.65]">
                {subtitle}
              </p>
            )}
          </header>

          {children}
        </div>
      </div>
    </section>
  )
}
