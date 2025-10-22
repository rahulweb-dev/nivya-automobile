'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewCarsForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    model: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateNumber = (num) => /^[6-9]\d{9}$/.test(num);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateNumber(formData.number)) {
      setStatus(
        'Please enter a valid 10-digit mobile number starting with 6–9.'
      );
      return;
    }

    try {
      const res = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit form');

      toast.success('✅ Inquiry submitted successfully!');
      setFormData({ name: '', number: '', model: '' });
    } catch (err) {
      toast.error('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
    >
      <input
        name='name'
        type='text'
        placeholder='Name'
        value={formData.name}
        onChange={handleChange}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      />
      <input
        name='number'
        type='tel'
        placeholder='Mobile Number'
        value={formData.number}
        onChange={handleChange}
        maxLength={10}
        minLength={10}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      />
      <select
        name='model'
        value={formData.model}
        onChange={handleChange}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      >
        <option value=''>Select Car</option>
        <option value='Swift'>Swift</option>
        <option value='Baleno'>Baleno</option>
        <option value='Fronx'>Fronx</option>
      </select>
      <button
        type='submit'
        className='py-3 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800'
      >
        Submit
      </button>

      {status && (
        <p className='mt-2 text-sm text-center text-gray-600 col-span-full'>
          {status}
        </p>
      )}
    </form>
  );
}
