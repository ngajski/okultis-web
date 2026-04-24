/**
 * Coordinates panel shown next to the contact form. Minimal: labeled rows
 * plus a grayscale map.
 */
export default function ContactInfo() {
  return (
    <div>
      <dl className="space-y-8 mb-10">
        <div>
          <dt className="eyebrow mb-2">Studio</dt>
          <dd className="text-text text-[1rem] leading-[1.7]">
            WESPA Spaces · Zavrtnica 17
            <br />
            10000 Zagreb, Croatia
          </dd>
        </div>

        <div>
          <dt className="eyebrow mb-2">Email</dt>
          <dd>
            <a href="mailto:hello@okultis.com" className="ink-link text-text">
              <span>hello@okultis.com</span>
            </a>
          </dd>
        </div>

        <div>
          <dt className="eyebrow mb-2">Social</dt>
          <dd>
            <a
              href="https://www.linkedin.com/company/okultis-it"
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link text-text"
            >
              <span>Okultis on LinkedIn</span>
            </a>
          </dd>
        </div>
      </dl>

      <iframe
        src="https://maps.google.com/maps?q=WESPA+Spaces+Zavrtnica+17+Zagreb&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="240"
        style={{ border: 0, filter: 'grayscale(1) contrast(1.05)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Okultis office location - WESPA Spaces, Zagreb"
        className="block"
      />
    </div>
  )
}
