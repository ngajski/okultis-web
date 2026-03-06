import kinana from '@/assets/images/clients/kinana.png'
import blooming from '@/assets/images/clients/blooming.svg'
import greenSolutions from '@/assets/images/clients/green_solutions.png'
import auroraMedia from '@/assets/images/clients/Aurora Media logo-06.png'
import mbAutoskola from '@/assets/images/clients/mb_autoskola.png'
import zmda from '@/assets/images/clients/zmda.png'
import posluzIme from '@/assets/images/clients/posluzi.me.png'

export interface Client {
  src: string
  alt: string
  invertOnLight?: boolean
}

export const clients: Client[] = [
  { src: kinana, alt: 'Kinana' },
  { src: blooming, alt: 'Blooming' },
  { src: greenSolutions, alt: 'GreenSolutions' },
  { src: auroraMedia, alt: 'Aurora Media', invertOnLight: true },
  { src: mbAutoskola, alt: 'MB Autoskola' },
  { src: zmda, alt: 'ZMDA', invertOnLight: true },
  { src: posluzIme, alt: 'posluzi.me', invertOnLight: true },
]
