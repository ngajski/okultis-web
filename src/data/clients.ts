import kinana from '@/assets/images/clients/kinana.png'
import blooming from '@/assets/images/clients/blooming.svg'
import greenSolutions from '@/assets/images/clients/green_solutions.png'
import auroraMedia from '@/assets/images/clients/Aurora Media logo-06.png'
import mbAutoskola from '@/assets/images/clients/mb_autoskola.png'
import zmda from '@/assets/images/clients/zmda.png'
import posluzIme from '@/assets/images/clients/posluzi.me.png'
import kbcsm from '@/assets/images/clients/kbcsm.svg'

export interface Client {
  src: string
  name: string
  sector: string
  invertOnLight?: boolean
  className?: string
}

export const clients: Client[] = [
  { src: greenSolutions, name: 'GreenSolutions', sector: 'Gardening' },
  { src: zmda, name: 'Zavičajni muzej Daruvar', sector: 'Culture', invertOnLight: true },
  {
    src: kbcsm,
    name: 'KBC Sestre milosrdnice',
    sector: 'Healthcare',
    className: 'h-16 sm:h-20 md:h-24',
  },
  { src: auroraMedia, name: 'Aurora Media', sector: 'Media', invertOnLight: true },
  { src: posluzIme, name: 'posluzi.me', sector: 'Hospitality', invertOnLight: true },
  { src: mbAutoskola, name: 'MB Autoškola', sector: 'Mobility' },
  { src: kinana, name: 'Kinana Luxury', sector: 'Hospitality' },
  { src: blooming, name: 'Blooming', sector: 'Retail' },
]
