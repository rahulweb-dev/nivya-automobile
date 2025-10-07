'use client';
import ServiceBooking from '@/app/forms/ServiceBooking';
import Image from 'next/image';
import { useState } from 'react';

export default function ServiceBanner() {
  const [open, setOpen] = useState(false);
  const service = {
    title: 'Premium Car Detailing',
    subtitle: 'Restore. Protect. Shine.',
    price: 'From $79',
    duration: '2–3 hours',
    image: '/services/detailing-hero.jpg', // replace with your image
    highlights: [
      'Exterior wash & clay bar',
      'Paint correction & polish',
      'Interior deep-clean & sanitize',
      'Ceramic coating option',
    ],
  };

  return (
    <>
      <section className='relative bg-gradient-to-b from-[#f7f5f2] to-white py-20 overflow-hidden mt-16'>
        <div className='max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center'>
          {/* Text + CTA */}
          <div className='space-y-6'>
            <p className='inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium shadow'>
              Premium service
            </p>

            <h1 className='text-4xl md:text-5xl font-extrabold leading-tight text-gray-900'>
              {service.title}
              <span className='block text-xl font-medium text-gray-600 mt-3'>
                {service.subtitle}
              </span>
            </h1>

            <p className='text-gray-600 max-w-xl'>
              Give your car showroom-level shine with industry-grade products
              and expert technicians. Safe on paintwork and interior — designed
              to maintain value and wow on the road.
            </p>

            <div className='flex flex-wrap gap-4 items-center'>
              <div className='flex items-center gap-3'>
                <div className='text-2xl font-bold text-gray-900'>
                  {service.price}
                </div>
                <div className='text-sm text-gray-500'>
                  • {service.duration}
                </div>
              </div>

              <button
                onClick={() => setOpen(true)}
                className='bg-black text-white px-6 py-3 rounded-lg font-medium shadow hover:shadow-lg transition'
              >
                Book Now
              </button>

              <a
                href='#details'
                className='text-sm text-gray-700 underline-offset-2 hover:underline'
              >
                See service details
              </a>
            </div>

            <ul
              id='details'
              className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700'
            >
              {service.highlights.map((h, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <div className='min-w-[8px] h-8 bg-black rounded-full mt-1' />
                  <div>{h}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image + floating card */}
          <div className='relative flex items-center justify-center'>
            <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transform -rotate-3'>
              <Image
                src={service.image}
                alt={service.title}
                width={900}
                height={600}
                className='object-cover w-full h-[360px]'
                priority
              />
            </div>

            {/* Floating mini-card */}
            <div className='absolute bottom-6 right-6 bg-white rounded-2xl shadow-lg p-4 w-64 border border-gray-100'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm text-gray-500'>Fastest slot</div>
                  <div className='font-semibold text-gray-900'>
                    Tomorrow, 10:00 AM
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-xs text-gray-500'>Duration</div>
                  <div className='font-medium text-gray-900'>
                    {service.duration}
                  </div>
                </div>
              </div>
              <div className='mt-3 flex gap-2'>
                <button
                  onClick={() => setOpen(true)}
                  className='flex-1 bg-black text-white py-2 rounded-lg font-medium'
                >
                  Book slot
                </button>
                <button className='px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700'>
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking modal */}
      <ServiceBooking open={open} setOpen={setOpen} service={service} />
    </>
  );
}
