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
      'We build AI agents and adapt them to your specific business needs. RAG pipelines, multi-agent workflows, and frontier models integrated into your existing tools and processes. From automating repetitive workflows to replacing entire manual pipelines, we deliver real operational value.',
  },
  {
    icon: Code,
    title: 'Software Engineering & Consulting',
    description:
      'We engineer the systems behind ambitious products. Real-time platforms, high-throughput APIs, and complex integrations. Secure by default, built with modern tooling, and delivered fast enough to keep pace with your roadmap.',
  },
  {
    icon: PenTool,
    title: 'Product Design',
    description:
      'Design that drives adoption, not just looks good. User research, rapid prototyping, and iterative testing to find what works. From AI-native interaction patterns to full design systems built for product teams that move fast.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Platform Engineering',
    description:
      'We build infrastructure your team and your legal department can trust. CI/CD pipelines, container orchestration, observability, and cost optimization. Tech stack audits, architecture advisory, and compliance with local regulations baked in from the start.',
  },
]
