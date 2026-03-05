import { useEffect, useRef, useState } from 'react'

interface ScrollFadeInResult {
  ref: React.RefObject<HTMLElement | null>
  isVisible: boolean
}

/**
 * Returns a ref and a boolean that becomes true once the referenced element
 * intersects the viewport (threshold 0.15). Disconnects the observer after
 * the first intersection so the element stays visible on scroll-up.
 */
export function useScrollFadeIn(): ScrollFadeInResult {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isVisible }
}
