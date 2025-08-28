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


  const brands = ["Nike", "Adidas", "Puma", "Reebok"]
  const categories = ['Laptops', 'Phone', 'Camera', 'Watches'];
  return (
    <div className=" w-max200  sticky top-15 flex flex-col justify-start">
      <Dropdown
        options={[
          { label: "Price", emit: "del" },
          { label: "Quantity", emit: "edit" },
          { label: "Rating", emit: "edit" },
        ]}
        mainIcon={<div className=' cursor-pointer font-[600] text-2xl'>Sort By</div>}
        onAction={(emit) => console.log("Action:", emit)}
      />


      <div className=' w-full'>
        <div className='flex justify-between items-center w-full py-2 text-lg font-[600]'>Product Categories <button title='s' type='button' onClick={() => setShowCategories(!showCategories)}>{showCategories ? <ChevronDownIcon /> : <ChevronUpIcon />}</button></div>
        <div className={`flex flex-col gap-1 ${!showCategories && ' hidden'}`}>

          {categories.map(e => <span>{e}</span>)}
        </div>
      </div>
      <div className=' w-full border-b not-dark:border-neutral-200 dark:border-neutral-700  my-6'></div>

      <div className=' w-full'>
        <div className='flex justify-between items-center w-full pb-3 text-lg font-[600]'>Brand <button title='s' type='button' onClick={() => setShowbrandsState(!showbrandsState)}>{showbrandsState ? <ChevronDownIcon /> : <ChevronUpIcon />}</button></div>
        <BrandFilter
          className={`${!showbrandsState && ' hidden'}`}
          brands={brands}
          onChange={(updated) => {
            setBrandsState(updated)
            console.log("Updated brand objects:", updated)
          }}
        />
      </div>
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
