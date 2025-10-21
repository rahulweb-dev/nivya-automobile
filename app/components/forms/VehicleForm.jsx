'use client';

import React, { useState } from 'react';

const VehicleForm = ({ Vehicle }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    model: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setFormData({ name: '', phone: '', model: '' });
  };

  return (
    <div className="flex justify-center py-16 bg-gray-900">
      <div className="w-full max-w-3xl p-10 shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-yellow-300">
          Vehicle Inquiry Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Mobile Number */}
          <input
            name="phone"
            type="tel"
            maxLength={10}
            minLength={10}
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Model */}
          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-5 py-4 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="" disabled>
              Select Model
            </option>
            {Vehicle}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mt-4 font-semibold text-gray-900 transition-colors bg-yellow-400 rounded-xl hover:bg-yellow-500"
          >
            Submit
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-400">
          <strong>Disclaimer:</strong> By clicking 'Submit', you agree to our Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default VehicleForm;
