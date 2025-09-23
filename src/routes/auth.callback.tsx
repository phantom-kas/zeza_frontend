import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from '../lib/axios'
import Splash1 from '../components/splash1'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export const Route = createFileRoute('/auth/callback')({
    component: RouteComponent,
    validateSearch: () => ({}) as { tkn?: string }
})
function RouteComponent() {
    const navigate = useNavigate()

    const { setUser, setToken } = useAuthStore()
    const search = Route.useSearch()

    useEffect(() => {
        // const { tkn } = search

        // if (tkn) {

        //     document.cookie = `refresh_token=${tkn}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=None; Secure`
        // }

        axios.get('/me').then(res => {
            if (res.data.status != 'success') return;

            // document.cookie = `refresh_token=; path=/; max-age=0; SameSite=None; Secure`
            setToken('123')
            setUser(res.data.data[0])
            navigate({ to: '/' })
        })
    }, [])
    return <Splash1 />
}
