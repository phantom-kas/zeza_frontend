import { createFileRoute } from '@tanstack/react-router'
import RatingForm from '../../../../components/forms/createReview'
import axios from '../../../../lib/axios'
import { useState } from 'react'

export const Route = createFileRoute('/__app/product/$id/create_review')({
  component: RouteComponent,
})




function RouteComponent() {
  const { id } = Route.useParams()
  const [isLoading, setIsloading] = useState(false)
  const handelSubmit = async (data: any) => {
    setIsloading(true)
    await axios.post('create-review', { ...data , product_id:id },{_showAllMessages:true} ).then(res => {
      if (res.data.status != 'success') return
    }).catch(error => {

      setIsloading(false)
    })
    setIsloading(false)
  }

  return <RatingForm isLoading={isLoading} onSubmit={(data: { rating: number; review: string }) => handelSubmit(data)} onClose={() => { }} />
}
