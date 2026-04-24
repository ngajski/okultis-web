import { Link } from 'react-router-dom'
import logoDark from '@/assets/images/logo/okultis.png'
import logoLight from '@/assets/images/logo/okultis-logo-white.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative pt-24 pb-10">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-10 pb-16 border-b border-border-soft">
          <div className="col-span-12 md:col-span-5">
            <img src={logoDark} alt="Okultis" className="h-9 w-auto mb-5 dark:hidden" />
            <img src={logoLight} alt="Okultis" className="h-9 w-auto mb-5 hidden dark:block" />
            <p className="text-text-soft text-[0.95rem] leading-[1.7] max-w-[32ch]">
              A boutique studio building AI systems, custom software, and
              product design for teams that ship.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow mb-5">Site</p>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-[0.95rem] text-text-soft hover:text-text transition-colors">Studio</a></li>
              <li><a href="/#services" className="text-[0.95rem] text-text-soft hover:text-text transition-colors">Practice</a></li>
              <li><Link to="/careers" className="text-[0.95rem] text-text-soft hover:text-text transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-[0.95rem] text-text-soft hover:text-text transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow mb-5">Studio</p>
            <address className="not-italic text-text-soft text-[0.95rem] leading-[1.75] mb-4">
              WESPA Spaces · Zavrtnica 17
              <br />
              10000 Zagreb, Croatia
            </address>
            <a href="mailto:hello@okultis.com" className="ink-link text-text">
              <span>hello@okultis.com</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 text-[0.85rem] text-text-muted">
          <span>© 2023–{year} Okultis</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-text transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-text transition-colors">Terms</Link>
            <a
              href="https://www.linkedin.com/company/okultis-it"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
