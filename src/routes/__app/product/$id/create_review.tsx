import { createFileRoute } from '@tanstack/react-router'
import RatingForm from '../../../../components/forms/createReview'

export const Route = createFileRoute('/__app/product/$id/create_review')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <RatingForm onSubmit={function (data: { rating: number; review: string }): Promise<void> | void {
    throw new Error('Function not implemented.')
  } } onClose={function (): void {
    throw new Error('Function not implemented.')
  } }/>
}
