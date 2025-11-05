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
    <section className='relative py-20 overflow-hidden bg-white'>
      <div className='grid items-center grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-2'>
        {/* LEFT SIDE */}
        <div data-aos='fade-right'>
          <h2 className='mb-6 text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl'>
            What Our <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ca800a]'>
              Customers Says
            </span>
          </h2>
          <p className='mb-8 leading-relaxed text-gray-600'>
            Relation so in confined smallest children unpacked delicate. Why sir
            end believe uncivil respect. Always get adieus nature day course for
            common.
          </p>
          <button className='px-6 py-3 font-medium text-white transition-all duration-300 bg-black rounded-lg shadow-md hover:shadow-xl'>
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
                    src='https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/saboonexa/icons/Saboo-Nexa-Profile-Icon.webp'
                    alt='image'
                    width={60}
                    height={60}
                    className='object-cover rounded-full'
                  />
                  <div className='flex-1'>
                    <h4 className='mb-1 font-semibold text-gray-900'>
                      {t.name}
                    </h4>
                    <p className='text-sm leading-relaxed text-gray-500'>
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
