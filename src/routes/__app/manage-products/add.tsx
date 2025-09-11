import { createFileRoute } from '@tanstack/react-router'
import { ImageCropper } from '../../../components/forms/imagePicker'
import FullscreenOverlay from '../../../components/FullscreenOverlay'
import { useState } from 'react'
import { BlueButton } from '../../../components/ButtonBlue'
import { UploadIcon } from 'lucide-react'
import InputField3 from '../../../components/forms/input3'
import QuillEditor from '../../../components/forms/quill-editor'
import FetchSelect from '../../../components/forms/fetchSelect'
import axios from '../../../lib/axios'

export const Route = createFileRoute('/__app/manage-products/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [cropperImage, setCropperImage] = useState<{ [key: string]: object }>({});
  const [description, setDescription] = useState({});
  const [image, setImage] = useState<string | null>(null);
  const [form, setForm] = useState<{}>({});

  const handleChange = (e: { name: string, value: string | number }) => {

    setForm({ ...form, [e.name]: e.value })
    console.log('eeeeeeeeeeeeeeeeeee')
    console.log(form)
    // console.log(e)
  }
  const handelCrop = (e) => {
    console.log(e)
    const objectUrl = URL.createObjectURL(e.img);
    setImage(objectUrl);
    setCropperImage(e)
    setIsOpen(false)
  }

  const handelUpload =async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post('/product/add', {...form, brand, category, description, media: cropperImage.img }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      _showAllMessages: true
    })
      .then(res => {
        if (res.data.status != 'success') return

      });
      setIsLoading(false)
  }
  return <><form onSubmit={handelUpload} className=' w-full gap-6 flex flex-col pt-10 pb-20'>
    {image && <div className=' w-full flex items-center justify-center'>
      <img src={image ?? ""} alt='' className=' w-max500' />
    </div>}
    <div className=' flex w-full items-center justify-center p-4'>
      <BlueButton onClick={() => setIsOpen(true)} type='button' label={!image ? 'Upload Images' : 'Replace Image'} icon={<UploadIcon />} />
    </div>

    <div className="w-full flex sm:flex-row gap-6 flex-col">
      <InputField3 onInput={e => handleChange(e)} name={'name'} className=' grow' label='Name' />
      <InputField3 onInput={e => handleChange(e)} type='number' name={'price'} className=' grow' label='Price (GHS)' />
    </div>
    <div className="w-full flex sm:flex-row gap-6 flex-col">

      <FetchSelect onChange={(e) => setCategory(e.value)} label="Category" loadClassName="grow w-full" className='grow w-full' qKey={'categorieselect'} url={'/categories/short'} name={''} />

      <FetchSelect onChange={(e) => setBrand(e.value)} label="Brand" loadClassName="grow w-full" className='grow w-full' qKey={'brandselect'} url={'/brands/short'} name={''} />
    </div>
    <div className="w-full flex sm:flex-row gap-6 flex-col">

      <InputField3 onInput={e => handleChange(e)} name={'quantity'} type='number' className=' grow w-full' label='Quantity' />


    </div>

    <QuillEditor onInputed={e => setDescription(e)} placeholder='Description' />


    <BlueButton loading={isLoading} label={'Submit'} className=' w-max300' />

  </form><FullscreenOverlay className=' bg-black p-3 theme1cont w-max1000' isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ImageCropper onCrop={(e) => { handelCrop(e) }} />
    </FullscreenOverlay></>
}
