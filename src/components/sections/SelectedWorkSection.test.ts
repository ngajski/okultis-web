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

describe('renamed navigation labels', () => {
  it('labels the footer links About and Services', () => {
    const { appHtml } = render('/')
    const footer = appHtml.slice(appHtml.indexOf('<footer'))
    expect(footer).toContain('>About<')
    expect(footer).toContain('>Services<')
    expect(footer).not.toMatch(/<a [^>]*>Studio</)
    expect(footer).not.toContain('>Practice<')
  })

  it('labels the homepage services section Services', () => {
    const { appHtml } = render('/')
    const start = appHtml.indexOf('id="services"')
    const section = appHtml.slice(start, appHtml.indexOf('id="work"', start))
    expect(section).toContain('>Services<')
    expect(section).not.toContain('Practice')
  })
})
