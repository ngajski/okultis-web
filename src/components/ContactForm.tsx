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
        setStatusMessage({
          text: "Message received. We'll reply within 24h.",
          isSuccess: true,
        })
        setFields({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setStatusMessage({
          text: 'Transmission failed. Please try again or email hello@okultis.com.',
          isSuccess: false,
        })
      }
    } catch {
      setStatusMessage({
        text: 'Connection error. Check your network and try again.',
        isSuccess: false,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
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

      <div className="space-y-8">
        <FieldRow
          id="name"
          label="Name"
          value={fields.name}
          error={errors.name}
          onChange={handleChange}
          placeholder="Who are we writing to?"
        />

        <FieldRow
          id="email"
          type="email"
          label="Email"
          value={fields.email}
          error={errors.email}
          onChange={handleChange}
          placeholder="you@company.com"
        />

        <FieldRow
          id="message"
          label="Message"
          as="textarea"
          value={fields.message}
          error={errors.message}
          onChange={handleChange}
          placeholder="What are we making, and by when?"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-accent"
        >
          <span>{isSubmitting ? 'Sending…' : 'Send message'}</span>
          {!isSubmitting && <span aria-hidden>→</span>}
        </button>

        {statusMessage && (
          <div
            className={`text-[0.9rem] ${
              statusMessage.isSuccess ? 'text-success' : 'text-error'
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage.text}
          </div>
        )}
      </div>

      <p className="mt-8 text-[0.78rem] text-text-muted">
        Protected by reCAPTCHA ·{' '}
        <a
          href="https://policies.google.com/privacy"
          className="underline underline-offset-4 hover:text-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>{' '}
        ·{' '}
        <a
          href="https://policies.google.com/terms"
          className="underline underline-offset-4 hover:text-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
      </p>
    </form>
  )
}

interface FieldRowProps {
  id: string
  label: string
  value: string
  error?: string
  placeholder?: string
  type?: string
  as?: 'input' | 'textarea'
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function FieldRow({
  id,
  label,
  value,
  error,
  placeholder,
  type = 'text',
  as = 'input',
  onChange,
}: FieldRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        {error && <span className="field-error">{error}</span>}
      </div>
      {as === 'textarea' ? (
        <textarea
          name={id}
          id={id}
          required
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`field ${error ? 'has-error' : ''}`}
        />
      ) : (
        <input
          name={id}
          id={id}
          type={type}
          required
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`field ${error ? 'has-error' : ''}`}
        />
      )}
    </div>
  )
}
