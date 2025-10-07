'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Vehicles', href: '/vehicles' },
    {
      name: 'Certified Pre-Owned',
      href: '/certified-pre-owned',
      hasDropdown: true,
    },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/reach-us' },
  ];

  return (
    <header className='fixed w-full top-0 z-50 bg-[#0E1224] backdrop-blur-lg shadow-lg border-b border-white/10 text-white'>
      <nav className='max-w-7xl mx-auto px-6 flex items-center justify-between h-20'>
        {/* LOGO */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/logo.png'
            alt='Landmark Logo'
            width={240}
            height={70}
            priority
            className='hover:scale-105 transition-transform duration-500 ease-in-out'
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className='hidden lg:flex items-center space-x-10'>
          {navLinks.map((link, index) => (
            <li key={index} className='relative group'>
              <Link
                href={link.href}
                className='font-semibold tracking-wide text-[15px] uppercase transition-all duration-300 flex items-center gap-1 hover:text-blue-300'
              >
                {link.name}
                {link.hasDropdown && <span className='ml-1 text-sm'>▾</span>}
              </Link>

              {/* Underline hover effect */}
              <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>

              {/* DROPDOWN */}
              {link.hasDropdown && (
                <div className='absolute left-0 mt-3 hidden group-hover:block animate-fadeIn'>
                  <div className='bg-white/90 backdrop-blur-xl text-gray-900 rounded-xl shadow-2xl min-w-[220px] py-3 border border-gray-100'>
                    <ul className='space-y-1'>
                      <li>
                        <Link
                          href='#'
                          className='block px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#0b1a3d] rounded-md transition-all'
                        >
                          Option 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='#'
                          className='block px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#0b1a3d] rounded-md transition-all'
                        >
                          Option 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='#'
                          className='block px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#0b1a3d] rounded-md transition-all'
                        >
                          Option 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          className='lg:hidden text-white text-3xl focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className='lg:hidden bg-[#0b1a3d]/95 backdrop-blur-md border-t border-gray-700 shadow-xl animate-slideDown'>
          <ul className='flex flex-col p-6 space-y-4 text-white'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className='block text-lg font-medium hover:text-blue-300 transition-all'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
