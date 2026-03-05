import { useEffect, useState } from 'react'

/**
 * Observes a list of section elements by id and returns the id of the
 * section currently visible in the viewport. Uses IntersectionObserver
 * with a root margin that accounts for the fixed 72px header.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeSectionId, setActiveSectionId] = useState('')

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observers: IntersectionObserver[] = []

    const observerOptions: IntersectionObserverInit = {
      rootMargin: '-72px 0px -40% 0px',
      threshold: 0,
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSectionId(id)
        }
      }, observerOptions)

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  return activeSectionId
}
