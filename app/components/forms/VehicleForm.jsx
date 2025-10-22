'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const VehicleForm = ({ Vehicle }) => {
  const [formData, setFormData] = useState({ name: '', number: '', model: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('✅ Your inquiry has been submitted successfully!');
        setFormData({ name: '', number: '', model: '' });
      } else {
        toast.error('❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('⚠️ Server error. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='sticky max-w-md p-10 bg-gray-100 border-2 shadow-2xl lg:w-full top-4 rounded-2xl'>
        <h2 className='mb-6 text-2xl font-bold text-center text-black'>
          Vehicle Inquiry Form
        </h2>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 space-y-8'>
          <input
            name='name'
            type='text'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          />

          <input
            name='number'
            type='tel'
            maxLength={10}
            minLength={10}
            placeholder='Mobile Number'
            value={formData.number}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          />

          <select
            name='model'
            value={formData.model}
            onChange={handleChange}
            className='w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            required
          >
            <option value='' disabled>
              Select Model
            </option>
            {Vehicle}
          </select>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 mt-2 font-semibold text-gray-900 transition-colors bg-yellow-400 rounded-lg hover:bg-yellow-500 disabled:opacity-60'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-sm text-center text-gray-700'>{message}</p>
        )}

        <p className='mt-4 text-xs text-center text-gray-400'>
          <strong>Disclaimer:</strong> By submitting, you agree to our Terms &
          Conditions.
        </p>
      </div>
    </div>
  );
};

export default VehicleForm;
