import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/manage-brands/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__app/manage-products/$id/edit"!</div>
}
