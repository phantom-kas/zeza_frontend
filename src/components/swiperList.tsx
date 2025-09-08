// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Expand } from 'lucide-react';
import { getImageUrl } from '../composabels/utils';
interface swiperProps {
  className: string,
  media: { type: 'image' | 'video' | string, path: string, url: string }[]
}
// eslint-disable-next-line react-refresh/only-export-components
export default ({ className = '', media }: swiperProps) => {
  return (
    <>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Pagination]}
        className={"mySwiper " + className}
      >
        {media.map((item) => {
          return <SwiperSlide className=' w-full h-full  flex items-center justify-center'>
            <div className=' relative w-full h-full flex items-center justify-center '>
              {item.type == 'image' ? <>  <img alt='' className=' max-w-full max-h-full' src={getImageUrl(item.url)} />
                <div className=' absolute bottom-1 right-1 p-1 w-7 h-7 flex items-center justify-center'>
                  <Expand />
                </div>
              </> : <video className=' max-w-full max-h-full' controls src={getImageUrl(item.url)} />
              }
            </div>
          </SwiperSlide>
        })}

        
      </Swiper>
    </>
  );
}
