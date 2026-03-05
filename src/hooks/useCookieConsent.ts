import { useCallback, useEffect, useState } from 'react'

type ConsentStatus = 'unknown' | 'accepted' | 'rejected'

interface CookieConsentResult {
  status: ConsentStatus
  accept: () => void
  reject: () => void
}

const STORAGE_KEY = 'okultis_cookie_consent'
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000

interface StoredConsent {
  status: 'accepted' | 'rejected'
  expiresAt: number
}

function readStoredConsent(): ConsentStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'unknown'

    const parsed: StoredConsent = JSON.parse(raw) as StoredConsent
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return 'unknown'
    }

    return parsed.status
  } catch {
    return 'unknown'
  }
}

function writeStoredConsent(status: 'accepted' | 'rejected'): void {
  const consent: StoredConsent = {
    status,
    expiresAt: Date.now() + SIX_MONTHS_MS,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
}

/**
 * Manages cookie consent state backed by localStorage with a 6-month expiry.
 * Returns the current consent status and functions to accept or reject.
 */
export function useCookieConsent(): CookieConsentResult {
  const [status, setStatus] = useState<ConsentStatus>('unknown')

  useEffect(() => {
    setStatus(readStoredConsent())
  }, [])

  const accept = useCallback(() => {
    writeStoredConsent('accepted')
    setStatus('accepted')
  }, [])

  const reject = useCallback(() => {
    writeStoredConsent('rejected')
    setStatus('rejected')
  }, [])

  return { status, accept, reject }
}
