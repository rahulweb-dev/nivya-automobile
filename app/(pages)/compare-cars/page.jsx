'use client';
import { useState } from 'react';
import Image from 'next/image';
import { vehicles as vehiclesData } from '@/app/constants/index';

export default function ComparePage() {
  const cars = Array.isArray(vehiclesData)
    ? vehiclesData
    : Object.values(vehiclesData || {});

  const [slots, setSlots] = useState([0, 1]);
  const [selectedCars, setSelectedCars] = useState([null, null]);
  const [selectedVariants, setSelectedVariants] = useState([null, null]);
  const [selectedColors, setSelectedColors] = useState([null, null]);
  const [activeTab, setActiveTab] = useState(['Automatic', 'Automatic']);

  // Helper to check if URL is valid
  const isValidUrl = (url) => {
    try {
      if (!url || typeof url !== 'string') return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // --- Handlers ---
  const handleCarSelect = (index, car) => {
    const updatedCars = [...selectedCars];
    updatedCars[index] = car;
    setSelectedCars(updatedCars);

    // Reset variant and color on new selection
    const updatedVariants = [...selectedVariants];
    updatedVariants[index] = null;
    setSelectedVariants(updatedVariants);

    // Automatically select first color (if available)
    const updatedColors = [...selectedColors];
    updatedColors[index] = car?.colors?.[0] || null;
    setSelectedColors(updatedColors);
  };

  const handleVariantSelect = (index, variant) => {
    const updated = [...selectedVariants];
    updated[index] = variant;
    setSelectedVariants(updated);
  };

  const handleColorSelect = (index, color) => {
    const updated = [...selectedColors];
    updated[index] = color;
    setSelectedColors(updated);
  };

  const handleRemoveSlot = (slotIndex) => {
    setSlots(slots.filter((_, i) => i !== slotIndex));
    setSelectedCars(selectedCars.filter((_, i) => i !== slotIndex));
    setSelectedVariants(selectedVariants.filter((_, i) => i !== slotIndex));
    setSelectedColors(selectedColors.filter((_, i) => i !== slotIndex));
    setActiveTab(activeTab.filter((_, i) => i !== slotIndex));
  };

  const handleAddSlot = () => {
    if (slots.length < 4) {
      setSlots([...slots, slots.length]);
      setSelectedCars([...selectedCars, null]);
      setSelectedVariants([...selectedVariants, null]);
      setSelectedColors([...selectedColors, null]);
      setActiveTab([...activeTab, 'Automatic']);
    }
  };

  const filteredVariants = (car, tab) =>
    car?.carVariants?.filter((v) => v.type === tab) || [];

  return (
    <section className="px-4 py-10 mt-20 bg-white md:px-16">
      <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
        Compare Maruti Suzuki Cars
      </h2>

      {/* Car Slots */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {slots.map((slot, slotIndex) => {
          const car = selectedCars[slotIndex];
          const variant = selectedVariants[slotIndex];
          const color = selectedColors[slotIndex];

          // Decide which image to display
          let displayImage = '';
          if (color?.image && isValidUrl(color.image)) {
            displayImage = color.image;
          } else if (color?.code && isValidUrl(color.code)) {
            displayImage = color.code;
          } else if (car?.colors?.[0]?.image && isValidUrl(car.colors[0].image)) {
            displayImage = car.colors[0].image;
          }

          return (
            <div
              key={slot}
              className="relative flex flex-col w-full max-w-sm p-6 bg-white border shadow-sm rounded-2xl"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveSlot(slotIndex)}
                className="absolute text-gray-400 top-2 right-2 hover:text-red-600"
                title="Remove this car"
              >
                ✕
              </button>

              {/* Car Image */}
              {displayImage && (
                <div className="relative flex items-center justify-center w-full h-48 mb-6 bg-gray-100 rounded-lg">
                  <Image
                    src={displayImage}
                    alt={color?.name || car?.name || 'Car'}
                    width={250}
                    height={120}
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Colors */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex flex-wrap justify-center gap-3 mb-2">
                  {car?.colors?.length ? (
                    car.colors.map((clr, i) => {
                      const isImage =
                        clr.image?.startsWith('http') ||
                        clr.code?.startsWith('http');

                      const colorStyle = isImage
                        ? {
                            backgroundImage: `url(${clr.image || clr.code})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : {
                            backgroundColor: clr.code || clr.hex || '#ccc',
                          };

                      return (
                        <button
                          key={i}
                          onClick={() => handleColorSelect(slotIndex, clr)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${
                            color?.name === clr.name
                              ? 'border-blue-600 scale-110'
                              : 'border-gray-300'
                          }`}
                          title={clr.name}
                          style={colorStyle}
                        ></button>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400">No colors</p>
                  )}
                </div>
                {color && (
                  <span className="text-xs text-gray-500">{color.name}</span>
                )}
              </div>

              {/* Vehicle Dropdown */}
              <div className="w-full mb-3">
                <label className="block mb-1 text-sm text-gray-500">
                  Select Vehicle
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={car?.name || ''}
                  onChange={(e) =>
                    handleCarSelect(
                      slotIndex,
                      cars.find((c) => c.name === e.target.value)
                    )
                  }
                >
                  <option value="">Select a Vehicle</option>
                  {cars.map((c, i) => (
                    <option key={i} value={c.name}>
                      {c.name} — {c.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Variant Dropdown */}
              <div className="w-full mb-3">
                <label className="block mb-1 text-sm text-gray-500">
                  Select Variant
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  value={variant?.name || ''}
                  onChange={(e) =>
                    handleVariantSelect(
                      slotIndex,
                      car?.carVariants?.find(
                        (v) => v.name === e.target.value
                      )
                    )
                  }
                  disabled={!car}
                >
                  <option value="">Select a Variant</option>
                  {car?.carVariants?.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} — {v.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Tabs */}
              {car && (
                <div className="w-full mt-4 border-t border-gray-200">
                  <div className="flex mt-2 mb-3 text-sm font-medium text-gray-600">
                    {['Automatic', 'Manual'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          const updatedTabs = [...activeTab];
                          updatedTabs[slotIndex] = tab;
                          setActiveTab(updatedTabs);
                        }}
                        className={`flex-1 py-2 border-b-2 ${
                          activeTab[slotIndex] === tab
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent hover:text-blue-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    {filteredVariants(car, activeTab[slotIndex]).length > 0 ? (
                      filteredVariants(car, activeTab[slotIndex]).map(
                        (v, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-3 py-2 border rounded-md hover:bg-gray-50"
                          >
                            <div>
                              <p className="font-medium text-gray-800">
                                {v.name}
                              </p>
                              <p className="text-xs text-gray-500">{v.type}</p>
                            </div>
                            <span className="text-sm font-semibold">
                              {v.price}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p className="py-2 text-center text-gray-400">
                        No {activeTab[slotIndex]} variants
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-12">
        {slots.length < 4 && (
          <button
            onClick={handleAddSlot}
            className="px-6 py-3 font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            + Add Car
          </button>
        )}
        <button
          disabled={selectedCars.some((c) => !c)}
          className={`px-8 py-3 font-medium rounded-md transition ${
            selectedCars.some((c) => !c)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Compare
        </button>
      </div>
    </section>
  );
}
