import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

describe('entry-server render', () => {
  it('renders the homepage with its title', () => {
    const { appHtml, head } = render('/')
    expect(appHtml).toContain('id="clients"')
    expect(`${head}${appHtml}`).toContain('<title')
  })
})
