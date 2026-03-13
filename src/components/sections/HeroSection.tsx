import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'

const ProceduralGroundBackground = lazy(
  () => import('@/components/ProceduralGroundBackground')
)

function HeroBackgroundFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 70%),
          var(--color-bg)
        `,
      }}
    />
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen pt-[72px] overflow-hidden"
    >
      <Suspense fallback={<HeroBackgroundFallback />}>
        <ProceduralGroundBackground />
      </Suspense>

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6">
        <div className="max-w-[720px]">
          <h1
            className="font-bold leading-[1.1] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            From fiction…
            <br />
            <span className="text-accent">to reality.</span>
          </h1>
          <p
            className="text-text-muted mb-10 max-w-[560px]"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}
          >
            We build software, design experiences, and transform businesses - so
            your boldest ideas become real products.
          </p>
          <Link
            to="/contact"
            className="inline-block px-9 py-3.5 bg-accent text-white font-semibold rounded-[12px] transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
