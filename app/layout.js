import { Geist, Geist_Mono } from 'next/font/google';
import { Nunito } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './LayoutWrapper';

// Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'Nivya Automobiles',
  description:
    'Explore new and used Maruti Suzuki cars in Hyderabad with Nivya Automobiles. Find the best deals, offers, and services.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <LayoutWrapper>{children}</LayoutWrapper>
    </html>
  );
}
