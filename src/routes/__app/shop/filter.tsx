import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import Checkbox from '../../../components/forms/checkbox'
import { memo, useEffect, useState } from 'react'
import { ChevronDown, ChevronDownIcon, ChevronUpIcon, Share2Icon, UserSearch } from 'lucide-react'
import { Dropdown } from '../../../components/dopDown'
import ValidatedInput from '../../../components/forms/input'
import { BlueButton } from '../../../components/ButtonBlue'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useThemeStore } from '../../../store/themestore'
import ToolTip from '../../../components/toolTip'
import { apiBase } from '../../../composabels/utils'

interface filters {
  brand?: string[],
  category?: string | undefined,
  sort?: string | undefined,
  min?: number,
  max?: number,
}
export const Route = createFileRoute("/__app/shop/filter")({

  component: Filters,
  validateSearch: () => ({}) as filters
})





function Filters() {

  const { isDark } = useThemeStore()
  const [brandsState, setBrandsState] = useState([])
  const [showbrandsState, setShowbrandsState] = useState(true)
  const [showCategories, setShowCategories] = useState(true)
  const [loadstate, setloadstate] = useState(true)
  const search = useSearch({ from: '/__app/shop/filter' })
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(search["min"]) || 0,
    Number(search["max"]) || 99999,
  ]);


  const navigate = useNavigate({ from: Route.fullPath })

  useEffect(() => {
    // document.getElementById('filtermenu')?.scrollIntoView()
  })

  const brandQuery = useQuery({
    queryKey: ['brandselect'],
    queryFn: async () => {
      const res = await axios.get('/brands/short')
      const options = res.data.data.map((element: { [x: string]: string | number }) => {
        return { value: element['id'], label: element['name'] }
      })
      // console.log('--------------------options------------------------------')
      // console.log(options)
      // console.log(res.data.data)
      return options
    }
  })


  const categoryQuery = useQuery({
    queryKey: ['categorieselect'],
    queryFn: async () => {
      const res = await axios.get('/categories/short')
      const options = res.data.data.map((element: { [x: string]: string | number }) => {
        return { value: element['id'], label: element['name'] }
      })
      // console.log('--------------------options------------------------------')
      // console.log(options)
      // console.log(res.data.data)
      return options
    }
  })

  const handleSearch = () => {
    let brands = brandsState.filter((e: any) => e.checked)
      .map((e: any) => e.label)

    navigate({ search: { ...search, brand: brands.length ? brands : undefined, } })
  }


  const handelShare =async (e:any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title:e.lable,
          text:e.lable,
          url:apiBase+'/category/'+e.label+'-'+e.value,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this browser");
    }
  }
  return (
    <div id='filtermenu' className=" sm:w-max200 w-full  sm:sticky sm:top-15 flex flex-col justify-start z-90 not-dark:bg-white dark:bg-black pb-20 sm:pb-0">
      <Dropdown

        options={[
          { label: "Price highest to lowest", isLink: true, search: { ...search, sort: "price-asc" }, emit: "price-desc" },
          { label: "Price lowest to highest ", isLink: true, search: { ...search, sort: "price-desc" }, emit: "price-asc" },
          { label: "Rating", isLink: true, search: { ...search, sort: "rating" }, emit: "rating" },
        ]}
        mainIcon={<div className=' cursor-pointer font-[600] text-2xl'>Sort By</div>}
        onAction={(emit) => navigate()}
      />


      <div className=' w-full' >
        <button onClick={() => setShowCategories(!showCategories)} className='flex  justify-between items-center w-full py-2 text-lg font-[600]'>Product Categories <button title='s' type='button' className=' btnicon1 ha'>{showCategories ? <ChevronDownIcon size={19} /> : <ChevronUpIcon size={19} />}</button></button>
        <div className={`flex flex-col ${!showCategories && ' hidden'}`}>
          {categoryQuery.data && categoryQuery.data.map((e: any) => <Link className='w-full flex justify-between px-2 ha cursor-pointer rounded-xs' activeProps={{ className: 'theme2cont' }} search={{ ...search, category: e.label }}>
            {e.label}
            <Dropdown
              options={[
                { label: "Share",  search: { ...search, sort: "price-asc" }, emit: "share", icon: <Share2Icon /> },
              ]}
              onAction={(emit) => handelShare(e)}
            />
          </Link>)}
        </div>
      </div>
      <div className=' w-full border-b not-dark:border-neutral-200 dark:border-neutral-700  my-6'></div>

      <button className=' w-full' >
        <div className='flex justify-between items-center w-full pb-3 text-lg font-[600]'>Brand <button className=' btnicon1 ha' title='s' type='button' >{showbrandsState ? <ChevronDownIcon size={19} /> : <ChevronUpIcon size={19} />}
        </button>
        </div>
        {brandQuery.data &&
          <BrandFilter
            className={`${!showbrandsState && ' hidden'}`}
            brands={brandQuery.data}

          />
        }
      </button>
      <div className=' w-full border-b not-dark:border-neutral-200 dark:border-neutral-700  my-6'></div>

      {/* <ValidatedInput type='number' name={'amt'} label='Price' /> */}
      {/* {...brandsState} */}

      <div className=' flex justify-between items-end mb-2'>
        <h1 className=' text-xl'>Price</h1>
        <Link search={{ ...search, min: String(priceRange[0]), max: String(priceRange[1]), }}>
          <BlueButton className=' ' label='Apply' />
        </Link>
      </div>
      <Slider
        styles={{
          track: {
            backgroundColor: isDark() ? '#155dfc' : "#3b82f6", // Tailwind blue-500
            // height: 8,
          },
          rail: {
            backgroundColor: isDark() ? 'gray' : '#d1d5db',
          },
          handle: {
            borderColor: "#3b82f6",
            backgroundColor: isDark() ? 'black' : 'white',
          },
        }}
        max={99999}
        defaultValue={priceRange}
        onChange={(val) => setPriceRange(val as [number, number])}
        className='' range />
      <div className=" flex-start flex text-sm items-center">
        <span className='  text-xs'>Selected range:</span> <span className=" ml-2 text-blue-600 font-semibold">{priceRange[0]}</span> –{" "}
        <span className="text-blue-600 font-semibold">{priceRange[1]}</span>
      </div>

      <BlueButton
        onClick={() => navigate({ search: {} })}
        className='mt-4'
        label='Reset'
        loading={false}
      />


    </div>
  )
}








type Brand = {
  label: string
  checked: boolean
}

type FilterProps = {
  brands: any[]
  className?: string
  onChange?: (updated: Brand[]) => void
}

export default function BrandFilter({ brands, onChange, className }: FilterProps) {
  // state as object array

  // const [brandObjects, setBrandObjects] = useState<Brand[]>([])



  const toggleBrand = (label: string) => {
    const selected = search.brand ?? []
    return selected.includes(label)
      ? selected.filter((b) => b !== label) // remove
      : [...selected, label] // add
  }
  const search = useSearch({ from: "/__app/shop/filter" })
  return (
    <div className={className}>
      {/* {new Date().toISOString()} */}

      {brands.map((brand) => {
        const isChecked = search.brand?.includes(brand.label) ?? false
        return <Link search={{ ...search, brand: toggleBrand(brand.label) }}> <Checkbox
          key={brand.label}
          checked={isChecked}
          onChange={() => { }}
          label={brand.label}
        /></Link>
      }
        // </link>
      )}
    </div>
  )
}

// const MemoCheckbox = memo(Checkbox)
