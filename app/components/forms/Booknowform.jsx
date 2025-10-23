'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function BookNowForm({ open, setOpen, carName }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});

  // Lock scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'This field is required*';
    if (!formData.mobile) newErrors.mobile = 'This field is required*';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/book-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, car: carName }), // send car name to API
      });
      const result = await res.json();
      if (result.success) {
        toast.success(`✅ ${carName} booked successfully!`);
        console.log(result);
        setFormData({ name: '', mobile: '' });
        setOpen(false);
      } else {
        toast.error(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md'>
          <div className='relative w-full max-w-md p-6 rounded-lg shadow-lg bg-white/90'>
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className='absolute text-gray-500 top-3 right-3 hover:text-black'
            >
              ✕
            </button>

            {/* Form Heading */}
            <h2 className='mb-2 text-xl font-bold text-center'>
              BOOK A VEHICLE
            </h2>
            <p className='mb-6 text-sm text-center text-gray-500'>
              Selected Vehicle: <strong>{carName}</strong>
            </p>

            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border-b border-gray-400 focus:outline-none'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type='text'
                  name='mobile'
                  placeholder='Mobile Number'
                  value={formData.mobile}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border-b border-gray-400 focus:outline-none'
                />
                {errors.mobile && (
                  <p className='text-xs text-red-500'>{errors.mobile}</p>
                )}
              </div>

              <div className='flex justify-between mt-4'>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='px-6 py-2 font-medium text-black border rounded-md hover:bg-gray-100'
                >
                  Back
                </button>

                <button
                  type='submit'
                  disabled={loading}
                  className={`px-6 py-2 font-medium text-white bg-black rounded-md hover:bg-gray-800 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            <p className='mt-3 text-xs text-gray-500'>
              *Disclaimer: By clicking 'Submit', you have agreed to our Terms
              and Conditions.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
