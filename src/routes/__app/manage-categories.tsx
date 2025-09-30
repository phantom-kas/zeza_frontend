import { createFileRoute, Outlet } from '@tanstack/react-router'
import { HorizontalNav } from '../../components/horizontalNav'

export const Route = createFileRoute('/__app/manage-categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full flex flex-col items-center px-6 pt-10'>
    <div className="w-max1200">
      <HorizontalNav navList={[
        { to: '/manage-categories/', label: 'Categories' },
        { to: '/manage-categories/add', label: 'Add Category' },
        ]} />
    </div>
    <div className='w-max1200'>
      <Outlet />
    </div>
  </div>
}
