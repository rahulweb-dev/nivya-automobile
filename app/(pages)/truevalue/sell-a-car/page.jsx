import React from 'react';
import TrueValueSell from './sell';

export const metadata = {
  title: 'Sell Your Car | True Value | Nivya Automobiles',
  description:
    'Sell your Maruti Suzuki car at the best price in Hyderabad with True Value. Get a quick car valuation and instant offers.',
  openGraph: {
    title: 'Sell Your Car | True Value | Nivya Automobiles',
    description:
      'Get the best resale value for your Maruti Suzuki car in Hyderabad. Instant evaluation and offers with True Value.',
    url: 'https://www.nivyaautomobiles.com/truevalue',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/truevalue-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Sell Your Car with True Value',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Car | True Value | Nivya Automobiles',
    description:
      'Quickly sell your Maruti Suzuki car at the best price in Hyderabad with True Value.',
    images: ['https://www.nivyaautomobiles.com/images/truevalue-banner.jpg'],
  },
};

export default function page() {
  return (
    <div>
      <TrueValueSell />
    </div>
  );
}
