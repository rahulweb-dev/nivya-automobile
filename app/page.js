import React from 'react';
import HeroSection from './components/HeroSection';
import Banner from './components/Banner';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import OurServices from './components/OurServices';
import CarListing from './components/CarListing';

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

export default function page() {
  return (
    <div>
      <HeroSection sliders={sliders} />

      <About />
      <CarListing/>
      <WhyChooseUs />
      <OurServices/>
    </div>
  );
}
