import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { routes } from '@/routes/routes'

const router = createBrowserRouter(routes)

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
