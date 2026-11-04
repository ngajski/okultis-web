import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

const routes = ['/', '/careers', '/contact', '/work/ocular-biobank']

function findTwelveColumnClassLists(appHtml: string) {
  const classLists: string[] = []
  for (const match of appHtml.matchAll(/class="([^"]*)"/g)) {
    if (match[1].split(/\s+/).includes('grid-cols-12')) classLists.push(match[1])
  }
  return classLists
}

describe('12-column grids on phones', () => {
  for (const route of routes) {
    it(`${route} has no horizontal gap wider than 3 below md`, () => {
      const { appHtml } = render(route)
      const classLists = findTwelveColumnClassLists(appHtml)
      expect(classLists.length).toBeGreaterThan(0)

      for (const classList of classLists) {
        const tokens = classList.split(/\s+/)
        expect(tokens.filter((token) => /^gap-\d/.test(token))).toEqual([])
        for (const token of tokens) {
          const columnGap = token.match(/^gap-x-(\d+)$/)
          if (columnGap) expect(Number(columnGap[1])).toBeLessThanOrEqual(3)
        }
      }
    })
  }
})
