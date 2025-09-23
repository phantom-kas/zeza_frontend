import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import axios from 'axios'
import { ArrowUpRight, ChevronRight, ImageIcon } from 'lucide-react'
import SwiperList from '../../components/swiperList'
import SwiperListAutoPlay from '../../components/swiperListAutoPlay'
import { useSettingsStore } from '../../store/system'
import SwiperListHome from '../../components/swiperListHome'
// import { Dropdown } from '../../components/dopDown'
export const Route = createFileRoute('/__app/')({
  component: Home
})


function Home() {

  const { isPending, error, data } = useQuery({
    queryKey: ['systemMediaData'],
    queryFn: async () => {
      let m = await axios.get(`/media`)
      return m.data.data.media
    }
  })


  const { settings } = useSettingsStore()

  // if (isPending) return

  // {error && <span>Error</span>}

  return <>
    <section className=' w-full flex items-start justify-start relative mdc:overflow-hidden  flex-col overflow-hidden'>
      {/* <img className=' w-full mdc:-my-20 ' src="/src/assets/images/home1.png" alt="" /> */}
      {data && data.length > 0 ? <SwiperListHome className={" w-screen mdc:h-[56vw] mdc:-mt-30"} media={data} /> :<img className=' w-full mdc:-my-20 ' src="/src/assets/images/home1.png" alt="" />}
      {/* */}
      <div className=' relative mdc:absolute theme2cont max-md:-mt-2
       flex flex-col mdc:flex-row  z-90 max-sm:py-8 w-full mdc:w-max700 mdc:top-1/2 mdc:left-30  mdc:-translate-y-1/2 mdc:overflow-hidden rounded-b-3xl mdc:rounded-3xl px-6 py-12 items-center'>
        <div className='  h-[150%] absolute -top-[5] -left-[5]   blurbg -z-10 w-[150%] max-mdc:opacity-90'></div>
        <div className='   flex flex-col justify-center px-6 w-max1200 gap-y-5 mx-auto  items-start  text-start'>
          <span className=' text-3xl sm:text-5xl sm:leading-10 leading-6 md:leading-20  mdc:text-8xl lg:text-8xl font-[700]  gradiant-text' dangerouslySetInnerHTML={{ __html: settings.call_to_action_text }}></span>
          <span className='  font-[500]'>{settings.hero_text}</span>
          <Link to='/shop' type="button" className=' ha dark:bg-black/50 dark:text-white/60  theme2cont text-neutral-900 flex items-center gap-x-1 rounded-xl text-sm bg-white py-2 px-4 cursor-pointer z-10 relative'>
            Shop Now <ChevronRight />
          </Link>
        </div>
      </div>

    </section>
    <section className=' px-6 w-max1200 flex items-center justify-start flex-col text-center mx-auto py-25'>
      <h1 className=' font-[600] text-4xl mb-2 w-full' >Top Trending Products</h1>
      <span className=' font-[400] text-sm w-full' >Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection
        of trending products designed to elevate your lifestyle.</span>
      <Featured />

    </section>
  </>

}
const ProductCard: React.FC<{ id: string, media: string, title1: string, className?: string, title2: string }> = ({ className = ' relative   w-max400', id, media, title1, title2 }) => {
  let mediaparsed = []
  if (media) {
    mediaparsed = JSON.parse(media)
  }
  return <Link to={'/product/' + id} className={'  flex items-start justify-start flex-col not-dark:bg-lightblue  dark:bg-lightblueDark py-4 px-4 theme2cont ' + className}>
    <h1 className=' text-start text-2xl font-[400] '>{title1}</h1>
    <h2 className=' text-start text-sm'>{title2}</h2>
    {mediaparsed.length > 0 ? <SwiperListAutoPlay className={" w-full h-70"} media={mediaparsed} /> : <ImageIcon className={"w-full h-70"} />}
    <div className=' w-full flex gap-1 hover:underline cursor-pointer'>Shop now <ArrowUpRight size={24} /></div>
  </Link>
}



const Featured = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['/products/featrued'],
    queryFn: async () => {
      const res = await axios.get('/products?featured=1')
      return res.data.data
    }
  })
  return <div className=' @container grid sm:grid-cols-3 lg:gap-30 gap-10 mt-10 grid-cols-1 w-max1000'>
    {data && data.map((p: any) => { return <ProductCard className='' id={p.id} media={p.media} title1={p.name} title2='' /> })}
  </div>
}

