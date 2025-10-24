'use client';
import { useState, useEffect } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import TestDriveForm from './forms/TestDriveForm';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hideNearFooter, setHideNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      setShowScrollTop(scrollY > 300);
      setHideNearFooter(scrollY + viewportHeight >= fullHeight - 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className='relative bg-gradient-to-b from-[#0E1224] to-[#121736] text-gray-300'>
      <div className='px-6 py-12 mx-auto max-w-7xl md:px-12'>
        {/* Top CTA Section */}
        <div className='flex flex-col items-center justify-between gap-6 pb-10 border-b border-gray-700 md:flex-row'>
          <div className='flex items-center gap-2 text-white transition cursor-pointer hover:opacity-80'>
            <Image
              src='https://www.grouplandmark.in/images/icon/enquire.svg'
              alt='Enquire'
              width={24}
              height={24}
            />
            <span className='font-medium tracking-wide'>Enquire Now</span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className='flex items-center gap-2 px-6 py-3 font-medium text-white transition rounded-full shadow-md bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-600 hover:to-indigo-500 hover:shadow-lg'
          >
            <Image
              src='https://www.grouplandmark.in/images/icon/openBooKTest.svg'
              alt='Test Drive'
              width={24}
              height={24}
            />
            <span>Book A Test Drive</span>
          </button>

          <div className='flex items-center gap-2 text-white transition cursor-pointer hover:opacity-80'>
            <Image
              src='https://www.grouplandmark.in/images/icon/location.svg'
              alt='Find Store'
              width={24}
              height={24}
            />
            <span className='font-medium tracking-wide'>Find A Store Near You</span>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className='grid grid-cols-2 gap-8 py-10 sm:grid-cols-3 md:grid-cols-4'>
          {[
            {
              title: 'CARS',
              links: [
                { name: 'New Cars', href: '#' },
                { name: 'Certified Pre-Owned', href: '#' },
                { name: 'Luxury Pre-Owned', href: '#' },
                { name: 'Sell Car', href: '#' },
              ],
            },
            {
              title: 'SERVICES',
              links: [
                { name: 'Finance', href: '/finance' },
                { name: 'Book-a-service', href: '/book-a-service' },
                { name: 'Insurance', href: '/insurance' },
              ],
            },
            {
              title: 'DISCOVER MORE',
              links: [
                { name: 'Accessories', href: '/accessories' },
                { name: 'Career', href: '/career' },
                { name: 'Insurance', href: '/insurance' },
              ],
            },
            {
              title: 'CONTACT',
              links: [
                { name: 'Get in Touch', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Locate Us', href: '#' },
              ],
            },
          ].map((section, i) => (
            <div key={i}>
              <h3 className='mb-4 text-lg font-semibold text-white'>
                {section.title}
              </h3>
              <ul className='space-y-2 text-sm'>
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className='transition-colors hover:text-white hover:underline underline-offset-4'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

    {/* Divider + Logo + Developer Info */}
<div className="pt-6 mt-6 border-t border-gray-700">
  <div className="flex flex-col items-center justify-between gap-6 text-sm text-gray-400 md:flex-row">
    
    {/* Left: Privacy Links */}
    <div className="flex items-center gap-4">
      <Link
        href="#"
        className="transition-colors hover:text-white"
      >
        Privacy Policy
      </Link>
      <span className="text-gray-600">|</span>
      <Link
        href="#"
        className="transition-colors hover:text-white"
      >
        Terms of Service
      </Link>
    </div>

    {/* Center: Logo + Copyright */}
    <div className="flex flex-col items-center">
      <Image
        src="/nivya_logo.png"
        alt="Nivya Automobiles"
        width={180}
        height={60}
        className="transition-opacity opacity-90 hover:opacity-100"
      />
      <p className="mt-2 text-xs md:text-sm">
        © 2025 Nivya Automobiles. All Rights Reserved.
      </p>
    </div>

    {/* Right: Developed By */}
    <div className="flex items-center gap-2">
      <span>Developed by</span>
      <Link
        href="https://www.broaddcast.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src="https://www.broaddcast.com/assets/images/logo-white.svg"
          alt="Developed by Broaddcast"
          width={120}
          height={40}
          className="object-contain"
        />
      </Link>
    </div>

  </div>
</div>

      </div>

      {/* Floating Social Icons */}
      <div className='fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[600]'>
        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
          <a
            key={i}
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 text-white transition-all rounded-lg shadow-md bg-white/10 hover:bg-white hover:text-black'
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && !hideNearFooter && (
        <div className='fixed z-50 right-6 bottom-6'>
          <button
            onClick={scrollToTop}
            className='p-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-500'
          >
            ↑
          </button>
        </div>
      )}

      {/* Test Drive Form Modal (optional) */}
      {/* {open && <TestDriveForm open={open} setOpen={setOpen} car={car} />} */}
    </footer>
  );
}
