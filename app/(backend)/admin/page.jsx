'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Sidebar from '@/app/components/admin/sidebar';

const Home = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    // Optional: redirect logic or auth check
    // For example, redirect to /admin/login if not authenticated
    // router.push('/admin/login');
  }, []);

  return (
    <div className='flex min-h-screen bg-slate-200'>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        pathname={pathname}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isCollapsed ? 'ml-[85px]' : 'ml-[255px]'
        }`}
      >
        <h1 className='mb-4 text-2xl font-bold text-primaryBlue'>
          Welcome to Admin Home
        </h1>
        <p>Loading dashboard content...</p>
      </div>
    </div>
  );
};

export default Home;
