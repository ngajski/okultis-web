import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'
import { forbiddenEndorsementPattern } from '@/data/caseStudies'
import { clients } from '@/data/clients'

const hasKbcEntry = clients.some((client) => /KBC/.test(client.name))

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

  it('stops the marquee while a tile has keyboard focus', () => {
    const section = clientsSection()
    const trackClass = section.match(/<div class="([^"]*)" style="animation:marquee-scroll/)?.[1] ?? ''
    expect(trackClass).toContain('group-focus-within:[animation:none]!')
  })

  it.skipIf(!hasKbcEntry)('links the KBC SM tile to the case study with one focus stop', () => {
    const section = clientsSection()
    const links = section.match(/<a[^>]*href="\/work\/ocular-biobank"[^>]*>/g) ?? []
    expect(links).toHaveLength(2)
    expect(links[0]).not.toContain('tabindex="-1"')
    expect(links[1]).toContain('tabindex="-1"')
    expect(section).toContain('Case study')
    expect(links[0]).toContain('focus-visible:ring-1')
    expect(links[0]).not.toContain('group/tile')
    const firstLink = section.indexOf('href="/work/ocular-biobank"')
    const secondLink = section.indexOf('href="/work/ocular-biobank"', firstLink + 1)
    const betweenLinks = section.slice(firstLink, secondLink)
    expect(betweenLinks).toContain('<div class="flex shrink-0" aria-hidden="true">')
  })

  it('keeps the logo rendering unchanged and shows the footnote only with the KBC entry', () => {
    const section = clientsSection()
    const footnote =
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.'
    if (hasKbcEntry) {
      const img = section.match(/<img[^>]*alt="KBC Sestre milosrdnice"[^>]*>/)?.[0] ?? ''
      expect(img).toContain('grayscale')
      expect(section).toContain(footnote)
    } else {
      expect(section).not.toMatch(/KBC|Sestre milosrdnice/)
    }
  })
})
