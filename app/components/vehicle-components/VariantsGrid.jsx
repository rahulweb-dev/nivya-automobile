'use client';
import { useState } from 'react';

/**
 * Reusable Variants Grid Component
 *
 * @param {string} title - Section title (e.g., "Explore Variants")
 * @param {Array} filters - Filter options (e.g., ["All", "Manual", "Automatic"])
 * @param {Array} variants - List of variant objects [{ id, name, type, price }]
 */
export default function VariantsGrid({ title, filters, variants }) {
  const [activeFilter, setActiveFilter] = useState(filters?.[0] || 'All');

  // Filtered list
  const filteredVariants =
    activeFilter === 'All'
      ? variants
      : variants.filter(v => v.type === activeFilter);

  return (
    <section className="w-full px-4 py-12 bg-gray-50 md:px-8 lg:px-16">
      {/* Title */}
      {title && (
        <h2 className="mb-8 text-2xl font-bold text-center uppercase md:text-3xl">
          {title}
        </h2>
      )}

      {/* Filter Tabs */}
      {filters && (
        <div className="flex justify-center mb-10 space-x-6">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-base font-semibold pb-2 border-b-2 transition-all ${
                activeFilter === filter
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-blue-600'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Variants Grid */}
      <div className="grid max-w-6xl gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {filteredVariants.map((variant, index) => (
          <div
            key={variant.id}
            className={`rounded-2xl border transition-all duration-200 p-6 bg-white shadow-sm hover:shadow-lg cursor-pointer ${
              index === 0 ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <h3 className="mb-2 text-lg font-bold">{variant.name}</h3>

            {variant.type && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {variant.type.toUpperCase()} TRANSMISSION
              </span>
            )}

            <p className="mb-4 text-2xl font-bold text-blue-600">
              {variant.price}
            </p>

            <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition">
              {variant.buttonText || 'VIEW FEATURES'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
