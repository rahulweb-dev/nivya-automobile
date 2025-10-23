import About from '@/app/components/About';
import ResponsiveBanner from '@/app/components/ResponsiveBanner';
import React from 'react';

export default function page() {
  return (
    <div className='mt-14'>
      <ResponsiveBanner
        desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
        mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
        altText='Sky Automobiles Contact Us Banner'
      />

      <About />
    </div>
  );
}
