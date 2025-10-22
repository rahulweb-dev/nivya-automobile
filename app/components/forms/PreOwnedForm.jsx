'use client';
import React, { useState } from 'react';

export default function PreOwnedForm() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pre-Owned Inquiry:', formData);
    setFormData({ brand: '', model: '', location: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <select
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value="">Select Brand</option>
        <option value="Maruti">Maruti</option>
        <option value="Hyundai">Hyundai</option>
      </select>

      <select
        name="model"
        value={formData.model}
        onChange={handleChange}
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value="">Select Model</option>
        <option value="Baleno">Baleno</option>
        <option value="i20">i20</option>
      </select>

      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value="">Select Location</option>
        <option value="Raipur">Raipur</option>
        <option value="Bhilai">Bhilai</option>
      </select>

      <button
        type="submit"
        className="py-3 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}
