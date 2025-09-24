import { createFileRoute } from '@tanstack/react-router'
import { ProduCard1 } from '../../components/productCard1'
import InfiniteLoad from '../../components/list/infiniteLoad'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/__app/Favorite')({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()

    const onRemoveFromFav = (pp: any) => {
        queryClient.setQueryData(["products_fav"], (oldData: any) => {
            if (!oldData) return oldData

            return {
                ...oldData,
                pages: oldData.pages.map((page: any) =>
                    page.filter((p: any) =>
                        p.id !== pp.id
                    )
                ),
            }
        })
    }
    return <section className=' flex  gap-3 relative @container   w-max1200 py-20 mx-auto px-6  justify-between items-center flex-col'  >
        <InfiniteLoad renderItem={(item: any) => {
            return <ProduCard1 onFav={p => onRemoveFromFav(p)} to={'/product/' + item.id} key={item.id} product={item} className=" w-full @xs:w-max300" />
        }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products_fav'} url='/product/favorite'
        />
    </section>
}
