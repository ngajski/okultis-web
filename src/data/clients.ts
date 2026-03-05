import kinana from '@/assets/images/clients/kinana.webp'
import blooming from '@/assets/images/clients/blooming.webp'
import posluzIme from '@/assets/images/clients/posluz_ime.webp'
import bjuti from '@/assets/images/clients/bjuti.webp'
import greenSolutions from '@/assets/images/clients/GreenSolutions.webp'
import auroraMedia from '@/assets/images/clients/Aurora-Media-logo.webp'
import mbAutoskola from '@/assets/images/clients/mb_autoskola.png'

export interface Client {
  src: string
  alt: string
}

export const clients: Client[] = [
  { src: kinana, alt: 'Kinana' },
  { src: blooming, alt: 'Blooming' },
  { src: posluzIme, alt: 'posluzi.me' },
  { src: bjuti, alt: 'Bjuti' },
  { src: greenSolutions, alt: 'GreenSolutions' },
  { src: auroraMedia, alt: 'Aurora Media' },
  { src: mbAutoskola, alt: 'MB Autoskola' },
]
