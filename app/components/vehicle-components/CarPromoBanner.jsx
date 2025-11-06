'use client';

import React, { useState, memo } from 'react';
import Image from 'next/image';
import { FaGasPump, FaCarSide } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import ColorSelector from '../ColorSelector';


const HighlightCard = memo(({ label, value, icon: Icon }) => (
  <div className="flex items-center w-full max-w-xs gap-3 p-3 transition-all duration-500 border shadow-md sm:gap-4 sm:p-4 md:p-5 bg-white/10 backdrop-blur-lg border-white/20 rounded-xl sm:rounded-2xl hover:shadow-xl hover:-translate-y-1 sm:max-w-sm md:max-w-md">
    {/* Icon */}
    {Icon && (
      <Icon className="
        text-[#d4af37] 
        text-2xl sm:text-3xl md:text-4xl 
        shrink-0
      " />
    )}

    {/* Text */}
    <div className="flex flex-col">
      <p className="
        text-[10px] sm:text-xs md:text-sm 
        font-medium tracking-wider 
        text-gray-300 uppercase
      ">
        {label}
      </p>
      <h3 className="
        mt-0.5 sm:mt-1 
        text-base sm:text-lg md:text-xl lg:text-2xl 
        font-semibold text-white
      ">
        {value}
      </h3>
    </div>
  </div>
));




export default function CarPromoBanner({
  carName,
  price,
  type,
  fuelType,
  engine,
  imageUrl,
  colors = [],
  seatingCapacity,
  mileage,
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || { image: imageUrl, name: 'Default', id: 0 });

  return (
    <section className='relative w-full text-gray-100 bg-gradient-to-b from-[#1b1b1b] via-[#222] to-[#111] overflow-hidden'>
      {/* Ambient Glow */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute w-[700px] h-[700px] bg-[#d4af37]/10 rounded-full blur-[180px] top-[-200px] left-[-200px]' />
        <div className='absolute w-[600px] h-[600px] bg-[#c1121f]/10 rounded-full blur-[180px] bottom-[-200px] right-[-200px]' />
      </div>

      {/* Main Container */}
      <div className='relative z-10 flex flex-col-reverse items-center justify-between gap-16 px-6 py-24 mx-auto md:flex-row max-w-7xl'>
        {/* Info Section */}
        <div className='flex-1 space-y-10'>
          <div className='space-y-4'>
            <h2 className='text-4xl font-extrabold tracking-tight uppercase md:text-6xl bg-gradient-to-r from-[#f7e7ce] to-[#d4af37] bg-clip-text text-transparent drop-shadow-sm'>
              {carName}
            </h2>
            <div className='w-40 h-1 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full'></div>
          </div>

          {/* Highlights */}
          <div className='grid grid-cols-2 gap-6 md:gap-8'>
            <HighlightCard label='Starts From' value={price} />
            <HighlightCard label='Body Type' value={type} icon={FaCarSide} />
            <HighlightCard label='Fuel Type' value={fuelType} icon={FaGasPump} />
            <HighlightCard label='Engine' value={engine} icon={GiGearStickPattern} />
            <HighlightCard label='Seating Capacity' value={seatingCapacity || 'N/A'} icon={FaCarSide} />
            <HighlightCard label='Mileage' value={mileage || 'N/A'} icon={FaGasPump} />
          </div>
        </div>

        {/* Image & Color Selector Section */}
        <div className='flex flex-col items-center flex-1 space-y-6'>
          <ColorSelector
            colors={colors.length ? colors : [{ id: 0, name: 'Default', image: imageUrl }]}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className='flex flex-col items-center justify-center gap-4 py-12 md:flex-row md:gap-6'>
        <a
          href={`/brochure/${encodeURIComponent(carName)}`}
          target='_blank'
          className='px-8 py-3 font-semibold text-black transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-xl shadow-lg hover:shadow-xl hover:scale-105'
        >
          View Brochure
        </a>
        <a
          href={`/book-test-drive/${encodeURIComponent(carName)}`}
          className='px-8 py-3 font-semibold text-white transition-all duration-300 border-2 border-[#d4af37] rounded-xl shadow hover:bg-[#d4af37] hover:text-black hover:scale-105'
        >
          Book a Test Drive
        </a>
        <a
          href='#vehicleForm'
          className='px-8 py-3 font-semibold text-white transition-all duration-300 bg-[#c1121f] rounded-xl shadow hover:bg-[#d73326] hover:scale-105'
        >
          Get On-Road Price
        </a>
      </div>

      {/* Divider */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent'></div>
    </section>
  );
}
