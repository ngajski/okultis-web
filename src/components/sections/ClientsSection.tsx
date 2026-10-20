import { clients } from '@/data/clients'
import { cn } from '@/lib/utils'

function LogoRow() {
  return (
    <div className="flex shrink-0">
      {clients.map((client, i) => (
        <div
          key={`${client.name}-${i}`}
          className="flex min-w-[220px] md:min-w-[260px] shrink-0 flex-col items-start justify-between gap-5 border-r border-border px-7 py-6"
        >
          <div className="flex h-16 md:h-20 items-center">
            <img
              src={client.src}
              alt={client.name}
              width={140}
              height={48}
              loading="eager"
              decoding="async"
              className={cn(
                'h-12 sm:h-14 md:h-16 w-auto shrink-0 object-contain grayscale',
                client.invertOnLight
                  ? 'brightness-0 dark:brightness-100'
                  : 'dark:brightness-0 dark:invert',
                client.className
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text">{client.name}</p>
            <p className="eyebrow mt-1">{client.sector}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-14 md:py-16 overflow-x-clip">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 mb-8 md:mb-10">
        <p className="eyebrow mb-5">In circulation with</p>
        <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] text-text max-w-[560px]">
          Trusted across healthcare, culture, mobility and hospitality.
        </h2>
      </div>

      <div
        className="group relative overflow-hidden border-y border-border bg-bg-elev"
        aria-label="Client logos"
      >
        <div
          className="flex w-max group-hover:[animation-play-state:paused]!"
          style={{
            animation: 'marquee-scroll var(--marquee-duration, 55s) linear infinite',
            willChange: 'transform',
          }}
        >
          <LogoRow />
          <LogoRow />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
          style={{
            background:
              'linear-gradient(to right, var(--color-bg-elev) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
          style={{
            background:
              'linear-gradient(to left, var(--color-bg-elev) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
