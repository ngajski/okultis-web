import type { LucideIcon } from 'lucide-react'
import { Briefcase, Users, CalendarClock } from 'lucide-react'

export interface Engagement {
  icon: LucideIcon
  title: string
  description: string
  highlights: string[]
}

export const engagements: Engagement[] = [
  {
    icon: Briefcase,
    title: 'Project-based',
    description:
      'We take full ownership of your project from start to finish. Fixed scope, clear milestones, and a delivered product you own completely.',
    highlights: [
      'Defined scope and timeline',
      'End-to-end delivery',
      'Fixed pricing',
    ],
  },
  {
    icon: Users,
    title: 'Team augmentation',
    description:
      'Our engineers embed directly into your team. They work with your tools, follow your processes, and ramp up fast - while staying part of Okultis.',
    highlights: [
      'Seamless integration into your workflows',
      'Scale up or down as needed',
      'No recruitment overhead',
    ],
  },
  {
    icon: CalendarClock,
    title: 'Retainer',
    description:
      'Ongoing monthly collaboration with dedicated hours. Ideal for continuous product development, maintenance, and evolving needs.',
    highlights: [
      'Dedicated monthly hours',
      'Consistent team availability',
      'Long-term partnership',
    ],
  },
]
