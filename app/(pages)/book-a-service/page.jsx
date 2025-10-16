"use client";

import ServiceFeatures from "@/app/components/ServiceFeatures";
import ServiceForm from "@/app/forms/ServiceBooking";


export default function ServicePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen gap-16 p-8 mt-12 overflow-hidden text-black ">
      
      {/* Background Glow Effects */}
    
      <div className="absolute rounded-full bg-gradient-to-r from-[#bcac77] to-[#bc7501] bottom-10 right-10 w-72 h-72 opacity-20 blur-3xl"></div>

      {/* Booking Form */}
      <div className="w-full max-w-full mt-14">
    <ServiceForm/>
      </div>

      {/* Explore Services Section */}
      <div className="z-10 w-full text-center">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">
          Explore Our Services
        </h2>
        <div className="flex justify-center">
          <ServiceFeatures />
        </div>
      </div>
    </section>
  );
}
