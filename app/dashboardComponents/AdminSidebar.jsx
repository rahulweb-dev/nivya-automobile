'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Popup', href: '/dashboard/popup' },
    { name: 'Log Out', href: '/' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed z-50 p-2 transition bg-yellow-400 rounded-full shadow-md lg:hidden top-4 left-4 hover:bg-yellow-500'
      >
        {isOpen ? (
          <HiX className='w-6 h-6 text-white' />
        ) : (
          <HiMenuAlt3 className='w-6 h-6 text-white' />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-gray-200  border-pink-400 shadow-xl transform transition-transform duration-300
        ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 rounded-r-3xl`}
      >
        <div className='h-full px-4 py-6 overflow-y-auto'>
          <ul className='space-y-3 text-lg font-bold'>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className='flex items-center p-3 transition bg-black shadow-md rounded-xl hover:bg-black group'
                  onClick={() => setIsOpen(false)}
                >
                  <span className='flex-1 text-gray-900 dark:text-white group-hover:text-purple-700'>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Fun footer/decoration */}
          <div className='absolute w-full text-center bottom-6'>
            <span className='text-sm font-semibold text-purple-700'>
              
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
