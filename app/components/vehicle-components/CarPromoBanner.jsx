'use client';

import React, { useState, memo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaGasPump, FaCarSide } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';



// Reusable Highlight Card
const HighlightCard = memo(({ label, value, icon: Icon }) => (
  <div className='flex items-center gap-4 p-5 transition-all duration-500 border shadow-md bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl hover:shadow-xl hover:-translate-y-1'>
    {Icon && <Icon className='text-[#d4af37] text-3xl shrink-0' />}
    <div>
      <p className='text-xs font-medium tracking-wider text-gray-300 uppercase'>
        {label}
      </p>
      <h3 className='mt-1 text-lg font-semibold text-white md:text-xl'>
        {value}
      </h3>
    </div>
  </div>
));

// Color Selector
const ColorSelector = memo(({ colors, selectedColor, setSelectedColor }) => {
  if (!colors?.length) return null;

  return (
    <div className='flex flex-col items-center gap-3 mt-6'>
      <div className='flex flex-wrap justify-center gap-4'>
        {colors.map((color) => (
          <button
            key={color.name}
            aria-label={color.name}
            title={color.name}
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 focus:outline-none ${
              selectedColor.name === color.name
                ? 'scale-110 border-[#d4af37] shadow-[0_0_10px_#d4af37aa]'
                : 'border-gray-400 hover:scale-105'
            }`}
            style={{ backgroundColor: color.code }}
          />
        ))}
      </div>
      <p className='text-sm text-gray-300'>
        {selectedColor.name
          ? `Selected: ${selectedColor.name}`
          : 'Select a color'}
      </p>
    </div>
  );
});

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
  const [selectedColor, setSelectedColor] = useState(colors[0] || {});

  return (
    <section className='relative w-full text-gray-100 bg-gradient-to-b from-[#1b1b1b] via-[#222] to-[#111] overflow-hidden'>
      {/* Ambient Glow Background */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute w-[700px] h-[700px] bg-[#d4af37]/10 rounded-full blur-[180px] top-[-200px] left-[-200px]' />
        <div className='absolute w-[600px] h-[600px] bg-[#c1121f]/10 rounded-full blur-[180px] bottom-[-200px] right-[-200px]' />
      </div>

      {/* Main Container */}
      <div className='relative z-10 flex flex-col-reverse items-center justify-between gap-16 px-6 py-24 mx-auto md:flex-row max-w-7xl'>
        {/* Left - Info Section */}
        <div className='flex-1 space-y-10'>
          <div className='space-y-4'>
            <h2 className='text-4xl font-extrabold tracking-tight uppercase md:text-6xl bg-gradient-to-r from-[#f7e7ce] to-[#d4af37] bg-clip-text text-transparent drop-shadow-sm'>
              {carName}
            </h2>
            <div className='w-40 h-1 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full'></div>
          </div>

          {/* Highlights Grid */}
          <div className='grid grid-cols-2 gap-6 md:gap-8'>
            <HighlightCard label='Starts From' value={price} />
            <HighlightCard label='Body Type' value={type} icon={FaCarSide} />
            <HighlightCard
              label='Fuel Type'
              value={fuelType}
              icon={FaGasPump}
            />
            <HighlightCard
              label='Engine'
              value={engine}
              icon={GiGearStickPattern}
            />
            <HighlightCard
              label='Seating Capacity'
              value={seatingCapacity || 'N/A'}
              icon={FaCarSide}
            />
            <HighlightCard
              label='Mileage'
              value={mileage || 'N/A'}
              icon={FaGasPump}
            />
          </div>
        </div>

        {/* Right - Image Section */}
        <div className='flex flex-col items-center flex-1 space-y-6'>
          <div className='relative w-full max-w-lg'>
            {/* Soft Backlight Glow */}
            <div className='absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#d4af37]/30 via-[#f7e7ce]/10 to-transparent blur-3xl opacity-70'></div>

            <Image
              src={selectedColor.image || imageUrl}
              alt={`${carName} - ${selectedColor.name || 'Default'}`}
              width={600}
              height={400}
              className='relative object-contain transition-transform duration-700 ease-in-out rounded-xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] hover:scale-105'
              priority
            />
          </div>
          <ColorSelector
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className='flex flex-col items-center justify-center gap-4 py-12 md:flex-row md:gap-6'>
        <a
          href={`/brochure/${carName}`}
          target='_blank'
          className='px-8 py-3 font-semibold text-black transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-xl shadow-lg hover:shadow-xl hover:scale-105'
        >
          View Brochure
        </a>
        <a
          href={`/book-test-drive/${carName}`}
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
