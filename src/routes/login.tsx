// src/routes/login.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => <h1>Login Page</h1>,
})
