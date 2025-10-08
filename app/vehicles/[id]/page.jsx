'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { vehicles } from '@/app/constants';
import CarPromoBanner from '@/app/components/vehicle-components/CarPromoBanner';
import FeaturesSection from '@/app/components/vehicle-components/CarFeaturesSection';
import VariantsGrid from '@/app/components/vehicle-components/VariantsGrid';
import PricingList from '@/app/components/vehicle-components/PricingList';

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

  const carVariants = [
    {
      id: 1,
      name: 'VICTORIS LXI 1.5L 5MT',
      type: 'Manual',
      price: '₹ 10.49 LAKH',
    },
    {
      id: 2,
      name: 'VICTORIS VXI 1.5L 5MT',
      type: 'Manual',
      price: '₹ 11.79 LAKH',
    },
    { id: 3, name: 'VICTORIS 1.5L 5MT', type: 'Manual', price: '₹ 13.56 LAKH' },
    {
      id: 4,
      name: 'VICTORIS ZXI 1.5L 5MT',
      type: 'Manual',
      price: '₹ 13.56 LAKH',
    },
    {
      id: 5,
      name: 'VICTORIS ZXI 1.5L (DT)',
      type: 'Manual',
      price: '₹ 13.72 LAKH',
    },
  ];

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
      <FeaturesSection />
      <VariantsGrid
        title='Explore Variants'
        filters={['All', 'Manual', 'Automatic']}
        variants={carVariants}
      />

      <PricingList
        title='Discover Pricing'
        filters={['All', 'Manual', 'Automatic']}
        variants={carVariants}
      />
    </div>
  );
}
