import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
// import { Dropdown } from '../../components/dopDown'
export const Route = createFileRoute('/__app/')({
  component: () =>
    <>
      <section className=' w-full flex items-start justify-start relative overflow-hidden bg-red-900'>
        <img className=' w-full sm:-my-20 max-sm:hidden' src="/src/assets/images/home1.png" alt="" />
        <div className=' bg-black w-full h-full absolute opacity-40 dark:opacity-100'></div>
        <div className='sm:absolute flex h-full w-full z-90 max-sm:py-8'>
          <div className='   flex flex-col justify-center  px-6 w-max1200 gap-y-5 mx-auto items-center sm:items-start text-center sm:text-start'>
            <span className=' text-6xl lg:text-8xl font-[700] text-white'>Next-Gen<br />
              Mobility</span>
            <span className=' text-white font-[500]'>Power, performance, and style—experience the future of smartphones today</span>

            {/* <Dropdown
      options={[
        { icon: <Trash2 size={18} />, label: "Delete", emit: "del" },
        { icon: <Edit size={18} />, label: "Edit", emit: "edit" },
      ]}
      mainIcon={<Edit className=' dark:text-white' size={18} />}
      onAction={(emit) => console.log("Action:", emit)}
    /> */}
            <button type="button" className=' text-black flex items-center gap-x-1 rounded-xl text-sm bg-white py-2 px-4 cursor-pointer z-10 relative'>
              Shop Now <ChevronRight />

            </button>
          </div>
        </div>

      </section>
      <section className=' px-6 w-max1200 flex items-center justify-start flex-col text-center mx-auto py-25'>
        <h1 className=' font-[600] text-4xl mb-2' >Top Trending Products</h1>
        <span className=' font-[400] text-sm'>Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection
          of trending products designed to elevate your lifestyle.</span>
        <div className=' grid sm:grid-cols-3 lg:gap-30 gap-10 mt-10 grid-1'>

          <ProductCard title1="Macbook" title2='Up to 50% off laptop' />
          <ProductCard title1="Macbook" title2='Up to 50% off laptop' />
          <ProductCard title1="Macbook" title2='Up to 50% off laptop' />
        </div>
      </section>
    </>
})


const ProductCard: React.FC<{ title1: string, title2: string }> = ({ title1, title2 }) => {
  return <div className='  flex items-start justify-start flex-col not-dark:bg-lightblue dark:border-lightblue dark:border dark:bg-lightblueDark py-4 px-4'>
    <h1 className=' text-start text-2xl font-[400] '>{title1}</h1>
    <h2 className=' text-start text-sm'>{title2}</h2>
    <img className=' w-full' src="/src/assets/images/phone.png" alt="" />
    <div className=' w-full flex gap-1 hover:underline cursor-pointer'>Shop now <ArrowUpRight size={24}/></div>
  </div>
}