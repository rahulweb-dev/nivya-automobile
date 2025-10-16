"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function TrueValueFilter({ filters, setFilters }) {
  const [openSections, setOpenSections] = useState({
    budget: true,
    kmDriven: true,
    fuelType: true,
    modelYear: true,
    brand: true,
    color: true,
    transmission: true,
    sort: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateRange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const sectionHeader = (label, sectionKey, icon = null) => (
    <button
      type="button"
      onClick={() => toggleSection(sectionKey)}
      className="flex items-center justify-between w-full py-2 text-left border-b border-gray-200"
    >
      <span className="flex items-center gap-2 font-medium text-gray-800">
        {icon}
        {label}
      </span>
      {openSections[sectionKey] ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="w-full p-4 bg-white border border-gray-100 shadow-md rounded-2xl md:w-1/4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h3>
      </div>

      {/* Budget */}
      <div className="mb-4">
        {sectionHeader("By Budget", "budget")}
        {openSections.budget && (
          <div className="pt-2">
            <input
              type="range"
              min="100000"
              max="1500000"
              step="50000"
              value={filters.budget}
              onChange={(e) => updateRange("budget", e.target.value)}
              className="w-full accent-blue-600"
            />
            <p className="mt-1 text-sm text-center text-gray-600">
              ₹{Number(filters.budget).toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>

      {/* KM Driven */}
      <div className="mb-4">
        {sectionHeader("By KM Driven", "kmDriven")}
        {openSections.kmDriven && (
          <div className="pt-2">
            <input
              type="range"
              min="0"
              max="150000"
              step="5000"
              value={filters.kmDriven}
              onChange={(e) => updateRange("kmDriven", e.target.value)}
              className="w-full accent-blue-600"
            />
            <p className="mt-1 text-sm text-center text-gray-600">
              Up to {Number(filters.kmDriven).toLocaleString("en-IN")} km
            </p>
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <div className="mb-4">
        {sectionHeader("Fuel Type", "fuelType")}
        {openSections.fuelType && (
          <div className="pt-2 space-y-1">
            {["Petrol", "Diesel"].map((type) => (
              <label
                key={type}
                className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition ${
                  filters.fuelType === type
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="fuelType"
                  value={type}
                  checked={filters.fuelType === type}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Model Year */}
      <div className="mb-4">
        {sectionHeader("Model Year", "modelYear")}
        {openSections.modelYear && (
          <div className="grid grid-cols-3 gap-2 pt-2 text-sm">
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
              <label
                key={y}
                className={`border rounded-md px-2 py-1 text-center cursor-pointer transition ${
                  filters.modelYears.includes(y)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.modelYears.includes(y)}
                  onChange={() => {
                    const years = filters.modelYears.includes(y)
                      ? filters.modelYears.filter((yr) => yr !== y)
                      : [...filters.modelYears, y];
                    setFilters((prev) => ({ ...prev, modelYears: years }));
                  }}
                />
                {y}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-4">
        {sectionHeader("Brand", "brand")}
        {openSections.brand && (
          <div className="pt-2 space-y-1">
            {["MARUTI", "HYUNDAI", "TATA", "HONDA"].map((b) => (
              <label
                key={b}
                className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition ${
                  filters.brand === b
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="brand"
                  value={b}
                  checked={filters.brand === b}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                {b}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-4">
        {sectionHeader("Color", "color")}
        {openSections.color && (
          <div className="flex flex-wrap gap-2 pt-2">
            {["Red", "Blue", "White", "Silver", "Grey"].map((c) => (
              <label
                key={c}
                className={`border rounded-full px-3 py-1 text-sm cursor-pointer transition ${
                  filters.color === c
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="color"
                  value={c}
                  checked={filters.color === c}
                  onChange={handleChange}
                  className="hidden"
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Transmission */}
      <div className="mb-4">
        {sectionHeader("Transmission", "transmission")}
        {openSections.transmission && (
          <div className="pt-2 space-y-1">
            {["Manual", "Automatic"].map((t) => (
              <label
                key={t}
                className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition ${
                  filters.transmission === t
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="transmission"
                  value={t}
                  checked={filters.transmission === t}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                {t}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Sort Section */}
      <div className="mb-2">
        {sectionHeader("Sort By Price", "sort", <ArrowUpDown className="w-4 h-4 text-gray-500" />)}
        {openSections.sort && (
          <div className="pt-2 space-y-1">
            {["Low to High", "High to Low"].map((order) => (
              <label
                key={order}
                className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition ${
                  filters.sortOrder === order
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="sortOrder"
                  value={order}
                  checked={filters.sortOrder === order}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                {order}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
