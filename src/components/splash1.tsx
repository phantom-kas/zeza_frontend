import { Hourglass } from "lucide-react"

export default  () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
 
  return <div className=' dark:text-white2  dark:bg-black not-dark:bg-white2 w-dvw h-dvh fixed top-0 left-0 z-[999999] flex flex-col justify-center items-center'>
    <Hourglass className='animate-spin' size={60} />
  </div>
}