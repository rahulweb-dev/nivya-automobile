import { FaCar, FaTools, FaShieldAlt, FaComments } from 'react-icons/fa';

const services = [
  { icon: <FaTools className="text-3xl text-[#bc7501]" />, title: 'Maintenance' },
  { icon: <FaCar className="text-3xl text-[#bc7501]" />, title: 'Detailing' },
  { icon: <FaShieldAlt className="text-3xl text-[#bc7501]" />, title: 'Insurance/Warranty' },
  { icon: <FaComments className="text-3xl text-[#bc7501]" />, title: 'Consultation' },
];

export default function ServiceFeatures() {
  return (
    <div className="text-center">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center w-32 h-32 text-white transition-transform duration-300 ease-out transform hover:scale-105"
          >
            {/* Hexagon Glow Background */}
            <div className="absolute inset-0 rounded-[20%] bg-gradient-to-b from-[#bc7501]/20 to-transparent blur-xl opacity-40"></div>

            {/* Hexagon Shape */}
            <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 border border-[#bc7501] rounded-2xl shadow-lg">
              {service.icon}
              <p className="mt-2 text-sm font-medium text-gray-200">{service.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
