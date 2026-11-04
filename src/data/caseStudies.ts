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
    'An eye clinic had years of samples and the clinical history behind each one. We built a platform that lets its researchers search that data, compare patient groups and run a prediction model trained on it.',
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
        "The clinic spent years collecting eye fluid and serum samples from patients with glaucoma, PEX syndrome, diabetic retinopathy and macular degeneration. Each sample comes with the patient's clinical history, including diagnoses and stages, other conditions, medications and surgeries. The samples were analysed with Raman spectroscopy and mass spectrometry. That makes the collection a strong base for research into biomarkers and early diagnosis.",
        'The clinical records came as spreadsheet exports with a column for every field, and the spectra came as one file per measurement. Every new study started with the same manual cleanup. To compare patient groups or try prediction, the researchers needed a proper platform behind the data.',
      ],
    },
    {
      eyebrow: 'What we did with the data',
      title: 'Prepared once, on import',
      paragraphs: [
        'We moved those exports into one database. The importer reads the clinical spreadsheets directly, turns the very wide tables into a clean structure and removes duplicates. It also keeps "absent" and "not measured" apart, so the counts stay correct. Spectra and mass spectrometry results are linked to the same patient. The cleanup now happens once, during import, and every study after that starts with clean data.',
      ],
    },
  ],
  pillarsEyebrow: 'What we built',
  pillarsTitle: 'What the platform does',
  pillarsIntro: 'Ocular Biobank has three main parts, and all of them were built with hospital rules in mind.',
  pillars: [
    {
      title: 'A searchable biobank',
      description:
        "Each patient record holds diagnoses and stages, other conditions, medications and surgeries, along with the Raman spectra and mass spectrometry results. Researchers can filter by disease, stage or treatment, open a patient's full profile and export the group they need. They can also import new spreadsheets and spectra files themselves, without asking a developer.",
    },
    {
      title: 'Comparing groups',
      description:
        'Researchers pick two groups, such as a disease group and a control group, or two stages of the same disease, and compare their spectra side by side. The preparation that each comparison used to need is already done.',
    },
    {
      title: "A prediction model trained on the clinic's data",
      description:
        "We trained models on the spectra in the biobank to score a patient's measurements against the leading eye diseases. A researcher uploads spectra and gets a prediction for each disease, along with the model that produced it. The model can be retrained as the biobank grows.",
    },
    {
      title: 'Built for a hospital',
      description:
        'Researchers, supervisors and administrators each get their own level of access. Every access and change is recorded in an audit log. The data is encrypted and stays in the EU, and we designed for GDPR from the start.',
    },
  ],
  constraints: {
    eyebrow: 'Built under constraints',
    title: 'What shaped the architecture',
    paragraphs: [
      'This was an open public tender with a fixed 60-day delivery term, for a hospital with strict security expectations. GDPR meant hosting in the EU. Those limits shaped the design. One service faces the internet and handles login, the database and the audit log. The ML prediction model can only be reached through the platform. All the infrastructure is defined in code, so it can be rebuilt when needed.',
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
      'How Okultis built a research data platform and disease prediction model for an eye clinic, with group comparison and GDPR-compliant EU hosting.',
    canonical: 'https://okultis.com/work/ocular-biobank',
    datePublished: '2026-11-04',
  },
}
