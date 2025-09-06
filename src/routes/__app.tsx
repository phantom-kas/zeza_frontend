// src/routes/__app.tsx
import { createFileRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Logo from '../components/logo'
import { HomeIcon, Store, ShoppingCart, Heart, User, LogIn, MenuIcon, UserRoundCog, TableConfig } from 'lucide-react'
import { ThemeToggle } from '../components/toggleThem'
import { useState } from 'react'
import Footer from '../components/footer'
import Login from '../components/authentication/login'
import Register from '../components/authentication/register'
import ForgotPassword from '../components/authentication/forgot-password'
const TopNav = () => {
  const routerState = useRouterState();

  const [open, setOpen] = useState(false);
  console.log(Route)
  return <> <nav className={` top-0 shadow-sm flex items-center justify-center  dark:bg-neutral-950 dark:text-white   z-100 bg-white fixed lg:w-full w-max300 ${open ? ' ' : ' max-lg:w-full '}`} >
    <div className={`w-max1200 lg:px-6 z-100  flex lg:items-center lg:justify-between mx-auto lg:h-12  lg:flex-row flex-col items-start justify-start ${open ? ' max-lg:h-dvh ' : ' h-12'}`}>
      <div className={` flex gap-1 items-center px-4 lg:px-0  `}>
        <button onClick={() => setOpen(!open)} title='Toggle Menu' type="button" className=" p-2 rounded-full lg:hidden">
          <MenuIcon />
        </button>
        <Logo />
      </div>
      <div className={`' flex lg:items-center lg:justify-start gap-x-1 lg:flex-row flex-col items-start justify-start px-2 lg:px-0 max-lg:w-full lg:mt-0 mt-3 ${open ? 'flex ' : ' max-lg:hidden'}`}>
        <NavItem to="/" label="Home" icon={<HomeIcon size={16} />} />
        <NavItem to="/shop" label="Shop" icon={<Store size={16} />} />
        <NavItem to="/" label="Cart" icon={<ShoppingCart size={16} />} />
        <NavItem to="/" label="Favourite" icon={<Heart size={16} />} />
        <NavItem to="/manage-products" label="Manage Products" icon={<TableConfig size={16} />} />
        <NavItem to="/" label="Manage Users" icon={<UserRoundCog size={16} />} />
      </div>
      <div className={` flex   lg:items-center lg:justify-start gap-x-1 lg:flex-row flex-col items-start justify-start max-lg:w-full px-2 lg:px-0 mt-auto lg:mt-0  ${open ? 'flex ' : ' max-lg:hidden'}`}>
        <ThemeToggle />
        <NavItem to={routerState.location.pathname + "?modal=login"} label="Login" icon={<LogIn size={16} />} />
        <NavItem to={routerState.location.pathname + "?modal=signup"} label="Register" icon={<User size={16} />} />
      </div>
    </div>
  </nav>
    <div className={`lg:hidden h-screen w-screen top-0 left-0  z-[99] fixed bg-black opacity-25 ${open ? '  ' : ' hidden'}`} onClick={() => setOpen(!open)}></div>
  </>
}
export const Route = createFileRoute('/__app')({
  component: () => (
    <>

      <TopNav />
      <main className=' mx-auto w-full mt-12 not-dark:text-black dark:text-white'>
        <Outlet />
      </main>
      {<ModelComponent />}
      <Footer />
    </>
  ),
})

function ModelComponent() {
  // Tell useSearch which route to read from
  const search: { modal?: string } = Route.useSearch()
  console.log(search)
  if (!search.modal) {
    return
  }
  switch (search.modal) {
    case 'login':
      return <Login />;
    case 'signin':
      return <Login />;
    case 'signup':
      return <Register />;
    case 'register':
      return <Register />;
    case 'forgot-password':
      return <ForgotPassword />;

  }
}
interface NavItemProps {
  to: string
  label: string
  icon?: ReactNode
}
export function NavItem({ to, label, icon }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex text-sm items-center lg:gap-1 gap-4 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 max-lg:w-full"
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Link>
  )
}