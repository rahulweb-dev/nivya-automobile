'use client';

import ResponsiveBanner from '@/app/components/ResponsiveBanner';
import ServiceFeatures from '@/app/components/ServiceFeatures';
import ServiceForm from '@/app/components/forms/ServiceBooking';

export default function ServicePage() {
  return (
    <>
      <div className='mt-20'>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>
      <section className='relative flex flex-col items-center justify-center min-h-screen gap-16 p-8 overflow-hidden text-black '>
        {/* Background Glow Effects */}

        <div className='absolute rounded-full bg-gradient-to-r from-[#bcac77] to-[#bc7501] bottom-10 right-10 w-72 h-72 opacity-20 blur-3xl'></div>

        {/* Booking Form */}
        <div className='w-full max-w-full mt-14'>
          <ServiceForm />
        </div>

        {/* Explore Services Section */}
        <div className='z-10 w-full text-center'>
          <h2 className='mb-10 text-3xl font-bold md:text-4xl'>
            Explore Our Services
          </h2>
          <div className='flex justify-center'>
            <ServiceFeatures />
          </div>
        </div>
      </section>
    </>
  );
}
