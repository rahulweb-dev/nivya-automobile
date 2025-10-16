'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Variants Grid Component with "View More" Button
 *
 * @param {string} title - Section title (e.g., "Explore Variants")
 * @param {Array} variants - List of variant objects [{ id, name, type, price }]
 */
export default function VariantsGrid({ title = 'Explore Variants', variants = [] }) {
  const [showAll, setShowAll] = useState(false);

  // Limit displayed variants
  const displayedVariants = showAll ? variants : variants.slice(0, 6);

  return (
    <section className='w-full px-4 py-12 bg-gray-50 md:px-8 lg:px-16'>
      {/* Title */}
      <h2 className='mb-10 text-2xl font-bold text-center uppercase md:text-3xl'>
        {title}
      </h2>

      {/* Variants Grid */}
      <div className='grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3'>
        {displayedVariants.map((variant, index) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl border transition-all duration-300 p-6 bg-white shadow-md hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 ${
              index === 0 ? 'border-[#d4af37] bg-[#fffaf0]' : 'border-gray-200'
            }`}
          >
            <h3 className='mb-2 text-lg font-bold text-gray-800'>
              {variant.name}
            </h3>

            {variant.type && (
              <span className='inline-block px-3 py-1 mb-4 text-xs font-medium text-gray-600 bg-gray-100 rounded-full'>
                {variant.type.toUpperCase()} TRANSMISSION
              </span>
            )}

            <p className='mb-4 text-2xl font-bold text-[#d4af37]'>
              {variant.price}
            </p>

            <button className='w-full bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] text-black font-semibold py-2.5 rounded-lg shadow hover:from-[#e5c100] hover:to-[#fff5cc] transition-all duration-300'>
              {variant.buttonText || 'VIEW FEATURES'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* View More / Less Button */}
      {variants.length > 6 && (
        <div className='flex justify-center mt-10'>
          <button
            onClick={() => setShowAll(!showAll)}
            className='px-6 py-3 text-sm font-semibold text-white bg-[#d4af37] rounded-full shadow hover:bg-[#c7a032] transition-all duration-300'
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}
    </section>
  );
}
