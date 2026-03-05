import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Okultis</title>
        <meta
          name="description"
          content="Privacy Policy for Okultis. Learn how we collect, use, and protect your personal data in compliance with GDPR."
        />
      </Helmet>

      <div className="pt-[calc(72px+60px)] pb-20">
        <div className="w-full max-w-[760px] mx-auto px-6">
          <h1
            className="font-bold tracking-[-0.02em] mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-[0.85rem] text-text-muted mb-12">
            Last updated: 19 February 2026
          </p>

          <LegalSection>
            <h2>1. Data Controller</h2>
            <p>The data controller responsible for your personal data is:</p>
            <p>
              <strong>Okultis</strong>, obrt za trgovinu i usluge, vl. Nikola Gajski
              <br />
              Jurjevska ulica 31 A, Zagreb, Croatia
              <br />
              Email:{' '}
              <a href="mailto:hello@okultis.com">hello@okultis.com</a>
            </p>
          </LegalSection>

          <LegalSection>
            <h2>2. Data We Collect</h2>
            <p>We collect and process the following types of personal data:</p>

            <h3>2.1 Contact Form Data</h3>
            <p>
              When you submit our contact form, we collect your name, email
              address, and message content. This data is used solely to respond
              to your enquiry.
            </p>

            <h3>2.2 Analytics Data</h3>
            <p>
              We use Google Analytics 4 (measurement ID: G-4X89M6MWM9) to
              understand how visitors use our website. This service collects
              anonymised usage data including pages visited, time spent on
              pages, device type, browser, approximate geographic location, and
              referral source. IP addresses are anonymised by default in GA4.
            </p>

            <h3>2.3 reCAPTCHA Data</h3>
            <p>
              We use Google reCAPTCHA v3 on our contact form to protect against
              spam and abuse. reCAPTCHA collects hardware and software
              information (such as device and application data) and sends it to
              Google for analysis.
            </p>

            <h3>2.4 Google Search Console</h3>
            <p>
              We use Google Search Console to monitor and maintain our
              website&apos;s presence in Google Search results. This service
              processes aggregated and anonymised search performance data.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>3. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the following legal bases under
              GDPR Article 6:
            </p>
            <ul>
              <li>
                <strong>Consent</strong> (Art. 6(1)(a)) — for the use of
                analytics cookies (Google Analytics) and spam-protection cookies
                (Google reCAPTCHA). These are only loaded after you accept
                cookies via our consent banner.
              </li>
              <li>
                <strong>Legitimate interest</strong> (Art. 6(1)(f)) — for basic
                website security and honeypot spam protection, which operate
                without cookies.
              </li>
              <li>
                <strong>
                  Performance of a contract or pre-contractual measures
                </strong>{' '}
                (Art. 6(1)(b)) — for processing contact form submissions to
                respond to your enquiry.
              </li>
            </ul>
          </LegalSection>

          <LegalSection>
            <h2>4. Cookies &amp; Tracking Technologies</h2>
            <p>Our website uses cookies and similar technologies:</p>
            <ul>
              <li>
                <strong>Google Analytics cookies</strong> (_ga, _ga_*) — used
                to distinguish users and sessions. These cookies expire after
                up to 2 years.
              </li>
              <li>
                <strong>Google reCAPTCHA cookies</strong> — used to assess
                whether requests come from humans or bots.
              </li>
            </ul>
            <p>
              When you first visit our website, a cookie consent banner allows
              you to accept or reject non-essential cookies. If you reject
              cookies, Google Analytics and reCAPTCHA will not be loaded. Your
              preference is stored in your browser&apos;s local storage for 6
              months, after which you will be asked again. You can also control
              cookies through your browser settings.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>5. Third-Party Services</h2>
            <p>
              We use the following third-party services that may process your
              data:
            </p>
            <ul>
              <li>
                <strong>Google Analytics (Google LLC)</strong> — web analytics.{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google reCAPTCHA (Google LLC)</strong> — spam
                protection.{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google Search Console (Google LLC)</strong> — search
                performance monitoring.{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Hostinger International Ltd.</strong> — website hosting
                on EU-based servers.{' '}
                <a
                  href="https://www.hostinger.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hostinger Privacy Policy
                </a>
              </li>
            </ul>
          </LegalSection>

          <LegalSection>
            <h2>6. International Data Transfers</h2>
            <p>
              Some of our third-party service providers, notably Google LLC, are
              based in the United States. Data transferred to the US is
              protected under the EU-U.S. Data Privacy Framework, Standard
              Contractual Clauses (SCCs), and other appropriate safeguards as
              required by GDPR.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>7. Data Retention</h2>
            <p>
              We retain personal data only for as long as necessary for the
              purposes described:
            </p>
            <ul>
              <li>
                <strong>Contact form data</strong> — retained for up to 1 year
                after your enquiry is resolved, then deleted.
              </li>
              <li>
                <strong>Analytics data</strong> — Google Analytics data is
                retained for 14 months, after which it is automatically deleted.
              </li>
              <li>
                <strong>reCAPTCHA data</strong> — processed in real-time and
                not stored by us.
              </li>
            </ul>
          </LegalSection>

          <LegalSection>
            <h2>8. Your Rights</h2>
            <p>
              Under the GDPR, you have the following rights regarding your
              personal data:
            </p>
            <ul>
              <li>
                <strong>Right of access</strong> — request a copy of your
                personal data we hold.
              </li>
              <li>
                <strong>Right to rectification</strong> — request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to erasure</strong> — request deletion of your
                personal data.
              </li>
              <li>
                <strong>Right to restriction of processing</strong> — request
                limited processing of your data.
              </li>
              <li>
                <strong>Right to data portability</strong> — receive your data
                in a structured, machine-readable format.
              </li>
              <li>
                <strong>Right to object</strong> — object to processing based
                on legitimate interest.
              </li>
              <li>
                <strong>Right to withdraw consent</strong> — where processing
                is based on consent, withdraw it at any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@okultis.com">hello@okultis.com</a>. We will
              respond within 30 days.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>9. Right to Lodge a Complaint</h2>
            <p>
              If you believe your data protection rights have been violated, you
              have the right to lodge a complaint with the Croatian Personal
              Data Protection Agency (AZOP):
            </p>
            <p>
              <strong>
                Agencija za zaštitu osobnih podataka (AZOP)
              </strong>
              <br />
              Selska cesta 136, 10000 Zagreb, Croatia
              <br />
              Phone: +385 1 4609 000
              <br />
              Website:{' '}
              <a
                href="https://azop.hr"
                target="_blank"
                rel="noopener noreferrer"
              >
                azop.hr
              </a>
            </p>
          </LegalSection>

          <LegalSection>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this page periodically.
            </p>
          </LegalSection>

          <LegalSection>
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
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
    <section className="mb-10 [&_h2]:text-[1.3rem] [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:text-text [&_h3]:text-[1.05rem] [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2.5 [&_h3]:text-text [&_p]:text-text-muted [&_p]:text-[0.95rem] [&_p]:leading-[1.75] [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-text-muted [&_li]:text-[0.95rem] [&_li]:leading-[1.75] [&_li]:mb-1.5 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-[2px] [&_a]:transition-colors [&_a]:duration-300 hover:[&_a]:text-accent-hover">
      {children}
    </section>
  )
}
