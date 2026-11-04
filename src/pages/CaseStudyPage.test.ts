import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'
import { ocularBiobank } from '@/data/caseStudies'

const page = () => render('/work/ocular-biobank')

describe('case study page', () => {
  it('renders the masthead, facts and consortium line', () => {
    const { appHtml } = page()
    expect(appHtml).toMatch(/<h1[^>]*>.*Turning a clinic&#x27;s sample archive into a/)
    expect(appHtml).toContain('research instrument.')
    for (const fact of ocularBiobank.facts) expect(appHtml).toContain(fact.value)
    if (ocularBiobank.reference) expect(appHtml).toContain(ocularBiobank.reference.consortiumLine)
  })

  it.skipIf(!ocularBiobank.reference)('shows the client logo untouched on a neutral tile', () => {
    const { appHtml } = page()
    const img = appHtml.match(/<img[^>]*alt="KBC Sestre milosrdnice"[^>]*>/)?.[0] ?? ''
    expect(img).not.toBe('')
    expect(img).toMatch(/class="[^"]*\bh-20\b[^"]*\bmd:h-24\b[^"]*\bw-auto\b/)
    expect(img).toContain('width="296"')
    expect(img).toContain('height="96"')
    expect(img).not.toMatch(/grayscale|invert|brightness/)
    expect(appHtml).toContain('data-logo-tile')
  })

  it('renders every chapter, pillar, the diagram and closing link', () => {
    const { appHtml } = page()
    for (const chapter of ocularBiobank.chapters) expect(appHtml).toContain(chapter.title)
    for (const pillar of ocularBiobank.pillars) expect(appHtml).toContain(pillar.title.replace("'", '&#x27;'))
    expect(appHtml).toContain('aria-label="System architecture"')
    expect(appHtml).not.toMatch(/PostgreSQL|NestJS|Terraform|Google Cloud|Python/)
    expect(appHtml).toMatch(/<a[^>]*href="\/contact"[^>]*>.*Open a conversation/)
  })

  it('describes the diagram topology for screen readers and mobile', () => {
    const { appHtml } = page()
    const figure = appHtml.slice(appHtml.indexOf('<figure'), appHtml.indexOf('</figure>'))
    expect(figure).toContain(
      '<figcaption class="sr-only">Researchers get secure access to the biobank platform. The platform stores sample data in the biobank DB. It sends spectra to the ML prediction model and gets predictions back, and the model is internal only. The platform, the DB and the model run on infrastructure in a GDPR-compliant EU region.</figcaption>',
    )
    expect(figure.match(/<figcaption[^>]*>(.*?)<\/figcaption>/)?.[1]).not.toContain(';')
    for (const caption of [
      'Researchers to Biobank platform · Secure access',
      'Biobank platform to Biobank DB · Sample data',
      'Biobank platform to ML prediction model · Spectra and predictions',
    ]) {
      expect(figure).toContain(`<span class="lg:hidden">${caption}</span>`)
    }
    for (const label of ['Secure access', 'Sample data', 'Spectra and predictions']) {
      expect(figure).toContain(`<span class="hidden lg:inline">${label}</span>`)
    }
    for (const text of [
      'Researchers',
      'web browser',
      'Biobank platform',
      'web app + API',
      'Biobank DB',
      'sample records',
      'ML prediction model',
      'internal only',
      'Infrastructure in a GDPR-compliant EU region',
    ]) {
      expect(figure).toContain(`>${text}</`)
    }
    expect(figure.match(/aria-hidden="true" class="hidden lg:inline[^"]*">→</g)).toHaveLength(3)
    const figureClass = figure.match(/<figure[^>]*class="([^"]*)"/)?.[1] ?? ''
    expect(figureClass).toContain('lg:grid-cols-[auto_1fr]')
    expect(figureClass).not.toContain('grid-cols-4')
    expect(figure).not.toMatch(/Google|Terraform|NestJS|GCP|PostgreSQL/)
    expect(figure).not.toContain('HTTPS')
    expect(appHtml).not.toContain('reads and writes')
    expect(appHtml).not.toContain('server to server')
  })

  it('has no image other than the client logo', () => {
    const { appHtml } = page()
    const mainHtml = appHtml.slice(appHtml.indexOf('<main'), appHtml.indexOf('</main>'))
    expect(mainHtml.match(/<img/g) ?? []).toHaveLength(ocularBiobank.reference ? 1 : 0)
  })

  it('emits title, description and canonical in the head', () => {
    const { head, appHtml } = page()
    const html = `${head}${appHtml}`
    expect(html).toMatch(/<title[^>]*>Ocular Biobank · Okultis<\/title>/)
    expect(html).toContain('href="https://okultis.com/work/ocular-biobank"')
    expect(html).toContain('property="og:type" content="article"')
    expect(html).toContain('"@type":"CreativeWork"')
    expect(html).toContain('"datePublished":"2026-11-04"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    expect(html).toContain(`name="twitter:title" content="${ocularBiobank.meta.title}"`)
  })
})
