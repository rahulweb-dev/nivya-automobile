'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import Link from 'next/link';
import BookNowForm from './forms/Booknowform';
import { useState } from 'react';

const cars = [
  {
    name: 'VICTORIS',
    image: 'https://www.skyautomobiles.in/thumbnail/victoris.png',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 10.50 L /-',
    brochure:
      'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/cars/victoris/brochure/Maruti-Suzuki-Arena-Victoris-Brochure.pdf',
    link: '/vehicles/victoris',
  },
  {
    name: 'ALTO K10',
    image: 'https://www.skyautomobiles.in/thumbnail/altoK10.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 5.78 L* /-',
    brochure: '#',
    link: '/vehicles/alto-k10',
  },
  {
    name: 'SWIFT',
    image: 'https://www.skyautomobiles.in/thumbnail/swift02.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 3.69 L* /-',
    brochure: '#',
    link: '/vehicles/swift',
  },
  {
    name: 'BREZZA',
    image: 'https://www.skyautomobiles.in/thumbnail/brezza-page.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 8.25 L /-',
    brochure: '#',
    link: '/vehicles/brezza',
  },
  {
    name: 'DZIRE',
    image: 'https://www.skyautomobiles.in/thumbnail/bluishblack.png',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 6.25 L* /-',
    brochure: '#',
    link: '/vehicles/dzire',
  },
  {
    name: 'S-PRESSO',
    image: 'https://www.skyautomobiles.in/thumbnail/spresso.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 3.49* /-',
    brochure: '#',
    link: '/vehicles/spresso',
  },
  {
    name: 'WAGONR',
    image: 'https://www.skyautomobiles.in/thumbnail/wagnor.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 4.98* /-',
    brochure: '#',
    link: '/vehicles/wagonr',
  },
  {
    name: 'ERTIGA',
    image: 'https://www.skyautomobiles.in/thumbnail/ertiga.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 8.80* /-',
    brochure: '#',
    link: '/vehicles/ertiga',
  },
  {
    name: 'CELERIO',
    image: 'https://www.skyautomobiles.in/thumbnail/celerio.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 4.69* /-',
    brochure: '#',
    link: '/vehicles/celerio',
  },
  {
    name: 'EECO',
    image: 'https://www.skyautomobiles.in/thumbnail/Eeco.webp',
    logo: 'https://www.varunmaruti.com/uploads/products/pro_1614579022Dzire1.jpg',
    price: '₹ 5.20* /-',
    brochure: '#',
    link: '/vehicles/eeco',
  },
];

export default function CarListing() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // Track which car is selected

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setFormOpen(true);
  };

  return (
    <section className='relative py-20 overflow-hidden bg-gray-200'>
      {/* Subtle background glow */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute rounded-full w-72 h-72 bg-blue-500/10 blur-3xl top-10 left-20' />
        <div className='absolute rounded-full w-72 h-72 bg-indigo-500/10 blur-3xl bottom-10 right-20' />
      </div>

      <div className='px-6 mx-auto text-center text-black max-w-7xl'>
        <h2 className='mb-3 text-3xl tracking-tight md:text-4xl'>
          Explore Our Latest Cars
        </h2>
        <p className='max-w-2xl mx-auto mb-12 text-sm text-gray-400 md:text-base'>
          Discover premium models crafted for performance, reliability, and
          timeless design.
        </p>

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.map((car, index) => (
            <div
              key={index}
              className='overflow-hidden transition-all duration-300 border shadow-md group bg-[#e7e7e7] border-neutral-700 rounded-2xl hover:shadow-lg hover:border-neutral-500'
            >
              {/* Top Bar */}
              <div className='flex items-center justify-between px-5 pt-4'>
                <span className='text-xs font-medium tracking-wide text-gray-400'></span>
                <a
                  href={car.brochure}
                  className='flex items-center gap-1 text-xs text-black transition hover:text-white'
                >
                  <Download className='w-4 h-4' />
                  Brochure
                </a>
              </div>

              {/* Car Image */}
              <div className='flex items-center justify-center w-full px-4 py-4 mt-4 bg-[#e7e7e7]'>
                <Link href={car.link}>
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={400}
                    height={220}
                    className='object-contain transition-transform duration-300 group-hover:scale-[1.03]'
                  />
                </Link>
              </div>

              {/* Details */}
              <div className='p-6 text-center'>
                <h3 className='text-lg font-semibold tracking-tight text-black'>
                  {car.name}
                </h3>
                <p className='text-xl font-bold text-black'>{car.price}</p>
                <p className='mb-6 text-xs text-gray-600'>ex-showroom,</p>

                {/* Buttons */}
                <div className='flex justify-center gap-3'>
                  <Link href={car.link}>
                    <button className='px-6 py-2 text-xs font-semibold text-black transition-all duration-200 border rounded-full border-white/30 hover:bg-black hover:text-white'>
                      EXPLORE
                    </button>
                  </Link>
                  <button
                    onClick={() => handleBookNow(car)}
                    className='px-6 py-2 text-xs font-semibold text-black transition-all duration-200 bg-white rounded-full hover:bg-gray-200'
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Form */}
      {formOpen && selectedCar && (
        <BookNowForm
          open={formOpen}
          setOpen={setFormOpen}
          carName={selectedCar.name}
        />
      )}
    </section>
  );
}
