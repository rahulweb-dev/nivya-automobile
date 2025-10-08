'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  Safety: [
    {
      title: 'Airbags for Enhanced Safety',
      image: '/images/safety1.jpg',
      description: 'Dual airbags ensuring passenger protection.',
    },
    {
      title: 'Rear Parking Camera',
      image: '/images/safety2.jpg',
      description: 'Park easily with live rear-view visuals.',
    },
  ],
  Features: [
    {
      title: 'CVT with Paddle Shifters',
      image: '/images/feature1.jpg',
      description: 'Smooth and responsive driving experience.',
    },
    {
      title: 'Road Departure Mitigation System',
      image: '/images/feature2.jpg',
      description: 'Alerts and assists with steering when needed.',
    },
    {
      title: 'Collision Mitigation System',
      image: '/images/feature3.jpg',
      description: 'Advanced sensors prevent collisions.',
    },
  ],
};

const tabs = Object.keys(featureData);

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('Exterior');

  return (
    <section className='w-full px-6 py-12 text-white bg-gray-900 '>
      {/* Tabs */}
      <div className='flex flex-wrap justify-center gap-3 mb-8'>
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

      {/* Heading */}
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-extrabold tracking-tight md:text-4xl'>
          {activeTab}
        </h2>
        <div className='w-24 h-1 mx-auto mt-2 bg-red-600 rounded-full'></div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='relative'
      >
        {featureData[activeTab]?.map((feature, index) => (
          <SwiperSlide key={index}>
            <div className='relative overflow-hidden transition-transform duration-300 shadow-lg h-72 rounded-xl hover:scale-105'>
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />
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
    </section>
  );
}
