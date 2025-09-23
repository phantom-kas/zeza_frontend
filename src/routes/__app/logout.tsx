import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../../store/auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/__app/logout')({
  component: RouteComponent,
})

function RouteComponent() {
      const navigate = useNavigate({ from: Route.fullPath })
      const user = useAuthStore()

    

       useEffect(() => {
    // Clear auth state
    user.setUser(null)
    user.setToken(null)

   
         window.location.href = '/'


   
  }, [navigate, user])
  return <div> <h1>Loginout</h1></div>
}
