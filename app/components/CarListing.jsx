
import CarCard from './vehicle-components/CarCard';

const cars = [
  {
    name: 'VICTORIS',
    image: 'https://www.skyautomobiles.in/thumbnail/victoris.png',
    price: '₹ 10.50 L /-',
    link: '/vehicles/victoris',
    brochure:
      'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/cars/victoris/brochure/Maruti-Suzuki-Arena-Victoris-Brochure.pdf',
  },
  {
    name: 'ALTO K10',
    image: 'https://www.skyautomobiles.in/thumbnail/altoK10.webp',
    price: '₹ 5.78 L* /-',
    link: '/vehicles/alto-k10',
    brochure: '#',
  },
  {
    name: 'SWIFT',
    image: 'https://www.skyautomobiles.in/thumbnail/swift02.webp',
    price: '₹ 3.69 L* /-',
    link: '/vehicles/swift',
    brochure: '#',
  },
  {
    name: 'BREZZA',
    image: 'https://www.skyautomobiles.in/thumbnail/brezza-page.webp',
    price: '₹ 8.25 L /-',
    link: '/vehicles/brezza',
    brochure: '#',
  },
  {
    name: 'DZIRE',
    image: 'https://www.skyautomobiles.in/thumbnail/bluishblack.png',
    price: '₹ 6.25 L* /-',
    link: '/vehicles/dzire',
    brochure: '#',
  },
  {
    name: 'S-PRESSO',
    image: 'https://www.skyautomobiles.in/thumbnail/spresso.webp',
    price: '₹ 3.49* /-',
    link: '/vehicles/spresso',
    brochure: '#',
  },
  {
    name: 'WAGONR',
    image: 'https://www.skyautomobiles.in/thumbnail/wagnor.webp',
    price: '₹ 4.98* /-',
    link: '/vehicles/wagonr',
    brochure: '#',
  },
  {
    name: 'ERTIGA',
    image: 'https://www.skyautomobiles.in/thumbnail/ertiga.webp',
    price: '₹ 8.80* /-',
    link: '/vehicles/ertiga',
    brochure: '#',
  },
  {
    name: 'CELERIO',
    image: 'https://www.skyautomobiles.in/thumbnail/celerio.webp',
    price: '₹ 4.69* /-',
    link: '/vehicles/celerio',
    brochure: '#',
  },
  {
    name: 'EECO',
    image: 'https://www.skyautomobiles.in/thumbnail/Eeco.webp',
    price: '₹ 5.20* /-',
    link: '/vehicles/eeco',
    brochure: '#',
  },
];

export default function CarListing() {
  return (
    <section className='relative py-20 overflow-hidden bg-gray-200'>
      {/* Background glow */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute rounded-full w-72 h-72 bg-blue-500/10 blur-3xl top-10 left-20' />
        <div className='absolute rounded-full w-72 h-72 bg-indigo-500/10 blur-3xl bottom-10 right-20' />
      </div>

      <div className='px-6 mx-auto text-center text-black max-w-7xl'>
        <h2 className='mb-3 text-3xl tracking-tight md:text-4xl'>
          Explore Our Latest Cars
        </h2>
        <p className='max-w-2xl mx-auto mb-12 text-sm text-gray-400 md:text-base'>
          Discover premium models crafted for performance, reliability, and
          timeless design.
        </p>

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
