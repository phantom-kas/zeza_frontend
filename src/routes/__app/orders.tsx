import { createFileRoute } from '@tanstack/react-router'
import InfiniteLoad from '../../components/list/infiniteLoad'
import type React from 'react'
import Avatar from '../../components/avatar/avatarWithImage'
import { anyCurrency, getImageUrl } from '../../composabels/utils'
import { ChevronDownIcon, ChevronUpIcon, X } from 'lucide-react'
import StatusBadge from '../../components/statusBadge'
import MediaImage from '../../components/mediaImage'
import { useState } from 'react'

export const Route = createFileRoute('/__app/orders')({
    component: RouteComponent,
})


function RouteComponent() {
    const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({})

    const toggleShowMore = (orderId: number) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId],
        }))
    }
    return <InfiniteLoad qKey={'orders'} is='div' className=' w-max1200 mx-auto sm-px-6 px-2 mt-20 flex flex-col gap-7' url={'/orders'} renderItem={((item: any) => {
        const isExpanded = !!expandedOrders[item.order_id]
        return <div key={item.order_id} className=' w-full flex flex-col theme2cont py-2 sm:px-4 px-2'>
            <div className=' w-full grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6'>
                <Atom label={'ID'} value={item.order_id} />
                <Atom label={'Checkout Date'} value={item.checkout_date} />
                <Atom label={'User'} value={<div className=' flex items-center gap-3'><Avatar url={getImageUrl(item.image)} /> <span>{item.name}</span></div>} />
                <Atom label={'Cost'} value={<span className='not-dark:text-[#0977e6] dark:text-[#348aee]'>{anyCurrency(item.amount)}</span>} />
                <Atom label={'Number of items'} value={item.num_products} />
                <div className='flex gap-3  items-center'>

                    <StatusBadge status={item.status} />
                    <button onClick={() => toggleShowMore(item.order_id)} className=' flex items-center cursor-pointer'>
                        <span className='  mr-2 text-white2 not-dark:text-neutral-800 text-xs'>View Products</span>
                        <button className=' ha items-center flex  justify-center size-7 p-1 theme2cont rounded-xl cursor-pointer'>
                            {!isExpanded?<ChevronDownIcon />:<ChevronUpIcon/>}
                            </button>
                    </button>
                </div>
            </div>
            {isExpanded && <div className=' bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-4 rounded-xl mt-0.5 '>
                <InfiniteLoad is={'div'} className=' flex flex-wrap justify-start  items-start w-full gap-8' showLoadMore={false} key={'order_items' + item.order_id} qKey={'order-items-' + item.order_id} url={'/order/items/' + item.order_id} renderItem={((itemJ: any) => {
                    return <div className='flex flex-col items-start gap-2 theme2cont w-max100 p-2 rounded-xl self-stretch'>
                        <MediaImage media={itemJ.media} />
                        <div className='flex flex-col text-xs'>
                            <div className=' flex gap-3'>
                                <span className=' not-dark:text-[#0977e6] dark:text-[#348aee] '>{anyCurrency(itemJ.amount)}</span>
                                <span className='  flex items-center gap-1'> ({itemJ.quantity ?? 0})</span>
                            </div>
                            {itemJ.name}
                        </div>
                    </div>
                })} />
            </div>}
        </div>
    })} />
}


const Atom = ({ label, value }: { label: string, value: React.ReactNode }) => {
    return <div className='flex sm:flex-col items-start justify-between sm:justify-start '>
        <span className=' text-sm text-white3 font-[600] '>{label}:</span>
        <span>{value}</span>
    </div>
}


const products = () => {

}
