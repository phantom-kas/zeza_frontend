// src/routes/signup.tsx
import { createFileRoute } from '@tanstack/react-router'
import Register from '../components/authentication/register'

export const Route = createFileRoute('/signup')({
  component: () => <Register/>,
})
