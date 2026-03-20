import { useCallback, useEffect, useState } from 'react'

type ThemePreference = 'system' | 'light' | 'dark'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredPreference(): ThemePreference {
  const stored = localStorage.getItem('theme-preference')
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

// NOTE: To prevent flash of wrong theme on initial page load, add the following
// inline script to index.html <head> BEFORE any stylesheet links:
//
// <script>
//   (function() {
//     var p = localStorage.getItem('theme-preference')
//     var dark = p === 'dark' || (p !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
//     if (dark) document.documentElement.classList.add('dark')
//   })()
// </script>

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference)

  const resolvedTheme = preference === 'system' ? getSystemTheme() : preference

  // Apply theme class on mount and when preference changes
  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  // Listen for system theme changes when preference is 'system'
  useEffect(() => {
    if (preference !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(getSystemTheme())
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [preference])

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light'
    setPreference(next)
    localStorage.setItem('theme-preference', next)
  }, [resolvedTheme])

  return { theme: resolvedTheme, preference, toggleTheme }
}
