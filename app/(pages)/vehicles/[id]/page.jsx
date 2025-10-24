import VehiclePageClient from './VehiclePageClient';
import { vehicles } from '@/app/constants';

// This function runs on the server
export async function generateMetadata({ params }) {
  const vehicle = vehicles[params.id];

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Nivya Automobiles',
      description: 'The requested vehicle could not be found.',
    };
  }

  return {
    title: `${vehicle.name} | Nivya Automobiles`,
    description: `Explore ${vehicle.name}, ${vehicle.type} with ${vehicle.fuel} engine, starting at ₹${vehicle.price}.`,
    openGraph: {
      title: `${vehicle.name} | Nivya Automobiles`,
      description: `Check out the features, variants, and pricing of ${vehicle.name}.`,
      url: `https://www.nivyaautomobiles.com/vehicles/${params.id}`,
      images: [
        {
          url:
            vehicle.imageUrl ||
            'https://www.nivyaautomobiles.com/images/default-car.png',
          width: 1200,
          height: 630,
          alt: vehicle.name,
        },
      ],
      type: 'website',
    },
  };
}

export default function VehiclePage({ params }) {
  return <VehiclePageClient vehicleId={params.id} />;
}
