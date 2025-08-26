// src/routes/__app.tsx
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Logo from '../components/logo'
import { HomeIcon, Store, ShoppingCart, Heart, User, LogIn, MenuIcon } from 'lucide-react'
import { ThemeToggle } from '../components/toggleThem'
import { useState } from 'react'

const TopNav = () => {
  const [open, setOpen] = useState(false);

  return <> <nav className={`   dark:bg-neutral-950 dark:text-white   z-100 bg-white fixed sm:w-full w-max300 ${open ? ' ' : ' max-sm:w-full '}`} >
    <div className={`w-max1200 sm:px-6 z-100  flex sm:items-center sm:justify-between mx-auto sm:h-12  sm:flex-row flex-col items-start justify-start ${open ? ' max-sm:h-dvh ' : ' h-12'}`}>
      <div className={` flex gap-1 items-center px-4 sm:px-0  `}>
        <button onClick={() => setOpen(!open)} title='Toggle Menu' type="button" className=" p-2 rounded-full sm:hidden">
          <MenuIcon />
        </button>
        <Logo />
      </div>
      <div className={`' flex sm:items-center sm:justify-start gap-x-1 sm:flex-row flex-col items-start justify-start px-2 sm:px-0 max-sm:w-full sm:mt-0 mt-3 ${open ? 'flex ' : ' max-sm:hidden'}`}>
        <NavItem to="/" label="Home" icon={<HomeIcon size={16} />} />
        <NavItem to="/" label="Shop" icon={<Store size={16} />} />
        <NavItem to="/" label="Cart" icon={<ShoppingCart size={16} />} />
        <NavItem to="/" label="Favourite" icon={<Heart size={16} />} />
      </div>
      <div className={` flex   sm:items-center sm:justify-start gap-x-1 sm:flex-row flex-col items-start justify-start max-sm:w-full px-2 sm:px-0 mt-auto sm:mt-0  ${open ? 'flex ' : ' max-sm:hidden'}`}>
        <ThemeToggle />
        <NavItem to="/" label="Login" icon={<LogIn size={16} />} />
        <NavItem to="/" label="Register" icon={<User size={16} />} />
      </div>
    </div>
  </nav>
  <div className={`sm:hidden h-screen w-screen top-0 left-0  z-[99] fixed bg-black opacity-25 ${open ? '  ' : ' hidden'}` }  onClick={()=>  setOpen(!open)}></div>
  </>
}
export const Route = createFileRoute('/__app')({
  component: () => (
    <>
      <TopNav />
      <main className=' mx-auto w-full pt-12'>
        <Outlet />
      </main>
    </>
  ),
})


interface NavItemProps {
  to: string
  label: string
  icon?: ReactNode
}
export function NavItem({ to, label, icon }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex text-sm items-center sm:gap-1 gap-4 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 max-sm:w-full"
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Link>
  )
}