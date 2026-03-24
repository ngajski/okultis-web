export interface ProcessStep {
  number: number
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Discovery',
    description:
      'We start with a focused kickoff to understand your goals, users, and constraints. No fluff - just the right questions to map out what success looks like and where to begin.',
  },
  {
    number: 2,
    title: 'Strategy & Design',
    description:
      'We define the architecture, design the experience, and align on scope. You get a clear roadmap before a single line of code is written.',
  },
  {
    number: 3,
    title: 'Build & Iterate',
    description:
      'We ship a working MVP in weeks, not months. Short development cycles with continuous demos mean you see real progress fast - and can steer the product as it takes shape.',
  },
  {
    number: 4,
    title: 'Launch & Evolve',
    description:
      'We ship to production, monitor performance, and stay engaged. Whether it is ongoing support or the next phase of features, we are built for the long run.',
  },
]
