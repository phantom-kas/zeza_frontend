import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/products/')({
  component: () =>
    <section className=' w-full flex items-start justify-start'>
      <img className=' w-full' src="../../../assets/images/home1.png" alt="" />
      <div className=' h-full absolute flex flex-col items-center text-center sm:text-start sm:items-start'>
        <span>Next-Gen<b />
          Mobility</span>
        <span>Power, performance, and style—experience the future of smartphones today</span>
      </div>
    </section>
})
