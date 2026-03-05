import ContactForm from '@/components/ContactForm'

export default function ContactFormSection() {
  return (
    <section id="contact" className="py-[100px] md:py-[72px]">
      <div className="w-full max-w-[600px] mx-auto px-6">
        <h2
          className="font-bold tracking-[-0.02em] mb-2"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Let&apos;s talk
        </h2>
        <p className="text-text-muted text-[1.05rem] mb-10">
          Have a project in mind? Drop us a message and we&apos;ll get back to
          you within 24 hours.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
