import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import ProductDetails from '../../../components/productCard2'
import axios from '../../../lib/axios'
import { useQuery } from '@tanstack/react-query'
import FullscreenOverlay from '../../../components/FullscreenOverlay'
import { useState } from 'react'
import CloseRow from '../../../components/closeRow'
import PurchaseForm from '../../../components/forms/purchaseForm'
import { useProductsPageStore } from '../../../store/productsPage'

export const Route = createFileRoute('/__app/product/$id')({
  component: RouteComponent,
})
function RouteComponent() {
  const { setItemsBrands, setCategories } = useProductsPageStore()
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { id } = Route.useParams()


  const qFn = (id: string | number) => {
    return axios.get(`/product/${id}`).then((res) => {

      setItemsBrands(res.data.data.brand)
      setCategories(res.data.data.categories)
      return res.data.data
    })
  }
  const { isPending, error, data } = useQuery({
    queryKey: [`/product/${id}`],
    queryFn: async () => {
      let m = await qFn(id)
      // console.log(m);

      return m
    }
  })


  if (isPending) { return 'loading' }

  // if (!data) return

  return <div className='  w-max1200 mx-auto py-20 flex flex-col lg:flex-row px-6 min-h-dvh gap-x-10 items-start relative gap-y-10'>

    <ProductDetails onSetIsopen={(i) => { setIsOpen(!isOpen); setQuantity(i); return }} className=' w-max500 shrink-0 relative lg:sticky lg:top-15' product={{
      name: data.product.name,
      id: data.product.id,
      description: data.product.description,
      price: data.product.price,
      new: undefined,
      review: data.product.review,
      num_review: data.product.num_review,
      media: data.media
    }} />

    <div className='flex flex-col w-full '>
      <div className="text-sm font-medium  text-center w-full text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <Link activeProps={{
              className:
                "active1",
            }} to="/product/$id/related-products" params={{ id }} className="inline-block p-4  rounded-t-lg  " aria-current="page">Related Product</Link>
          </li>
          <li className="me-2">
            <Link activeProps={{
              className:
                "active1",
            }} to="/product/$id/create_review" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" params={{ id }}>Write your Review</Link>
          </li>

          <li className="me-2">
            <Link activeProps={{
              className:
                "active1",
            }} params={{ id }} to="/product/$id/reviews" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">All Reviews</Link>
          </li>

        </ul>
      </div>


      <Outlet />
    </div>


    <FullscreenOverlay className=' p-3  w-max500 theme1cont dark:bg-black not-dark:bg-white' isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
      {/* <div className=' mx-auto  p-4 w-max500 '> */}
      <div className='flex flex-col gap-4 '>
        <CloseRow onclick={() => setIsOpen(false)} />
        <PurchaseForm  msg={'I would like to purchase ' + quantity + ' unit' + (quantity == 1 ? '' : 's ') + ' of this product.'} onClose={() => setIsOpen(false)} product={id} quantity={quantity} />
      </div>
      {/* </div> */}
    </FullscreenOverlay>

  </div>
}
