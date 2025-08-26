import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
export const Route = createFileRoute('/__app/')({
  component: () =>
    <section className=' w-full flex items-start justify-start relative overflow-hidden bg-red-900'>
      <img className=' w-full sm:-my-20 max-sm:hidden' src="/src/assets/images/home1.png" alt="" />
      <div className=' bg-black w-full h-full absolute opacity-40 dark:opacity-100'></div>
      <div className='sm:absolute flex h-full w-full z-90 max-sm:py-8'>
        <div className='   flex flex-col justify-center  px-6 w-max1200 gap-y-5 mx-auto items-center sm:items-start text-center sm:text-start'>
          <span className=' text-6xl font-[700] text-white'>Next-Gen<br />
            Mobility</span>
          <span className=' text-white font-[500]'>Power, performance, and style—experience the future of smartphones today</span>

          <button type="button" className=' flex items-center gap-x-1 rounded-xl text-sm bg-white py-2 px-4 cursor-pointer z-10 relative'>
            Shop Now <ChevronRight />
          </button>
        </div>
      </div>

    </section>
})
