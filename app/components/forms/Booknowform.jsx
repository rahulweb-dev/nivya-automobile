'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function BookNowForm({ open, setOpen, carName }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    model: carName || '',
  });
  const [errors, setErrors] = useState({});

  // Update model field when carName changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, model: carName }));
  }, [carName]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [open]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate all fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'This field is required*';
    if (!formData.number.trim()) {
      newErrors.number = 'This field is required*';
    } else if (!/^[0-9]{10}$/.test(formData.number.trim())) {
      newErrors.number = 'Enter a valid 10-digit number';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(`✅ ${formData.model} booked successfully!`);
        setFormData({ name: '', number: '', model: carName }); // reset form
        setOpen(false);
      } else {
        toast.error(`❌ Error: ${result.error || 'Submission failed'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md'>
      <div className='relative w-full max-w-md p-6 rounded-lg shadow-lg bg-white/90'>
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className='absolute text-gray-500 top-3 right-3 hover:text-black'
        >
          ✕
        </button>

        <h2 className='mb-2 text-xl font-bold text-center'>BOOK A VEHICLE</h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Vehicle Model (Read Only) */}
          <div>
            <input
              type='text'
              name='model'
              value={formData.model}
              readOnly
              className='w-full px-3 py-2 font-semibold bg-gray-100 border-b border-gray-400 cursor-not-allowed'
            />
          </div>

          {/* Name Field */}
          <div>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border-b focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {errors.name && (
              <p className='text-xs text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* number Field */}
          <div>
            <input
              type='tel'
              name='number'
              placeholder=' Number'
              value={formData.number}
              onChange={handleChange}
              maxLength={10}
              className={`w-full px-3 py-2 border-b focus:outline-none ${
                errors.number ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {errors.number && (
              <p className='text-xs text-red-500'>{errors.number}</p>
            )}
          </div>

          {/* Buttons */}
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
              className={`px-6 py-2 rounded-md font-medium text-white bg-black hover:bg-gray-800 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        <p className='mt-3 text-xs text-center text-gray-500'>
          *By clicking 'Submit', you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}
