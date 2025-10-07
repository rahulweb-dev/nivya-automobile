import { Percent, Car, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      className="relative bg-cover bg-center text-white py-20 px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/side.avif')", // replace with your background
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000000]/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          Why Choose Us?
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Percent className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Your Premier Automotive Destination
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Group Landmark stands as your premier destination for all your
              automotive needs. With a rich legacy spanning 25 years and an
              unwavering commitment to customer satisfaction, we've established
              ourselves as leaders in the industry.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Car className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Nationwide Accessibility
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Our extensive network comprises 139 state-of-the-art facilities
              across 32 cities in 12 states and union territories. This broad
              reach guarantees you accessibility, timely service, and
              competitive pricing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              All-Inclusive Car Buying Solution
            </h3>
            <p className="text-gray-200 leading-relaxed">
              We offer an all-inclusive car buying experience that covers
              everything you need. From insurance and financing to premium car
              care products and accessories — we ensure a seamless ownership
              journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
