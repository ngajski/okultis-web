import { clients } from '@/data/clients'

function LogoSet() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {clients.map((client) => (
        <img
          key={client.alt}
          src={client.src}
          alt={client.alt}
          width={160}
          height={48}
          loading="lazy"
          decoding="async"
          className={`h-[48px] w-auto shrink-0 object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 ${client.invertOnLight ? 'brightness-0 dark:brightness-100' : 'dark:brightness-0 dark:invert'}`}
        />
      ))}
    </div>
  )
}

export default function ClientsSection() {
  return (
    <section id="clients" className="py-[100px] md:py-[72px] overflow-x-clip">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Trusted by
        </h2>
      </div>
      {/* Full-width marquee, not constrained to the container */}
      <div
        className="overflow-x-clip w-full"
        aria-label="Client logos"
      >
        <div
          className="flex w-max"
          style={{
            animation: 'marquee-scroll var(--marquee-duration, 40s) linear infinite',
            willChange: 'transform',
          }}
        >
          <LogoSet />
          <LogoSet />
        </div>
      </div>
    </section>
  )
}
