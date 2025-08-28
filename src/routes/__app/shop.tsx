import { createFileRoute, Outlet } from '@tanstack/react-router'
import List from '../../components/list1'
import PageTitle from '../../components/pageTitle'
import { ProduCard1 } from '../../components/productCard1'
import { anyCurrency } from '../../composabels/utils'

export const Route = createFileRoute('/__app/shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <PageTitle  />
    <section className=' flex gap-3 w-max1200 py-20 mx-auto px-6 relative justify-between items-start '  >

      <Outlet />
      <div className=" relative @container grow">
        <List className="@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4" items={[1, 2, 3, 4, 5, 6, 21]} is={'div'} renderItem={(item) => (
          
          <ProduCard1 to={'/product/'+item} price={anyCurrency(item * 1000000)} className=" w-full @xs:w-max300" id={item} title={'Apple'+item} describtion='lorem ig asd' />
        )}
        />
      </div>
    </section>
  </ >
}
