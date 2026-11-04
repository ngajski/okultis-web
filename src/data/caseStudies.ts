import kbcsm from '@/assets/images/clients/kbcsm.svg'

export interface CaseStudyFact {
  label: string
  value: string
}

export interface CaseStudyChapter {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export interface CaseStudyPillar {
  title: string
  description: string
}

export interface CaseStudyClient {
  name: string
  logo: string
  logoAlt: string
}

export interface CaseStudyReference {
  client: CaseStudyClient
  consortiumLine: string
  logoWallFootnote: string
}

export interface CaseStudyMeta {
  title: string
  description: string
  canonical: string
  datePublished: string
}

export interface CaseStudyTeaser {
  eyebrow: string
  title: string
  linkLabel: string
}

export interface CaseStudy {
  slug: string
  path: string
  name: string
  eyebrow: string
  title: string
  titleItalic: string
  standfirst: string
  facts: CaseStudyFact[]
  chapters: CaseStudyChapter[]
  pillarsEyebrow: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: CaseStudyPillar[]
  constraints: CaseStudyChapter
  closingText: string
  closingLinkLabel: string
  closingLinkTo: string
  teaser: CaseStudyTeaser
  reference?: CaseStudyReference
  meta: CaseStudyMeta
}

export const forbiddenEndorsementPattern = /partner|trusted|collaborat|recommend|endorse/i

export const ocularBiobank: CaseStudy = {
  slug: 'ocular-biobank',
  path: '/work/ocular-biobank',
  name: 'Ocular Biobank',
  eyebrow: 'Case study · Healthcare research',
  title: "Turning a clinic's sample archive into a",
  titleItalic: 'research instrument.',
  standfirst:
    'An eye clinic had years of samples and the clinical history behind each one. We built the platform that turns that collection into searchable data, comparable groups and a prediction model trained on it.',
  facts: [
    { label: 'Client', value: 'KBC Sestre milosrdnice, Eye Clinic' },
    { label: 'Engagement', value: 'Public tender, fixed scope' },
    { label: 'Delivered', value: 'Platform, prediction model, documentation, EU hosting' },
    { label: 'Year', value: '2026' },
  ],
  chapters: [
    {
      eyebrow: 'The starting point',
      title: 'A collection worth building on',
      paragraphs: [
        "The clinic had built something rare: a collection of eye fluid and serum samples from patients with glaucoma, PEX syndrome, diabetic retinopathy and macular degeneration, each sample paired with the patient's full clinical picture: diagnoses and stages, other conditions, medications, surgeries. The samples had been analysed with Raman spectroscopy and mass spectrometry. Years of careful work, and a real foundation for research into biomarkers and early diagnosis.",
        'The research questions that collection could answer were bigger than the tools around it. The clinical records lived in wide spreadsheet exports, a column for every clinical field. Spectra came as one file per measurement. Each new study began with the same preparation, done by hand, before a single comparison could be run. Group comparisons and prediction were the goal, and they needed a platform under them.',
      ],
    },
    {
      eyebrow: 'What we did with the data',
      title: 'Prepared once, on import',
      paragraphs: [
        'We turned those exports into a single structured database. The importer reads the clinical workbooks directly, unpivots the wide tables into a normalised schema, resolves duplicates, and tells "absent" apart from "not measured" so counts and comparisons are honest. Spectra and mass spectrometry results are linked to the same patient record. From then on the preparation happens once, on import, and every question after that starts from clean data.',
      ],
    },
  ],
  pillarsEyebrow: 'What we built',
  pillarsTitle: 'A research platform in three layers',
  pillarsIntro: 'Ocular Biobank is a research platform in three layers, built for the people who run a hospital.',
  pillars: [
    {
      title: 'A biobank you can ask questions of',
      description:
        "Every patient record carries their diagnoses and stages, other conditions, medications and surgeries, linked to their Raman spectra and mass spectrometry results. Researchers filter by disease, stage, treatment or any combination, open a patient's full profile, and export exactly the cohort they need. Import handles the clinic's own spreadsheet exports and spectra files, so new data flows in without a developer in the loop.",
    },
    {
      title: 'Comparison across groups',
      description:
        'Pick two cohorts, say a disease group and controls, or two stages of the same disease, and compare their spectral and biomarker profiles side by side. What used to be a one-off preparation for each study is now a query.',
    },
    {
      title: "A prediction model trained on the clinic's own data",
      description:
        "Using the spectra in the biobank, we trained models that score a patient's measurements against the leading eye diseases. The model runs as an internal service behind the platform: a researcher uploads spectra, gets a prediction per disease, and sees which model produced it. As the biobank grows, the model can be retrained on the larger set.",
    },
    {
      title: 'Built for a hospital',
      description:
        'Role-based access for researchers, supervisors and administrators. Every access and change is audit-logged. Data stays in the EU, encrypted, on infrastructure defined as code. GDPR was a design input, not a checklist at the end.',
    },
  ],
  constraints: {
    eyebrow: 'Built under constraints',
    title: 'The constraints shaped the architecture',
    paragraphs: [
      "An open public tender. A fixed 60-day delivery term. A hospital's security expectations. GDPR, with hosting pinned to the EU. The constraints shaped the architecture rather than slowing it down: one internet-facing service that owns authentication, the database and the audit log; an ML prediction model that only the platform can reach; infrastructure that can be rebuilt from code in a new project in an afternoon.",
    ],
  },
  closingText: 'Working on something similar?',
  closingLinkLabel: 'Open a conversation',
  closingLinkTo: '/contact',
  teaser: {
    eyebrow: 'Selected work',
    title: 'Ocular Biobank: a research data platform and prediction model for an eye clinic.',
    linkLabel: 'Read the case study',
  },
  // Consent revocation: delete this block and the kbcsm import above (spec: Revocation path)
  reference: {
    client: { name: 'KBC Sestre milosrdnice', logo: kbcsm, logoAlt: 'KBC Sestre milosrdnice' },
    consortiumLine:
      'Delivered under contract N-215/2026 by the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
    logoWallFootnote:
      'KBC Sestre milosrdnice: contract N-215/2026 concluded with the consortium of Okultis d.o.o. and Alpha Signal Analytics d.o.o.',
  },
  meta: {
    title: 'Ocular Biobank · Okultis',
    description:
      'How Okultis built a research data platform and disease prediction model for an eye clinic: biobank, group comparison, GDPR-first EU hosting.',
    canonical: 'https://okultis.com/work/ocular-biobank',
    datePublished: '2026-11-04',
  },
}
