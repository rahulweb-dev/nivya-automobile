'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';

const cars = [
  {
    name: 'VICTORIS',
    image: 'https://www.skyautomobiles.in/thumbnail/victoris.png',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 10.50 L /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'ALTO K10',
    image: 'https://www.skyautomobiles.in/thumbnail/altoK10.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 5.78 L* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'SWIFT',
    image: 'https://www.skyautomobiles.in/thumbnail/swift02.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 3.69 L* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'BREZZA',
    image: 'https://www.skyautomobiles.in/thumbnail/brezza-page.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 8.25 L /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'DZIRE',
    image: 'https://www.skyautomobiles.in/thumbnail/bluishblack.png',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 6.25 L* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'S-PRESSO',
    image: 'https://www.skyautomobiles.in/thumbnail/spresso.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 3.49* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'WAGONR',
    image: 'https://www.skyautomobiles.in/thumbnail/wagnor.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 4.98* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'ERTIGA',
    image: 'https://www.skyautomobiles.in/thumbnail/ertiga.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 8.80* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'CELERIO',
    image: 'https://www.skyautomobiles.in/thumbnail/celerio.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 4.69* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
  {
    name: 'EECO',
    image: 'https://www.skyautomobiles.in/thumbnail/Eeco.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 5.20* /-',
    subtext: 'ex-showroom',
    brochure: '#',
  },
];

export default function CarListing() {
  return (
    <section className='relative py-20 bg-gray-200 overflow-hidden'>
      {/* Subtle background glow */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute w-72 h-72 bg-blue-500/10 blur-3xl rounded-full top-10 left-20' />
        <div className='absolute w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full bottom-10 right-20' />
      </div>

      <div className='max-w-7xl mx-auto px-6 text-center text-black'>
        {/* Section Heading */}
        <h2 className='text-3xl md:text-4xl font-bold mb-3 tracking-tight'>
          Explore Our Latest Cars
        </h2>
        <p className='text-gray-400 mb-12 max-w-2xl mx-auto text-sm md:text-base'>
          Discover premium models crafted for performance, reliability, and
          timeless design.
        </p>

        {/* Car Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {cars.map((car, index) => (
            <div
              key={index}
              className='group bg-neutral-800 border border-neutral-700 rounded-2xl shadow-md hover:shadow-lg hover:border-neutral-500 transition-all duration-300 overflow-hidden'
            >
              {/* Top Bar */}
              <div className='flex justify-between items-center px-5 pt-4'>
                <span className='text-xs font-medium text-gray-400 tracking-wide'>
                  {car.name === 'eVITARA'}
                </span>
                <a
                  href={car.brochure}
                  className='flex items-center gap-1 text-gray-400 text-xs hover:text-white transition'
                >
                  <Download className='w-4 h-4' />
                  Brochure
                </a>
              </div>

              {/* Car Image (full visible) */}
              <div className='w-full flex items-center justify-center bg-neutral-900 mt-4 px-4 py-4'>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={220}
                  className='object-contain transition-transform duration-300 group-hover:scale-[1.03]'
                />
              </div>

              {/* Details */}
              <div className='p-6 text-center'>
                <div className='flex items-center justify-center gap-2 mb-1'>
                  {car.logo && (
                    <Image
                      src={car.logo}
                      alt={`${car.name} logo`}
                      width={28}
                      height={28}
                      className='object-contain rounded-full border border-white/10'
                    />
                  )}
                  <h3 className='text-lg font-semibold text-white tracking-tight'>
                    {car.name}
                  </h3>
                </div>
                <p className='text-xl font-bold text-white'>{car.price}</p>
                <p className='text-gray-400 text-xs mb-6'>{car.subtext}</p>

                {/* Buttons */}
                <div className='flex justify-center gap-3'>
                  <button className='border border-white/30 text-white text-xs font-semibold py-2 px-6 rounded-full hover:bg-white/10 transition-all duration-200'>
                    EXPLORE
                  </button>
                  <button className='bg-white text-black text-xs font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-all duration-200'>
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
