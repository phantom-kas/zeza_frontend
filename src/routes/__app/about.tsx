import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/about')({
  component: () => <h1>ℹ️ About Page</h1>
})
