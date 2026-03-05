import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CookieBanner from '@/components/CookieBanner'

/**
 * Root layout that wraps every page. Handles scrolling to hash fragments
 * after navigation so that links like `/#about` work correctly in an SPA.
 */
export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (!hash) return

    // Use rAF to ensure the page has rendered before trying to scroll
    requestAnimationFrame(() => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }, [location])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
