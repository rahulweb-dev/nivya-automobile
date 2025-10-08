'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { vehicles } from '@/app/constants';
import CarPromoBanner from '@/app/components/vehicle-components/CarPromoBanner';
import FeaturesSection from '@/app/components/vehicle-components/CarFeaturesSection';

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
    <div className='min-h-screen bg-gray-50 mt-11'>
      <CarPromoBanner
        carName={vehicle.name}
        price={vehicle.price}
        type={vehicle.type}
        fuelType={vehicle.fuel}
        engine={vehicle.engine}
        imageUrl='https://www.skyautomobiles.in/images/car/arena/altok10/altok-10-metallic-sizzling-red1.png'
        colors={vehicle.colors}
      />
      <FeaturesSection/>
    </div>
  );
}
