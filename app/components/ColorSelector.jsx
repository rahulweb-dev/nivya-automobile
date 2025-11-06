'use client';

import Image from 'next/image';

export default function ColorSelector({
  colors = [],
  selectedColor,
  setSelectedColor,
}) {
  if (!colors.length) return null;

  return (
    <div className='py-8'>
      {/* Selected Car Image */}
      <div className='flex justify-center mt-4'>
        {selectedColor?.image && (
          <Image
            src={selectedColor.image}
            alt={selectedColor.name || 'Car Color'}
            width={600}
            height={300}
            className='object-contain transition-transform duration-500 ease-in-out rounded-xl'
          />
        )}
      </div>

      {/* Color Swatches */}
      <div className='flex flex-wrap items-center justify-center gap-3 mt-6'>
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => setSelectedColor(color)}
            className='relative w-8 h-8 cursor-pointer'
          >
            <div
              className={`w-8 h-8 rounded-full border-2 relative ${
                selectedColor?.id === color.id
                  ? 'border-black'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex || 'transparent' }}
            >
              {color.thumbnail && (
                <Image
                  src={color.thumbnail}
                  alt={color.name}
                  width={32}
                  height={32}
                  className='rounded-full'
                />
              )}

              {/* Centered Check Mark */}
              {selectedColor?.id === color.id && (
                <span className="absolute inset-0 m-auto w-4 h-4 bg-[url('https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/saboonexa/logos/check-icon.png')] bg-center bg-no-repeat"></span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Color Name - Centered Below Swatches */}
      {selectedColor?.name && (
        <div className='flex justify-center mt-4'>
          <p className='px-4 py-1 text-sm font-medium text-center uppercase bg-black rounded-full bg-opacity-10 lg:text-xl'>
            {selectedColor.name}
          </p>
        </div>
      )}
    </div>
  );
}
