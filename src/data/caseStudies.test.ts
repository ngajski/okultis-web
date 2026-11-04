import { describe, expect, it } from 'vitest'
import { forbiddenEndorsementPattern, ocularBiobank } from '@/data/caseStudies'

const hospitalPattern = /KBC|Sestre milosrdnice/

describe('ocularBiobank case study data', () => {
  it('lives at the agreed route', () => {
    expect(ocularBiobank.slug).toBe('ocular-biobank')
    expect(ocularBiobank.path).toBe('/work/ocular-biobank')
    expect(ocularBiobank.meta.canonical).toBe('https://okultis.com/work/ocular-biobank')
    expect(ocularBiobank.meta.title).toBe('Ocular Biobank · Okultis')
    expect(ocularBiobank.meta.datePublished).toBe('2026-11-04')
  })

  it('names the hospital only in the facts row and the reference block', () => {
    const { reference, facts, ...rest } = ocularBiobank
    expect(JSON.stringify(rest)).not.toMatch(hospitalPattern)
    expect(facts.filter((fact) => hospitalPattern.test(fact.value))).toHaveLength(reference ? 1 : 0)
  })

  it.skipIf(!ocularBiobank.reference)('carries the client, consortium line and footnote verbatim', () => {
    const { reference } = ocularBiobank
    expect(reference?.client.name).toBe('KBC Sestre milosrdnice')
    expect(reference?.consortiumLine).toBe(
      'Delivered under contract N-215/2026 by the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
    expect(reference?.logoWallFootnote).toBe(
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
  })

  it('names the hospital in the Client fact only while the reference block exists', () => {
    if (ocularBiobank.reference) {
      expect(ocularBiobank.reference.consortiumLine).toContain('Alpha Signal Analytics d.o.o.')
    }
    const clientFact = ocularBiobank.facts.find((fact) => fact.label === 'Client')
    expect(clientFact).toBeDefined()
    expect(hospitalPattern.test(clientFact?.value ?? '')).toBe(Boolean(ocularBiobank.reference))
  })

  it('contains no endorsement wording, em dashes or gas chromatography', () => {
    const text = JSON.stringify(ocularBiobank)
    expect(text).not.toMatch(forbiddenEndorsementPattern)
    expect(text).not.toContain('—')
    expect(text.toLowerCase()).not.toContain('gas chromatography')
    expect(text).toContain('mass spectrometry')
  })

  it('has the agreed structure', () => {
    expect(ocularBiobank.facts.map((fact) => fact.label)).toEqual(['Client', 'Engagement', 'Delivered', 'Year'])
    expect(ocularBiobank.chapters).toHaveLength(2)
    expect(ocularBiobank.pillars.map((pillar) => pillar.title)).toEqual([
      'A biobank you can ask questions of',
      'Comparison across groups',
      "A prediction model trained on the clinic's own data",
      'Built for a hospital',
    ])
    expect(ocularBiobank.stack).toEqual([
      'React',
      'NestJS',
      'PostgreSQL',
      'Python model service',
      'Terraform on Google Cloud',
      'EU region',
    ])
    expect(ocularBiobank.closingLinkTo).toBe('/contact')
    expect(ocularBiobank.teaser.title).not.toMatch(hospitalPattern)
  })
})
