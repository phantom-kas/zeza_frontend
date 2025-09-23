import { createFileRoute } from '@tanstack/react-router'
import Switch from '../../components/forms/switch'
import InputField from '../../components/forms/input2'
import { LinkIcon } from 'lucide-react'
import { BlueButton } from '../../components/ButtonBlue'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '../../lib/axios'
import TextField3 from '../../components/forms/text_area3'
import { useState } from 'react'
import { useSettingsStore } from '../../store/system'
import Media from '../../components/media'

export const Route = createFileRoute('/__app/settings')({
    component: RouteComponent,
})


function RouteComponent() {
    const queryClient = useQueryClient()

    const [isLoadingASC, setLoadingASC] = useState(false)
    const [isLoadingMe, setLoadingMe] = useState(false)
    const [isLoadingHe, setLoadingHe] = useState(false)
    const [isLoadinghe2, setLoadinghe2] = useState(false)



    const [aSC, setASC] = useState(0)
    const [me, setMe] = useState('')
    const [He, setHe] = useState('')
    const [he2, sethe2] = useState('')


      const {setSettings} = useSettingsStore()
    


    const { data, error, isPending } = useQuery({
        queryKey: ['settings'],
        queryFn: async () =>
            await axios.get('/settings').then(res => {
                if (res.data.status != 'success') return

                setMe(res.data.data.alt_checkout_link)
                sethe2(res.data.data.hero_text)
                setHe(res.data.data.call_to_action_text)
                setASC(res.data.data.allow_checkout)


                setSettings(res.data.data)
                return res.data.data
            }),
    })


    const handleSubmitMe = async (e) => {
        e.preventDefault()
        setLoadingMe(true)
        await axios.patch('/settings/ml', { mel: me }, { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            queryClient.setQueryData(['settings'], (oldData: any) => {
                if (!oldData) return oldData
                return { ...oldData, alt_checkout_link: me }
            })
        }).catch(() => { })
        setLoadingMe(false)
    }






    const handleSubmitHe = async (e) => {
        e.preventDefault()
        setLoadingHe(true)
        await axios.patch('/settings/cta', { cta: He }, { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            queryClient.setQueryData(['settings'], (oldData: any) => {
                if (!oldData) return oldData
                return { ...oldData, call_to_action_text: He }
            })
        }).catch(() => { })
        setLoadingHe(false)
    }





    const handleSubmitHe2 = async (e) => {
        e.preventDefault()
        setLoadinghe2(true)
        await axios.patch('/settings/htxt', { htxt: he2 }, { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            queryClient.setQueryData(['settings'], (oldData: any) => {
                if (!oldData) return oldData
                return { ...oldData, hero_text: he2 }
            })
        }).catch(() => { })
        setLoadinghe2(false)
    }





    const handleSubmitAc = async (e) => {

        setLoadingASC(true)
      
        setASC(e?1:0 )
        await axios.patch('/settings/ac', { ac:aSC }, { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            queryClient.setQueryData(['settings'], (oldData: any) => {
                if (!oldData) return oldData
                return { ...oldData, allow_checkout: e?1:0 }
            })
        }).catch(() => { })
        setLoadingASC(false)
    }

    return data && <div className=" w-max700  mx-auto flex flex-col items-start justify-start gap-10 py-20 px-4">
        <h1 className='h1'>Settings</h1>
        <Switch label='Allow Self Checkout' onChange={handleSubmitAc} checked={data.allow_checkout == 1} />
        <form onSubmit={handleSubmitMe} className='flex gap-3 w-full flex-wrap items-end justify-start'>
            <InputField onInput={(e) => setMe(e.value)} val={data.alt_checkout_link} className=' w-max500' name={'wa'} label='Wa.Me link' icon={<LinkIcon />} />
            {data.alt_checkout_link != me && <BlueButton loading={isLoadingMe} label='Submit' />
            }
        </form>

        <form onSubmit={handleSubmitHe} className='flex gap-3 w-full flex-wrap items-end justify-start'>
            <TextField3 onInput={(e) => setHe(e.value)} cols={3} val={data.call_to_action_text} className=' w-max500' name={'wa'} label='Hero Title' icon={<LinkIcon />} />
            {data.call_to_action_text != He && <BlueButton loading={isLoadingHe} label='Submit' />
            }
        </form>

        <form onSubmit={handleSubmitHe2} className='flex gap-3 w-full flex-wrap items-end justify-start'>
            <TextField3 onInput={(e) => sethe2(e.value)} cols={3} val={data.hero_text} className=' w-max500' name={'wa'} label='Hero text' icon={<LinkIcon />} />
            {data.hero_text != he2 && <BlueButton loading={isLoadinghe2} label='Submit' />
            }
        </form>

        <h1 className='h1 mt-6'>Home Page Images</h1>
        
        <Media/>
    </div>
}
