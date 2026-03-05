import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { loadGA, loadRecaptcha } from '@/lib/analytics'

const GA_ID = import.meta.env.VITE_GA_ID as string
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string

/**
 * Fixed bottom cookie consent banner. Appears when consent status is unknown,
 * slides in with a framer-motion animation. On accept, loads analytics scripts.
 */
export default function CookieBanner() {
  const { status, accept, reject } = useCookieConsent()

  function handleAccept() {
    accept()
    loadGA(GA_ID)
    loadRecaptcha(RECAPTCHA_SITE_KEY)
  }

  const isVisible = status === 'unknown'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 w-full z-[1100] bg-bg-card border-t border-border py-5"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="w-full max-w-[1120px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-[0.9rem] text-text-muted leading-[1.5]">
              We use cookies for analytics and spam protection. Read our{' '}
              <Link
                to="/privacy-policy"
                className="text-accent underline underline-offset-[2px] transition-colors duration-300 hover:text-accent-hover"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 text-[0.85rem] font-semibold bg-accent text-bg rounded-[12px] cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
              >
                Accept
              </button>
              <button
                onClick={reject}
                className="flex-1 md:flex-none px-6 py-2.5 text-[0.85rem] font-semibold bg-transparent text-text-muted border border-border rounded-[12px] cursor-pointer transition-all duration-300 hover:border-text hover:text-text"
              >
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
