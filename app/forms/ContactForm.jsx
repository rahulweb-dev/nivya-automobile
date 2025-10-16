'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, number, message } = formData;

    if (!name || !email || !number || !message) {
      const errMsg = 'All fields are required.';

      toast.error(errMsg);
      return false;
    }

    if (!/^\d{10}$/.test(number)) {
      const errMsg = 'Phone number must be exactly 10 digits.';
      toast.error(errMsg);
      return false;
    }

    if (!email.endsWith('@gmail.com')) {
      const errMsg = 'Email must be a Gmail address.';
      setError(errMsg);
      toast.error(errMsg);
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to submit form.');
      }

      toast.success('Message sent successfully!');
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (err) {
      const msg = err.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-8 bg-white shadow-md rounded-2xl'>
      <h2 className='mb-6 text-2xl font-bold text-gray-800'>
        Send Us A Message
      </h2>

      {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
      {success && <p className='mb-4 text-sm text-green-500'>{success}</p>}

      <form className='space-y-4 text-black' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <input
          type='text'
          name='number'
          maxLength={10}
          minLength={10}
          placeholder='Your number'
          value={formData.number}
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
        />
        <textarea
          name='message'
          placeholder='Message'
          rows='4'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
        ></textarea>
        <button
          type='submit'
          disabled={loading}
          className={`px-6 py-3 font-semibold text-white transition bg-gradient-to-r from-[#bcac77] to-[#bc7501] rounded-lg shadow-md hover:bg-blue-700 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
