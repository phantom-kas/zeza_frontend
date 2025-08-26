// src/routes/signup.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: () => <h1>Signup Page</h1>,
})
