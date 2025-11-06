'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.number ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(' Form submitted successfully!');
        setFormData({ name: '', number: '', message: '' });
      } else {
        toast.error(data.error || '❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-full p-10 mx-auto text-black bg-white shadow-lg rounded-3xl'>
      <h2 className='mb-8 text-3xl font-semibold text-center md:text-left'>
        Book a Service Appointment
      </h2>

      <form
        onSubmit={handleSubmit}
        className='grid items-start grid-cols-1 gap-6 md:grid-cols-2'
      >
        {/* Name */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-black'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='py-2 text-black bg-transparent border-b border-gray-400 focus:border-black focus:outline-none'
          />
        </div>

        {/* Mobile Number */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-black'>Mobile Number</label>
          <input
            type='text'
            name='number'
            maxLength={10}
            minLength={10}
            value={formData.number}
            onChange={handleChange}
            className='py-2 text-black bg-transparent border-b border-gray-400 focus:border-black focus:outline-none'
          />
        </div>
        {/* Message */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-black'>Message</label>
          <textarea
            name='message'
            rows='1'
            value={formData.message}
            onChange={handleChange}
            className='py-2 text-black bg-transparent border-b border-gray-400 resize-none focus:border-black focus:outline-none'
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center mt-6 md:col-span-2 md:justify-end'>
          <button
            type='submit'
            disabled={loading}
            className='px-8 py-2 font-semibold text-white transition-all bg-black rounded-full shadow-md hover:bg-gray-700 disabled:opacity-60'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <p className='mt-6 text-xs text-center text-gray-400 md:text-left'>
        <span className='font-semibold text-gray-300'>*</span> Disclaimer: By
        clicking 'Submit', you have agreed to our{' '}
        <a href='#' className='text-blue-400 underline hover:text-blue-500'>
          Terms and Conditions
        </a>
        .
      </p>
    </div>
  );
}
