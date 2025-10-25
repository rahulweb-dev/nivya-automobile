'use client';
import dynamic from 'next/dynamic';
import Banner from './Banner';
import useHeroTabs from '@/app/hooks/useHeroTabs';

// Dynamic imports for forms
const NewCarsForm = dynamic(() => import('./forms/NewCarsForm'), {
  ssr: false,
});
const PreOwnedForm = dynamic(() => import('./forms/PreOwnedForm'), {
  ssr: false,
});
const ServiceForm = dynamic(() => import('./forms/ServiceForm'), {
  ssr: false,
});

// Memoized TabButton
const TabButton = ({ tab, activeTab, onClick }) => {
  return (
    <button
      onClick={() => onClick(tab.id)}
      className={`py-4 transition-all duration-300 ${
        activeTab === tab.id
          ? 'bg-gray-800 text-white shadow-inner rounded-t-2xl'
          : 'hover:bg-gray-200'
      }`}
    >
      {tab.label}
    </button>
  );
};

export default function HeroSection() {
  const { activeTab, handleTabChange, tabs } = useHeroTabs();

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
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                activeTab={activeTab}
                onClick={handleTabChange}
              />
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
