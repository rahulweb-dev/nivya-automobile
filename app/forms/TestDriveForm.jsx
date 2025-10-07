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
    <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]'>
      <div className='bg-white rounded-2xl p-8 w-full max-w-md relative shadow-lg'>
        <button
          className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
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
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='email'
            name='email'
            placeholder='Email Address'
            onChange={handleChange}
            value={form.email}
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='tel'
            name='phone'
            placeholder='Phone Number'
            onChange={handleChange}
            value={form.phone}
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='date'
            name='date'
            onChange={handleChange}
            value={form.date}
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500'
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
