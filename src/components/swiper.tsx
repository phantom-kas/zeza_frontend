// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// eslint-disable-next-line react-refresh/only-export-components
export default ({className=''})=> {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className={"mySwiper "+className}
      >
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>
          <div className=' w-full h-full flex items-center justify-center bg-amber-300'> splide 1</div>
        </SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 2</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center ójustify-center'>Slide 3</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 4</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 5</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 6</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 7</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 8</SwiperSlide>
        <SwiperSlide className=' h-100 w-200  bg-amber-500 flex items-center justify-center'>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
