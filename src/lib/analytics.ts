/**
 * Dynamically injects the Google Analytics 4 script into the document head.
 * Safe to call multiple times -checks for an existing script tag first.
 */
export function loadGA(gaId: string): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []

  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  gtag('js', new Date())
  gtag('config', gaId)
}

/**
 * Dynamically injects the Google reCAPTCHA v3 script into the document head.
 * Safe to call multiple times -checks for an existing script tag first.
 */
export function loadRecaptcha(siteKey: string): void {
  if (document.querySelector(`script[src*="recaptcha"]`)) return

  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  script.async = true
  document.head.appendChild(script)
}

// Extend the Window interface to satisfy TypeScript
declare global {
  interface Window {
    dataLayer: unknown[]
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}
