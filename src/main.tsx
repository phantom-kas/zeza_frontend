import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './assets/css/index.css'
import { useThemeStore } from './store/themestore'
import List from './components/toast/list'

const router = createRouter({ routeTree })

const theme = useThemeStore.getState().theme
document.documentElement.classList.toggle('dark', theme === 'dark')
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <List />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
)
