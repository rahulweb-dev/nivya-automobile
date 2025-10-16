'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';

export const VehicleForm = ({ Vehicle }) => {
  const [formData, setFormData] = useState({ name: '', number: '', model: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('✅ Your inquiry has been submitted successfully!');
        setFormData({ name: '', number: '', model: '' });
      } else {
        toast.error('❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
     toast.error('⚠️ Server error. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='sticky max-w-md p-10 bg-gray-100 border-2 shadow-2xl lg:w-full top-4 rounded-2xl'>
        <h2 className='mb-6 text-2xl font-bold text-center text-black'>
          Vehicle Inquiry Form
        </h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 space-y-8'>
          <input
            name='name'
            type='text'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          />
          <input
            name='number'
            type='tel'
            maxLength={10}
            minLength={10}
            placeholder='Mobile Number'
            value={formData.number}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          />
          <select
            name='model'
            value={formData.model}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          >
            <option value='' disabled>
              Select Model
            </option>
            {Vehicle}
          </select>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 mt-2 font-semibold text-gray-900 transition-colors bg-yellow-400 rounded-lg hover:bg-yellow-500 disabled:opacity-60'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-sm text-center text-gray-700'>{message}</p>
        )}

        <p className='mt-4 text-xs text-center text-gray-400'>
          <strong>Disclaimer:</strong> By submitting, you agree to our Terms &
          Conditions.
        </p>
      </div>
    </div>
  );
};

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
    <section className='w-full px-6 py-12 text-white bg-gray-900'>
      <div className='flex flex-col gap-12 mx-auto lg:flex-row max-w-7xl'>
        {/* Left Column - Vehicle Form */}
        <div className='w-full lg:w-2xl'>
          <VehicleForm Vehicle={<option value='Alto-k10'>Alto K10</option>} />
        </div>

        {/* Right Column - Features */}
        <div className='flex flex-col w-full gap-6 lg:w-4xl'>
          {/* Tabs */}
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

          {/* Heading */}
          <div className='text-center lg:text-left'>
            <h2 className='text-3xl font-extrabold md:text-4xl'>{activeTab}</h2>
            <div className='w-24 h-1 mt-2 bg-red-600 rounded-full'></div>
          </div>

          {/* Swiper Carousel */}
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
              className='h-full'
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
