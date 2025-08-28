import { createFileRoute } from '@tanstack/react-router'
import {ImageCropper} from '../../../components/forms/imagePicker'
import { SelectInput } from '../../../components/forms/selectInput'

export const Route = createFileRoute('/__app/manage-products/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <ImageCropper/>
    <SelectInput name={'brand'} label='Brand'/>
  </div>
}
