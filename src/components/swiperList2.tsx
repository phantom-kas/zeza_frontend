// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
// import './styles.css';

// import required modules
import { Autoplay, Pagination, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Expand, PlayCircle } from 'lucide-react';
import { getImageUrl } from '../composabels/utils';
interface swiperProps {
  className: string,
  media: { type: 'image' | 'video' | string, path: string, url: string }[]
}



// eslint-disable-next-line react-refresh/only-export-components
export default ({ className = '', media }: swiperProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>

      <div className={"flex flex-col relative" + className}>
        <Swiper
          // style={{
          //   '--swiper-navigation-color': '#000',
          //   '--swiper-pagination-color': '#000',
          // }}
          spaceBetween={10}
          navigation={true}
          pagination={{
            type: 'fraction',
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Pagination, Navigation, Thumbs]}
          loop={true}
          className={"mySwiper w-full h-[80%] flex"}
        >
          {media.map((item) => {
            return <SwiperSlide className=' h-full w-full theme2cont'>

              {item.type == 'image' ? <>  <div className=' w-full h-full'>
                <img alt='' className=' m-auto block max-w-full max-h-full' src={getImageUrl(item.url)} />
              </div>
              </> : <video className=' m-auto max-h-full max-w-full ' controls src={getImageUrl(item.url)} />
              }

            </SwiperSlide>
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={"w-full h-[17%]"}
        >
          {media.map((item) => {
            return <SwiperSlide className=' w-[25%] h-full relative mt-1'>
              {item.type == 'image' ? <>  <img alt='' className=' m-auto ' src={getImageUrl(item.url)} />
              </> : <> <video className=' m-auto max-h-full max-w-full ' controls src={getImageUrl(item.url)} />
                <div className=' w-full h-full flex items-center justify-center absolute top-0 left-0 text-white theme2cont '>
                  <PlayCircle className=' bg-black/30' />
                </div>
              </>
              }

            </SwiperSlide>
          })}
        </Swiper>
      </div>
    </>
  );
}
