import React from 'react';
import HeroSection from './components/HeroSection';

import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import OurServices from './components/OurServices';
import CarListing from './components/CarListing';
import Services from './components/service';

export default function page() {
  return (
    <div>
      <HeroSection />
      <About />
      <CarListing />
      <WhyChooseUs />
      <Services />
      {/* <OurServices /> */}
    </div>
  );
}
