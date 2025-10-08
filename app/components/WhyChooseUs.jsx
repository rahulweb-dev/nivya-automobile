import { Percent, Car, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      className="relative px-6 py-20 text-white bg-center bg-cover md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/side.avif')", // replace with your background
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000000]/70"></div>

      <div className="relative z-10 mx-auto text-center max-w-7xl">
        <h2 className="text-3xl font-bold md:text-4xl mb-14">
          Why Choose Us?
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Percent className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Your Premier Automotive Destination
            </h3>
            <p className="leading-relaxed text-gray-200">
              Nivya Automobiles  stands as your premier destination for all your
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
            <h3 className="mb-3 text-xl font-semibold">
              Nationwide Accessibility
            </h3>
            <p className="leading-relaxed text-gray-200">
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
            <h3 className="mb-3 text-xl font-semibold">
              All-Inclusive Car Buying Solution
            </h3>
            <p className="leading-relaxed text-gray-200">
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
