import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTheme } from '@/hooks/useTheme'
import EclipseToggle from '@/components/EclipseToggle'
import logoDark from '@/assets/images/logo/okultis.png'
import logoLight from '@/assets/images/logo/okultis-logo-white.png'

const NAV_SECTION_IDS = ['hero', 'about', 'services']

interface NavItem {
  label: string
  href: string
  sectionId?: string
}

const HOME_NAV_ITEMS: NavItem[] = [
  { label: 'Studio', href: '#about', sectionId: 'about' },
  { label: 'Practice', href: '#services', sectionId: 'services' },
  { label: 'Careers', href: '/careers' },
]

const EXTERNAL_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/#about' },
  { label: 'Practice', href: '/#services' },
  { label: 'Careers', href: '/careers' },
]

export default function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const activeSectionId = useScrollSpy(isHomePage ? NAV_SECTION_IDS : [])
  useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavLinkClick() {
    setIsMobileMenuOpen(false)
  }

  const navItems = isHomePage ? HOME_NAV_ITEMS : EXTERNAL_NAV_ITEMS

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[72px] z-[1000] transition-colors duration-500 ${
          isScrolled
            ? 'bg-bg/90 backdrop-blur-[10px]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          {isHomePage ? (
            <a href="#hero" className="flex items-baseline gap-2">
              <Wordmark />
            </a>
          ) : (
            <Link to="/" className="flex items-baseline gap-2">
              <Wordmark />
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <DesktopNavLink
                    item={item}
                    isActive={
                      item.sectionId ? activeSectionId === item.sectionId : false
                    }
                  />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <Link
                to="/contact"
                className="text-[0.92rem] text-text hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <EclipseToggle />
            </div>
          </nav>

          <button
            className="md:hidden relative w-8 h-8 bg-transparent border-none cursor-pointer z-[1002]"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span
              className={`absolute left-0 right-0 h-px bg-text transition-transform duration-300 ${
                isMobileMenuOpen ? 'top-[15px] rotate-45' : 'top-[10px]'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-text transition-transform duration-300 ${
                isMobileMenuOpen ? 'top-[15px] -rotate-45' : 'top-[20px]'
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 bg-bg z-[1001] transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMobileMenuOpen(false)
        }}
      >
        <div className="flex flex-col h-full pt-[100px] px-8 pb-12">
          <ul className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className="transition-all duration-500"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                <MobileNavLink
                  item={item}
                  isActive={item.sectionId ? activeSectionId === item.sectionId : false}
                  onClick={handleNavLinkClick}
                />
              </li>
            ))}
            <li
              className="transition-all duration-500"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms',
              }}
            >
              <MobileNavLink
                item={{ label: 'Contact', href: '/contact' }}
                isActive={false}
                onClick={handleNavLinkClick}
                accent
              />
            </li>
          </ul>

          <div className="mt-auto pt-10">
            <EclipseToggle />
          </div>
        </div>
      </div>
    </>
  )
}

function Wordmark() {
  return (
    <>
      <img
        src={logoDark}
        alt="Okultis"
        className="h-8 md:h-9 w-auto dark:hidden"
      />
      <img
        src={logoLight}
        alt="Okultis"
        className="h-8 md:h-9 w-auto hidden dark:block"
      />
    </>
  )
}

interface NavLinkProps {
  item: NavItem
  isActive: boolean
}

function DesktopNavLink({ item, isActive }: NavLinkProps) {
  const classes = `text-[0.92rem] transition-colors ${
    isActive ? 'text-accent' : 'text-text hover:text-accent'
  }`

  if (item.href.startsWith('#') || item.href.startsWith('/#')) {
    return (
      <a href={item.href} className={classes}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.href} className={classes}>
      {item.label}
    </Link>
  )
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void
  accent?: boolean
}

function MobileNavLink({ item, isActive, onClick, accent = false }: MobileNavLinkProps) {
  const classes = `display block py-5 text-[2.4rem] leading-none transition-colors duration-300 ${
    accent ? 'text-accent' : isActive ? 'text-accent' : 'text-text'
  }`

  if (item.href.startsWith('#') || item.href.startsWith('/#')) {
    return (
      <a href={item.href} className={classes} onClick={onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.href} className={classes} onClick={onClick}>
      {item.label}
    </Link>
  )
}
