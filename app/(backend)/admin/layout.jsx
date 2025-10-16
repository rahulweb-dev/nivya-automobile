'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/admin/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    // Optional: redirect logic or auth check can go here
    if (pathname !== '/admin/login') {
      console.log('Dashboard loaded:', pathname);
    }
  }, [pathname]);

  // Determine if Navbar/Footer should be hidden
  const hideMainLayout = pathname.startsWith('/admin');

  const showSidebar = pathname !== '/admin/login' && pathname !== '/admin';

  return (
    <section className='flex min-h-screen bg-slate-200'>
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          pathname={pathname}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          pathname !== '/admin/login' ? 'pl-4 py-2' : ''
        } ${showSidebar ? (isCollapsed ? 'ml-[85px]' : 'ml-[255px]') : 'ml-0'}`}
      >
        {/* Navbar */}
        {!hideMainLayout && <Navbar />}

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        {!hideMainLayout && <Footer />}
      </div>
    </section>
  );
}
