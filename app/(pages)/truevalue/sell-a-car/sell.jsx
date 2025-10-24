
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ResponsiveBanner from '@/app/components/ResponsiveBanner';

export default function TrueValueSell() {
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    authorize: false,
  });

  const faqs = [
    {
      q: 'Where can I get my car evaluated?',
      a: 'You can easily book an online or doorstep evaluation using the Maruti Suzuki True Value website or app.',
    },
    {
      q: 'How will you ensure I get the right price?',
      a: 'Our AI-based pricing engine uses market data and 376 inspection checkpoints to give you the most accurate value for your car.',
    },
    {
      q: 'Is there any fee or commission?',
      a: 'No additional charges or commissions apply when selling your car to Maruti Suzuki True Value.',
    },
    {
      q: 'How soon will I get my payment?',
      a: 'Payments are made in full after successful RTO verification of your documents.',
    },
  ];

  const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim() || form.name.trim().length < 3)
      newErrors.name = 'Name must be at least 3 characters.';

    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = 'Enter a valid email address.';

    if (!/^[6-9]\d{9}$/.test(form.number))
      newErrors.number = 'Enter a valid 10-digit mobile number.';

    if (!form.authorize)
      newErrors.authorize = 'You must authorize contact before submitting.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix form errors before submitting.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/sell-a-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('Thank you! Your details have been submitted.');
        setForm({
          name: '',
          email: '',
          number: '',
          authorize: false,
        });
        setErrors({});
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Banner Section */}
      <div className='relative w-full mt-20'>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fsell_car_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
        {/* <div className='absolute inset-0 flex items-center justify-center px-4 sm:px-8'>
          <div className='flex flex-col items-center justify-between w-full max-w-5xl gap-6 p-6 shadow-2xl bg-white/60 backdrop-blur-md sm:p-10 rounded-2xl sm:flex-row'>
            <h1 className='text-2xl font-extrabold leading-snug text-center text-blue-900 uppercase sm:text-4xl sm:text-left'>
              Gaadi Bikti Hai{' '}
              <span className='text-red-600'>Sirf TrueValue Pe</span>
            </h1>
            <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-700 sm:text-base'>
              {[
                { icon: '/icons/payment.svg', label: 'On-Time Payment' },
                { icon: '/icons/rc.svg', label: 'Easy RC Transfer' },
                { icon: '/icons/home.svg', label: 'Free Home Evaluation' },
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <img src={item.icon} alt={item.label} className='w-6 h-6' />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>

      {/* Form Section */}

      <section className='p-6 mx-auto my-16 bg-white border border-gray-100 shadow-2xl max-w-7xl sm:p-10 rounded-3xl'>
        <h2 className='mb-10 text-2xl font-bold text-center text-gray-800 sm:text-3xl'>
          Enter Your Car Details for a Hassle-Free Experience
        </h2>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 gap-8 sm:grid-cols-3'
        >
          {/* Name */}
          <div className='flex flex-col'>
            <label className='mb-2 font-medium text-gray-600'>Name*</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Enter your name'
              required
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label className='mb-2 font-medium text-gray-600'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
            )}
          </div>

          {/* number */}
          <div className='flex flex-col'>
            <label className='mb-2 font-medium text-gray-600'>
              Mobile Number*
            </label>
            <input
              type='tel'
              name='number'
              value={form.number}
              onChange={handleChange}
              placeholder='Enter mobile number'
              required
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.number && (
              <p className='mt-1 text-sm text-red-500'>{errors.number}</p>
            )}
          </div>

          {/* Authorization */}
          <div className='flex items-start gap-3 sm:col-span-3'>
            <input
              type='checkbox'
              name='authorize'
              checked={form.authorize}
              onChange={handleChange}
              id='authorize'
              className={`w-5 h-5 mt-1 ${
                errors.authorize ? 'border-red-500' : ''
              }`}
            />
            <label htmlFor='authorize' className='text-sm text-gray-600'>
              I authorize Maruti Suzuki India Ltd. or its partners to call me.
              Please read our{' '}
              <a
                href='#'
                className='text-blue-700 underline hover:text-blue-900'
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.authorize && (
            <p className='text-sm text-red-500 sm:col-span-3'>
              {errors.authorize}
            </p>
          )}

          {/* Submit */}
          <div className='flex justify-center sm:col-span-3'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 text-lg font-bold text-white transition-all shadow-lg sm:w-1/2 rounded-xl bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 hover:shadow-2xl'
            >
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </section>

      {/* FAQ Section */}
      <section className='px-6 mx-auto my-20 max-w-7xl sm:px-12'>
        <h2 className='mb-10 text-3xl font-bold text-center text-gray-800'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-4'>
          {faqs.map((f, i) => (
            <div
              key={i}
              className='overflow-hidden transition-all border border-gray-200 shadow-sm rounded-2xl'
            >
              <button
                onClick={() => toggleFAQ(i)}
                className='flex items-center justify-between w-full p-5 text-left bg-white hover:bg-gray-50'
              >
                <span className='font-medium text-gray-800'>{f.q}</span>
                <span className='text-xl text-blue-800'>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden bg-gray-50 ${
                  openIndex === i ? 'max-h-96 p-5' : 'max-h-0'
                }`}
              >
                <p className='leading-relaxed text-gray-600'>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
