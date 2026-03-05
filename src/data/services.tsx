import type { LucideIcon } from 'lucide-react'
import { BrainCircuit, Code, PenTool, Cloud } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: BrainCircuit,
    title: 'AI & Intelligent Systems',
    description:
      'From LLM-powered features to autonomous agents — we design, build, and deploy AI systems tailored to your product. RAG pipelines, multi-modal workflows, and fine-tuned models that deliver real business value.',
  },
  {
    icon: Code,
    title: 'Software Engineering',
    description:
      'Full-stack applications engineered for scale. APIs, real-time systems, and data-intensive platforms — built with disciplined architecture and shipped on time.',
  },
  {
    icon: PenTool,
    title: 'Product Design',
    description:
      'Interfaces shaped by research and tested with real users. From AI-native UX patterns to complete design systems — we design products people want to use.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Platform Engineering',
    description:
      'Production-grade infrastructure from day one. CI/CD pipelines, container orchestration, observability, and cost optimization — so your team ships faster without firefighting.',
  },
]
