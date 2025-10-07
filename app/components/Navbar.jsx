'use client';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About Us', href: '#about' },
    { name: 'Vehicles', href: '#vehicles' },
    { name: 'Our Channels', href: '#channels' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className='bg-white shadow-md w-full z-40'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/' className='text-3xl font-extrabold text-blue-700'>
          MyBrand
        </Link>

        {/* Desktop Links */}
        <ul className='hidden md:flex space-x-8 text-gray-800 font-medium'>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className='hover:text-blue-600 transition-colors relative group'
              >
                {link.name}
                <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-3xl text-gray-700'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white border-t border-gray-200 shadow-md transition-all duration-300'>
          <ul className='flex flex-col space-y-4 py-4 px-6 text-gray-800 font-medium'>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className='block hover:text-blue-600 transition-colors'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
