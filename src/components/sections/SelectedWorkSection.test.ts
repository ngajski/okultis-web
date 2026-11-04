import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

describe('homepage selected work teaser', () => {
  it('sits between services and process and links to the case study', () => {
    const { appHtml } = render('/')
    const services = appHtml.indexOf('id="services"')
    const work = appHtml.indexOf('id="work"')
    const process = appHtml.indexOf('id="process"')
    expect(services).toBeGreaterThan(-1)
    expect(work).toBeGreaterThan(services)
    expect(process).toBeGreaterThan(work)
    const section = appHtml.slice(work, process)
    expect(section).toContain('Selected work')
    expect(section).toContain('Ocular Biobank: a research data platform and prediction model for an eye clinic.')
    expect(section).toMatch(/<a[^>]*href="\/work\/ocular-biobank"[^>]*>.*Read the case study/)
    expect(section).not.toMatch(/KBC|Sestre milosrdnice/)
  })

  it('links to the case study from the footer', () => {
    const { appHtml } = render('/careers')
    const footer = appHtml.slice(appHtml.indexOf('<footer'))
    expect(footer).toMatch(/<a[^>]*href="\/work\/ocular-biobank"[^>]*>Work<\/a>/)
  })
})
