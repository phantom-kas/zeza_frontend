// eslint-disable-next-line react-refresh/only-export-components
export default ({title1="New Arrival",title2="Shop through our latest selection of Products"}:{title1?:string,title2?:string}) => {
  return <div className=' dark:border-b dark:border-b-neutral-700 w-full py-3 flex items-start px-8 sm:items-center justify-center sm:py-10  flex-col gap-1 sm:gap-7 not-dark:bg-gradient-to-r not-dark:from-[#01589A] not-dark:to-[#009CDE] text-white'>
    <h1 className=' font-[600] sm:text-7xl text-2xl '>{title1}</h1>
    <span className=' sm:text-sm text-xs '>{title2}</span>
  </div>
}