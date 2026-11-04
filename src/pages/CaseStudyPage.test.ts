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
    expect(img).toMatch(/class="[^"]*\bh-16\b[^"]*\bw-auto\b/)
    expect(img).not.toMatch(/grayscale|invert|brightness/)
    expect(appHtml).toContain('data-logo-tile')
  })

  it('renders every chapter, pillar, the diagram, stack and closing link', () => {
    const { appHtml } = page()
    for (const chapter of ocularBiobank.chapters) expect(appHtml).toContain(chapter.title)
    for (const pillar of ocularBiobank.pillars) expect(appHtml).toContain(pillar.title.replace("'", '&#x27;'))
    expect(appHtml).toContain('aria-label="System architecture"')
    for (const item of ocularBiobank.stack) expect(appHtml).toContain(item)
    expect(appHtml).toMatch(/<a[^>]*href="\/contact"[^>]*>.*Open a conversation/)
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
  })
})
