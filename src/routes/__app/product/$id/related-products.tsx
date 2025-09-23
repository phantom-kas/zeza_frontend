import { createFileRoute } from '@tanstack/react-router'
import InfiniteLoad from '../../../../components/list/infiniteLoad'
import { ProduCard1 } from '../../../../components/productCard1'
import { useProductsPageStore } from '../../../../store/productsPage'

export const Route = createFileRoute('/__app/product/$id/related-products')({
  component: RouteComponent,
})

function RouteComponent() {
  const { brands, categories } = useProductsPageStore()
  const categoryNames = categories.map(c => c.name);
  const brandNames = brands.map(c => c.name);

  let params = { brand: brandNames, category: categoryNames }
  console.log('---------------------------ioioioi----------------')
  console.log(params)
  console.log('---------------------------ioioioi----------------')
  return <div className=" relative @container grow max-sm:w-full ">
    <InfiniteLoad key={JSON.stringify(params)} query={params} renderItem={(item: any) => {
      return <ProduCard1 to={'/product/' + item.id} product={item} className=" w-full @xs:w-max300" />
    }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products' + JSON.stringify(params)} url='/products'
    />
  </div>
}
