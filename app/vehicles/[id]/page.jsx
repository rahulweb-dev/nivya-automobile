'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaCar, FaCogs, FaGasPump, FaRupeeSign } from 'react-icons/fa';
import { vehicles } from '@/app/constants';

export default function VehiclePage() {
  const { id } = useParams();

  const vehicle = vehicles[id];

  if (!vehicle) {
    return (
      <div className='h-[70vh] flex items-center justify-center text-gray-600 text-lg'>
        Vehicle not found 😔
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-16 text-center'>
        <div className='max-w-4xl mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            {vehicle.name}
          </h1>
          <p className='text-base md:text-lg opacity-90'>{vehicle.desc}</p>
        </div>
      </section>

      {/* Vehicle Image */}
      <div className='flex justify-center mt-10'>
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={600}
          height={350}
          className='rounded-2xl shadow-lg object-contain'
        />
      </div>

      {/* Specifications */}
      <section className='max-w-5xl mx-auto mt-12 px-6 grid md:grid-cols-2 gap-8'>
        <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition'>
          <FaCar className='text-blue-600 text-3xl' />
          <div>
            <h4 className='font-semibold text-lg'>Type</h4>
            <p className='text-gray-600'>{vehicle.type}</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition'>
          <FaGasPump className='text-green-600 text-3xl' />
          <div>
            <h4 className='font-semibold text-lg'>Fuel Type</h4>
            <p className='text-gray-600'>{vehicle.fuel}</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition'>
          <FaCogs className='text-purple-600 text-3xl' />
          <div>
            <h4 className='font-semibold text-lg'>Engine</h4>
            <p className='text-gray-600'>{vehicle.engine}</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition'>
          <FaRupeeSign className='text-orange-600 text-3xl' />
          <div>
            <h4 className='font-semibold text-lg'>Price</h4>
            <p className='text-gray-600'>{vehicle.price}</p>
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section className='text-center mt-16 mb-20'>
        <h2 className='text-2xl font-bold mb-4'>
          Interested in {vehicle.name}?
        </h2>
        <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full shadow-md hover:opacity-90 transition'>
          Enquire Now
        </button>
      </section>
    </div>
  );
}
