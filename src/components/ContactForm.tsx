import { useState } from 'react'

interface FormFields {
  name: string
  email: string
  message: string
  honeypot: string
}

interface FormErrors {
  name: string
  email: string
  message: string
}

interface ContactFormProps {
  className?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string

function validateFields(fields: FormFields): FormErrors {
  const errors: FormErrors = { name: '', email: '', message: '' }

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }
  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.message.trim()) {
    errors.message = 'Message is required.'
  }

  return errors
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((message) => message !== '')
}

/**
 * Reusable contact form component. Submits to /send.php via FormData.
 * Integrates with Google reCAPTCHA v3 when cookies have been accepted.
 */
export default function ContactForm({ className = '' }: ContactFormProps) {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ text: string; isSuccess: boolean } | null>(
    null,
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))

    // Clear the error for this field in real-time
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  async function getRecaptchaToken(): Promise<string | null> {
    if (!window.grecaptcha || !RECAPTCHA_SITE_KEY) return null

    return new Promise((resolve) => {
      window.grecaptcha!.ready(() => {
        window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: 'contact' }).then(
          (token) => resolve(token),
          () => resolve(null),
        )
      })
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validateFields(fields)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      const formData = new FormData()
      formData.append('name', fields.name)
      formData.append('email', fields.email)
      formData.append('message', fields.message)
      formData.append('website', fields.honeypot)

      const recaptchaToken = await getRecaptchaToken()
      if (recaptchaToken) {
        formData.append('g-recaptcha-response', recaptchaToken)
      }

      const response = await fetch('/send.php', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatusMessage({ text: 'Message sent! We\'ll be in touch soon.', isSuccess: true })
        setFields({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setStatusMessage({
          text: 'Something went wrong. Please try again or email us directly.',
          isSuccess: false,
        })
      }
    } catch {
      setStatusMessage({
        text: 'Failed to send message. Please check your connection and try again.',
        isSuccess: false,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field -hidden from real users, traps bots */}
      <div className="absolute left-[-9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="honeypot"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={fields.honeypot}
          onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-[0.85rem] font-medium text-text-muted mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Your name"
          value={fields.name}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 bg-bg-input border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted ${
            errors.name
              ? 'border-error focus:border-error'
              : 'border-border focus:border-accent'
          }`}
        />
        {errors.name && (
          <span className="block text-[0.8rem] text-error mt-1.5">{errors.name}</span>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-[0.85rem] font-medium text-text-muted mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
          value={fields.email}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 bg-bg-input border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted ${
            errors.email
              ? 'border-error focus:border-error'
              : 'border-border focus:border-accent'
          }`}
        />
        {errors.email && (
          <span className="block text-[0.8rem] text-error mt-1.5">{errors.email}</span>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-[0.85rem] font-medium text-text-muted mb-2"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          placeholder="Tell us about your project…"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 bg-bg-input border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted resize-y min-h-[120px] ${
            errors.message
              ? 'border-error focus:border-error'
              : 'border-border focus:border-accent'
          }`}
        />
        {errors.message && (
          <span className="block text-[0.8rem] text-error mt-1.5">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-9 py-3.5 bg-accent text-white font-semibold rounded-[12px] text-base cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>

      {statusMessage && (
        <div
          className={`mt-5 text-[0.95rem] text-center min-h-[1.4em] ${
            statusMessage.isSuccess ? 'text-success' : 'text-error'
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage.text}
        </div>
      )}

      <p className="mt-4 text-[0.75rem] text-text-muted text-center">
        Protected by reCAPTCHA &middot;{' '}
        <a
          href="https://policies.google.com/privacy"
          className="text-text-muted underline underline-offset-[2px] transition-colors duration-300 hover:text-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>{' '}
        &middot;{' '}
        <a
          href="https://policies.google.com/terms"
          className="text-text-muted underline underline-offset-[2px] transition-colors duration-300 hover:text-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
      </p>
    </form>
  )
}
