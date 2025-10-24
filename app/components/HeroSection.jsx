'use client';
import { useState } from 'react';
import Banner from './Banner';
import NewCarsForm from './forms/NewCarsForm';
import PreOwnedForm from './forms/PreOwnedForm';
import ServiceForm from './forms/ServiceForm';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('newCars');

  const sliders = [
    {
      desktopImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_page_swift.webp&w=3840&q=75',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_swift_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
  ];

  return (
    <section className='relative'>
      <Banner sliders={sliders} />

      <div className='relative z-20 max-w-6xl px-4 mx-auto -mt-24 md:px-0'>
        <div className='overflow-hidden text-black bg-white shadow-2xl rounded-2xl'>
          {/* Tabs */}
          <div className='grid grid-cols-3 text-sm font-semibold text-center md:text-base'>
            {[
              { id: 'newCars', label: 'New Cars' },
              { id: 'preOwned', label: 'Certified Pre-Owned' },
              { id: 'service', label: 'Book a Service' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white shadow-inner rounded-t-2xl'
                    : 'hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className='p-6 md:p-8'>
            {activeTab === 'newCars' && <NewCarsForm />}
            {activeTab === 'preOwned' && <PreOwnedForm />}
            {activeTab === 'service' && <ServiceForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
