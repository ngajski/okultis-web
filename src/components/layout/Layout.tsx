import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CookieBanner from '@/components/CookieBanner'
import Atmosphere from '@/components/ui/Atmosphere'

/**
 * Root layout. Atmosphere (grain + vignette) is painted behind every page.
 * Hash-fragment scrolling preserved for SPA anchor links like `/#about`.
 */
export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash

    if (hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
      return
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <Atmosphere />
      <div className="relative z-[1]">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  )
}
