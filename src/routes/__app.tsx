// src/routes/__app.tsx
import { createFileRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Logo from '../components/logo'
import { HomeIcon, Store, ShoppingCart, Heart, User, LogIn, MenuIcon, UserRoundCog, TableConfig, Hourglass, LogOutIcon, Settings, PlusIcon, PackagePlus, UserPlus2, Boxes, Octagon } from 'lucide-react'
import { ThemeToggle } from '../components/toggleThem'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import Login from '../components/authentication/login'
import Register from '../components/authentication/register'
import ForgotPassword from '../components/authentication/forgot-password'
import { useAuthStore } from '../store/auth'
import { useLoaderStore } from '../store/loader'
import axios from '../lib/axios'
import { Dropdown } from '../components/dopDown'
import Avatar from '../components/avatar/avatarWithImage'
import { getImageUrl } from '../composabels/utils'
import { useQuery } from '@tanstack/react-query'
import { useCartStore } from '../store/cart'
const TopNav = () => {
  const { itemsCount, setItemsCount } = useCartStore();
  const { user, setToken, token } = useAuthStore();
  const loader = useLoaderStore()

  useQuery({
    queryKey: ['cart'],
    queryFn: async () =>
      await axios.get('/cart').then(res => {
        if (res.data.status != 'success') return
        setItemsCount(res.data.data.total.totalUnits)
        return res.data.data
      }),
    enabled: !!user,
  })

  let ran = false;
  useEffect(() => {
    if (ran) return;
    const checkAuth = async () => {
      ran = true;
      if (!user) {
        setToken(null)
        return;
      }
      try {
        loader.start2()
        const res = await axios.get("check_token");
        if (res.data.status !== "success") {
          setToken(null)
          console.log('error check tkn')
          return
        }
        console.warn('getting cart -----------------')
      } catch (err) {
        setToken(null)
        console.error("Error checking token:", err);
      } finally {
        loader.stop2()
      }
    };
    checkAuth();


  }, [user]); // run when user changes

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
        <NavItem className='relative ' to="/cart" label={itemsCount > 0 ? <> Cart <div className='flex justify-center items-center w-5 h-5 rounded-2xl absolute text-[11px] font-[600]  left-0 top-[0px] text-xs bg-amber-700 text-white'> {itemsCount}</div></> : 'Cart'} icon={<ShoppingCart size={16} />} />
        <NavItem to="/" label="Favourite" icon={<Heart size={16} />} />


        {!(!token || !user) && <> <Dropdown className=" max-lg:w-full" dropClasses=' theme1cont' mainIcon={
          <NavItem to={null} label="Manage" icon={<Settings size={16} />} />
        } options={
          [
            { label: 'Manage Users', icon: <UserRoundCog size={16} />, isLink: true, link: '/profile' },
            { label: 'Manage Products', icon: <TableConfig size={16} />, isLink: true, link: '/manage-products' },
            { label: 'Manage Categories', icon: <Boxes size={15} />, isLink: true, link: '/manage-categories' },
            { label: 'Manage Brands', icon: <Octagon size={15} />, isLink: true, link: '/manage-brands' },
          ]
        } />


          <Dropdown className=" max-lg:w-full" dropClasses=' theme1cont' mainIcon={
            <NavItem to={null} label="Add" icon={<PlusIcon size={16} />} />
          } options={
            [
              { label: 'Add User', icon: <UserPlus2 size={16} />, isLink: true, link: '/profile' },
              { label: 'Add Product', icon: <PackagePlus size={16} />, isLink: true, link: '/manage-products/add' },
              { label: 'Add Category', icon: <Boxes size={15} />, isLink: true, link: '/manage-categories/add' },
              { label: 'Add Brand', icon: <Octagon size={15} />, isLink: true, link: '/manage-brands/add' },
            ]
          } />
        </>
        }
      </div>
      <div className={` flex   lg:items-center lg:justify-start gap-x-1 lg:flex-row flex-col items-start justify-start max-lg:w-full px-2 lg:px-0 mt-auto lg:mt-0  ${open ? 'flex ' : ' max-lg:hidden'}`}>
        <ThemeToggle />
        {(!token || !user) ? (
          <><NavItem to={routerState.location.pathname + "?modal=login"} label="Login" icon={<LogIn size={16} />} /><NavItem to={routerState.location.pathname + "?modal=signup"} label="Register" icon={<User size={16} />} /></>) :
          <Dropdown className=" max-lg:w-full" dropClasses=' theme1cont' mainIcon={
            <NavItem to={null} label={user.name} icon={<Avatar url={getImageUrl(user.image)} />} />
          } options={
            [
              { label: 'Profile', icon: <User size={15} />, isLink: true, link: '/profile' },
              { label: 'logout', icon: <LogOutIcon size={15} /> },
            ]
          } />
        }
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
      <Splash />
    </>
  ),
})

const Splash = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loader = useLoaderStore()
  return loader.isLoading2() && <div className=' dark:text-white2  dark:bg-black not-dark:bg-white2 w-dvw h-dvh fixed top-0 left-0 z-[999999] flex flex-col justify-center items-center'>
    <Hourglass className='animate-spin' size={60} />
  </div>
}

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
  to: string | null
  label: React.ReactNode,
  icon?: ReactNode,
  className?: string
}
export function NavItem({ className = '', to, label, icon }: NavItemProps) {
  return (
    <Link disabled={to == null}
      to={to as string}
      className={"flex text-sm items-center lg:gap-1 gap-4 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 max-lg:w-full cursor-pointer " + className}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Link>
  )
}