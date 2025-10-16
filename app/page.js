import React from 'react';
import HeroSection from './components/HeroSection';

import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import CarListing from './components/CarListing';
import Services from './components/service';
import Testimonials from './components/Testimonials';

export default function page() {
  return (
    <div>
      <HeroSection />
      <CarListing />
      <About />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      {/* <OurServices /> */}
    </div>
  );
}
