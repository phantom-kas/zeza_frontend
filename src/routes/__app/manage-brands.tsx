import { createFileRoute, Outlet } from '@tanstack/react-router'
import { HorizontalNav } from '../../components/horizontalNav'

export const Route = createFileRoute('/__app/manage-brands')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full flex flex-col items-center px-6'>
    <div className="w-max1200">
      <HorizontalNav navList={[
        { to: '/manage-brands/', label: 'Brands' },
        { to: '/manage-brands/add', label: 'Add Brand' },
        ]} />
    </div>
    <div className='w-max1200'>
      <Outlet />
    </div>
  </div>
}



