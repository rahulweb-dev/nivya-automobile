'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import BookNowForm only on client
const BookNowForm = dynamic(
  () => import('@/app/components/vehicle-components/CarCard'),
  { ssr: false }
);

export default function CarCard({ car }) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className='overflow-hidden transition-all duration-300 border shadow-md group bg-[#e7e7e7] border-neutral-700 rounded-2xl hover:shadow-lg hover:border-neutral-500'>
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
            onClick={() => setFormOpen(true)}
            className='px-6 py-2 text-xs font-semibold text-black transition-all duration-200 bg-white rounded-full hover:bg-gray-200'
          >
            BOOK NOW
          </button>
        </div>

        {/* Popup Form */}
        {formOpen && (
          <BookNowForm
            open={formOpen}
            setOpen={setFormOpen}
            carName={car.name}
          />
        )}
      </div>
    </div>
  );
}
