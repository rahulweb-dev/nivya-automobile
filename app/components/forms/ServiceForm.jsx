'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
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

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit form');

      toast.success('✅ Submitted successfully!');
      setFormData({ name: '', number: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      noValidate
    >
      {/* Name */}
      <div className="flex flex-col">
        <input
          name="name"
          type="text"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${
            errors.name
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
          required
        />
        {errors.name && (
          <span className="mt-1 text-sm text-red-500">{errors.name}</span>
        )}
      </div>

      {/* Mobile Number */}
      <div className="flex flex-col">
        <input
          name="number"
          type="tel"
          placeholder="Enter Mobile Number"
          value={formData.number}
          onChange={handleChange}
          maxLength={10}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${
            errors.number
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
          required
        />
        {errors.number && (
          <span className="mt-1 text-sm text-red-500">{errors.number}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col sm:col-span-2 lg:col-span-1">
        <input
          name="message"
          placeholder="Enter your Message"
          value={formData.message}
          onChange={handleChange}
          rows={2}
          className={`p-3 border rounded-lg outline-none resize-none focus:ring-2 ${
            errors.message
              ? 'border-red-500 ring-red-200'
              : 'border-gray-300 focus:ring-black'
          }`}
          required
        />
        {errors.message && (
          <span className="mt-1 text-sm text-red-500">{errors.message}</span>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Book Now'}
        </button>
      </div>
    </form>
  );
}
