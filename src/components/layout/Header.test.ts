import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

const headerMarkup = (url: string) => {
  const { appHtml } = render(url)
  const start = appHtml.indexOf('<header')
  return appHtml.slice(start, appHtml.indexOf('</header>', start))
}

const NAV_LABELS_IN_ORDER = ['Work', 'Services', 'About', 'Careers']

describe.each(['/', '/careers'])('header navigation on %s', (url) => {
  const header = headerMarkup(url)

  it('lists Work, Services, About and Careers in order, then Contact', () => {
    const positions = [...NAV_LABELS_IN_ORDER, 'Contact'].map((label) => header.indexOf(`>${label}<`))
    positions.forEach((position) => expect(position).toBeGreaterThan(-1))
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  it.each(['Studio', 'Practice', 'Clients', 'Home'])('does not show the %s label', (label) => {
    expect(header).not.toContain(`>${label}<`)
  })
})

describe('header Work link', () => {
  it('points at the case study on the homepage', () => {
    expect(headerMarkup('/')).toContain('href="/work/ocular-biobank"')
  })
})
