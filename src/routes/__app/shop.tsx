import { createFileRoute, Outlet, useRouter, useSearch } from '@tanstack/react-router'
import List from '../../components/list1'
import PageTitle from '../../components/pageTitle'
import { ProduCard1 } from '../../components/productCard1'
import { anyCurrency } from '../../composabels/utils'
import { ListFilter } from 'lucide-react'
import { Link } from "@tanstack/react-router"
import InfiniteLoad from '../../components/list/infiniteLoad'
interface filters {
  brand?: string[],
  category?: string | undefined | string[],
  sort?: string | undefined,
  min?: number,
  max?: number,
}
export const Route = createFileRoute('/__app/shop')({
  component: RouteComponent,
  validateSearch: () => ({}) as filters

})




function RouteComponent() {
  const search = useSearch({ from: "/__app/shop" })

  return <>
    <PageTitle title1={!Array.isArray(search.category) ? search.category : undefined} />
    <section className=' flex gap-3 w-max1200 py-20 mx-auto px-6 relative justify-between items-start flex-col sm:flex-row'  >

      <Link to='/shop/filter' activeOptions={{}} activeProps={{
        className:
          " hidden",
      }} type='button' className=' flex gap-2 py-2 px-3 bg-neutral-800 text-white1 rounded-xl text-xs font-[600] sticky top-13 z-90'>
        <ListFilter size={17} />Filters
      </Link>
      <Outlet />
      <div className="flex flex-col relative @container grow max-sm:w-full ">
        <div className=''>
          <Filters />

        </div>
        <InfiniteLoad key={JSON.stringify(search)} query={search} renderItem={(item: any) => {
          return <ProduCard1 to={'/product/' + item.id} key={item.id} product={item} className=" w-full @xs:w-max300" />
        }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products' + JSON.stringify(search)} url='/products'
        />


      </div>
    </section>
  </ >
}


const Filters = () => {
  const router = useRouter()
  const search = useSearch({ from: "/__app/shop" })
  
  const { brand = [], category, sort } = search
  const activeBrands = Array.isArray(brand) ? brand : [brand].filter(Boolean)
  const activeFilters: string[] = [
    ...activeBrands.map((b) => `Brand: ${b}`),
    category ? `Category: ${category}` : "",
    sort ? `Sort: ${sort}` : "",
  ].filter(Boolean)

  const removeFilter = (filterType: keyof filters | 'categories', value?: string) => {
    const newSearch = { ...search }

    if (filterType === "brand" && value) {
      const updatedBrands = activeBrands.filter((b) => b !== value)
      newSearch.brand = updatedBrands.length > 0 ? updatedBrands : undefined
    }
    else if (filterType === "categories" && value) {
      const categories = activeBrands.filter((b) => b !== value)
      newSearch.category = categories.length > 0 ? categories : undefined
    }
    else {
      newSearch[filterType as keyof filters] = undefined
    }

    router.navigate({
      search: newSearch,
    })
  }

  const hasFilters = activeBrands.length > 0 || Boolean(category) || Boolean(sort)

  if (!hasFilters) return null
  return (
    <div className=' w-full mb-6'>
      <h2 className="text-lg font-bold mb-2">Active Filters</h2>
      <ul className="flex gap-2 flex-wrap">
        {activeBrands.map((brand) => (
          <li
            key={brand}
            className="px-3 py-1 theme2cont rounded-full text-sm flex items-center gap-1"
          >
            Brand: {brand}
            <button
              className="text-red-500"
              onClick={() => removeFilter("brand", brand)}
            >
              ✕
            </button>
          </li>
        ))}

        {(category && !Array.isArray(category)) && (
          <li className="px-3 py-1 theme2cont rounded-full text-sm flex items-center gap-1">
            Category: {category}
            <button
              className="text-red-500"
              onClick={() => removeFilter("category")}
            >
              ✕
            </button>
          </li>
        )}


        {Array.isArray(category) && category.map((c) => (
          <li
            key={c}
            className="px-3 py-1 theme2cont rounded-full text-sm flex items-center gap-1"
          >
            Category: {c}
            <button
              className="text-red-500"
              onClick={() => removeFilter("categories", c)}
            >
              ✕
            </button>
          </li>
        ))}


        {sort && (
          <li className="px-3 py-1 theme2cont rounded-full text-sm flex items-center gap-1">
            Sort: {sort}
            <button
              className="text-red-500"
              onClick={() => removeFilter("sort")}
            >
              ✕
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
