import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import logo from '@/assets/images/logo/okultis.png'

const NAV_SECTION_IDS = ['hero', 'about', 'services', 'clients']

interface NavItem {
  label: string
  href: string
  sectionId?: string
}

const HOME_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Clients', href: '#clients', sectionId: 'clients' },
]

const EXTERNAL_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Clients', href: '/#clients' },
]

export default function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const activeSectionId = useScrollSpy(isHomePage ? NAV_SECTION_IDS : [])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  function handleNavLinkClick() {
    setIsMobileMenuOpen(false)
  }

  const navItems = isHomePage ? HOME_NAV_ITEMS : EXTERNAL_NAV_ITEMS

  const logoHref = isHomePage ? '#hero' : '/'

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] z-[1000] bg-[rgba(10,10,15,0.85)] backdrop-blur-[12px] border-b border-border">
      <div className="w-full max-w-[1120px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        {isHomePage ? (
          <a href={logoHref} className="flex items-center">
            <img src={logo} alt="Okultis" className="h-11 w-auto" />
          </a>
        ) : (
          <Link to={logoHref} className="flex items-center">
            <img src={logo} alt="Okultis" className="h-11 w-auto" />
          </Link>
        )}

        {/* Desktop navigation */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  item={item}
                  isActive={item.sectionId ? activeSectionId === item.sectionId : false}
                  isHomePage={isHomePage}
                />
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="text-accent border border-accent rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 hover:bg-accent hover:text-bg"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer z-[1001] relative"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span
            className={`block w-full h-0.5 bg-text rounded-sm transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-text rounded-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-full h-0.5 bg-text rounded-sm transition-transform duration-300 ${
              isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile fullscreen menu overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-[rgba(10,10,15,0.92)] backdrop-blur-[16px] flex items-end justify-center pb-20 z-[999] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMobileMenuOpen(false)
        }}
      >
        <ul className="flex flex-col items-center gap-0">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className="transition-all duration-300"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMobileMenuOpen ? `${(index + 1) * 50}ms` : '0ms',
              }}
            >
              <MobileNavLink
                item={item}
                isActive={item.sectionId ? activeSectionId === item.sectionId : false}
                isHomePage={isHomePage}
                onClick={handleNavLinkClick}
              />
            </li>
          ))}
          <li
            className="transition-all duration-300"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMobileMenuOpen ? `${(navItems.length + 1) * 50}ms` : '0ms',
            }}
          >
            <Link
              to="/contact"
              className="block text-[clamp(1.8rem,5vw,2.5rem)] font-semibold py-4 text-accent transition-colors duration-300"
              onClick={handleNavLinkClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

interface NavLinkProps {
  item: NavItem
  isActive: boolean
  isHomePage: boolean
}

function NavLink({ item, isActive }: NavLinkProps) {
  const dotRef = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = dotRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    el.style.setProperty('--dot-x', `${x}px`)
  }

  const baseClasses =
    'relative text-sm font-medium transition-colors duration-300 group'
  const activeClasses = isActive ? 'text-text' : 'text-text-muted hover:text-text'

  // Render anchor for hash links, Link for page routes
  if (item.href.startsWith('#') || item.href.startsWith('/#')) {
    return (
      <a
        ref={dotRef}
        href={item.href}
        className={`${baseClasses} ${activeClasses}`}
        onMouseMove={handleMouseMove}
      >
        {item.label}
        <span
          className="absolute -bottom-2.5 left-[var(--dot-x,50%)] -translate-x-1/2 w-2 h-2 bg-accent rounded-full transition-transform duration-200"
          style={{ transform: `translateX(-50%) scale(${isActive ? 1 : 0})` }}
          aria-hidden
        />
        <style>{`
          a:hover > span[aria-hidden] { transform: translateX(-50%) scale(1) !important; }
        `}</style>
      </a>
    )
  }

  return (
    <Link
      to={item.href}
      className={`${baseClasses} ${activeClasses}`}
    >
      {item.label}
    </Link>
  )
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void
}

function MobileNavLink({ item, isActive, onClick }: MobileNavLinkProps) {
  const activeClasses = isActive ? 'text-accent' : 'text-text hover:text-accent'

  if (item.href.startsWith('#') || item.href.startsWith('/#')) {
    return (
      <a
        href={item.href}
        className={`block text-[clamp(1.8rem,5vw,2.5rem)] font-semibold py-4 transition-colors duration-300 ${activeClasses}`}
        onClick={onClick}
      >
        {item.label}
      </a>
    )
  }

  return (
    <Link
      to={item.href}
      className={`block text-[clamp(1.8rem,5vw,2.5rem)] font-semibold py-4 transition-colors duration-300 ${activeClasses}`}
      onClick={onClick}
    >
      {item.label}
    </Link>
  )
}
