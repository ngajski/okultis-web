import type { ReactNode } from 'react'

export interface Service {
  icon: ReactNode
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <circle cx="24" cy="24" r="10" stroke="#00d4ff" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="3" fill="#00d4ff" />
        <path
          d="M24 14V8M24 40v-6M14 24H8M40 24h-6M16.34 16.34l-4.24-4.24M35.9 35.9l-4.24-4.24M16.34 31.66l-4.24 4.24M35.9 12.1l-4.24 4.24"
          stroke="#00d4ff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'AI & Intelligent Systems',
    description:
      'From LLM-powered features to autonomous agents — we design, build, and deploy AI systems tailored to your product. RAG pipelines, multi-modal workflows, and fine-tuned models that deliver real business value.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="#00d4ff" strokeWidth="2.5" />
        <path d="M16 38h16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 34v4" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M16 18l4 4-4 4"
          stroke="#00d4ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M24 26h8" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Software Engineering',
    description:
      'Full-stack applications engineered for scale. APIs, real-time systems, and data-intensive platforms — built with disciplined architecture and shipped on time.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="3" stroke="#00d4ff" strokeWidth="2.5" />
        <circle cx="24" cy="18" r="5" stroke="#00d4ff" strokeWidth="2.5" />
        <path d="M14 32h20M14 36h12" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Product Design',
    description:
      'Interfaces shaped by research and tested with real users. From AI-native UX patterns to complete design systems — we design products people want to use.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <path
          d="M8 30c0-8.837 7.163-16 16-16s16 7.163 16 16"
          stroke="#00d4ff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 30H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM26 30h-4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM40 30h-4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z"
          stroke="#00d4ff"
          strokeWidth="2.5"
        />
        <circle cx="24" cy="10" r="3" fill="#00d4ff" />
      </svg>
    ),
    title: 'Cloud & Platform Engineering',
    description:
      'Production-grade infrastructure from day one. CI/CD pipelines, container orchestration, observability, and cost optimization — so your team ships faster without firefighting.',
  },
]
