import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Okultis</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen pt-[72px] px-6 text-center">
        <p className="text-[0.85rem] font-medium text-accent uppercase tracking-[0.15em] mb-4">
          404
        </p>
        <h1 className="font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          Page not found.
        </h1>
        <p className="text-text-muted text-[1.05rem] max-w-[480px] mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-9 py-3.5 bg-accent text-white font-semibold rounded-[12px] transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </>
  )
}
