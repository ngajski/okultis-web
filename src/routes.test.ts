import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('static route registration', () => {
  it('prerenders and indexes the case study route', () => {
    const prerender = readFileSync('scripts/prerender.mjs', 'utf8')
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    expect(prerender).toContain("'/work/ocular-biobank'")
    expect(sitemap).toContain('<loc>https://okultis.com/work/ocular-biobank</loc>')
  })
})
