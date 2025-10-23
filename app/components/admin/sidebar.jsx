'use client';
import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaCarSide } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SidebarMenuItem from './sidebarmenu';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { FaCarOn } from 'react-icons/fa6';
import { FaTools } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';
import { GoTools } from 'react-icons/go';
import axios from 'axios';
import { ImWindows8 } from 'react-icons/im';
import { VscBook } from 'react-icons/vsc';
import { BsPostcard } from 'react-icons/bs';

export default function Sidebar({ isCollapsed, toggleSidebar, pathname }) {
  const router = useRouter();
  const [truevalueOpen, setTruevalueOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        '/api/admin/logout',
        {},
        { withCredentials: true } // ✅ Important for cookies
      );

      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <div
      className={`fixed min-h-[95vh] h-[calc(100vh-24px)] ${
        isCollapsed ? 'w-[80px]' : 'w-[250px]'
      } bg-white flex flex-col transition-all duration-300 rounded-xl my-3 mx-3 justify-between shadow-md`}
    >
      {/* Top Section */}
      <section>
        <div
          className={`flex ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } items-center pt-10`}
        >
          {!isCollapsed && (
            <div className='w-3/4 px-4'>
              <Image
                src='/nivya_logo.png'
                alt='logo'
                width={300}
                height={300}
                className='w-auto h-12 mb-1 duration-500 bg-black rounded-lg md:h-14'
              />
            </div>
          )}

          <div
            className={`px-4 cursor-pointer ${
              isCollapsed
                ? 'w-full flex justify-center'
                : 'w-1/4 flex justify-end'
            }`}
            onClick={toggleSidebar}
          >
            <HiMenu className='text-3xl text-black' />
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex flex-col mt-7'>
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Dashboard'
            to='/admin/dashboard'
            icon={ImWindows8}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='On-Road-Price'
            to='/admin/vehicle-enquiry'
            icon={FaCarSide}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Book a Service'
            to='/admin/book-a-service'
            icon={FaTools}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Finance'
            to='/admin/finance'
            icon={MdOutlineCurrencyRupee}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Insurance'
            to='/admin/insurance'
            icon={FaCarOn}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Accessories'
            to='/admin/accessories'
            icon={GoTools}
          />

          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Contact Us'
            to='/admin/contact-us'
            icon={MdContacts}
          />

          {/* True Value with dropdown */}
          <div className='relative group'>
            <div
              className={`flex items-center gap-3 cursor-pointer px-8 py-2 transition-all duration-200 rounded-lg ${
                pathname.startsWith('/admin/truevalue')
                  ? 'bg-blue-50 font-semibold text-blue-600 '
                  : 'hover:bg-gray-100 text-gray-800 '
              }`}
              onClick={() => setTruevalueOpen((prev) => !prev)}
            >
              <GiCheckMark className='text-lg' />
              {!isCollapsed && (
                <>
                  <span className='flex-1 '>True Value</span>
                  {truevalueOpen ? <FiChevronUp /> : <FiChevronDown />}
                </>
              )}
            </div>

            {/* Dropdown items */}
            {!isCollapsed ? (
              // Sidebar expanded
              (truevalueOpen || pathname.startsWith('/admin/truevalue')) && (
                <div className='flex flex-col mt-1 space-y-1 border-l border-gray-200 '>
                  <SidebarMenuItem
                    isCollapsed={isCollapsed}
                    text='Post a Vehicle'
                    to='/admin/truevalue/post-vehicle'
                    icon={BsPostcard}
                  />
                  <SidebarMenuItem
                    isCollapsed={isCollapsed}
                    text='Enquiries'
                    to='/admin/truevalue/enquiries'
                    icon={GiCheckMark}
                  />
                </div>
              )
            ) : (
              // Sidebar collapsed: show tooltip-style dropdown on hover
              <div className='absolute top-0 hidden w-48 p-2 bg-white border border-gray-200 rounded shadow-md left-full group-hover:block'>
                <SidebarMenuItem
                  isCollapsed={false}
                  text='Post a Vehicle'
                  to='/admin/truevalue/post-vehicle'
                  icon={GiCheckMark}
                />
                <SidebarMenuItem
                  isCollapsed={false}
                  text='Enquiries'
                  to='/admin/truevalue/enquiries'
                  icon={GiCheckMark}
                />
              </div>
            )}
          </div>

          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Careers'
            to='/admin/careers'
            icon={VscBook}
          />
        </div>
      </section>

      {/* Logout */}
      <div
        className={`w-full text-black flex items-center mb-6 cursor-pointer ${
          isCollapsed ? 'justify-center' : 'ml-11'
        }`}
        onClick={handleLogout}
      >
        <FiLogOut className='text-xl' />
        {!isCollapsed && <span className='pl-4 whitespace-nowrap'>Logout</span>}
      </div>
    </div>
  );
}
