import { Link } from 'react-router-dom'
import { clients, type Client } from '@/data/clients'
import { ocularBiobank } from '@/data/caseStudies'
import { cn } from '@/lib/utils'

const tileClassName =
  'flex min-w-[220px] md:min-w-[260px] shrink-0 flex-col items-start justify-between gap-5 border-r border-border px-7 py-6'

function TileContent({ client }: { client: Client }) {
  return (
    <>
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
        {client.href && (
          <span className="ink-link mt-3 text-[0.8rem] text-text">Case study</span>
        )}
      </div>
    </>
  )
}

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={ariaHidden ? 'true' : undefined}>
      {clients.map((client, i) => {
        const key = `${client.name}-${i}`
        if (client.href) {
          return (
            <Link
              key={key}
              to={client.href}
              tabIndex={ariaHidden ? -1 : undefined}
              className={cn(tileClassName, 'group/tile transition-colors hover:bg-bg')}
            >
              <TileContent client={client} />
            </Link>
          )
        }
        return (
          <div key={key} className={tileClassName}>
            <TileContent client={client} />
          </div>
        )
      })}
    </div>
  )
}

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-14 md:py-16 overflow-x-clip">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 mb-8 md:mb-10">
        <p className="eyebrow mb-5">In circulation with</p>
        <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] text-text max-w-[560px]">
          Working across healthcare, culture, mobility and hospitality.
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
          <LogoRow ariaHidden />
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

      {ocularBiobank.reference?.logoWallFootnote && (
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 mt-6">
          <p className="text-[0.8rem] text-text-muted">{ocularBiobank.reference.logoWallFootnote}</p>
        </div>
      )}
    </section>
  )
}
