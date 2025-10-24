import React from 'react';
import CareerPage from './career';

export const metadata = {
  title: 'Careers | Nivya Automobiles',
  description:
    'Join the Nivya Automobiles team in Hyderabad. Explore open positions, apply online, and grow your career with us.',
  openGraph: {
    title: 'Careers | Nivya Automobiles',
    description:
      'Explore job opportunities at Nivya Automobiles, your trusted Maruti Suzuki dealer in Hyderabad.',
    url: 'https://www.nivyaautomobiles.com/career',
    siteName: 'Nivya Automobiles',
    images: [
      {
        url: 'https://www.nivyaautomobiles.com/images/career-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Careers at Nivya Automobiles',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Nivya Automobiles',
    description: 'Apply for jobs and grow your career at Nivya Automobiles.',
    images: ['https://www.nivyaautomobiles.com/images/career-banner.jpg'],
  },
};
export default function () {
  return (
    <div>
      <CareerPage />
    </div>
  );
}
