import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__app/profile"!</div>
}
