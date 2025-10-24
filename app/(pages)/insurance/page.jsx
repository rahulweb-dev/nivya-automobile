'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ResponsiveBanner from '@/app/components/ResponsiveBanner';

export default function InsurancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.message
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', number: '', message: '' });
      } else {
        toast.error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col min-h-screen font-[Poppins]'>
      {/* ---------- Banner Section ---------- */}
      <div className='mt-20'>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>

      {/* ---------- Contact Section ---------- */}
      <section className='flex flex-col items-center py-24 bg-gradient-to-b from-white to-cyan-50'>
        <div className='w-full px-6 max-w-7xl'>
          {/* Header */}
          <div className='text-center mb-14'>
            <h2 className='text-4xl font-bold text-gray-800'>Get In Touch</h2>
            <p className='mt-3 text-lg text-gray-500'>
              We’ll guide you through every step of your insurance process —
              hassle-free, transparent, and quick.
            </p>
          </div>

          {/* Contact Card */}
          <div className='grid overflow-hidden bg-white shadow-xl rounded-3xl md:grid-cols-2'>
            {/* Left Info Section */}
            <div className='flex flex-col justify-between p-10 text-white bg-[#725c14]'>
              <div>
                <h3 className='mb-3 text-2xl font-semibold'>
                  Contact Information
                </h3>
                <p className='mb-8 leading-relaxed text-white/90'>
                  Reach out to our insurance specialists to get customized
                  coverage for your Maruti Suzuki.
                </p>
                <ul className='space-y-6'>
                  <li className='flex items-center gap-3'>
                    <Phone className='w-5 h-5 text-white/90' />
                    <div>
                      <p className='text-white/90'>+91 98765 43210</p>
                      <p className='text-white/90'>+91 91234 56789</p>
                    </div>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Mail className='w-5 h-5 text-white/90' />
                    <p className='text-white/90'>support@sabooinsurance.com</p>
                  </li>
                  <li className='flex items-center gap-3'>
                    <MapPin className='w-5 h-5 text-white/90' />
                    <p className='text-white/90'>Hyderabad, Telangana</p>
                  </li>
                </ul>
              </div>

              <div className='mt-10'>
                <div className='w-56 h-56 mx-auto rounded-full bg-white/20 blur-3xl opacity-40'></div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className='p-10 md:p-12'>
              <form onSubmit={handleSubmit} className='space-y-7'>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                      Your Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='John Doe'
                      className='w-full px-3 py-3 transition-all border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none'
                    />
                  </div>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                      Your Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='example@email.com'
                      className='w-full px-3 py-3 transition-all border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none'
                    />
                  </div>
                </div>

                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>
                    Phone Number
                  </label>
                  <input
                    type='text'
                    name='number'
                    value={formData.number}
                    onChange={handleChange}
                    required
                    placeholder='10-digit mobile number'
                    className='w-full px-3 py-3 transition-all border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='4'
                    required
                    placeholder='Write your message here...'
                    className='w-full px-3 py-3 transition-all border border-gray-200 rounded-md resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='px-8 py-3 text-white transition-all rounded-md shadow-md bg-[#725c14] hover:shadow-lg hover:opacity-90 disabled:opacity-60'
                >
                  {loading ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
