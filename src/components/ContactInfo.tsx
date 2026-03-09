/**
 * Displays the office location map and contact details for the contact page.
 */
export default function ContactInfo() {
  return (
    <div>
      <div className="mb-8">
        <iframe
          src="https://maps.google.com/maps?q=WESPA+Spaces+Zavrtnica+17+Zagreb&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Okultis office location - WESPA Spaces, Zagreb"
          className="rounded-[12px] border border-border"
        />
      </div>

      <div>
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-text">Address</h3>
          <p className="text-text-muted text-[0.95rem] leading-[1.75]">
            WESPA Spaces | Zavrtnica 17
            <br />
            10000 Zagreb, Croatia
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-text">Email</h3>
          <p className="text-text-muted text-[0.95rem] leading-[1.75]">
            <a
              href="mailto:hello@okultis.com"
              className="text-accent underline underline-offset-[2px] transition-colors duration-300 hover:text-accent-hover"
            >
              hello@okultis.com
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-text">LinkedIn</h3>
          <p className="text-text-muted text-[0.95rem] leading-[1.75]">
            <a
              href="https://www.linkedin.com/in/nikola-gajski-993807176/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-[2px] transition-colors duration-300 hover:text-accent-hover"
            >
              Nikola Gajski
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
