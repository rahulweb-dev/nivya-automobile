'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function PreOwnedForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.number)) {
      newErrors.number = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/sell-a-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success('Thank you! Your enquiry has been submitted.');
      setFormData({ name: '', number: '', email: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
    >
      {/* Name */}
      <div className='flex flex-col'>
        <input
          type='text'
          name='name'
          value={formData.name}
          placeholder='Name'
          onChange={handleChange}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${
            errors.name
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
        />
        {errors.name && (
          <span className='mt-1 text-sm text-red-500'>{errors.name}</span>
        )}
      </div>

      {/* Number */}
      <div className='flex flex-col'>
        <input
          type='tel'
          name='number'
          value={formData.number}
          placeholder='Mobile Number'
          onChange={handleChange}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${
            errors.number
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
        />
        {errors.number && (
          <span className='mt-1 text-sm text-red-500'>{errors.number}</span>
        )}
      </div>

      {/* Email */}
      <div className='flex flex-col'>
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Email'
          onChange={handleChange}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${
            errors.email
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
        />
        {errors.email && (
          <span className='mt-1 text-sm text-red-500'>{errors.email}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className='flex items-center'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full py-3 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800 disabled:opacity-60'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <p className='mt-2 font-medium text-center text-green-600 col-span-full'>
          {successMsg}
        </p>
      )}
    </form>
  );
}
