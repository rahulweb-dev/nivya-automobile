'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className='fixed top-0 z-50 w-full border-b border-pink-400 shadow-md backdrop-blur-md dark:bg-gray-800/80 dark:border-gray-700'>
      <div className='flex items-center justify-between px-4 py-3 lg:px-6'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Image
            src='/nivya_logo.png'
            width={120}
            height={60}
            className='rounded-full'
            alt='Logo'
          />
        </div>

        {/* Desktop User Profile */}
        <div className='relative items-center hidden lg:flex'>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center p-1 text-sm transition rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#e68a00]'
          >
            <Image
              className='w-10 h-10 rounded-full'
              src='/nivya_logo.png'
              alt='user photo'
              width={40}
              height={40}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className='absolute right-0 z-50 w-40 bg-red-600 border border-gray-200 rounded-md shadow-lg mt-28 dark:border-gray-700'>
              <ul className='py-2'>
                <li>
                  <Link
                    href='/'
                    className='block px-4 py-2 font-semibold text-gray-700 rounded-md dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-red-700'
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className='p-2 transition bg-yellow-400 rounded-full shadow-md lg:hidden hover:bg-yellow-500'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <HiX className='w-6 h-6 text-white' />
          ) : (
            <HiMenuAlt3 className='w-6 h-6 text-white' />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className='px-4 py-2 bg-pink-200 shadow-md lg:hidden dark:bg-gray-700'>
          <Link
            href='/'
            className='block px-4 py-2 font-semibold text-gray-800 transition rounded-lg dark:text-white hover:bg-yellow-300'
            onClick={handleLogout}
          >
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
}
