# Ocular Biobank case study - design

Date: 2026-11-03
Status: approved, implemented on feat/ocular-biobank-case-study

## Intent

Add the first case study to the Okultis marketing site: the research data
platform built for the Eye Clinic of KBC Sestre milosrdnice (internally
"KBC SM", repos `kbcsm-app`, `kbcsm-analytics`, `kbcsm-infra`). The case
study is a broader showcase of what Okultis builds, not only a tender
reference. It must be shareable as its own URL (bids, LinkedIn) and read as
part of the existing editorial site, not as a bolt-on.

## Goals

- A dedicated page at `/work/ocular-biobank` that tells the product story in
  the site's voice.
- A short "Selected work" teaser on the homepage that links to it.
- Full compliance with the hospital's consent letter (below), with the
  client-specific content isolated so it can be removed in one edit if the
  consent is revoked.
- The page is prerendered, indexed and shareable like every other route.

## Non-goals

- No work index page, no "Work" item in the header. One case study exists;
  structure for more comes later.
- No screenshots, UI recordings, charts of results, accuracy figures, or any
  project documentation. Capabilities are described, findings are not.
- No testimonial or quote.
- No description of the consortium split of work. The product is described
  as one whole built by Okultis; the consortium is named once as a legal
  fact.
- No changes to the KBC SM logo rendering on the homepage logo wall (owner's
  decision, see Risks).

## Anti-goals

- Any sentence that reads as criticism of the hospital or its researchers.
  The story is told from the solution's side: what the collection made
  possible, what the platform does. Nothing about where files were or how
  slow anything was.
- Any wording that implies endorsement, partnership or ongoing collaboration
  with KBC SM ("partner", "trusted by", "in collaboration with", "recommends").
- Any client name in the URL.

## Legal constraints (binding)

Source: KBC SM consent letter, KLASA 710-06/26-09/271, 18 August 2026, and
public procurement contract N-215/2026.

1. The KBC SM name and logo may be used only as a business reference arising
   from contract N-215/2026, on websites, presentation material and bids.
2. Every mention of the reference must state clearly that the contract was
   concluded with the consortium of Okultis d.o.o. and Alpha Signal
   Analytics d.o.o.
3. The logo may be used only in its original form: no change to colours,
   proportions or elements. On the case study page it is rendered untouched
   (no grayscale, no dark-mode inversion, no recolouring). The logo file is
   `src/assets/images/clients/kbcsm.svg` (blue `#1F4497` emblem and
   wordmark).
4. Nothing may suggest KBC SM endorses, promotes or sponsors Okultis, or
   that a partnership or ongoing relationship exists beyond the contract.
5. The consent does not cover publication of personal, patient or health
   data, project implementation documentation, analysis results, scientific
   findings or hospital documentation. Hence: no screenshots, no results, no
   numbers about the data, no quotes from project docs.
6. The consent is revocable at any time with 15 days to remove the name and
   logo. All KBC SM-specific strings live in two data files (see Architecture
   and Revocation path) so removal is two small edits with no component
   changes.

Accuracy constraint: the tender title mentions gas chromatography, but the
platform ingests LC-MS data (liquid chromatography with mass spectrometry).
The page says "Raman spectroscopy and mass spectrometry" in our own words and
never quotes the tender title.

What counts as public: the contract number, the 60-day term, the fixed-scope
nature of the engagement and the four disease names all come from the
public procurement notice and contract published in the official
procurement gazette (EOJN 2026/S JavPoz-0001048), not from project
documentation, so they may be stated. Descriptions of the data stay generic
(no counts, no column names, no file names).

## Decisions made with the owner

| Topic | Decision |
|---|---|
| Shape | Dedicated page plus homepage teaser (option B of three mocked) |
| Route | `/work/ocular-biobank` |
| Product name on the page | "Ocular Biobank" |
| Client naming | Once in the facts row at the top, plus the logo (its alt text), the logo wall tile and its footnote. The consortium line names the contract and the consortium, not the client. Nowhere else by name |
| Story framing | Positive, solution-side. Three pillars: biobank, group comparison, prediction model. Plus a "built for a hospital" block |
| Before-state facts (owner) | Data was in Excel, no database; the researcher cleaned data by hand; prediction was not possible; group comparison was not possible; records included other diseases and medications |
| What we did with data (owner) | Duplicate removal; unpivoting very wide tables into a normalised schema |
| Prediction (owner) | A prediction model trained on the clinic's data; group comparison tools |
| Testimonial | None |
| Consortium split | Not described |
| Logo wall | Logo rendering unchanged. Add a link from the KBC SM tile to the case study and a consortium footnote under the wall |
| Header nav | Unchanged |
| Footer | Add a "Work" link to `/work/ocular-biobank` under "Site" (my call) |
| Technology names | None on the page (owner, 2026-11-04). Diagram uses product-level names: Researchers, Biobank platform, Biobank DB, ML prediction model |
| Metadata | Title "Ocular Biobank · Okultis", description, canonical, Open Graph, schema.org CreativeWork (my call) |

## Page structure

Route `/work/ocular-biobank`, rendered inside the existing `<Layout />`.
Follows the non-home page pattern of `CareersPage.tsx`: top padding under
the fixed header, `max-w-[1120px]` container, Framer Motion stagger and
fade-up on first paint, `eyebrow` / `display` / `display-italic` /
`ink-link` typography classes from `src/index.css`. Body sections use the
same rhythm as `SectionFrame` (quiet eyebrow, display heading, generous
whitespace) but as an `h1`-led article, not a homepage section.

Order, top to bottom:

1. **Masthead.** Eyebrow "Case study · Healthcare research". `h1` display
   title with an italic turn, e.g. "Turning a clinic's sample archive into a
   *research instrument.*" Standfirst of two or three sentences. The KBC SM
   logo, original colours, at a modest size (height around 56 to 72px) near
   the facts row, on a neutral surface so the blue reads in both themes.
2. **Facts row.** Four items with top rules, like the `fact` blocks in the
   mockup: Client "KBC Sestre milosrdnice, Eye Clinic"; Engagement "Public
   tender, fixed scope"; Delivered "Platform, prediction model,
   documentation, EU hosting"; Year "2026".
3. **Consortium line.** One quiet `text-text-muted` sentence directly under
   the facts: "Delivered under contract N-215/2026 by the consortium of
   Okultis d.o.o. and Alpha Signal Analytics d.o.o."
4. **The starting point.** Chapter copy below.
5. **What we did with the data.** Chapter copy below.
6. **What we built.** Three pillars plus "Built for a hospital", laid out as
   four blocks in a two-column grid on desktop, single column on mobile.
7. **Built under constraints.** Short chapter plus a plain architecture
   diagram.
8. (removed 2026-11-04, owner decision: no stack strip, no technology names on the page)
9. **Closing.** "Working on something similar?" with an `ink-link` to
   `/contact`. No sales pitch.

## Copy (approved drafts)

The owner approved the drafts below in conversation. The builder may tighten
sentences but must keep meaning, tone and every constraint above. Headings
are suggestions.

### The starting point

The Eye Clinic of KBC Sestre milosrdnice had built something rare: a
collection of eye fluid and serum samples from patients with glaucoma, PEX
syndrome, diabetic retinopathy and macular degeneration, each sample paired
with the patient's full clinical picture: diagnoses and stages, other
conditions, medications, surgeries. The samples had been analysed with Raman
spectroscopy and mass spectrometry. Years of careful work, and a real
foundation for research into biomarkers and early diagnosis.

The research questions that collection could answer were bigger than the
tools around it. The clinical records lived in wide spreadsheet exports, a
column for every clinical field. Spectra came as one file per measurement.
Each new study began with the same preparation, done by hand, before a
single comparison could be run. Group comparisons and prediction were the
goal, and they needed a platform under them.

Note for the builder: the clinic is named here in the first sentence. That
is the "once in the facts row" mention moved into prose; keep one or the
other, not both. Preferred: keep the facts row mention and open this chapter
with "The clinic had built something rare".

### What we did with the data

We turned those exports into a single structured database. The importer
reads the clinical workbooks directly, unpivots the wide tables into a
normalised schema, resolves duplicates, and tells "absent" apart from "not
measured" so counts and comparisons are honest. Spectra and mass
spectrometry results are linked to the same patient record. From then on the
preparation happens once, on import, and every question after that starts
from clean data.

### What we built

Ocular Biobank is a research platform in three layers.

**A biobank you can ask questions of.** Every patient record carries their
diagnoses and stages, other conditions, medications and surgeries, linked to
their Raman spectra and mass spectrometry results. Researchers filter by
disease, stage, treatment or any combination, open a patient's full profile,
and export exactly the cohort they need. Import handles the clinic's own
spreadsheet exports and spectra files, so new data flows in without a
developer in the loop.

**Comparison across groups.** Pick two cohorts, say a disease group and
controls, or two stages of the same disease, and compare their spectral and
biomarker profiles side by side. What used to be a one-off preparation for
each study is now a query.

**A prediction model trained on the clinic's own data.** Using the spectra
in the biobank, we trained models that score a patient's measurements
against the leading eye diseases. The model runs as an internal service
behind the platform: a researcher uploads spectra, gets a prediction per
disease, and sees which model produced it. As the biobank grows, the model
can be retrained on the larger set.

**Built for a hospital.** Role-based access for researchers, supervisors and
administrators. Every access and change is audit-logged. Data stays in the
EU, encrypted, on infrastructure defined as code. GDPR was a design input,
not a checklist at the end.

### Built under constraints

An open public tender. A fixed 60-day delivery term. A hospital's security
expectations. GDPR, with hosting pinned to the EU. The constraints shaped
the architecture rather than slowing it down: one internet-facing service
that owns authentication, the database and the audit log; a model service
that only the platform can reach; infrastructure that can be rebuilt from
code in a new project in an afternoon.

### Closing

Working on something similar? Open a conversation. (link to `/contact`)

## Architecture diagram

A plain inline SVG or a CSS grid of labelled boxes, drawn in the site's
tokens (`--color-border`, `--color-text`, `--color-accent`), legible in light
and dark themes. Boxes: Researchers (web browser), Biobank platform (web app
+ API), Biobank DB (sample records), ML prediction model (internal only).
Arrows: Researchers to Biobank platform (HTTPS), Biobank platform to Biobank
DB (reads and writes), Biobank platform to ML prediction model (server to
server). A dashed frame labelled "Infrastructure in a GDPR-compliant EU
region" around everything but the researchers. No vendor logos, no
technology or cloud product names inside the diagram. Keep it to one row on
desktop, stacked on mobile. The diagram describes our own system design,
which the contract leaves with Okultis; it must not reproduce any diagram
from the project's documentation.

## Homepage teaser

New section component `SelectedWorkSection`, placed after `ClientsSection`
and before `AboutSection` in `HomePage.tsx`. Compact: `py` smaller than
`SectionFrame`'s, eyebrow "Selected work", one display line "Ocular Biobank:
a research data platform and prediction model for an eye clinic.", and an
`ink-link` "Read the case study" to `/work/ocular-biobank`. The client is
not named in the teaser. Uses `useScrollFadeIn` like the other sections.

## Logo wall changes (`ClientsSection.tsx`, `clients.ts`)

- The KBC SM tile becomes a `Link` to `/work/ocular-biobank`. Add an
  optional `href` to the `Client` interface; tiles without it render as
  today. The linked tile shows a small "Case study" `ink-link` style line
  under the sector eyebrow so the link is discoverable without hovering.
- The section heading changes from "Trusted across healthcare, culture,
  mobility and hospitality." to "Working across healthcare, culture,
  mobility and hospitality." (owner decision, 2026-11-03).
- `LogoRow` is rendered twice for the marquee. The second copy gets
  `aria-hidden="true"` and its links `tabIndex={-1}` so there is one focus
  stop. The marquee already pauses on hover, which is enough to click.
- Logo rendering (grayscale, dark-mode treatment) is unchanged for every
  tile including KBC SM. Owner's decision.
- A footnote under the marquee, inside the `max-w-[1120px]` container,
  `text-[0.8rem] text-text-muted`: "KBC Sestre milosrdnice: contract
  N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha
  Signal Analytics d.o.o." Sourced from the same data file as the page.

## Architecture (code)

- `src/data/caseStudies.ts`: a `CaseStudy` interface and a single exported
  `ocularBiobank` object holding every string on the page: slug, name,
  eyebrow, title, standfirst, facts, chapters, pillars, stack, metadata
  (title, description, Open Graph), and one optional `reference` block that
  groups everything consent-dependent: the client (`name`, `logo` import,
  `logoAlt`), the consortium line and the logo wall footnote string.
- `src/data/clients.ts` keeps the KBC SM tile entry as today, plus the new
  `href`. It does not derive from `caseStudies.ts`; the two files are
  independent on purpose so the wall never depends on the page.

### Revocation path

Block deletions in the two data files, no component changes:

- `caseStudies.ts`: delete the `reference` block and the `kbcsm` import, and
  reword the facts row "Client" value to "A university eye clinic".
- `clients.ts`: delete the KBC SM entry and the `kbcsm` import (the tile
  disappears entirely).

Both spots carry a one-line "Consent revocation" comment. The page stays live
under its product name. The tests are written to stay green after these
edits: assertions about the hospital, its logo, the consortium line and the
footnote are skipped or inverted when the `reference` block or the KBC SM
entry is absent, and `CaseStudyPage.revocation.test.ts` renders the page in
its revoked state.
- `src/pages/CaseStudyPage.tsx`: renders a `CaseStudy`. Today it is wired to
  `ocularBiobank` directly; a slug lookup can come when there is a second
  case study. Route `work/ocular-biobank` in `AppRoutes.tsx`.
- `src/components/sections/SelectedWorkSection.tsx` reads title and link
  from the same data object.
- `scripts/prerender.mjs`: add `/work/ocular-biobank` to `routes`.
- `public/sitemap.xml`: add the URL with `lastmod` set to the ship date,
  `changefreq` yearly, `priority` 0.7.
- Header `EXTERNAL_NAV_ITEMS` unchanged. Footer gains a "Work" link.

## Metadata

- `<title>Ocular Biobank · Okultis</title>`
- Description, about 150 characters: "How Okultis built a research data
  platform and disease prediction model for an eye clinic: biobank, group
  comparison, GDPR-first EU hosting."
- Canonical `https://okultis.com/work/ocular-biobank`, robots index/follow.
- Dates: the facts row "Year" is 2026 (contract signed May 2026, delivered
  the same year). `datePublished` and the sitemap `lastmod` are the day the
  page ships, set by the builder at build time.
- Open Graph: title, description, `og:type` article, `og:url`, the existing
  Okultis logo as `og:image` (no new image; a dedicated share image is a
  later task).
- JSON-LD `CreativeWork` with `name`, `description`, `url`, `author` as the
  Okultis `Organization`, `datePublished` as the ship date. No `about` or
  `sponsor` referencing the hospital.

## Visual notes

- Same palette, type scale and motion as `CareersPage`. No new colours.
- The KBC SM logo is rendered at a fixed height (64px, `h-16`) with
  `w-auto`, never stretched or cropped, so its proportions stay original.
- The KBC SM logo must not inherit the logo wall's `grayscale` or
  `dark:invert` classes anywhere on the case study page. In dark theme place
  it on a light `bg-bg-inverse`-free neutral tile (for example a
  `#f3efe6` rounded surface with padding) so the blue emblem stays legible
  without being altered.
- Mobile: single column throughout, 16px side gutter already provided by the
  container, no horizontal scroll from the diagram.
- Dashes in copy are plain hyphens, never em dashes (house rule).

## Left to the builder

- Exact section spacing, heading sizes within the existing clamp scale, and
  the diagram's drawing.
- Whether the four "What we built" blocks carry small Lucide icons like the
  services grid; acceptable either way.
- Framer Motion variants for in-view reveals on the chapters (reuse
  `useScrollFadeIn` or the `fadeUp` pattern).
- Test the page at phone width, in both themes, and through `npm run build`
  so the prerender includes the new route.

## Risks

- The homepage logo wall renders the KBC SM logo grayscale via CSS, which
  the consent letter's "original form" clause could be read to forbid. The
  owner chose to leave it unchanged. The case study page itself complies.
- The clinic is named in the first sentence of "The starting point" draft
  and in the facts row; see the note in that chapter to keep one.
- The logo wall heading used to read "Trusted across healthcare, culture,
  mobility and hospitality". Resolved: it changes to "Working across ..."
  (owner decision), see Logo wall changes.

## Open items (owner)

None. The logo wall heading decision is recorded under Logo wall changes.

## Verification before completion

- `npm run lint` and `npm run build` pass; `dist/work/ocular-biobank/index.html`
  exists with the page title in its head.
- Every occurrence of "KBC" or "Sestre milosrdnice" in `src/` traces to
  `clients.ts` or `caseStudies.ts`.
- The page contains no image other than the Okultis and KBC SM logos.
- Search the rendered copy of the case study page, teaser and footnote for
  "partner", "trusted", "collaborat", "recommend", "endorse": none present.
  The logo wall heading no longer contains "Trusted".
