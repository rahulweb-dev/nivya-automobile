'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Mehwish',
      text: 'Compliment interested discretion estimating on stimulated apartments oh.',
      image: '/testimonials/t1.jpg',
    },
    {
      name: 'Elizabeth Jeff',
      text: 'Dear so sing when in find read of call. As distrusts behaviour abilities defective is.',
      image: '/testimonials/t2.jpg',
      active: true,
    },
    {
      name: 'Emily Thomas',
      text: 'Never at water me might. On formed merits hunted unable merely by mr whence or.',
      image: '/testimonials/t3.jpg',
    },
  ];

  return (
    <section className='py-20 bg-white relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* LEFT SIDE */}
        <div data-aos='fade-right'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-6'>
            What Our <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500'>
              Customers Says
            </span>
          </h2>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            Relation so in confined smallest children unpacked delicate. Why sir
            end believe uncivil respect. Always get adieus nature day course for
            common.
          </p>
          <button className='bg-black text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300'>
            View More
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className='relative' data-aos='fade-left'>
          <Swiper
            direction='vertical'
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            slidesPerView={2}
            spaceBetween={30}
            pagination={{ clickable: true }}
            className='h-[400px]'
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`p-6 rounded-xl bg-white shadow-md border ${
                    t.active
                      ? 'border-l-4 border-indigo-500'
                      : 'border-transparent'
                  } flex items-start gap-4 hover:shadow-xl transition-all duration-300`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className='rounded-full object-cover'
                  />
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      {t.name}
                    </h4>
                    <p className='text-gray-500 text-sm leading-relaxed'>
                      {t.text}
                    </p>
                  </div>
                  <FaQuoteRight
                    className={`text-2xl ${
                      t.active ? 'text-indigo-500' : 'text-gray-300'
                    } opacity-60`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
