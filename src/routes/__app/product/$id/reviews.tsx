import { createFileRoute } from '@tanstack/react-router'
import ProductReviews from '../../../../components/productReviews'

export const Route = createFileRoute('/__app/product/$id/reviews')({
  component: RouteComponent,
})


function RouteComponent() {
  const { id } = Route.useParams()

  return <ProductReviews id={id}/>
}

