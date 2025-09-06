import { createFileRoute } from '@tanstack/react-router'
import Checkbox from '../../../components/forms/checkbox'
import { memo, useEffect, useState } from 'react'
import { ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Dropdown } from '../../../components/dopDown'
import ValidatedInput from '../../../components/forms/input'
import { BlueButton } from '../../../components/ButtonBlue'

export const Route = createFileRoute("/__app/shop/filter")({

  component: Filters
})



function Filters() {
  const [brandsState, setBrandsState] = useState([])
  const [showbrandsState, setShowbrandsState] = useState(true)
  const [showCategories, setShowCategories] = useState(true)
  const [loadstate, setloadstate] = useState(true)

  useEffect(() => {
    document.getElementById('filtermenu')?.scrollIntoView()
  })

  const brands = ["Nike", "Adidas", "Puma", "Reebok"]
  const categories = ['Laptops', 'Phone', 'Camera', 'Watches'];
  return (
    <div id='filtermenu' className=" sm:w-max200 w-full  sm:sticky sm:top-15 flex flex-col justify-start z-90 not-dark:bg-white dark:bg-black pb-20 sm:pb-0">
      <Dropdown
        options={[
          { label: "Price", emit: "del" },
          { label: "Quantity", emit: "edit" },
          { label: "Rating", emit: "edit" },
        ]}
        mainIcon={<div className=' cursor-pointer font-[600] text-2xl'>Sort By</div>}
        onAction={(emit) => console.log("Action:", emit)}
      />


      <div className=' w-full' >
        <button onClick={() => setShowCategories(!showCategories)} className='flex  justify-between items-center w-full py-2 text-lg font-[600]'>Product Categories <button title='s' type='button' className=' btnicon1 ha'>{showCategories ? <ChevronDownIcon size={19} /> : <ChevronUpIcon size={19} />}</button></button>
        <div className={`flex flex-col gap-1 ${!showCategories && ' hidden'}`}>
          {categories.map(e => <span>{e}</span>)}
        </div>
      </div>
      <div className=' w-full border-b not-dark:border-neutral-200 dark:border-neutral-700  my-6'></div>

      <button className=' w-full' onClick={() => setShowbrandsState(!showbrandsState)}>
        <div className='flex justify-between items-center w-full pb-3 text-lg font-[600]'>Brand <button className=' btnicon1 ha' title='s' type='button' >{showbrandsState ? <ChevronDownIcon size={19} /> : <ChevronUpIcon size={19} />}</button></div>
        <BrandFilter
          className={`${!showbrandsState && ' hidden'}`}
          brands={brands}
          onChange={(updated) => {
            setBrandsState(updated)
            console.log("Updated brand objects:", updated)
          }}
        />
      </button>
      <div className=' w-full border-b not-dark:border-neutral-200 dark:border-neutral-700  my-6'></div>

      <ValidatedInput type='number' name={'amt'} label='Price' />

      <BlueButton className=' mt-4' label='Reset' loading={false} />


    </div>
  )
}








type Brand = {
  label: string
  checked: boolean
}

type FilterProps = {
  brands: string[]
  className?: string
  onChange?: (updated: Brand[]) => void
}

export default function BrandFilter({ brands, onChange, className }: FilterProps) {
  // state as object array
  const [brandObjects, setBrandObjects] = useState<Brand[]>([])

  useEffect(() => {
    setBrandObjects((prev) => {
      const existing = new Map(prev.map((b) => [b.label, b.checked]))
      return brands.map((b) => ({
        label: b,
        checked: existing.get(b) ?? false,
      }))
    })
  }, [brands])

  const toggleBrand = (label: string, checked: boolean) => {
    const updated = brandObjects.map((brand) =>
      brand.label === label ? { ...brand, checked } : brand
    )
    setBrandObjects(updated)

    // notify parent with the full updated array
    onChange?.(updated)
  }

  return (
    <div className={className}>
      {/* {new Date().toISOString()} */}

      {brandObjects.map((brand) => (
        <Checkbox
          key={brand.label}
          checked={brand.checked}
          onChange={(checked) => toggleBrand(brand.label, checked)}
          label={brand.label}
        />
      ))}
    </div>
  )
}

// const MemoCheckbox = memo(Checkbox)
