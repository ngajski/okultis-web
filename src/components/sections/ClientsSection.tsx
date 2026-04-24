import { clients } from '@/data/clients'

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-16 md:gap-20 pr-16 md:pr-20">
      {clients.map((client, i) => (
        <img
          key={`${client.alt}-${i}`}
          src={client.src}
          alt={client.alt}
          width={140}
          height={40}
          loading="lazy"
          decoding="async"
          className={`h-8 md:h-9 w-auto shrink-0 object-contain opacity-55 grayscale transition-opacity duration-500 hover:opacity-100 ${
            client.invertOnLight
              ? 'brightness-0 dark:brightness-100'
              : 'dark:brightness-0 dark:invert'
          }`}
        />
      ))}
    </div>
  )
}

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-20 md:py-24 overflow-x-clip">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 mb-12">
        <p className="eyebrow">In circulation with</p>
      </div>

      <div className="relative" aria-label="Client logos">
        <div
          className="flex w-max"
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
              'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
          style={{
            background:
              'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
