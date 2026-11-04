import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CaseStudyPage from '@/pages/CaseStudyPage'
import { ocularBiobank, type CaseStudy } from '@/data/caseStudies'

const revokedCaseStudy: CaseStudy = {
  ...ocularBiobank,
  reference: undefined,
  facts: ocularBiobank.facts.map((fact) =>
    fact.label === 'Client' ? { ...fact, value: 'A university eye clinic' } : fact,
  ),
}

describe('case study page after consent revocation', () => {
  it('renders without the hospital name or logo', () => {
    const html = renderToString(
      createElement(
        HelmetProvider,
        { context: {} },
        createElement(MemoryRouter, null, createElement(CaseStudyPage, { caseStudy: revokedCaseStudy })),
      ),
    )
    expect(html).toContain(ocularBiobank.title.replace("'", '&#x27;'))
    expect(html).toContain('A university eye clinic')
    expect(html).not.toContain('<img')
    expect(html).not.toMatch(/KBC|Sestre milosrdnice/)
  })
})
