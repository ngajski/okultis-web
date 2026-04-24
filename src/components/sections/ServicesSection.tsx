import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionFrame from '@/components/ui/SectionFrame'
import { services } from '@/data/services'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionFrame
      id="services"
      label="Practice"
      title={
        <>
          What we do{' '}
          <span className="display-italic">in the room.</span>
        </>
      }
    >
      <ol className="divide-y divide-border-soft border-t border-b border-border-soft">
        {services.map((service, i) => {
          const isOpen = openIndex === i
          return (
            <li key={service.title}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left py-8 md:py-10 cursor-pointer group"
              >
                <h3
                  className={`display text-[clamp(1.7rem,3.5vw,2.4rem)] leading-[1.05] transition-colors duration-500 ${
                    isOpen ? 'text-accent' : 'text-text group-hover:text-accent'
                  }`}
                >
                  {service.title}
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        transition: { duration: 0.5, ease: EASE },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.3, ease: EASE },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 max-w-[66ch] text-text-soft text-[1rem] md:text-[1.05rem] leading-[1.7]">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ol>
    </SectionFrame>
  )
}
