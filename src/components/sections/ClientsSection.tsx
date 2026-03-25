import { clients } from '@/data/clients'

export default function ClientsSection() {
  // Duplicate the logo set for a seamless infinite scroll loop
  const duplicatedClients = [...clients, ...clients]

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
        className="overflow-x-clip w-full group"
        aria-label="Client logos"
      >
        <div
          className="flex gap-12 w-max"
          style={{
            animation: 'marquee-scroll var(--marquee-duration, 40s) linear infinite',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.alt}-${index}`}
              className="flex-none flex items-center h-[60px]"
            >
              <img
                src={client.src}
                alt={client.alt}
                width={160}
                height={48}
                loading='lazy'
                decoding='async'
                className={`max-h-[48px] w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 ${client.invertOnLight ? 'brightness-0 dark:brightness-100' : 'dark:brightness-0 dark:invert'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
