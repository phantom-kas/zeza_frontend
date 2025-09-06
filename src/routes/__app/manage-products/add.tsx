import { createFileRoute } from '@tanstack/react-router'
import { ImageCropper } from '../../../components/forms/imagePicker'
import { SelectInput } from '../../../components/forms/selectInput'
import FullscreenOverlay from '../../../components/FullscreenOverlay'
import { useState } from 'react'
import { BlueButton } from '../../../components/ButtonBlue'
import { UploadIcon } from 'lucide-react'
import InputField3 from '../../../components/forms/input3'
import SelectField3 from '../../../components/forms/select3'

export const Route = createFileRoute('/__app/manage-products/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  return <><form className=' w-full gap-6 flex flex-col pt-10 pb-20'>
    {/* <ImageCropper /> */}
    <div className=' flex w-full items-center justify-center p-4'>
      <BlueButton label={'Upload Images'} icon={<UploadIcon />} />
    </div>

    <div className="w-full flex sm:flex-row gap-6 flex-col">
      <InputField3 name={'name'} className=' grow' label='Name' />
      <InputField3 name={'name'} className=' grow' label='Price (GHS)' />
    </div>
    <div className="w-full flex sm:flex-row gap-6 flex-col">
      <InputField3 name={'name'} className=' grow w-full' label='Quantity' />
      <SelectField3 className='grow w-full' name={'brand'} label='Brand' options={[
        { label: 'po', value: 'iyt' },
        { label: 'po2', value: 'iyt2' },
      ]} />
    </div>
    <div className="w-full flex sm:flex-row gap-6 flex-col">
      <InputField3 name={'name'} className=' grow w-full' type='number' label='Count in stock' />
      <SelectField3 className='grow w-full' name={'brand'} label='Category' options={[
        { label: 'po', value: 'iyt' },
        { label: 'po2', value: 'iyt2' },
      ]} />
    </div>

  

    <BlueButton label={'Submit'} className=' w-max300' />

  </form><FullscreenOverlay className=' bg-black p-3 theme1cont' isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ImageCropper />
    </FullscreenOverlay></>
}
