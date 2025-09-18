import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/featured')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__app/featured"!</div>
}
