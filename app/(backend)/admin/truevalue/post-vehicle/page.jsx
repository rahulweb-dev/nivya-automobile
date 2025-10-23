'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

/**
 * Post Vehicle form — styled to match the provided design.
 * - Keeps your API calls and state logic.
 * - Drag & drop + multi-image upload with Primary image selection.
 * - Accessories feature toggles.
 *
 * Drop into your Next.js project (Tailwind required).
 */

const MAX_IMAGES = 15;
const FEATURES = [
  'Air Conditioner',
  'Power Steering',
  'Driver Airbag',
  'Power Windows',
  'Leather Seats',
];

export default function PostVehicle() {
  const [form, setForm] = useState({
    brand: '',
    price: '',
    color: '',
    registeredCity: '',
    userType: '',
    transmission: [],
    fuelType: '',
    bodyType: '',
    images: [], // array of { id, file, url, name, isPrimary }
    features: [], // selected features
  });
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // Options - keep or fetch from backend later
  const brandOptions = [
    'Hyundai',
    'Maruti Suzuki',
    'Tata',
    'Mahindra',
    'Kia',
    'Toyota',
  ];
  const fuelOptions = ['Petrol', 'Diesel', 'CNG', 'Electric'];
  const bodyOptions = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe'];
  const transmissionOptions = ['Manual', 'Automatic', 'AMT', 'iMT', 'CVT'];

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      el.classList.add('ring-2', 'ring-dashed', 'ring-gray-300');
    };
    const handleDragLeave = () => {
      el.classList.remove('ring-2', 'ring-dashed', 'ring-gray-300');
    };
    const handleDrop = (e) => {
      e.preventDefault();
      el.classList.remove('ring-2', 'ring-dashed', 'ring-gray-300');
      const dt = e.dataTransfer;
      const files = Array.from(dt.files || []);
      addFiles(files);
    };

    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);
    return () => {
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('drop', handleDrop);
    };
  }, [form.images]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'selectAllTransmission') {
      // handled via separate function
      return;
    }
    if (type === 'checkbox' && transmissionOptions.includes(value)) {
      setForm((prev) => ({
        ...prev,
        transmission: checked
          ? [...prev.transmission, value]
          : prev.transmission.filter((t) => t !== value),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAllTransmission = (checked) => {
    setForm((prev) => ({
      ...prev,
      transmission: checked ? [...transmissionOptions] : [],
    }));
  };

  // Add files (from input or drop)
  const addFiles = (files) => {
    if (!files || files.length === 0) return;
    const currentCount = form.images.length;
    const room = MAX_IMAGES - currentCount;
    const toAdd = files.slice(0, room);
    const mapped = toAdd.map((file) => {
      return {
        id: cryptoRandomId(),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        isPrimary: false,
      };
    });
    setForm((prev) => {
      const next = { ...prev, images: [...prev.images, ...mapped] };
      // If no primary set, set first as primary
      if (!next.images.some((i) => i.isPrimary) && next.images.length > 0) {
        next.images[0].isPrimary = true;
      }
      return next;
    });
  };

  // small id helper
  const cryptoRandomId = () =>
    Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
    // reset input so same file can be reselected
    e.target.value = null;
  };

  const removeImage = (id) => {
    setForm((prev) => {
      const images = prev.images.filter((i) => i.id !== id);
      // ensure primary exists
      if (!images.some((i) => i.isPrimary) && images.length > 0) {
        images[0].isPrimary = true;
      }
      return { ...prev, images };
    });
  };

  const setPrimary = (id) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((i) => ({ ...i, isPrimary: i.id === id })),
    }));
  };

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const resetForm = () => {
    // release object URLs
    form.images.forEach((i) => i.url && URL.revokeObjectURL(i.url));
    setForm({
      brand: '',
      price: '',
      color: '',
      registeredCity: '',
      userType: '',
      transmission: [],
      fuelType: '',
      bodyType: '',
      images: [],
      features: [],
    });
    setMessage('');
  };

  const handleSubmit = async (e, draft = false) => {
    e.preventDefault();
    setMessage('');

    try {
      // Map form state to API fields
      const payload = {
        name: `${form.brand} ${form.bodyType}`, // backend expects 'name'
        brand: form.brand,
        modelYear: form.registeredCity || '', // if you want to store model year here
        price: form.price,
        kmDriven: form.mileage || '', // mileage field
        fuelType: form.fuelType,
        transmission: form.transmission.join(', '), // optional, comma-separated
        bodyType: form.bodyType,
        color: form.color,
        userType: form.userType,
        location: form.transactionLocation || form.registeredCity || '',
        image: form.images.find((img) => img.isPrimary)?.url || '', // primary image
        features: form.features,
        gallery: form.images.map((img) => img.url),
        description: form.description || '',
        draft, // optional draft flag
      };

      const res = await fetch('/api/truevaluevehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data?.success) {
        setMessage(draft ? 'Saved as draft' : 'Vehicle posted successfully');
        resetForm();
      } else {
        setMessage('Error: ' + (data?.error || 'Unknown'));
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error');
    }
  };

  // simple inline helper for display of price string formatting if needed
  const formatCurrencyDisplay = (val) => {
    if (!val) return '';
    try {
      return Number(val).toLocaleString('en-IN');
    } catch {
      return val;
    }
  };

  return (
    <div className='min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100'>
      <Head>
        <title>Post Your Vehicle for Sale</title>
      </Head>

      <main className='max-w-6xl mx-auto'>
        <header className='mb-6'>
          <h1 className='text-4xl font-extrabold text-gray-900'>
            Post Your Vehicle for Sale
          </h1>
          <p className='mt-1 text-sm text-gray-500'>
            Fill out the required fields (*) below to list your vehicle. You can
            save draft at any time.
          </p>
        </header>

        <form onSubmit={(e) => handleSubmit(e, false)} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Left card */}
            <section className='p-6 bg-white shadow-sm rounded-2xl'>
              <h2 className='mb-4 text-lg font-semibold text-gray-700'>
                Vehicle Information
              </h2>

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Basic Type *
                  </span>
                  <select
                    name='bodyType'
                    value={form.bodyType}
                    onChange={handleChange}
                    required
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                  >
                    <option value=''>Vehicle</option>
                    {bodyOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Vehicle Category *
                  </span>
                  <select
                    name='brand'
                    value={form.brand}
                    onChange={handleChange}
                    required
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                  >
                    <option value=''>Make/Brand</option>
                    {brandOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Vehicle Status *
                  </span>
                  <input
                    name='userType'
                    value={form.userType}
                    onChange={handleChange}
                    placeholder='e.g. First / Second Owner'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                    required
                  />
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Identification *
                  </span>
                  <input
                    name='color'
                    value={form.color}
                    onChange={handleChange}
                    placeholder='Model Name'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                    required
                  />
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Model Year
                  </span>
                  <input
                    name='registeredCity'
                    value={form.registeredCity}
                    onChange={handleChange}
                    placeholder='Registration City'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                  />
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Price *
                  </span>
                  <input
                    name='price'
                    type='number'
                    value={form.price}
                    onChange={handleChange}
                    placeholder='Price (₹)'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                    required
                  />
                </label>
              </div>
            </section>

            {/* Right card */}
            <section className='p-6 bg-white shadow-sm rounded-2xl'>
              <h2 className='mb-4 text-lg font-semibold text-gray-700'>
                Condition & Status
              </h2>

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Mileage / Kms Driven *
                  </span>
                  <input
                    name='mileage'
                    onChange={handleChange}
                    placeholder='Mileage / Kms'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                    required
                  />
                </label>

                <label className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-600'>
                    Engine Capacity
                  </span>
                  <input
                    name='engine'
                    onChange={handleChange}
                    placeholder='CC'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                  />
                </label>

                <label className='flex flex-col sm:col-span-2'>
                  <span className='text-sm font-medium text-gray-600'>
                    Color
                  </span>
                  <div className='flex items-center gap-2 mt-2'>
                    {/* small color circles */}
                    {[
                      '#e11d48',
                      '#111827',
                      '#374151',
                      '#9CA3AF',
                      '#ffffff',
                    ].map((c, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => setForm((p) => ({ ...p, color: c }))}
                        className='w-8 h-8 border rounded-full shadow-sm'
                        style={{ background: c }}
                        aria-label={`select color ${c}`}
                      />
                    ))}
                    <input
                      name='color'
                      value={form.color}
                      onChange={handleChange}
                      placeholder='Or type color'
                      className='flex-1 p-3 ml-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                    />
                  </div>
                </label>

                <label className='flex flex-col sm:col-span-2'>
                  <span className='text-sm font-medium text-gray-600'>
                    Location & Pricing
                  </span>
                  <input
                    name='transactionLocation'
                    onChange={handleChange}
                    placeholder='Transaction Location'
                    className='p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-200'
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Upload Images + thumbnails card */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='p-6 bg-white shadow-sm md:col-span-2 rounded-2xl'>
              <h3 className='mb-3 font-semibold text-gray-700'>
                Upload Images
              </h3>

              <div
                ref={dropRef}
                className='flex flex-col items-center justify-center p-6 mb-4 transition border-2 border-gray-200 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-12 h-12 text-gray-400'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
                    strokeWidth='1.5'
                  />
                  <polyline points='7 10 12 5 17 10' strokeWidth='1.5' />
                  <line x1='12' y1='5' x2='12' y2='19' strokeWidth='1.5' />
                </svg>
                <p className='mt-3 text-sm text-gray-500'>
                  Drag & Drop Images Here or{' '}
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='font-medium text-blue-600 underline'
                  >
                    click to upload
                  </button>
                </p>
                <p className='mt-1 text-xs text-gray-400'>
                  Recommended min resolution: 1200x800px. Max per file: 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={handleFileInput}
                  className='hidden'
                />
              </div>

              {/* thumbnails */}
              <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
                {form.images.length === 0 ? (
                  <div className='col-span-3 p-6 text-sm text-gray-400 bg-white border rounded-lg'>
                    No images uploaded yet.
                  </div>
                ) : (
                  form.images.map((img) => (
                    <div
                      key={img.id}
                      className={`relative overflow-hidden rounded-lg border ${
                        img.isPrimary
                          ? 'ring-2 ring-blue-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className='object-cover w-full h-28'
                      />
                      <button
                        type='button'
                        onClick={() => removeImage(img.id)}
                        className='absolute p-1 text-gray-700 bg-white rounded-full shadow top-1 right-1'
                        aria-label='remove image'
                      >
                        ×
                      </button>

                      <div className='flex items-center justify-between px-2 py-1 text-xs bg-white/80'>
                        <button
                          type='button'
                          onClick={() => setPrimary(img.id)}
                          className={`px-2 py-1 text-xs rounded ${
                            img.isPrimary
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700'
                          }`}
                        >
                          {img.isPrimary ? 'Primary Image' : 'Set Primary'}
                        </button>
                        <span className='text-gray-600 truncate max-w-[70px]'>
                          {img.name}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* features card */}
            <aside className='p-6 bg-white shadow-sm rounded-2xl'>
              <h3 className='mb-4 text-lg font-semibold text-gray-700'>
                Accessories & Features
              </h3>
              <p className='mb-3 text-sm text-gray-400'>
                Select the features available in your vehicle.
              </p>

              <div className='flex flex-wrap gap-3'>
                {FEATURES.map((f) => {
                  const active = form.features.includes(f);
                  return (
                    <button
                      key={f}
                      type='button'
                      onClick={() => toggleFeature(f)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm transition ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                      >
                        <path
                          d='M20 6L9 17l-5-5'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span className='text-sm'>{f}</span>
                    </button>
                  );
                })}
              </div>

              <label className='block mt-6 text-sm text-gray-600'>
                Description
                <textarea
                  name='description'
                  onChange={handleChange}
                  placeholder='Add more details about your vehicle...'
                  className='w-full p-3 mt-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-200'
                  rows={5}
                />
              </label>
            </aside>
          </div>

          {/* bottom actions */}
          <div className='flex items-center justify-between px-2 py-4'>
            <div className='flex items-center gap-3'>
              <button
                type='submit'
                className='px-6 py-2 font-medium text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-95'
              >
                Post Listing
              </button>

              <button
                type='button'
                onClick={(e) => handleSubmit(e, true)}
                className='px-5 py-2 font-medium text-blue-600 bg-white border border-blue-200 rounded-lg shadow-sm'
              >
                Save as Draft
              </button>

              <button
                type='button'
                onClick={resetForm}
                className='px-4 py-2 text-sm text-gray-600 bg-transparent rounded hover:underline'
              >
                Reset
              </button>
            </div>

            <div className='text-sm text-gray-500'>
              <span className='font-medium text-gray-700'>Images:</span>{' '}
              {form.images.length}/{MAX_IMAGES}
            </div>
          </div>

          {message && (
            <div className='p-3 text-sm text-white bg-green-600 rounded'>
              {message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
