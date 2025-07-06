import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/Theme/theme-provider'
import { getRoutes } from './routes'

function Routes() {
  const routes = useRoutes(getRoutes())
  return routes
}

export default function App() {
  const queryClient = new QueryClient()
  const { theme } = useTheme()
  const validTheme =
    theme === 'dark' || theme === 'light' || theme === 'system'
      ? theme
      : 'system'

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Fx" />
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster
              richColors={true}
              theme={validTheme}
              position="top-center"
            />
            <Routes />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  )
}
