import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './assets/css/index.css'
import { useThemeStore } from './store/themestore'
import List from './components/toast/list'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree })

const theme = useThemeStore.getState().theme
document.documentElement.classList.toggle('dark', theme === 'dark')
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <QueryClientProvider client={queryClient}>
    <List />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </QueryClientProvider>
  </>
)
