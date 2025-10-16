'use client';
import { useState, useMemo } from 'react';
import { truevalueCars } from '@/data/truevalueCars';
import { ChevronDown, ChevronUp, RotateCcw, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

/* ===========================
   True Value Cars - Premium Design
=========================== */
export default function TrueValuePage() {
  const defaultFilters = {
    budget: 2000000,
    kmDriven: 200000,
    fuelType: '',
    modelYear: '',
    brand: '',
    color: '',
    transmission: '',
    sortOrder: '',
    bodyType: '',
    userType: '',
    search: '',
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [showSidebar, setShowSidebar] = useState(false);

  const brands = [...new Set(truevalueCars.map((car) => car.brand))];
  const fuelTypes = [...new Set(truevalueCars.map((car) => car.fuelType))];
  const colors = [...new Set(truevalueCars.map((car) => car.color))];
  const transmissions = [...new Set(truevalueCars.map((car) => car.transmission))];
  const bodyTypes = [...new Set(truevalueCars.map((car) => car.bodyType))];
  const userTypes = [...new Set(truevalueCars.map((car) => car.userType))];
  const modelYears = [...new Set(truevalueCars.map((car) => car.modelYear))].sort((a, b) => b - a);

  const filteredCars = useMemo(() => {
    return truevalueCars
      .filter((car) => {
        if (car.price > filters.budget) return false;
        if (car.kmDriven > filters.kmDriven) return false;
        if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
        if (filters.modelYear && car.modelYear !== Number(filters.modelYear)) return false;
        if (filters.brand && car.brand !== filters.brand) return false;
        if (filters.color && car.color !== filters.color) return false;
        if (filters.transmission && car.transmission !== filters.transmission) return false;
        if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
        if (filters.userType && car.userType !== filters.userType) return false;
        if (filters.search && !car.name.toLowerCase().includes(filters.search)) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortOrder === 'Low to High') return a.price - b.price;
        if (filters.sortOrder === 'High to Low') return b.price - a.price;
        return 0;
      });
  }, [filters]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Floating Filter Toggle (for mobile) */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed z-30 p-3 text-white bg-blue-600 rounded-full shadow-lg md:hidden bottom-6 right-6 hover:bg-blue-700"
      >
        <Filter className="w-5 h-5" />
      </button>

      <div className="container flex flex-col gap-6 p-4 mx-auto mt-24 md:flex-row">
        {/* Sidebar */}
        <AnimatePresence>
          {(showSidebar || typeof window === 'undefined' || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sticky z-20 w-full p-6 space-y-4 border shadow-xl bg-white/60 backdrop-blur-md md:w-1/4 h-fit top-24 rounded-2xl"
            >
              <TrueValueFilter
                filters={filters}
                setFilters={setFilters}
                brands={brands}
                fuelTypes={fuelTypes}
                colors={colors}
                transmissions={transmissions}
                bodyTypes={bodyTypes}
                userTypes={userTypes}
                modelYears={modelYears}
                clearFilters={() => setFilters(defaultFilters)}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Section */}
        <div className="flex-1">
          {/* Search + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredCars.length} Cars Found
            </h2>

            <div className="flex flex-wrap items-center w-full gap-3 sm:w-auto">
              <input
                type="text"
                placeholder="Search cars..."
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value.toLowerCase() }))
                }
                className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm sm:w-56 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters((p) => ({ ...p, sortOrder: e.target.value }))}
                className="px-4 py-2 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Sort By</option>
                <option value="Low to High">Price: Low to High</option>
                <option value="High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Car Grid */}
          <TrueValueGrid cars={filteredCars} />
        </div>
      </div>
    </div>
  );
}

/* ===========================
   Car Grid - Premium Cards
=========================== */

export function TrueValueGrid({ cars }) {
  const router = useRouter();

  if (cars.length === 0)
    return (
      <div className="flex items-center justify-center w-full py-10 text-gray-500">
        No cars match your filters.
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <motion.div
          key={car.id}
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-2xl"
        >
          {/* 🖼️ Car Image */}
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="object-cover w-full h-48 rounded-t-2xl"
            />
            <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow top-3 right-3">
              ₹{(car.price / 100000).toFixed(1)} Lakh
            </div>
          </div>

          {/* 📄 Car Info */}
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-800">{car.name}</h3>
            <p className="mb-1 text-sm text-gray-500">
              {car.modelYear} • {car.kmDriven.toLocaleString()} km
            </p>
            <p className="mb-3 text-xs text-gray-400">
              {car.brand} | {car.fuelType} | {car.transmission}
            </p>

            {/* 🔗 View Details Button */}
            <button
              onClick={() => router.push(`/truevalue/${car.id}`)}
              className="w-full py-2 text-sm font-medium text-white transition-all rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              View Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ===========================
   Sidebar Filters
=========================== */
export function TrueValueFilter({
  filters,
  setFilters,
  brands,
  fuelTypes,
  colors,
  transmissions,
  bodyTypes,
  userTypes,
  modelYears,
  clearFilters,
}) {
  const [openSections, setOpenSections] = useState({
    budget: true,
    kmDriven: true,
    fuelType: true,
    brand: true,
    color: true,
    transmission: true,
    bodyType: true,
    userType: true,
    modelYear: true,
  });

  const toggleSection = (key) => {
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));
  };

  const sectionHeader = (label, key) => (
    <button
      type="button"
      onClick={() => toggleSection(key)}
      className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700 border-b border-gray-200"
    >
      <span>{label}</span>
      {openSections[key] ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );

  return (
    <>
      <button
        onClick={clearFilters}
        className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-4 text-sm font-medium text-white transition rounded-md bg-gradient-to-r from-rose-500 to-red-600 hover:opacity-90"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Filters
      </button>

      <FilterGroup
        open={openSections.budget}
        header={sectionHeader('Budget', 'budget')}
        options={[
          { label: 'Under ₹2 Lakh', value: 200000 },
          { label: 'Under ₹5 Lakh', value: 500000 },
          { label: 'Under ₹10 Lakh', value: 1000000 },
          { label: 'Under ₹15 Lakh', value: 1500000 },
          { label: 'Under ₹20 Lakh', value: 2000000 },
        ]}
        selected={filters.budget}
        onChange={(v) => setFilters((p) => ({ ...p, budget: Number(v) }))}
      />

      <FilterGroup
        open={openSections.kmDriven}
        header={sectionHeader('KM Driven', 'kmDriven')}
        options={[
          { label: 'Under 20,000 km', value: 20000 },
          { label: 'Under 50,000 km', value: 50000 },
          { label: 'Under 1 Lakh km', value: 100000 },
          { label: 'Under 1.5 Lakh km', value: 150000 },
          { label: 'Under 2 Lakh km', value: 200000 },
        ]}
        selected={filters.kmDriven}
        onChange={(v) => setFilters((p) => ({ ...p, kmDriven: Number(v) }))}
      />

      <FilterGroup
        open={openSections.fuelType}
        header={sectionHeader('Fuel Type', 'fuelType')}
        options={fuelTypes.map((f) => ({ label: f, value: f }))}
        selected={filters.fuelType}
        onChange={(v) => setFilters((p) => ({ ...p, fuelType: v }))}
      />

      <FilterGroup
        open={openSections.brand}
        header={sectionHeader('Brand', 'brand')}
        options={brands.map((b) => ({ label: b, value: b }))}
        selected={filters.brand}
        onChange={(v) => setFilters((p) => ({ ...p, brand: v }))}
      />

      <FilterGroup
        open={openSections.color}
        header={sectionHeader('Color', 'color')}
        options={colors.map((c) => ({ label: c, value: c }))}
        selected={filters.color}
        onChange={(v) => setFilters((p) => ({ ...p, color: v }))}
      />

      <FilterGroup
        open={openSections.transmission}
        header={sectionHeader('Transmission', 'transmission')}
        options={transmissions.map((t) => ({ label: t, value: t }))}
        selected={filters.transmission}
        onChange={(v) => setFilters((p) => ({ ...p, transmission: v }))}
      />

      <FilterGroup
        open={openSections.bodyType}
        header={sectionHeader('Body Type', 'bodyType')}
        options={bodyTypes.map((b) => ({ label: b, value: b }))}
        selected={filters.bodyType}
        onChange={(v) => setFilters((p) => ({ ...p, bodyType: v }))}
      />

      <FilterGroup
        open={openSections.userType}
        header={sectionHeader('User Type', 'userType')}
        options={userTypes.map((u) => ({ label: u, value: u }))}
        selected={filters.userType}
        onChange={(v) => setFilters((p) => ({ ...p, userType: v }))}
      />

      <FilterGroup
        open={openSections.modelYear}
        header={sectionHeader('Model Year', 'modelYear')}
        options={modelYears.map((y) => ({ label: y, value: y }))}
        selected={filters.modelYear}
        onChange={(v) => setFilters((p) => ({ ...p, modelYear: v }))}
      />
    </>
  );
}

/* ===========================
   Generic FilterGroup
=========================== */
function FilterGroup({ open, header, options, selected, onChange }) {
  return (
    <div>
      {header}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pt-2 space-y-1"
          >
            {options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer transition-all ${
                  selected === opt.value
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  checked={selected === opt.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2 accent-blue-600"
                />
                {opt.label}
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
