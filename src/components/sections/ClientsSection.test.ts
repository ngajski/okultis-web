import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'
import { forbiddenEndorsementPattern } from '@/data/caseStudies'

const clientsSection = () => {
  const { appHtml } = render('/')
  const start = appHtml.indexOf('id="clients"')
  return appHtml.slice(start, appHtml.indexOf('id="about"', start))
}

describe('clients logo wall', () => {
  it('uses the reworded heading and no endorsement wording', () => {
    const section = clientsSection()
    expect(section).toContain('Working across healthcare, culture, mobility and hospitality.')
    expect(section).not.toMatch(forbiddenEndorsementPattern)
  })

  it('links the KBC SM tile to the case study with one focus stop', () => {
    const section = clientsSection()
    const links = section.match(/<a[^>]*href="\/work\/ocular-biobank"[^>]*>/g) ?? []
    expect(links).toHaveLength(2)
    expect(links[0]).not.toContain('tabindex="-1"')
    expect(links[1]).toContain('tabindex="-1"')
    expect(section).toContain('Case study')
    expect(section.match(/aria-hidden="true"/g)?.length ?? 0).toBeGreaterThanOrEqual(1)
  })

  it('keeps the logo rendering unchanged and adds the consortium footnote', () => {
    const section = clientsSection()
    const img = section.match(/<img[^>]*alt="KBC Sestre milosrdnice"[^>]*>/)?.[0] ?? ''
    expect(img).toContain('grayscale')
    expect(section).toContain(
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
  })
})
