import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const routes = ['/', '/contact', '/careers', '/privacy-policy', '/terms']
const rootDir = process.cwd()
const distDir = path.resolve(rootDir, 'dist')
const templatePath = path.resolve(distDir, 'index.html')
const serverEntryPath = path.resolve(rootDir, '.prerender/entry-server.js')

const template = await readFile(templatePath, 'utf8')
const { render } = await import(pathToFileURL(serverEntryPath).href)
const headTagPattern =
  /<(title|meta)\b[^>]*>.*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*rel="canonical"[^>]*\/?>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g

for (const route of routes) {
  const { appHtml, head } = render(route)
  const preloadMatch = appHtml.match(/^((?:<link[^>]+\/>)+)([\s\S]*)$/)
  const preloadLinks = preloadMatch?.[1] ?? ''
  const prerenderedHtml = preloadMatch?.[2] ?? appHtml
  const extractedHeadTags = prerenderedHtml.match(headTagPattern)?.join('') ?? ''
  const renderedAppHtml = prerenderedHtml.replace(headTagPattern, '')
  const html = template
    .replace(
      '<meta name="prerender-head" content="" />',
      `${preloadLinks}${head}${extractedHeadTags}`,
    )
    .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`)

  const outputPath =
    route === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, route.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
}
