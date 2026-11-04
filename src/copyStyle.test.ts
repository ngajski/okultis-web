import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

describe('site copy style', () => {
  it.each(['/', '/careers', '/contact', '/work/ocular-biobank', '/privacy-policy', '/terms'])(
    'has no em dash or double hyphen on %s',
    (url) => {
      const { appHtml } = render(url)
      expect(appHtml).not.toContain('—')
      expect(appHtml).not.toMatch(/ -- /)
    },
  )
})
