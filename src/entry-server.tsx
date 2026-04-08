import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import type { HelmetServerState } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
import AppRoutes from '@/AppRoutes'

interface HelmetContextShape {
  helmet?: HelmetServerState | null
}

export function render(url: string) {
  const helmetContext: HelmetContextShape = {}

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[url]}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>
    </HelmetProvider>,
  )

  const helmet = helmetContext.helmet

  return {
    appHtml,
    head: helmet
      ? [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ].join('')
      : '',
  }
}
