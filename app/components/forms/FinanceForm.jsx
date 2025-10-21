'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FinanceForm() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    comments: '',
    model: '',
    purchaseTime: '',
    loanAmount: '',
    loanDuration: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      toast.success(data.message || 'Submitted successfully');

      if (res.ok) {
        setForm({
          name: '',
          mobile: '',
          email: '',
          city: '',
          comments: '',
          model: '',
          purchaseTime: '',
          loanAmount: '',
          duration: '',
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-6 bg-white shadow rounded-xl'>
      <h2 className='pb-2 mb-4 text-lg font-semibold border-b'>
        My Contact Details:
      </h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Your Name *'
          className='w-full p-2 border rounded-md'
          required
        />
        <input
          type='tel'
          name='mobile'
          value={form.mobile}
          onChange={handleChange}
          placeholder='Mobile No *'
          className='w-full p-2 border rounded-md'
          required
        />
        <select
          name='city'
          value={form.city}
          onChange={handleChange}
          className='w-full p-2 border rounded-md'
          required
        >
          <option value=''>Select Outlet City *</option>
          <option>Hyderabad</option>
          <option>Secunderabad</option>
          <option>Vijayawada</option>
        </select>
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder='Email'
          className='w-full p-2 border rounded-md'
        />
      </div>

      <textarea
        name='comments'
        value={form.comments}
        onChange={handleChange}
        placeholder='Comments'
        className='w-full p-2 mt-4 border rounded-md'
        rows={3}
      ></textarea>

      <h2 className='pb-2 mt-6 mb-4 text-lg font-semibold border-b'>
        Share Loan Requirements:
      </h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <select
          name='model'
          value={form.model}
          onChange={handleChange}
          className='w-full p-2 border rounded-md'
          required
        >
          <option value=''>Select Model *</option>
          <option>Swift</option>
          <option>Baleno</option>
          <option>Fronx</option>
          <option>Brezza</option>
        </select>
        <select
          name='purchaseTime'
          value={form.purchaseTime}
          onChange={handleChange}
          className='w-full p-2 border rounded-md'
        >
          <option value=''>Select Purchase Time</option>
          <option>Immediately</option>
          <option>Within 1 Month</option>
          <option>1-3 Months</option>
        </select>
        <input
          type='number'
          name='loanAmount'
          value={form.loanAmount}
          onChange={handleChange}
          placeholder='Loan Amount'
          className='w-full p-2 border rounded-md'
          required
        />
        <input
          type='text'
          name='duration'
          value={form.loanDuration}
          onChange={handleChange}
          placeholder='Loan Duration in Years'
          className='w-full p-2 border rounded-md'
        />
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full px-6 py-2 mt-6 text-white bg-blue-700 rounded-md sm:w-auto hover:bg-blue-800 disabled:opacity-50'
      >
        {loading ? 'Submitting...' : 'Get Your Car Loan Now'}
      </button>

      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
    </form>
  );
}
