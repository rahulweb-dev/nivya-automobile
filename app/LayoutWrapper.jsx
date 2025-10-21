'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { ImageKitProvider } from '@imagekit/next';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <body className='flex flex-col min-h-screen font-[var(--font-nunito)] antialiased bg-white text-gray-900'>
      {/* Toast Notifications */}
      <Toaster position='top-center' reverseOrder={false} />
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        publicKey={process.env.IMAGEKIT_PUBLIC_KEY}
      >
        {/* Navbar - only show on non-admin routes */}
        {!isAdminRoute && <Navbar />}
        {/* Main content */}
        <main className='flex-grow'>{children}</main>
        {/* Footer - only show on non-admin routes */}
        {!isAdminRoute && <Footer />}{' '}
      </ImageKitProvider>
    </body>
  );
}
