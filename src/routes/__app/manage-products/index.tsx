import { createFileRoute } from '@tanstack/react-router'
import List from '../../../components/list1'
import { anyCurrency } from '../../../composabels/utils'
import { ProduCardAdmin } from '../../../components/productsAdmin'
import InfiniteLoad from '../../../components/list/infiniteLoad'
import Swiper from '../../../components/swiper'

export const Route = createFileRoute('/__app/manage-products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" relative @container grow pt-10 pb-20">
  

    <InfiniteLoad renderItem={(item) => {
      return <ProduCardAdmin media={item.media} created_at={item.created_at} to={'/product/' + item.id} price={anyCurrency(item.price)} className=" w-full @xs:w-max300" id={item} title={item.name} describtion='' />
    }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products'} url='/products'
    />
  </div>

}
