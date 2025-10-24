import React from 'react';
import AccessoriesPage from './accessories';

export const metadata = {
  title: 'Car Accessories | Nivya Automobiles',
  description:
    'Explore premium Maruti Suzuki car accessories in Hyderabad. Upgrade your car with quality products.',
  openGraph: {
    title: 'Car Accessories | Nivya Automobiles',
    description:
      'Discover and buy Maruti Suzuki car accessories online or at our showroom in Hyderabad.',
    url: 'https://www.nivyaautomobiles.com/accessories',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/accessories-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Accessories',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Accessories | Nivya Automobiles',
    description: 'Upgrade your car with premium Maruti Suzuki accessories.',
    images: ['https://www.nivyaautomobiles.com/images/accessories-banner.jpg'],
  },
};

export default function page() {
  return (
    <div>
      <AccessoriesPage />
    </div>
  );
}
