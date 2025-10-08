'use client';
import { useState } from 'react';

export default function PricingList({ title, filters, variants }) {
  const [activeFilter, setActiveFilter] = useState(filters?.[0] || 'All');
  const [selectedId, setSelectedId] = useState(null);

  // Filter variants
  const filteredVariants =
    activeFilter === 'All'
      ? variants
      : variants.filter(v => v.transmission === activeFilter);

  return (
    <section className="w-full px-4 py-16 bg-white md:px-8 lg:px-20">
      {/* Section Title */}
      <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-center uppercase md:text-4xl">
        {title}
      </h2>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12 space-x-8">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`pb-1 text-base md:text-lg font-semibold border-b-2 transition-all ${
              activeFilter === filter
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Pricing List */}
      <div className="max-w-3xl mx-auto border-t border-b divide-y divide-gray-200">
        {filteredVariants.map(variant => (
          <div
            key={variant.id}
            onClick={() => setSelectedId(variant.id)}
            className={`flex items-center justify-between py-6 transition-all duration-200 cursor-pointer group ${
              selectedId === variant.id ? 'bg-blue-50 rounded-lg shadow-sm' : ''
            }`}
          >
            {/* Variant Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">
                {variant.name}
              </h3>
              <span className="text-xs text-gray-400 uppercase md:text-sm">
                {variant.transmission} Transmission
              </span>
            </div>

            {/* Price and Select Button */}
            <div className="flex items-center space-x-4">
              <p
                className={`text-2xl font-extrabold tracking-tight ${
                  selectedId === variant.id
                    ? 'text-blue-600 drop-shadow-sm'
                    : 'text-gray-900'
                }`}
              >
                {variant.price}
              </p>

              {selectedId === variant.id && (
                <button className="px-5 py-2 text-sm font-semibold text-white transition-all bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
                  SELECT
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
