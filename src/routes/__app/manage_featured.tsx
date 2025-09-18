import { createFileRoute } from '@tanstack/react-router'
import ManageProducts from '../../components/manageProducts'

export const Route = createFileRoute('/__app/manage_featured')({
  component: RouteComponent,
})




function RouteComponent() {
  return <div className=' w-max1200 mx-auto pt-20'> <ManageProducts featured={1} />
  </div>
}