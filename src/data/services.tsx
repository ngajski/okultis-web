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
      'We build AI agents and adapt them to your specific business needs. RAG pipelines, multi-agent workflows, and frontier models -integrated into your existing tools and processes to deliver real operational value.',
  },
  {
    icon: Code,
    title: 'Software Engineering',
    description:
      'Full-stack applications engineered for scale. APIs, real-time systems, and data-intensive platforms -built with disciplined architecture and shipped on time.',
  },
  {
    icon: PenTool,
    title: 'Product Design',
    description:
      'Interfaces shaped by research and tested with real users. From AI-native UX patterns to complete design systems -we design products people want to use.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Platform Engineering',
    description:
      'Production-grade infrastructure from day one. CI/CD pipelines, container orchestration, observability, and cost optimization -so your team ships faster without firefighting.',
  },
]
