'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CareerPage() {
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    address: '',
    lastCompany: '',
    jobTitle: '',
    jobLocation: '',
    totalExperience: '',
    profileSummary: '',
    skills: '',
    currentCTC: '',
    expectedCTC: '',
    lastDrawnSalary: '',
    qualification: '',
    resumeLink: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // <-- Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.salutation) newErrors.salutation = 'Required';
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Required';
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Must be 10 digits';
    if (!formData.resumeLink) newErrors.resumeLink = 'Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // <-- Start loading
    try {
      const res = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('✅ Application submitted successfully!');
        setFormData({
          salutation: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          altPhone: '',
          address: '',
          lastCompany: '',
          jobTitle: '',
          jobLocation: '',
          totalExperience: '',
          profileSummary: '',
          skills: '',
          currentCTC: '',
          expectedCTC: '',
          lastDrawnSalary: '',
          qualification: '',
          resumeLink: '',
        });
      } else {
        toast.error(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Something went wrong. Try again!');
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <div className=' bg-gray-50'>
      {/* Hero Banner */}
      <section
        className='relative flex items-center justify-center h-64 bg-center bg-cover'
        style={{
          backgroundImage:
            "url('https://www.saboomaruti.in/assets/banners/career-banner.webp')",
        }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <h1 className='relative z-10 text-4xl font-bold text-white'>
          Join Our Team
        </h1>
      </section>

      {/* Form Section */}
      <div className='container px-6 py-12 mx-auto'>
        <div className='p-8 mx-auto bg-white shadow-md max-w-7xl rounded-xl'>
          <h2 className='mb-8 text-3xl font-semibold text-center text-gray-800'>
            Career Application Form
          </h2>

          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          >
            {/* Salutation */}
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Salutation*
              </label>
              <select
                name='salutation'
                value={formData.salutation}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
              >
                <option value=''>Select</option>
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
                <option>Dr.</option>
              </select>
              {errors.salutation && (
                <p className='text-xs text-red-500'>{errors.salutation}</p>
              )}
            </div>

            {/* Text Inputs */}
            {[
              ['firstName', 'First Name*', 'John'],
              ['lastName', 'Last Name*', 'Doe'],
              ['email', 'Email*', 'john.doe@email.com'],
              ['phone', 'Phone*', '9876543210'],
              ['altPhone', 'Alternative Phone', 'Optional'],
              ['address', 'Address', 'House No, Street, City'],
              ['lastCompany', 'Last Company', 'ABC Motors Pvt Ltd'],
              ['jobTitle', 'Job Title', 'Sales Executive'],
              ['jobLocation', 'Job Location', 'Hyderabad'],
              ['totalExperience', 'Total Experience', '3 Years'],
              ['skills', 'Skills', 'Marketing, CRM, Communication'],
              ['currentCTC', 'Current CTC', '5 LPA'],
              ['expectedCTC', 'Expected CTC', '6 LPA'],
              ['lastDrawnSalary', 'Last Drawn Salary', '45000 / month'],
              ['qualification', 'Highest Qualification', 'MBA in Marketing'],
              [
                'resumeLink',
                'Resume Link (Google Drive URL)*',
                'https://drive.google.com/...',
              ],
            ].map(([name, label, placeholder]) => (
              <div key={name} className='col-span-1'>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  {label}
                </label>
                <input
                  type={name === 'email' ? 'email' : 'text'}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
                />
                {errors[name] && (
                  <p className='text-xs text-red-500'>{errors[name]}</p>
                )}
              </div>
            ))}

            {/* Profile Summary */}
            <div className='col-span-full'>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Profile Summary
              </label>
              <textarea
                name='profileSummary'
                rows='3'
                value={formData.profileSummary}
                onChange={handleChange}
                placeholder='Briefly describe your experience and goals...'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
              />
              {errors.profileSummary && (
                <p className='text-xs text-red-500'>{errors.profileSummary}</p>
              )}
            </div>

            <p className='text-xs text-gray-500 col-span-full'>
              Note: Ensure your resume Google Drive link is accessible to
              “Anyone with the link”.
            </p>

            <div className='text-center col-span-full'>
              <button
                type='submit'
                disabled={loading} // <-- disable when submitting
                className={`px-8 py-3 font-semibold text-white transition bg-black rounded-md hover:bg-gray-800 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'SUBMIT APPLICATION'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
