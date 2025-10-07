"use client";

import { Car, Wrench, Gauge, GraduationCap } from "lucide-react";

const services = [
  {
    title: "True Value",
    description:
      "Trusted and user-friendly platform for buying, selling and exchanging pre-owned cars.",
    icon: <Car className="w-12 h-12 text-red-600 mb-4" />,
    link: "Explore",
  },
  {
    title: "Accessories",
    description:
      "Maruti Suzuki genuine accessories customised to your needs.",
    icon: <Gauge className="w-12 h-12 text-red-600 mb-4" />,
    link: "Read more",
  },
  {
    title: "Book A Vehicle Service",
    description:
      "Maruti Suzuki Trained professionals for a hassle-free servicing.",
    icon: <Wrench className="w-12 h-12 text-red-600 mb-4" />,
    link: "Read more",
  },
  {
    title: "Driving Schools",
    description:
      "Maruti Driving Schools with latest technology enabled simulators.",
    icon: <GraduationCap className="w-12 h-12 text-red-600 mb-4" />,
    link: "Read more",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Our Services
        </h2>
        <div className="flex justify-center mb-12">
          <span className="w-16 h-[2px] bg-red-500"></span>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {service.icon}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <button className="text-gray-500 text-sm font-medium hover:text-red-600 transition-colors">
                {service.link}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
