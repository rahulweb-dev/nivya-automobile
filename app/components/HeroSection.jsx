'use client';
import { useState } from 'react';
import Banner from './Banner';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('newCars');

  const sliders = [
    {
      desktopImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_page_swift.webp&w=3840&q=75',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_fronx_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
    {
      desktopImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_page_swift.webp&w=3840&q=75',
      mobileImg:
        'https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fmain_fronx_mobile.webp&w=1080&q=75',
      alt: 'Monsoon',
      link: '/',
    },
  ];

  return (
    <section className="relative">
      {/* Banner */}
      <Banner sliders={sliders} />

      {/* Overlay + Form */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div> */}

      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-0 -mt-24">
        <div className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-3 text-center text-sm md:text-base font-semibold">
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

          {/* Form Fields */}
          <div className="p-6 md:p-8">
            {activeTab === 'newCars' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  type="number"
                  placeholder="Number"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Car</option>
                  <option>Swift</option>
                  <option>Baleno</option>
                  <option>Fronx</option>
                </select>
                <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                  Submit
                </button>
              </div>
            )}

            {activeTab === 'preOwned' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Brand</option>
                  <option>Maruti</option>
                  <option>Hyundai</option>
                </select>
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Model</option>
                  <option>Baleno</option>
                  <option>i20</option>
                </select>
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Location</option>
                  <option>Raipur</option>
                  <option>Bhilai</option>
                </select>
                <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                  Submit
                </button>
              </div>
            )}

            {activeTab === 'service' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Enter Car Number"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Service Type</option>
                  <option>Oil Change</option>
                  <option>General Checkup</option>
                  <option>Brake Service</option>
                </select>
                <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none">
                  <option>Select Location</option>
                  <option>Raipur</option>
                  <option>Bhilai</option>
                </select>
                <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
