import React from 'react';
import FinancePage from './financepage';

export const metadata = {
  title: 'Car Finance Options | Nivya Automobiles',
  description:
    'Explore flexible Maruti Suzuki car finance options in Hyderabad. Calculate EMI, get loan details, and buy your car easily.',
  openGraph: {
    title: 'Car Finance | Nivya Automobiles',
    description:
      'Get the best car loan and finance options for Maruti Suzuki vehicles in Hyderabad.',
    url: 'https://www.nivyaautomobiles.com/finance',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/finance-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Finance Options',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Finance Options | Nivya Automobiles',
    description:
      'Calculate EMI, apply for car loans, and explore finance options for Maruti Suzuki cars.',
    images: ['https://www.nivyaautomobiles.com/images/finance-banner.jpg'],
  },
};

export default function page() {
  return (
    <div>
      <FinancePage />
    </div>
  );
}
