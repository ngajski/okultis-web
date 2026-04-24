import { Link } from 'react-router-dom'
import SectionFrame from '@/components/ui/SectionFrame'

export default function ContactFormSection() {
  return (
    <SectionFrame
      id="contact"
      label="Start here"
      title={
        <>
          Tell us what the{' '}
          <span className="display-italic">real problem is.</span>
        </>
      }
      subtitle="Every project starts with a 30-minute call and a written summary the same week. Free, no slide deck, no sales page."
    >
      <div className="flex flex-wrap items-center gap-8">
        <Link to="/contact" className="btn-accent">
          <span>Start the brief</span>
          <span aria-hidden>→</span>
        </Link>
        <a href="mailto:hello@okultis.com" className="ink-link text-text">
          <span>hello@okultis.com</span>
        </a>
      </div>
    </SectionFrame>
  )
}
