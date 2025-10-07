'use client';

import Image from 'next/image';

const services = [
  {
    title: 'Comprehensive Car Selection',
    description:
      'Discover an extensive range of new and meticulously inspected used cars, each meeting our high quality and performance standards.',
    image:
      'https://www.grouplandmark.in/images/home/comprehensive-car-selection.jpg', // replace with your image path
  },
  {
    title: 'Tailored Financing Packages',
    description:
      'Our personalised financing packages are designed to fit your financial goals, making purchasing a new or pre-owned vehicle easy.',
    image: 'https://www.grouplandmark.in/images/listing/finance-1.png',
  },
  {
    title: 'Efficient Vehicle Appraisal',
    description:
      "Whether you're selling or upgrading, our expert vehicle appraisal services ensure you get the best value for your investment.",
    image:
      'https://www.grouplandmark.in/images/home/Efficient-Vehicle-Appraisal.jpg',
  },
  {
    title: 'Top-notch Aftersales Care',
    description:
      "Count on our top-tier aftersales care, including regular maintenance, repairs, and access to genuine parts, to maintain your vehicle's peak performance.",
    image:
      'https://www.grouplandmark.in/images/home/Top-notch-Aftersales-care.jpg',
  },
];

export default function OurServices() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <h2 className='text-3xl font-semibold text-gray-900 mb-10'>
          Our Services
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {services.map((service, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden'
            >
              <div className='relative w-full h-48'>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 25vw'
                  priority={index < 2} // prioritize top images for speed
                />
              </div>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                  {service.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
