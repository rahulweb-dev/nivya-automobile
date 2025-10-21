'use client';
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import TestDriveForm from './forms/TestDriveForm';
// <-- make sure this path is correct

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(null);

  return (
    <footer className='bg-[#0E1224] text-gray-300 pt-12 relative'>
      <div className='px-6 mx-auto max-w-7xl md:px-12'>
        {/* Top CTA Section */}
        <div className='flex flex-col items-center justify-center gap-10 pb-8 border-b border-gray-700 md:flex-row'>
          {/* Enquire Now */}
          <div className='flex items-center gap-2 text-white transition cursor-pointer hover:opacity-80'>
            <Image
              src='https://www.grouplandmark.in/images/icon/enquire.svg'
              alt='Enquire'
              width={24}
              height={24}
            />
            <span>Enquire Now</span>
          </div>

          {/* Book A Test Drive */}
          <button
            onClick={() => setOpen(true)}
            className='flex items-center gap-2 text-white transition cursor-pointer hover:opacity-80'
          >
            <Image
              src='https://www.grouplandmark.in/images/icon/openBooKTest.svg'
              alt='Test Drive'
              width={24}
              height={24}
            />
            <span>Book A Test Drive</span>
          </button>

          {/* Find A Store */}
          <div className='flex items-center gap-2 text-white transition cursor-pointer hover:opacity-80'>
            <Image
              src='https://www.grouplandmark.in/images/icon/location.svg'
              alt='Find Store'
              width={24}
              height={24}
            />
            <span>Find A Store Near You</span>
          </div>
        </div>

        {/* Main Links */}
        <div className='grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 font-semibold text-white'>CAR</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>New Cars</Link>
              </li>
              <li>
                <Link href='#'>Certified Pre-Owned</Link>
              </li>
              <li>
                <Link href='#'>Luxury Pre-Owned</Link>
              </li>
              <li>
                <Link href='#'>Sell Car</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-semibold text-white'>ABOUT US</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>About Us</Link>
              </li>
              <li>
                <Link href='#'>Timeline</Link>
              </li>
              <li>
                <Link href='#'>Our Leadership</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-semibold text-white'>DISCOVER MORE</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>CSR</Link>
              </li>
              <li>
                <Link href='#'>Press</Link>
              </li>
              <li>
                <Link href='#'>Insurance</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-semibold text-white'>CONTACT</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>Get in Touch</Link>
              </li>
              <li>
                <Link href='#'>Careers</Link>
              </li>
              <li>
                <Link href='#'>Locate Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='pt-6 text-sm text-center text-gray-400 border-t border-gray-700'>
          <p className='max-w-3xl mx-auto mb-4'>
            <Link href='#'>Privacy Policy</Link> |
            <Link href='#'>Terms of Service</Link>
          </p>
          <div className='flex justify-center my-6'>
            <Image src='/nivya_logo.png' alt='nivya' width={200} height={70} />
          </div>
          <p>Nivya-automobiles © 2025. All Rights Reserved.</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className='fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[600]'>
        <a
          href='#'
          className='p-3 transition bg-black rounded-md hover:opacity-80 hover:bg-white hover:text-black'
        >
          <FaFacebookF />
        </a>
        <a
          href='#'
          className='p-3 transition bg-black rounded-md hover:opacity-80 hover:bg-white hover:text-black'
        >
          <FaTwitter />
        </a>
        <a
          href='#'
          className='p-3 transition bg-black rounded-md hover:opacity-80 hover:bg-white hover:text-black'
        >
          <FaInstagram />
        </a>
        <a
          href='#'
          className='p-3 transition bg-black rounded-md hover:opacity-80 hover:bg-white hover:text-black'
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Scroll to Top */}
      <div className='fixed z-40 right-6 bottom-6'>
        <a
          href='#'
          className='p-3 text-white transition bg-black rounded-full hover:bg-white/20'
        >
          ↑
        </a>
      </div>

      {/* Test Drive Form Modal */}
      {open && <TestDriveForm open={open} setOpen={setOpen} car={car} />}
    </footer>
  );
}
