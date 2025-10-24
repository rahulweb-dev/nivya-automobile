import ResponsiveBanner from '@/app/components/ResponsiveBanner';
import ServiceFeatures from '@/app/components/ServiceFeatures';
import ServiceForm from '@/app/components/forms/ServiceBooking';

export const metadata = {
  title: 'Car Service | Nivya Automobiles',
  description:
    'Book your Maruti Suzuki car service in Hyderabad. Schedule regular maintenance, repairs, and quality checks at Nivya Automobiles.',
  openGraph: {
    title: 'Car Service | Nivya Automobiles',
    description:
      'Schedule your Maruti Suzuki car service online or visit our Hyderabad showroom for top-quality maintenance.',
    url: 'https://www.nivyaautomobiles.com/service',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/service-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Service Options',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Service | Nivya Automobiles',
    description: 'Book your car service and maintenance easily online.',
    images: ['https://www.nivyaautomobiles.com/images/service-banner.jpg'],
  },
};

export default function ServicePage() {
  return (
    <>
      <div className='mt-20'>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>
      <div className='container mx-auto max-w-7xl'>
        <section className='relative flex flex-col items-center justify-center gap-16 p-8 overflow-hidden text-black '>
          {/* Background Glow Effects */}

          <div className='absolute rounded-full bg-gradient-to-r from-[#bcac77] to-[#bc7501] bottom-10 right-10 w-72 h-72 opacity-20 blur-3xl'></div>

          {/* Booking Form */}
          <div className='w-full max-w-full mt-8'>
            <ServiceForm />
          </div>

          {/* Explore Services Section */}
          <div className='z-10 w-full text-center'>
            <h2 className='mb-10 text-3xl font-bold md:text-4xl'>
              Explore Our Services
            </h2>
            <div className='flex justify-center'>
              <ServiceFeatures />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
