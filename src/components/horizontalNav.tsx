import { Link } from "@tanstack/react-router"

export const HorizontalNav = ({ navList }: { navList: { label: string, params?: { [key: string]: string }, to: string }[] }) => {
  return <div className="text-sm font-medium text-center w-full  text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">

      {navList.map(item => <li className="me-2">
        <Link activeOptions={{exact:true}} activeProps={{
          className:
            "active1",
        }} to={item.to} params={item.params} className="inline-block p-4  rounded-t-lg   " aria-current="page"> {item.label}</Link>
      </li>)}


    </ul>
  </div>
}