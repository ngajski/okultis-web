import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="w-full max-w-[1120px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-center md:text-left">
        <p className="text-sm text-text-muted">
          &copy; 2026 Okultis. All rights reserved.
        </p>
        <ul className="flex flex-wrap justify-center md:justify-end gap-6">
          <li>
            <a
              href="/#about"
              className="text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/#services"
              className="text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              Services
            </a>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className="text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="text-sm text-text-muted transition-colors duration-300 hover:text-text"
            >
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
