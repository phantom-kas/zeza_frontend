import { type ReactNode } from "react"
import FullscreenOverlay from "../FullscreenOverlay"
import { useNavigate, useRouterState } from '@tanstack/react-router'
import {  XIcon } from "lucide-react"
// eslint-disable-next-line react-refresh/only-export-components
export default ({ children = <span></span>,title='' }: {title:string, children: ReactNode }) => {
  const navigate = useNavigate()
  const routerState = useRouterState();

  const goBack = () => {
    // Navigate to same pathname but without search params
    const currentPathname = routerState.location.pathname;
    navigate({ to: currentPathname });
  }
  return <>
    <div className=" w-dvw h-dvh flex flex-start top-0 fixed justify-center z-[99999]">
      <FullscreenOverlay onClose={() => goBack()} isOpen={true} className=" flex flex-col dark:bg-black gap-y-4 rounded-2xl theme1cont w-max500 not-dark:bg-white relative dark:text-white2 p-3 "
      >
        <div className=" w-full flex justify-end">
          <button type="button" onClick={()=>goBack()} className=" rounded-full w-10 h-10 p-1 ha flex justify-center items-center">
            {/* <X /> */}
            <XIcon size={90}/>
          </button>
        </div>
        <h1 className=" text-center text-3xl font-[500]">{title}</h1>
        {children}
      </FullscreenOverlay>
    </div>
  </>
}