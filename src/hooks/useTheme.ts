import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createElement } from 'react'

type ThemePreference = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  preference: ThemePreference
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem('theme-preference')
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return
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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference)

  const resolvedTheme = preference === 'system' ? getSystemTheme() : preference

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

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

  return createElement(ThemeContext.Provider, {
    value: { theme: resolvedTheme, preference, toggleTheme },
    children,
  })
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
