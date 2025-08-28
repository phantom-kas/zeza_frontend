import { createFileRoute, Outlet } from '@tanstack/react-router'
import { HorizontalNav } from '../../components/horizontalNav'

export const Route = createFileRoute('/__app/manage-products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full flex flex-col items-center px-6'>
    <div className="w-max1200">
      <HorizontalNav navList={[
        { to: '/manage-products/', label: 'Products' },
        { to: '/manage-products/add', label: 'Add Product' },
        ]} />
    </div>
    <div className='w-max1200'>
      <Outlet />
    </div>
  </div>
}
