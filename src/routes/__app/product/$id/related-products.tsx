import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/product/$id/related-products')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <div className="p-4 bg-red-500">Reviews for product h hjhjjj{id}</div>
}
