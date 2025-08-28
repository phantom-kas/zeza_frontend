import { createFileRoute } from '@tanstack/react-router'
import List from '../../../components/list1'
import { anyCurrency } from '../../../composabels/utils'
import { ProduCardAdmin } from '../../../components/productsAdmin'

export const Route = createFileRoute('/__app/manage-products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <div className=" relative @container grow pt-10 pb-20">
        <List className="@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4" items={[1, 2, 3, 4, 5, 6, 21]} is={'div'} renderItem={(item) => (
          
          <ProduCardAdmin created_at={'2025-09-10'} to={'/product/'+item} price={anyCurrency(item * 1000000)} className=" w-full @xs:w-max300" id={item} title={'Apple'+item} describtion='lorem ig asd' />
        )}
        />
      </div>
 
}
