'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner({ sliders = [] }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className='relative w-full'>
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        modules={[Navigation, Autoplay]}
        loop={true}
        className='mySwiper'
      >
        {sliders.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.link || '#'} className='select-none'>
              {/* Desktop Image */}
              <div className='hidden md:block'>
                <Image
                  src={item.desktopImg}
                  alt={item.alt || 'Banner'}
                  width={1920}
                  height={800}
                  className='object-cover w-full h-auto'
                  priority={index === 0}
                />
              </div>

              {/* Mobile Image */}
              <div className='block mt-20 md:hidden'>
                <Image
                  src={item.mobileImg}
                  alt={item.alt || 'Banner'}
                  width={800}
                  height={800}
                  className='object-cover w-full h-auto'
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div
          ref={navigationPrevRef}
          className='absolute z-10 p-3 transition -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer left-4 md:left-10 top-1/2 hover:bg-gray-500'
        >
          <GrFormPrevious size={24} />
        </div>
        <div
          ref={navigationNextRef}
          className='absolute z-10 p-3 transition -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer right-4 md:right-10 top-1/2 hover:bg-gray-500'
        >
          <GrFormNext size={24} />
        </div>
      </Swiper>
    </div>
  );
}
