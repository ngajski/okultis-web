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

  if (!fields.name.trim()) errors.name = 'Name is required.'
  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.role.trim()) errors.role = 'Please select a position.'
  if (!fields.message.trim()) errors.message = 'Cover letter is required.'

  return errors
}

function hasErrors(errors: ApplicationErrors): boolean {
  return Object.values(errors).some((message) => message !== '')
}

interface ApplicationFormProps {
  positions: string[]
}

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      if (fields.linkedin.trim()) formData.append('linkedin', fields.linkedin)
      formData.append('role', fields.role)
      formData.append('message', fields.message)
      formData.append('website', fields.honeypot)

      const response = await fetch('/apply.php', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatusMessage({
          text: data.message || "Application received. We'll be in touch.",
          isSuccess: true,
        })
        setFields({ name: '', email: '', linkedin: '', role: '', message: '', honeypot: '' })
      } else {
        setStatusMessage({
          text: data.message || 'Something went wrong. Try again or email hello@okultis.com.',
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
    <form onSubmit={handleSubmit} noValidate>
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
        <Field
          id="name"
          label="Full name"
          value={fields.name}
          error={errors.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        <Field
          id="email"
          type="email"
          label="Email"
          value={fields.email}
          error={errors.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Field
          id="linkedin"
          type="url"
          label="LinkedIn / portfolio (optional)"
          value={fields.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
        />

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="field-label">Position</span>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => {
                  setFields((prev) => ({ ...prev, role: position }))
                  setErrors((prev) => ({ ...prev, role: '' }))
                }}
                className={`text-[0.9rem] px-4 py-2.5 border transition-colors duration-300 cursor-pointer ${
                  fields.role === position
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-border-soft text-text-muted hover:border-ink hover:text-text'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        <Field
          id="message"
          as="textarea"
          label="Cover letter"
          value={fields.message}
          error={errors.message}
          onChange={handleChange}
          placeholder="Tell us who you are, what you want to work on, and why Okultis."
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <button type="submit" disabled={isSubmitting} className="btn-accent">
          <span>{isSubmitting ? 'Sending…' : 'Submit application'}</span>
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
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  error?: string
  placeholder?: string
  type?: string
  as?: 'input' | 'textarea'
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({
  id,
  label,
  value,
  error,
  placeholder,
  type = 'text',
  as = 'input',
  onChange,
}: FieldProps) {
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
          rows={6}
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`field ${error ? 'has-error' : ''}`}
        />
      )}
    </div>
  )
}
