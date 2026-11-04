import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import type { CaseStudy, CaseStudyChapter } from '@/data/caseStudies'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
}

const OG_IMAGE_URL = 'https://okultis.com/assets/images/logo/okultis-software-systems-vertical.webp'

const sectionTitleClassName = 'display text-[clamp(1.7rem,3.5vw,2.4rem)] leading-[1.05] text-text max-w-[24ch]'
const bodyClassName = 'text-text-soft text-[1.05rem] leading-[1.7] max-w-[62ch]'

function ChapterContent({ chapter }: { chapter: CaseStudyChapter }) {
  return (
    <>
      <p className="eyebrow mb-6">{chapter.eyebrow}</p>
      <h2 className={sectionTitleClassName}>{chapter.title}</h2>
      <div className="mt-8 space-y-6">
        {chapter.paragraphs.map((paragraph) => (
          <p key={paragraph} className={bodyClassName}>
            {paragraph}
          </p>
        ))}
      </div>
    </>
  )
}

export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const { meta, client } = caseStudy

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.name,
    description: meta.description,
    url: meta.canonical,
    author: { '@type': 'Organization', name: 'Okultis', url: 'https://okultis.com' },
    datePublished: '2026-11-03',
  }

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:site_name" content="Okultis" />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
      </Helmet>

      <motion.div
        className="pt-[calc(72px+80px)] pb-24 relative"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
          <motion.p variants={fadeUp} className="eyebrow mb-6">
            {caseStudy.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="display text-[clamp(2.6rem,6.5vw,4.2rem)] leading-[0.98] text-text max-w-[20ch]"
          >
            {caseStudy.title}{' '}
            <span className="display-italic">{caseStudy.titleItalic}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[52ch] text-text-soft text-[1.05rem] md:text-[1.15rem] leading-[1.6]"
          >
            {caseStudy.standfirst}
          </motion.p>

          {client && (
            <motion.div variants={fadeUp} className="mt-12">
              <div
                data-logo-tile
                className="inline-flex items-center rounded-md bg-[#f3efe6] px-5 py-4"
              >
                <img src={client.logo} alt={client.logoAlt} className="h-16 w-auto" />
              </div>
            </motion.div>
          )}

          <motion.dl
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {caseStudy.facts.map((fact) => (
              <div key={fact.label} className="border-t border-rule pt-4">
                <dt className="eyebrow mb-3">{fact.label}</dt>
                <dd className="text-text font-medium">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>

          {caseStudy.consortiumLine && (
            <motion.p variants={fadeUp} className="text-[0.85rem] text-text-muted mt-6">
              {caseStudy.consortiumLine}
            </motion.p>
          )}

          {caseStudy.chapters.map((chapter) => (
            <motion.section key={chapter.title} variants={fadeUp} className="mt-24">
              <ChapterContent chapter={chapter} />
            </motion.section>
          ))}

          <motion.section variants={fadeUp} className="mt-24">
            <p className="eyebrow mb-6">{caseStudy.pillarsEyebrow}</p>
            <h2 className={sectionTitleClassName}>{caseStudy.pillarsTitle}</h2>
            <p className={`mt-8 ${bodyClassName}`}>{caseStudy.pillarsIntro}</p>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
              {caseStudy.pillars.map((pillar) => (
                <article key={pillar.title}>
                  <h3 className="display text-[1.5rem] leading-[1.1] text-text mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-text-soft text-[0.98rem] leading-[1.7]">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeUp} className="mt-24">
            <ChapterContent chapter={caseStudy.constraints} />
            <div className="mt-12">
              <ArchitectureDiagram />
            </div>
          </motion.section>

          <motion.section variants={fadeUp} className="mt-24">
            <p className="eyebrow mb-6">{caseStudy.stackEyebrow}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {caseStudy.stack.map((item) => (
                <li key={item} className="text-text">
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="mt-24">
            <p className="display text-[clamp(1.7rem,3.5vw,2.4rem)] leading-[1.05] text-text">
              {caseStudy.closingText}
            </p>
            <div className="mt-8">
              <Link to={caseStudy.closingLinkTo} className="ink-link text-text">
                <span>{caseStudy.closingLinkLabel}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </>
  )
}
