import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ImageCropper } from '../../../components/forms/imagePicker'
import FullscreenOverlay from '../../../components/FullscreenOverlay'
import { useState } from 'react'
import { BlueButton } from '../../../components/ButtonBlue'
import InputField3 from '../../../components/forms/input3'
import QuillEditor from '../../../components/forms/quill-editor'
import axios from '../../../lib/axios'

export const Route = createFileRoute('/__app/manage-categories/add')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
  
  const [form, setForm] = useState({ name: '', description: '' })
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const handleChange = (e: { name: string, value: string | number }) => {

    setForm({ ...form, [e.name]: e.value })
    console.log('eeeeeeeeeeeeeeeeeee')
    console.log(form)
    // console.log(e)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    setLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks

    await axios.post('/category', {name:form.name,description}, {
      _showAllMessages: true,
    }).then((res) => {
      // if(res.data)
      if (res.data.status != 'success') return


      navigate({ to: '/manage-categories' });
    })
    setLoading(false)
  }
  
  return <><form onSubmit={handleSubmit} className=' w-full gap-6 flex flex-col pt-10 pb-20'>
    {/* <ImageCropper /> */}


    <InputField3  onInput={e=>handleChange(e)} name={'name'} className=' grow' label='Name' />


    <QuillEditor onInputed={e => setDescription(e)} placeholder='Description' />


    <BlueButton loading={loading} label={'Submit'} className=' w-max300' />

  </form></>
}
