'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { truevalueCars } from '@/data/truevalueCars';
import { Gauge, Calendar, CarFront, Droplet, Tag, MapPin } from 'lucide-react';
import {
  FaPhoneAlt,
  FaCarSide,
  FaCogs,
  FaPalette,
  FaStar,
  FaCheckCircle,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import toast from 'react-hot-toast';
import Image from 'next/image';
export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const car = useMemo(
    () => truevalueCars.find((c) => c.id.toString() === id),
    [id]
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatNumber = (num) =>
    new Intl.NumberFormat('en-IN').format(Number(num));

  if (!car)
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-gray-600'>
        <p className='text-lg'>Car not found.</p>
        <button
          onClick={() => router.push('/truevalue')}
          className='px-6 py-2 mt-4 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700'
        >
          Back to Listings
        </button>
      </div>
    );

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.number.trim()) newErrors.number = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.number))
      newErrors.number = 'Enter a valid 10-digit number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email';
    return newErrors;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/usedcar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car.id, ...formData }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', number: '', email: '', message: '' });
        toast.success('Request submitted successfully!');
      } else toast.error(data.error || 'Something went wrong');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const similar = useMemo(
    () => truevalueCars.filter((c) => c.id !== car.id).slice(0, 3),
    [car.id]
  );

  return (
    <div className='min-h-screen pb-24 mt-16 bg-gray-50'>
      {/* HEADER */}
      <header className='sticky top-0 z-30 py-5 shadow-md bg-white/90 backdrop-blur-md'>
        <div className='container flex flex-col items-center justify-between px-4 mx-auto md:flex-row'>
          <div>
            <h1 className='flex items-center gap-2 text-2xl font-bold text-gray-900'>
              <CarFront className='text-blue-600' /> {car.name}
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              {car.brand} • {car.modelYear} • {car.location}
            </p>
          </div>
          <div className='mt-3 text-center md:mt-0 md:text-right'>
            <span className='block text-sm text-gray-400'>Starting from</span>
            <span className='text-4xl font-extrabold text-transparent bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text drop-shadow-sm'>
              ₹{formatNumber(car.price)}
            </span>
          </div>
        </div>
      </header>

      <main className='container grid grid-cols-1 gap-10 px-4 mx-auto mt-8 lg:grid-cols-3'>
        {/* LEFT */}
        <div className='space-y-8 lg:col-span-2'>
          {/* IMAGE GALLERY */}
          <section className='overflow-hidden bg-white shadow-lg rounded-3xl'>
            <Swiper
              loop
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className='rounded-t-3xl'
            >
              {(car.gallery?.length ? car.gallery : [car.image]).map(
                (img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={img}
                      alt={`${car.name}-${i}`}
                      width={800} // example width
                      height={480} // match your current height
                      className='object-cover w-full transition-transform duration-500 hover:scale-105'
                      loading='lazy'
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
            {car.gallery?.length > 1 && (
              <div className='p-3 bg-gray-100 border-t rounded-b-3xl'>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode
                  watchSlidesProgress
                  modules={[FreeMode, Thumbs]}
                >
                  {car.gallery.map((img, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        src={img}
                        alt={`thumb-${i}`}
                        width={80} // approximate width
                        height={80} // approximate height matching h-20 (~80px)
                        className='object-cover rounded-lg cursor-pointer hover:opacity-90'
                        loading='lazy'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </section>

          {/* DETAILS */}
          <section className='p-8 bg-white shadow-lg rounded-3xl'>
            <h2 className='flex items-center gap-2 mb-6 text-2xl font-semibold text-gray-900'>
              <FaCarSide className='text-blue-600' /> Overview
            </h2>

            <div className='grid grid-cols-2 gap-5 sm:grid-cols-4'>
              <OverviewItem icon={<MapPin />} label={car.location} />
              <OverviewItem
                icon={<Gauge />}
                label={`${formatNumber(car.kmDriven)} km`}
              />
              <OverviewItem icon={<Droplet />} label={car.fuelType} />
              <OverviewItem icon={<Calendar />} label={car.modelYear} />
              <OverviewItem icon={<FaCogs />} label={car.transmission} />
              <OverviewItem icon={<Tag />} label={car.bodyType} />
              <OverviewItem icon={<FaPalette />} label={car.color} />
              <OverviewItem
                icon={<CarFront />}
                label={
                  <span className='font-semibold text-blue-700'>
                    ₹{formatNumber(car.price)}
                  </span>
                }
              />
            </div>

            {/* FEATURES */}
            <div className='mt-10'>
              <h3 className='flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900'>
                <FaStar className='text-yellow-500' /> Key Features
              </h3>
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
                {(car.features?.length
                  ? car.features
                  : [
                      'Air Conditioner',
                      'ABS',
                      'Alloy Wheels',
                      'Bluetooth',
                      'Cruise Control',
                    ]
                ).map((f, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition border rounded-md bg-gray-50 hover:bg-blue-50'
                  >
                    <FaCheckCircle className='text-green-500' /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className='mt-10'>
              <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                Seller Comments
              </h3>
              <p className='leading-relaxed text-gray-600'>
                {car.description ||
                  'This vehicle is in excellent condition, well-maintained, and fully serviced. Schedule a test drive today.'}
              </p>
            </div>
          </section>

          {/* SIMILAR CARS */}
          <section>
            <h3 className='mb-5 text-2xl font-semibold text-gray-900'>
              Similar Cars
            </h3>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {similar.map((s) => (
                <div
                  key={s.id}
                  className='overflow-hidden transition bg-white shadow-lg rounded-3xl hover:shadow-xl'
                >
                  <Image
                    src={s.image}
                    alt={s.name}
                    width={400} // approximate width
                    height={176} // h-44 in Tailwind is 176px
                    className='object-cover w-full'
                    loading='lazy'
                  />
                  <div className='p-5'>
                    <h4 className='font-semibold text-gray-900'>{s.name}</h4>
                    <p className='text-sm text-gray-500'>
                      {s.brand} • {s.modelYear}
                    </p>
                    <p className='mt-2 text-lg font-bold text-blue-700'>
                      ₹{formatNumber(s.price)}
                    </p>
                    <button
                      onClick={() => router.push(`/truevalue/${s.id}`)}
                      className='w-full py-2 mt-4 text-white transition rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90'
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className='space-y-6'>
          <div className='sticky p-6 bg-white shadow-lg top-28 rounded-3xl'>
            <h3 className='flex items-center gap-2 mb-4 text-xl font-semibold text-gray-900'>
              <FaPhoneAlt className='text-blue-600' /> Enquiry Form
            </h3>
            <p className='mb-4 text-sm text-gray-600'>
              Contact the dealer or request a call back.
            </p>

            {submitted ? (
              <div className='p-4 text-sm text-green-700 rounded-md bg-green-50'>
                ✅ Request received! Dealer will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-3'>
                {['name', 'number', 'email'].map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      type={field === 'email' ? 'email' : 'text'}
                      className='w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {errors[field] && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Message (optional)'
                  rows={3}
                  className='w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-2 text-white transition rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-50'
                >
                  {loading ? 'Submitting...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>

          <div className='p-6 bg-white shadow-lg rounded-3xl'>
            <h4 className='mb-2 font-semibold text-gray-900'>Safety Tips</h4>
            <ul className='space-y-1 text-sm text-gray-600'>
              <li>• Avoid unrealistically cheap offers.</li>
              <li>• Meet in safe, public locations.</li>
              <li>• Don’t share OTPs or card info.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

function OverviewItem({ icon, label }) {
  return (
    <div className='flex flex-col items-center justify-center p-4 text-center transition border rounded-xl bg-gray-50 hover:shadow-lg'>
      <div className='text-blue-600'>{icon}</div>
      <p className='mt-2 text-sm font-medium text-gray-700'>{label}</p>
    </div>
  );
}
