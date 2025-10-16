import React from "react";

export default function About() {
  return (
    <section className="px-6 py-16 bg-white md:px-12 lg:px-20">
      <div className="grid items-center gap-10 mx-auto max-w-7xl md:grid-cols-2">
        {/* Left Text Section */}
        <div>
          <h3 className="text-[#0a0a1a] font-semibold text-lg mb-2">
            About Us
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a1a] mb-4 leading-snug">
            Welcome to Nivya Automobiles – <br />
            <span className="text-[#0a0a1a] font-semibold">
              Where Your Passion Meets Our Excellence
            </span>
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">
            Nivya Automobiles has been at the forefront of premium and
            luxury automotive retail in India. With 139 state-of-the-art
            facilities across 32 cities in 12 states and union territories, our
            journey is a testament to our unwavering commitment to delivering
            unparalleled automotive experiences.
          </p>

          <button className="bg-[#0a0a1a] text-white px-8 py-4 font-medium rounded-sm hover:bg-[#1c1c2b] transition">
            More About Us
          </button>
        </div>

        {/* Right Video Section */}
        <div className="flex justify-center">
          <div className="w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Nivya Automobiles"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
