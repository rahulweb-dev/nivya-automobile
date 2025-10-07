'use client';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-[#0E1224] text-gray-300 pt-12 relative'>
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        {/* Top CTA Section */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 border-b border-gray-700 pb-8'>
          <div className='flex items-center gap-2 text-white'>
            <Image
              src='https://www.grouplandmark.in/images/icon/enquire.svg'
              alt='Enquire'
              width={24}
              height={24}
            />
            <span>Enquire Now</span>
          </div>
          <div className='flex items-center gap-2 text-white'>
            <Image
              src='https://www.grouplandmark.in/images/icon/openBooKTest.svg'
              alt='Test Drive'
              width={24}
              height={24}
            />
            <span>Book A Test Drive</span>
          </div>
          <div className='flex items-center gap-2 text-white'>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10'>
          <div>
            <h3 className='text-white font-semibold mb-4'>CAR</h3>
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
            <h3 className='text-white font-semibold mb-4'>ABOUT US</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>About Us</Link>
              </li>
              <li>
                <Link href='#'>Timeline</Link>
              </li>
              <li>
                <Link href='#'>Our leadership</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-white font-semibold mb-4'>DISCOVER MORE</h3>
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
            <h3 className='text-white font-semibold mb-4'>CONTACT</h3>
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
        <div className='border-t border-gray-700 pt-6 text-center text-sm text-gray-400'>
          <p className='max-w-3xl mx-auto mb-4'>
            <Link href='#'>Privacy Policy</Link> |{' '}
            <Link href='#'>Terms of Service</Link> |{' '}
            <Link href='#'>Shipping Policy</Link> |{' '}
            <Link href='#'>Return Policy</Link>
          </p>
          <div className='flex justify-center my-6'>
            <Image
              src='/logo/landmark-logo.png'
              alt='Landmark'
              width={90}
              height={40}
            />
          </div>
          <p>Group Landmark © 2024. All Rights Reserved.</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className='fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[600]'>
        <a
          href='#'
          className='bg-[#1877F2] p-3 rounded-md hover:opacity-80 transition'
        >
          <FaFacebookF />
        </a>
        <a
          href='#'
          className='bg-[#1DA1F2] p-3 rounded-md hover:opacity-80 transition'
        >
          <FaTwitter />
        </a>
        <a
          href='#'
          className='bg-[#E1306C] p-3 rounded-md hover:opacity-80 transition'
        >
          <FaInstagram />
        </a>
        <a
          href='#'
          className='bg-[#0077B5] p-3 rounded-md hover:opacity-80 transition'
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Scroll to Top */}
      <div className='fixed right-6 bottom-6'>
        <a
          href='#'
          className='bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition'
        >
          ↑
        </a>
      </div>
    </footer>
  );
}
