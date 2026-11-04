# Ocular Biobank Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Ocular Biobank case study page at `/work/ocular-biobank`, a homepage teaser, and the consent-letter changes to the logo wall, all prerendered and indexed.

**Architecture:** All page copy and metadata live in one typed data object (`src/data/caseStudies.ts`); a `CaseStudyPage` renders it inside the existing `<Layout />`, following the `CareersPage` pattern. Tests render routes through the existing SSR entry (`src/entry-server.tsx`) and assert on the HTML string, so no DOM test library is needed. Legal constraints are pinned by tests on the data object.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Tailwind 4, React Router 7, react-helmet-async, Framer Motion, Vitest (new dev dependency).

**Spec:** `docs/superpowers/specs/2026-11-03-ocular-biobank-case-study-design.md`

## Global Constraints

- Route is exactly `/work/ocular-biobank`; canonical `https://okultis.com/work/ocular-biobank`.
- The hospital is named only in: the facts row value `KBC Sestre milosrdnice, Eye Clinic`, the `client` block, the logo wall footnote, and `clients.ts`. Nowhere else in `src/`.
- Consortium line, verbatim: `Delivered under contract N-215/2026 by the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.`
- Logo wall footnote, verbatim: `KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.`
- No occurrence of `partner`, `trusted`, `collaborat`, `recommend`, `endorse` (case-insensitive) in the case study data, the teaser, or the logo wall section.
- No em dash (`—`) anywhere in new copy; hyphens only. No `gas chromatography`; say `mass spectrometry`.
- The KBC SM logo on the case study page has no `grayscale`, `invert` or `brightness` class; fixed height `h-16`, `w-auto`.
- No images on the case study page other than the KBC SM logo. No screenshots, charts, numbers about the data, or results.
- Code style: no semicolons, single quotes, functional components with default exports, `interface` for data shapes, minimal comments.
- Commits: local git identity (already set: `nikola.gajski@okultis.com`), no `Co-Authored-By` lines.

## Review Focus

1. A visitor on a phone at 375px: the facts row and architecture diagram must stack with no horizontal scroll. Pinned in Task 3 by a diagram-markup test; visual check in Task 6.
2. A screen-reader user tabbing the logo wall: exactly one focus stop for the KBC SM link, not two. Pinned in Task 5.
3. A search engine fetching `/work/ocular-biobank` without JavaScript: the prerendered HTML must contain the title, meta description and canonical. Pinned in Task 6 against `dist/`.
4. A dark-theme visitor: the blue KBC SM emblem sits on a light neutral tile so it stays legible unaltered. Pinned in Task 3 by asserting the tile class; visual check in Task 6.
5. Consent revocation: removing the client block and footnote must not break the build. Pinned in Task 2 by typing `client` and `logoWallFootnote` as optional and in Task 3 by rendering without them.

---

### Task 1: Test tooling and branch

**Files:**
- Modify: `package.json` (devDependencies, `test` script)
- Modify: `vite.config.ts` (vitest `test` block)
- Create: `src/entry-server.test.ts`

**Interfaces:**
- Produces: `npm test` runs Vitest once in the `node` environment over `src/**/*.test.ts`. Tests import `render` from `@/entry-server` (`render(url: string): { appHtml: string; head: string }`, already exists).

- [ ] **Step 1: Create the branch and commit the spec**

```bash
git checkout -b feat/ocular-biobank-case-study
git add docs/superpowers/specs/2026-11-03-ocular-biobank-case-study-design.md docs/superpowers/plans/2026-11-03-ocular-biobank-case-study.md
git commit -m "Add Ocular Biobank case study design and plan"
```

- [ ] **Step 2: Install Vitest**

Run: `npm install --save-dev vitest`

- [ ] **Step 3: Add the test script and Vitest config**

In `package.json` scripts add `"test": "vitest run"`. In `vite.config.ts` add `/// <reference types="vitest/config" />` at the top and inside `defineConfig` add:

```ts
test: {
  environment: 'node',
  include: ['src/**/*.test.ts'],
},
```

- [ ] **Step 4: Write the smoke test**

`src/entry-server.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'

describe('entry-server render', () => {
  it('renders the homepage with its title', () => {
    const { appHtml, head } = render('/')
    expect(appHtml).toContain('id="clients"')
    expect(head).toContain('<title')
  })
})
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `npm test`
Expected: 1 passed. If asset imports (`.png`, `.svg`) fail under Vitest, nothing extra should be needed since Vite resolves them; if `window` errors appear, the failing component must guard with `typeof window === 'undefined'` like `useTheme.ts` does.

- [ ] **Step 6: Confirm lint and type-check still pass**

Run: `npm run lint && npx tsc -b`
Expected: no errors. (`tsconfig.app.json` includes `src`, so the test file is type-checked; `vitest` ships its own types.)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/entry-server.test.ts
git commit -m "Add Vitest with an SSR render smoke test"
```

---

### Task 2: Case study data

**Files:**
- Create: `src/data/caseStudies.ts`
- Test: `src/data/caseStudies.test.ts`

**Interfaces:**
- Produces, in `src/data/caseStudies.ts`:

```ts
export interface CaseStudyFact { label: string; value: string }
export interface CaseStudyChapter { eyebrow: string; title: string; paragraphs: string[] }
export interface CaseStudyPillar { title: string; description: string }
export interface CaseStudyClient { name: string; logo: string; logoAlt: string }
export interface CaseStudyMeta { title: string; description: string; canonical: string }
export interface CaseStudyTeaser { eyebrow: string; title: string; linkLabel: string }
export interface CaseStudy {
  slug: string
  path: string
  name: string
  eyebrow: string
  title: string
  titleItalic: string
  standfirst: string
  facts: CaseStudyFact[]
  consortiumLine?: string
  client?: CaseStudyClient
  chapters: CaseStudyChapter[]
  pillarsEyebrow: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: CaseStudyPillar[]
  constraints: CaseStudyChapter
  stackEyebrow: string
  stack: string[]
  closingText: string
  closingLinkLabel: string
  closingLinkTo: string
  teaser: CaseStudyTeaser
  logoWallFootnote?: string
  meta: CaseStudyMeta
}
export const ocularBiobank: CaseStudy
export const forbiddenEndorsementPattern: RegExp  // /partner|trusted|collaborat|recommend|endorse/i
```

- [ ] **Step 1: Write the failing tests**

`src/data/caseStudies.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { forbiddenEndorsementPattern, ocularBiobank } from '@/data/caseStudies'

const hospitalPattern = /KBC|Sestre milosrdnice/

describe('ocularBiobank case study data', () => {
  it('lives at the agreed route', () => {
    expect(ocularBiobank.slug).toBe('ocular-biobank')
    expect(ocularBiobank.path).toBe('/work/ocular-biobank')
    expect(ocularBiobank.meta.canonical).toBe('https://okultis.com/work/ocular-biobank')
    expect(ocularBiobank.meta.title).toBe('Ocular Biobank · Okultis')
  })

  it('names the hospital only in the facts row, client block and footnote', () => {
    const { client, facts, logoWallFootnote, ...rest } = ocularBiobank
    expect(JSON.stringify(rest)).not.toMatch(hospitalPattern)
    expect(facts.filter((fact) => hospitalPattern.test(fact.value))).toHaveLength(1)
    expect(client?.name).toBe('KBC Sestre milosrdnice')
    expect(logoWallFootnote).toBe(
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
  })

  it('carries the consortium line verbatim', () => {
    expect(ocularBiobank.consortiumLine).toBe(
      'Delivered under contract N-215/2026 by the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/data/caseStudies.test.ts`
Expected: FAIL, module `@/data/caseStudies` not found.

- [ ] **Step 3: Create `src/data/caseStudies.ts`**

Import the logo with `import kbcsm from '@/assets/images/clients/kbcsm.svg'`. Export the interfaces above, `forbiddenEndorsementPattern = /partner|trusted|collaborat|recommend|endorse/i`, and `ocularBiobank` with these values. Copy is fixed by the spec; use it verbatim, hyphens only.

- `slug: 'ocular-biobank'`, `path: '/work/ocular-biobank'`, `name: 'Ocular Biobank'`
- `eyebrow: 'Case study · Healthcare research'`
- `title: "Turning a clinic's sample archive into a"`, `titleItalic: 'research instrument.'`
- `standfirst`: `An eye clinic had years of samples and the clinical history behind each one. We built the platform that turns that collection into searchable data, comparable groups and a prediction model trained on it.`
- `facts`: Client `KBC Sestre milosrdnice, Eye Clinic`; Engagement `Public tender, fixed scope`; Delivered `Platform, prediction model, documentation, EU hosting`; Year `2026`
- `consortiumLine`: the Global Constraints string
- `client`: `{ name: 'KBC Sestre milosrdnice', logo: kbcsm, logoAlt: 'KBC Sestre milosrdnice' }`
- `chapters[0]`: eyebrow `The starting point`, title `A collection worth building on`, paragraphs = the spec's "The starting point" two paragraphs, with the first sentence opening `The clinic had built something rare:` (not the hospital name)
- `chapters[1]`: eyebrow `What we did with the data`, title `Prepared once, on import`, paragraphs = the spec's single paragraph
- `pillarsEyebrow: 'What we built'`, `pillarsTitle: 'A research platform in three layers'`, `pillarsIntro: 'Ocular Biobank is a research platform in three layers, built for the people who run a hospital.'`
- `pillars`: the four spec blocks, titles exactly as in the test, descriptions = the spec text after each bold title
- `constraints`: eyebrow `Built under constraints`, title `The constraints shaped the architecture`, paragraphs = the spec's "Built under constraints" paragraph
- `stackEyebrow: 'Stack'`, `stack` = the test's array
- `closingText: 'Working on something similar?'`, `closingLinkLabel: 'Open a conversation'`, `closingLinkTo: '/contact'`
- `teaser`: eyebrow `Selected work`, title `Ocular Biobank: a research data platform and prediction model for an eye clinic.`, linkLabel `Read the case study`
- `logoWallFootnote`: the Global Constraints string
- `meta`: title `Ocular Biobank · Okultis`, description `How Okultis built a research data platform and disease prediction model for an eye clinic: biobank, group comparison, GDPR-first EU hosting.`, canonical as in the test

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- src/data/caseStudies.test.ts`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/data/caseStudies.ts src/data/caseStudies.test.ts
git commit -m "Add Ocular Biobank case study data"
```

---

### Task 3: Case study page, diagram and route

**Files:**
- Create: `src/components/ArchitectureDiagram.tsx`
- Create: `src/pages/CaseStudyPage.tsx`
- Modify: `src/AppRoutes.tsx`
- Test: `src/pages/CaseStudyPage.test.ts`

**Interfaces:**
- Consumes: `ocularBiobank`, `CaseStudy` from Task 2.
- Produces: `export default function ArchitectureDiagram()` rendering `<figure aria-label="System architecture" ...>`; `export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy })`; route `work/ocular-biobank` rendering `<CaseStudyPage caseStudy={ocularBiobank} />` inside the `<Layout />` route.

- [ ] **Step 1: Write the failing tests**

`src/pages/CaseStudyPage.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'
import { ocularBiobank } from '@/data/caseStudies'

const page = () => render('/work/ocular-biobank')

describe('case study page', () => {
  it('renders the masthead, facts and consortium line', () => {
    const { appHtml } = page()
    expect(appHtml).toMatch(/<h1[^>]*>.*Turning a clinic&#x27;s sample archive into a/)
    expect(appHtml).toContain('research instrument.')
    for (const fact of ocularBiobank.facts) expect(appHtml).toContain(fact.value)
    expect(appHtml).toContain('Delivered under contract N-215/2026 by the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.')
  })

  it('shows the client logo untouched on a neutral tile', () => {
    const { appHtml } = page()
    const img = appHtml.match(/<img[^>]*alt="KBC Sestre milosrdnice"[^>]*>/)?.[0] ?? ''
    expect(img).not.toBe('')
    expect(img).toMatch(/class="[^"]*\bh-16\b[^"]*\bw-auto\b/)
    expect(img).not.toMatch(/grayscale|invert|brightness/)
    expect(appHtml).toContain('data-logo-tile')
  })

  it('renders every chapter, pillar, the diagram, stack and closing link', () => {
    const { appHtml } = page()
    for (const chapter of ocularBiobank.chapters) expect(appHtml).toContain(chapter.title)
    for (const pillar of ocularBiobank.pillars) expect(appHtml).toContain(pillar.title.replace("'", '&#x27;'))
    expect(appHtml).toContain('aria-label="System architecture"')
    for (const item of ocularBiobank.stack) expect(appHtml).toContain(item)
    expect(appHtml).toMatch(/<a[^>]*href="\/contact"[^>]*>.*Open a conversation/)
  })

  it('has only the client logo as an image', () => {
    const { appHtml } = page()
    const mainHtml = appHtml.slice(appHtml.indexOf('<main'), appHtml.indexOf('</main>'))
    expect(mainHtml.match(/<img/g)).toHaveLength(1)
  })

  it('emits title, description and canonical in the head', () => {
    const { head } = page()
    expect(head).toContain('<title data-rh="true">Ocular Biobank · Okultis</title>')
    expect(head).toContain('href="https://okultis.com/work/ocular-biobank"')
    expect(head).toContain('property="og:type" content="article"')
    expect(head).toContain('"@type":"CreativeWork"')
  })
})
```

If `Layout.tsx` does not wrap the outlet in `<main>`, change the fourth test to slice between the header's closing `</header>` and the footer's opening `<footer` instead; do not change `Layout.tsx`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/pages/CaseStudyPage.test.ts`
Expected: FAIL, the route renders `NotFoundPage`.

- [ ] **Step 3: Create `src/components/ArchitectureDiagram.tsx`**

`export default function ArchitectureDiagram()`. A `<figure aria-label="System architecture">` containing a CSS grid (`grid-cols-1 md:grid-cols-4`) of four labelled boxes with `border border-border` and `text-text`: `Browser`, `Platform` with sub-label `API + web app`, `PostgreSQL`, `Model service` with sub-label `internal only`. Between boxes on desktop, small `text-text-muted` captions: `HTTPS`, `SQL`, `server to server`. A dashed frame (`border border-dashed border-border`) around the last three boxes labelled with an `eyebrow` `EU region · infrastructure as code`. No SVG required; no vendor names. Must not overflow at 375px.

- [ ] **Step 4: Create `src/pages/CaseStudyPage.tsx`**

`export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy })`. Copy the `EASE`, `stagger` and `fadeUp` variants and the outer `motion.div` with `pt-[calc(72px+80px)] pb-24` and the `max-w-[1120px] mx-auto px-6 md:px-10` container from `CareersPage.tsx`. Render, in order:

1. `Helmet`: `<title>{meta.title}</title>`, meta description, robots `index, follow`, canonical, `og:title`, `og:description`, `og:type` `article`, `og:url`, `og:site_name` `Okultis`, `og:image` the same logo URL `HomePage.tsx` uses, and a `<script type="application/ld+json">` with `{ '@context': 'https://schema.org', '@type': 'CreativeWork', name, description, url, author: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' }, datePublished: '2026-11-03' }` (replace the date with the ship date when it ships).
2. `p.eyebrow` with `caseStudy.eyebrow`; `h1.display` with `caseStudy.title`, a space, and `<span className="display-italic">{caseStudy.titleItalic}</span>`, sized like the Careers `h1`; the standfirst paragraph like Careers.
3. If `caseStudy.client` exists: a `div` with `data-logo-tile` and classes `inline-flex items-center rounded-md bg-[#f3efe6] px-5 py-4` holding `<img src={client.logo} alt={client.logoAlt} className="h-16 w-auto" />`.
4. Facts row: `dl` grid `grid-cols-2 md:grid-cols-4 gap-8`, each item `border-t border-rule pt-4` with `dt.eyebrow` label and `dd` value in `text-text font-medium`.
5. If `consortiumLine` exists: `p` in `text-[0.85rem] text-text-muted mt-6`.
6. Each of `chapters`: `section.mt-24` with eyebrow, `h2.display` title at `clamp(1.7rem,3.5vw,2.4rem)`, paragraphs `text-text-soft text-[1.05rem] leading-[1.7] max-w-[62ch]`.
7. Pillars: eyebrow, `h2` `pillarsTitle`, intro paragraph, then a grid `grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14` of `article` blocks with `h3.display` title and description paragraph.
8. Constraints chapter as in 6, followed by `<ArchitectureDiagram />` in `mt-12`.
9. Stack: eyebrow `stackEyebrow`, a `ul` `flex flex-wrap gap-x-8 gap-y-3` of `li` items in `text-text`.
10. Closing: `section.mt-24` with `p.display` `closingText` and `<Link to={closingLinkTo} className="ink-link text-text"><span>{closingLinkLabel}</span><span aria-hidden>→</span></Link>` like `EngagementsSection`.

- [ ] **Step 5: Add the route**

In `src/AppRoutes.tsx` import `CaseStudyPage` and `ocularBiobank`, add `<Route path="work/ocular-biobank" element={<CaseStudyPage caseStudy={ocularBiobank} />} />` before the `*` route.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- src/pages/CaseStudyPage.test.ts`
Expected: 5 passed.

- [ ] **Step 7: Lint and type-check**

Run: `npm run lint && npx tsc -b`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ArchitectureDiagram.tsx src/pages/CaseStudyPage.tsx src/pages/CaseStudyPage.test.ts src/AppRoutes.tsx
git commit -m "Add the Ocular Biobank case study page"
```

---

### Task 4: Homepage teaser and footer link

**Files:**
- Create: `src/components/sections/SelectedWorkSection.tsx`
- Modify: `src/pages/HomePage.tsx` (section order)
- Modify: `src/components/layout/Footer.tsx:22-29` (Site list)
- Test: `src/components/sections/SelectedWorkSection.test.ts`

**Interfaces:**
- Consumes: `ocularBiobank.teaser`, `ocularBiobank.path`.
- Produces: `export default function SelectedWorkSection()` with `id="work"`.

- [ ] **Step 1: Write the failing test**

`src/components/sections/SelectedWorkSection.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/sections/SelectedWorkSection.test.ts`
Expected: FAIL, `id="work"` not found.

- [ ] **Step 3: Create `SelectedWorkSection.tsx`**

`export default function SelectedWorkSection()`. A `section#work` with `py-16 md:py-20` (smaller than `SectionFrame`), the `max-w-[1120px] mx-auto px-6 md:px-10` container, `useScrollFadeIn` with the same transition classes `SectionFrame` uses. Inside: `p.eyebrow mb-5` with `teaser.eyebrow`, a `grid md:grid-cols-[1fr_auto] gap-8 items-end` with `h2.display` at `clamp(1.6rem,3vw,2.2rem) leading-[1.15] max-w-[560px]` holding `teaser.title`, and `<Link to={ocularBiobank.path} className="ink-link text-text"><span>{teaser.linkLabel}</span><span aria-hidden>→</span></Link>`.

- [ ] **Step 4: Wire it into the homepage and footer**

In `HomePage.tsx` import and place `<SelectedWorkSection />` between `<ServicesSection />` and `<ProcessSection />`. In `Footer.tsx` add `<li><Link to="/work/ocular-biobank" className="text-[0.95rem] text-text-soft hover:text-text transition-colors">Work</Link></li>` after the Clients item.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- src/components/sections/SelectedWorkSection.test.ts`
Expected: 2 passed.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/SelectedWorkSection.tsx src/components/sections/SelectedWorkSection.test.ts src/pages/HomePage.tsx src/components/layout/Footer.tsx
git commit -m "Add selected work teaser and footer link"
```

---

### Task 5: Logo wall link, heading and footnote

**Files:**
- Modify: `src/data/clients.ts` (`Client.href`, KBC SM entry)
- Modify: `src/components/sections/ClientsSection.tsx`
- Test: `src/components/sections/ClientsSection.test.ts`

**Interfaces:**
- Consumes: `ocularBiobank.logoWallFootnote`, `ocularBiobank.path`, `forbiddenEndorsementPattern`.
- Produces: `Client` gains `href?: string`; `LogoRow` gains `{ ariaHidden?: boolean }`.

- [ ] **Step 1: Write the failing tests**

`src/components/sections/ClientsSection.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { render } from '@/entry-server'
import { forbiddenEndorsementPattern } from '@/data/caseStudies'

const clientsSection = () => {
  const { appHtml } = render('/')
  const start = appHtml.indexOf('id="clients"')
  return appHtml.slice(start, appHtml.indexOf('id="about"', start))
}

describe('clients logo wall', () => {
  it('uses the reworded heading and no endorsement wording', () => {
    const section = clientsSection()
    expect(section).toContain('Working across healthcare, culture, mobility and hospitality.')
    expect(section).not.toMatch(forbiddenEndorsementPattern)
  })

  it('links the KBC SM tile to the case study with one focus stop', () => {
    const section = clientsSection()
    const links = section.match(/<a[^>]*href="\/work\/ocular-biobank"[^>]*>/g) ?? []
    expect(links).toHaveLength(2)
    expect(links[0]).not.toContain('tabindex="-1"')
    expect(links[1]).toContain('tabindex="-1"')
    expect(section).toContain('Case study')
    expect(section.match(/aria-hidden="true"/g)?.length ?? 0).toBeGreaterThanOrEqual(1)
  })

  it('keeps the logo rendering unchanged and adds the consortium footnote', () => {
    const section = clientsSection()
    const img = section.match(/<img[^>]*alt="KBC Sestre milosrdnice"[^>]*>/)?.[0] ?? ''
    expect(img).toContain('grayscale')
    expect(section).toContain(
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    )
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/components/sections/ClientsSection.test.ts`
Expected: FAIL on the heading and on zero links.

- [ ] **Step 3: Update `clients.ts`**

Add `href?: string` to `Client`. On the KBC SM entry add `href: ocularBiobank.path` (import from `@/data/caseStudies`).

- [ ] **Step 4: Update `ClientsSection.tsx`**

- Heading text becomes `Working across healthcare, culture, mobility and hospitality.`
- `LogoRow({ ariaHidden = false }: { ariaHidden?: boolean })`. Render the second `<LogoRow ariaHidden />` with `aria-hidden="true"` on its root `div`.
- For a client with `href`, render the tile as `<Link to={client.href} tabIndex={ariaHidden ? -1 : undefined} className="... group/tile">` with the same layout classes as the `div`, and add under the sector eyebrow `<span className="ink-link mt-3 text-[0.8rem] text-text">Case study</span>`. Image classes unchanged.
- After the marquee `div`, inside a `max-w-[1120px] mx-auto px-6 md:px-10 mt-6` container, if `ocularBiobank.logoWallFootnote` exists render `<p className="text-[0.8rem] text-text-muted">{ocularBiobank.logoWallFootnote}</p>`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- src/components/sections/ClientsSection.test.ts`
Expected: 3 passed. If React Router renders `tabindex="-1"` differently in SSR, match on `tabindex="-1"` exactly as emitted and adjust the assertion string, not the behaviour.

- [ ] **Step 6: Commit**

```bash
git add src/data/clients.ts src/components/sections/ClientsSection.tsx src/components/sections/ClientsSection.test.ts
git commit -m "Link the KBC SM tile to the case study and add the consortium footnote"
```

---

### Task 6: Prerender, sitemap, build and visual check

**Files:**
- Modify: `scripts/prerender.mjs:6`
- Modify: `public/sitemap.xml`
- Modify: `tsconfig.app.json` (`types`)
- Test: `src/routes.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `dist/work/ocular-biobank/index.html` after `npm run build`.

- [ ] **Step 1: Write the failing test**

`src/routes.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/routes.test.ts`
Expected: FAIL on both assertions.

- [ ] **Step 3: Register the route**

In `tsconfig.app.json` change `"types": ["vite/client"]` to `"types": ["vite/client", "node"]` so the test's `node:fs` import type-checks under `tsc -b`. Add `'/work/ocular-biobank'` to `routes` in `scripts/prerender.mjs`. Add to `public/sitemap.xml` a `<url>` with `loc` `https://okultis.com/work/ocular-biobank`, `lastmod` today's date, `changefreq` `yearly`, `priority` `0.7`.

- [ ] **Step 4: Run the whole suite, lint and build**

Run: `npm test && npm run lint && npm run build`
Expected: all tests pass, no lint errors, build succeeds.

- [ ] **Step 5: Verify the prerendered output**

Run: `grep -c "Ocular Biobank · Okultis" dist/work/ocular-biobank/index.html && grep -o 'rel="canonical" href="[^"]*"' dist/work/ocular-biobank/index.html`
Expected: a count of at least 1 and the canonical `https://okultis.com/work/ocular-biobank`.

- [ ] **Step 6: Visual check in both themes and at phone width**

Run the dev server through the project's launch config or `npm run dev`, open `/work/ocular-biobank` and `/`, and check: no horizontal scroll at 375px wide; the KBC SM emblem is blue on a light tile in dark theme; the teaser sits between Practice and How we work; the KBC SM tile on the wall shows "Case study" and navigates. Fix layout issues in the component that owns them.

- [ ] **Step 7: Commit**

```bash
git add scripts/prerender.mjs public/sitemap.xml tsconfig.app.json src/routes.test.ts
git commit -m "Prerender and index the case study route"
```
