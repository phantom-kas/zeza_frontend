import { createFileRoute } from '@tanstack/react-router'
import InfiniteLoad from '../../components/list/infiniteLoad'
import StatusBadge from '../../components/statusBadge'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import MediaImage from '../../components/mediaImage'
import { anyCurrency, getImageUrl } from '../../composabels/utils'
import Avatar from '../../components/avatar/avatarWithImage'
import { useState } from 'react'

export const Route = createFileRoute('/__app/purchases')({
    component: RouteComponent,
})


function RouteComponent() {
    const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({})

    const toggleShowMore = (id: number) => {
        setExpandedOrders(prev => ({
            ...prev,
            [id]: !prev[id],
        }))
    }
    return <InfiniteLoad qKey={'purchases'} is='div' className=' w-max1200 mx-auto sm-px-6 px-2 mt-20 flex flex-col gap-7' url={'/purchases'} renderItem={((item: any) => {
        const isExpanded = !!expandedOrders[item.id]
        return <div key={item.id} className=' w-full flex flex-col theme2cont py-2 sm:px-4 px-2'>
            <div className=' w-full grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6'>
                <Atom label={'ID'} className='sm:w-max50 ' value={item.id} />

                <Atom label={'User'} className='sm:w-max200 ' value={<div className=' flex items-start flex-col text-xs'> <span>{item.name}</span>  <span>{item.email}</span><span>{item.phone}</span></div>} />
                <Atom label={'Cost'} value={<span className='not-dark:text-[#0977e6] dark:text-[#348aee]'>{anyCurrency(item.amount)}</span>} />
                <Atom label={'Message'} value={<span className=' text-xs'>{item.msg}</span>} />
                <div className='flex gap-3  items-center'>

                    <StatusBadge status={item.status} />
                    <button onClick={() => toggleShowMore(item.id)} className=' flex items-center cursor-pointer'>
                        <span className='  mr-2 text-white2 not-dark:text-neutral-800 text-xs'>View Products</span>
                        <button className=' ha items-center flex  justify-center size-7 p-1 theme2cont rounded-xl cursor-pointer'>
                            {!isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        </button>
                    </button>
                </div>
            </div>
            {isExpanded && <div className=' w-full bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-4 rounded-xl mt-0.5 '>
                <MediaImage className=' w-max100' media={item.media} />
                <div className='flex flex-col text-xs'>
                    <div className=' flex gap-3'>
                        <span className=' not-dark:text-[#0977e6] dark:text-[#348aee] '>{anyCurrency(item.amount)}</span>
                        <span className='  flex items-center gap-1'> ({item.quantity ?? 0})</span>
                    </div>
                    {item.pdtname}
                </div>
            </div>}
        </div>
    })} />
}


const Atom = ({ label, value, className = '' }: { className?: string, label: string, value: React.ReactNode }) => {
    return <div className={'flex sm:flex-col items-start justify-between sm:justify-start ' + className}>
        <span className=' text-sm text-white3 font-[600] '>{label}:</span>
        <span>{value}</span>
    </div>
}


const products = () => {

}
