import { useTheme } from './useTheme'

export function useColorScheme(): 'light' | 'dark' {
  const { theme } = useTheme()
  return theme
}
