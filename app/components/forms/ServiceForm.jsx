'use client';
import React, { useState } from 'react';

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate mobile number: 10 digits, starts with 6–9
  const validateNumber = (num) => /^[6-9]\d{9}$/.test(num);

  // Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.number || !formData.email) {
      setStatus('❌ All fields are required.');
      return;
    }

    if (!validateNumber(formData.number)) {
      setStatus('❌ Enter a valid 10-digit mobile number starting with 6–9.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('❌ Enter a valid email address.');
      return;
    }

    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit form');

      setStatus('✅ Submitted successfully!');
      setFormData({ name: '', number: '', email: '' });
    } catch (error) {
      console.error(error);
      setStatus('❌ Something went wrong. Please try again.');
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
        placeholder='Enter your Name'
        value={formData.name}
        onChange={handleChange}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      />
      <input
        name='number'
        type='tel'
        placeholder='Enter Mobile Number'
        value={formData.number}
        onChange={handleChange}
        maxLength={10}
        minLength={10}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      />
      <input
        name='email'
        type='email'
        placeholder='Enter Email'
        value={formData.email}
        onChange={handleChange}
        className='p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black'
        required
      />

      <button
        type='submit'
        className='py-3 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800'
      >
        Book Now
      </button>

      {status && (
        <p className='mt-2 text-sm text-center text-gray-600 col-span-full'>
          {status}
        </p>
      )}
    </form>
  );
}
