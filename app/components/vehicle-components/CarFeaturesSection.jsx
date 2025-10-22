'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import VehicleForm from '../forms/VehicleForm';
// 👈 import it here

const featureData = {
  Exterior: [
    {
      title: 'Chrome Front Grille',
      image:
        'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/new-alto-k10/slide-show/exterior_web_01.webp',
      description: 'A bold front design with a sleek chrome finish.',
    },
    {
      title: 'LED Projector Headlamps',
      image:
        'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/new-alto-k10/slide-show/exterior_web_03.webp',
      description: 'Bright and efficient LED lighting for clear visibility.',
    },
    {
      title: 'Alloy Wheels',
      image:
        'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/new-alto-k10/slide-show/exterior_web_04.webp',
      description:
        'Stylish alloy wheels that complement the car’s modern design.',
    },
  ],
  Interiors: [
    {
      title: 'Premium Dashboard Design',
      image:
        'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/new-alto-k10/slide-show/Interior_web_02.webp',
      description: 'A luxurious interior crafted with precision and comfort.',
    },
    {
      title: 'Touchscreen Infotainment',
      image:
        'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/new-alto-k10/slide-show/highlight_web_01.webp',
      description: 'Smart connectivity and entertainment on the go.',
    },
  ],
};

const tabs = Object.keys(featureData);

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('Exterior');

  return (
    <section className='w-full px-6 py-12 text-white bg-gray-900'>
      <div className='flex flex-col gap-12 mx-auto lg:flex-row max-w-7xl'>
        {/* Left Column - Vehicle Form */}
        <div className='w-full lg:w-2xl'>
          <VehicleForm Vehicle={<option value='Alto-k10'>Alto K10</option>} />
        </div>

        {/* Right Column - Features */}
        <div className='flex flex-col w-full gap-6 lg:w-4xl'>
          <div className='flex flex-wrap justify-center gap-3 lg:justify-center'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-semibold text-sm rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-red-600 shadow-lg'
                    : 'bg-black hover:bg-red-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className='text-center lg:text-left'>
            <h2 className='text-3xl font-extrabold md:text-4xl'>{activeTab}</h2>
            <div className='w-24 h-1 mt-2 bg-red-600 rounded-full'></div>
          </div>

          <div className='flex-grow'>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {featureData[activeTab]?.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className='relative overflow-hidden transition-transform shadow-lg h-72 md:h-80 rounded-xl hover:scale-105'>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className='object-cover rounded-xl'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-xl' />
                    <div className='absolute bottom-4 left-4 right-4'>
                      <h3 className='text-lg font-bold'>{feature.title}</h3>
                      {feature.description && (
                        <p className='mt-1 text-sm text-gray-200'>
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
