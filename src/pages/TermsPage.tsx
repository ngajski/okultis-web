import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Okultis</title>
        <meta
          name="description"
          content="Terms and Conditions for using the Okultis website."
        />
      </Helmet>

      <div className="pt-[calc(72px+60px)] pb-20">
        <div className="w-full max-w-[760px] mx-auto px-6">
          <h1
            className="font-bold tracking-[-0.02em] mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Terms and Conditions
          </h1>
          <p className="text-[0.85rem] text-text-muted mb-12">
            Last updated: 19 February 2026
          </p>

          <LegalSection>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Okultis website (&ldquo;Website&rdquo;), you
              accept and agree to be bound by these Terms and Conditions. If you
              do not agree to these terms, please do not use the Website.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>2. Description of Services</h2>
            <p>
              The Website is an informational website operated by Okultis, obrt
              za trgovinu i usluge, vl. Nikola Gajski, based in Zagreb, Croatia.
              The Website provides information about our services, including
              software development, UX/UI design, digital transformation, and IT
              consulting.
            </p>
            <p>
              The Website also includes a contact form that allows visitors to
              send enquiries. Submitting a contact form does not create a
              contractual relationship or obligation on either party.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>3. Intellectual Property</h2>
            <p>
              All content on this Website -including but not limited to text,
              graphics, logos, images, icons, and software -is the property of
              Okultis or its content suppliers and is protected by Croatian and
              international copyright, trademark, and other intellectual property
              laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, display, or use any
              content from this Website without prior written consent from
              Okultis.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>4. Use of the Website</h2>
            <p>
              You agree to use the Website only for lawful purposes and in a
              manner that does not infringe the rights of, or restrict or inhibit
              the use of the Website by, any third party. Prohibited conduct
              includes but is not limited to:
            </p>
            <ul>
              <li>
                Submitting false, misleading, or spam content through the
                contact form.
              </li>
              <li>
                Attempting to gain unauthorised access to the Website or its
                systems.
              </li>
              <li>Introducing viruses, trojans, or other malicious material.</li>
              <li>
                Using automated systems to scrape or extract data from the
                Website.
              </li>
            </ul>
          </LegalSection>

          <LegalSection>
            <h2>5. Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites. These links
              are provided for your convenience only. Okultis has no control over
              the content of third-party websites and accepts no responsibility
              for them or for any loss or damage arising from your use of them.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The Website and its content are provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, either express or
              implied. Okultis does not warrant that the Website will be
              uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
            <p>
              While we strive to keep information accurate and up to date, we
              make no representations or guarantees about the completeness,
              accuracy, or reliability of any content on the Website.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Croatian law, Okultis shall not
              be liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of or in connection with your use of,
              or inability to use, the Website.
            </p>
            <p>
              This limitation applies regardless of the legal theory on which the
              claim is based, including negligence.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>8. Privacy</h2>
            <p>
              Your use of the Website is also governed by our{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>, which describes
              how we collect, use, and protect your personal data.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>9. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the Republic of Croatia. Any disputes
              arising from or relating to these terms shall be subject to the
              exclusive jurisdiction of the courts in Zagreb, Croatia.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>10. Changes to These Terms</h2>
            <p>
              Okultis reserves the right to modify these Terms and Conditions at
              any time. Changes will be posted on this page with an updated
              revision date. Your continued use of the Website after changes are
              posted constitutes acceptance of the revised terms.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <p>
              Email:{' '}
              <a href="mailto:hello@okultis.com">hello@okultis.com</a>
              <br />
              Address: Jurjevska ulica 31 A, Zagreb, Croatia
            </p>
          </LegalSection>
        </div>
      </div>
    </>
  )
}

/** Wraps a legal document section with consistent bottom spacing. */
function LegalSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-10 [&_h2]:text-[1.3rem] [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:text-text [&_p]:text-text-muted [&_p]:text-[0.95rem] [&_p]:leading-[1.75] [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-text-muted [&_li]:text-[0.95rem] [&_li]:leading-[1.75] [&_li]:mb-1.5 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-[2px] [&_a]:transition-colors [&_a]:duration-300 hover:[&_a]:text-accent-hover">
      {children}
    </section>
  )
}
