import { createFileRoute, Outlet } from '@tanstack/react-router'
import List from '../../components/list1'
import PageTitle from '../../components/pageTitle'
import { ProduCard1 } from '../../components/productCard1'
import { anyCurrency } from '../../composabels/utils'
import {  ListFilter } from 'lucide-react'
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute('/__app/shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <PageTitle />
    <section className=' flex gap-3 w-max1200 py-20 mx-auto px-6 relative justify-between items-start flex-col sm:flex-row'  >

      <Link to='/shop/filter' activeOptions={{exact:true}} activeProps={{  className:
            " hidden",}} type='button' className=' flex gap-2 py-2 px-3 bg-neutral-800 text-white1 rounded-xl text-xs font-[600] sticky top-13 z-90'>
        <ListFilter size={17} />Filters
      </Link>
      <Outlet />
      <div className=" relative @container grow max-sm:w-full ">
        <List className="@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4" items={[1, 2, 3, 4, 5, 6, 21]} is={'div'} renderItem={(item) => (

          <ProduCard1 to={'/product/' + item} price={anyCurrency(item * 1000000)} className=" w-full @xs:w-max300" id={item} title={'Apple' + item} describtion='lorem ig asd' />
        )}
        />
      </div>
    </section>
  </ >
}
