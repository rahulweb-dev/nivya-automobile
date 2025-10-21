'use client';
import { useState } from 'react';

export default function TestDriveForm({ open, setOpen, car }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  });

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert('Test Drive booked successfully!');
    setOpen(false);
  };

  return (
    // Use absolute instead of fixed, remove backdrop blur
    <div className='absolute inset-0 flex justify-center items-center z-[1000] pointer-events-none backdrop-blur-md'>
      {/* Modal container allows scroll because parent is absolute */}
      <div className='relative w-full max-w-md p-8 bg-white shadow-lg pointer-events-auto rounded-2xl'>
        {/* Close button */}
        <button
          className='absolute text-xl text-gray-500 top-3 right-4 hover:text-black'
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h2 className='text-2xl font-semibold mb-4 text-center text-[#0E1224]'>
          Book a Test Drive
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            onChange={handleChange}
            value={form.name}
            required
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='email'
            name='email'
            placeholder='Email Address'
            onChange={handleChange}
            value={form.email}
            required
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='tel'
            name='phone'
            placeholder='Phone Number'
            onChange={handleChange}
            value={form.phone}
            required
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='date'
            name='date'
            onChange={handleChange}
            value={form.date}
            required
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='w-full bg-[#0E1224] text-white py-2 rounded-lg hover:bg-blue-800 transition'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
