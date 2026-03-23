import { useState } from 'react'

interface ApplicationFields {
  name: string
  email: string
  linkedin: string
  role: string
  message: string
  honeypot: string
}

interface ApplicationErrors {
  name: string
  email: string
  role: string
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFields(fields: ApplicationFields): ApplicationErrors {
  const errors: ApplicationErrors = { name: '', email: '', role: '', message: '' }

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }
  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.role.trim()) {
    errors.role = 'Please select a position.'
  }
  if (!fields.message.trim()) {
    errors.message = 'Cover letter is required.'
  }

  return errors
}

function hasErrors(errors: ApplicationErrors): boolean {
  return Object.values(errors).some((message) => message !== '')
}

interface ApplicationFormProps {
  positions: string[]
}

/**
 * Job application form. Submits to /apply.php via FormData.
 * Mirrors the ContactForm submission pattern.
 */
export default function ApplicationForm({ positions }: ApplicationFormProps) {
  const [fields, setFields] = useState<ApplicationFields>({
    name: '',
    email: '',
    linkedin: '',
    role: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<ApplicationErrors>({
    name: '',
    email: '',
    role: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ text: string; isSuccess: boolean } | null>(
    null,
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))

    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
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
      if (fields.linkedin.trim()) {
        formData.append('linkedin', fields.linkedin)
      }
      formData.append('role', fields.role)
      formData.append('message', fields.message)
      formData.append('website', fields.honeypot)

      const response = await fetch('/apply.php', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatusMessage({
          text: "Application sent! We'll review it and get back to you.",
          isSuccess: true,
        })
        setFields({ name: '', email: '', linkedin: '', role: '', message: '', honeypot: '' })
      } else {
        setStatusMessage({
          text: 'Something went wrong. Please try again or email us directly.',
          isSuccess: false,
        })
      }
    } catch {
      setStatusMessage({
        text: 'Failed to send application. Please check your connection and try again.',
        isSuccess: false,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field - hidden from real users, traps bots */}
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
          Full name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Your full name"
          value={fields.name}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 bg-bg-input border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted ${
            errors.name ? 'border-error focus:border-error' : 'border-border focus:border-accent'
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
            errors.email ? 'border-error focus:border-error' : 'border-border focus:border-accent'
          }`}
        />
        {errors.email && (
          <span className="block text-[0.8rem] text-error mt-1.5">{errors.email}</span>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="linkedin" className="block text-[0.85rem] font-medium text-text-muted mb-2">
          LinkedIn <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          type="url"
          name="linkedin"
          id="linkedin"
          placeholder="https://linkedin.com/in/yourprofile"
          value={fields.linkedin}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-bg-input border border-border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted focus:border-accent"
        />
      </div>

      <div className="mb-6">
        <fieldset>
          <legend className="block text-[0.85rem] font-medium text-text-muted mb-2">
            Position
          </legend>
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => {
                  setFields((prev) => ({ ...prev, role: position }))
                  setErrors((prev) => ({ ...prev, role: '' }))
                }}
                className={`px-4 py-2.5 rounded-[12px] text-[0.9rem] font-medium border transition-all duration-300 cursor-pointer ${
                  fields.role === position
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-bg-input text-text-muted hover:border-accent hover:text-text'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </fieldset>
        {errors.role && (
          <span className="block text-[0.8rem] text-error mt-1.5">{errors.role}</span>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-[0.85rem] font-medium text-text-muted mb-2">
          Cover letter
        </label>
        <textarea
          name="message"
          id="message"
          required
          placeholder="Tell us about yourself and why you would like to join Okultis..."
          rows={6}
          value={fields.message}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 bg-bg-input border rounded-[12px] text-text font-[inherit] text-base transition-colors duration-300 outline-none placeholder-text-muted resize-y min-h-[140px] ${
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
        {isSubmitting ? 'Sending…' : 'Submit application'}
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
    </form>
  )
}
