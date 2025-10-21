'use client';
import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { SiSuzuki } from 'react-icons/si';
import { FaCarSide } from "react-icons/fa";
import { GiCheckMark } from 'react-icons/gi';
import { FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SidebarMenuItem from './sidebarmenu';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaCarOn } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { GoTools } from "react-icons/go";
export default function Sidebar({ isCollapsed, toggleSidebar, pathname }) {
  const router = useRouter();
  const [truevalueOpen, setTruevalueOpen] = useState(false);

  // Automatically open the Truevalue menu when inside its pages
  useEffect(() => {
    if (pathname.startsWith('/admin/truevalue')) {
      setTruevalueOpen(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    toast.success('Logout Successfully');
    router.push('/admin/login');
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
            text='On-Road-Price'
            to='/admin/vehicle-enquiry'
            icon={FaCarSide}
            active={pathname === '/admin/vehicle-enquiry'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Book a Service'
            to='/admin/book-a-service'
            icon={FaTools}
            active={pathname === '/admin/book-a-service'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Finance'
            to='/admin/finance'
            icon={MdOutlineCurrencyRupee}
            active={pathname === '/admin/finance'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Insurance'
            to='/admin/insurance'
            icon={FaCarOn}
            active={pathname === '/admin/insurance'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Accessories'
            to='/admin/accessories'
            icon={GoTools}
            active={pathname === '/admin/accessories'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Contact Us'
            to='/admin/contact-us'
            icon={MdContacts}
            active={pathname === '/admin/contact-us'}
          />

          {/* Truevalue with dropdown */}
          <div className='relative'>
            <div
              className={`flex items-center gap-3 cursor-pointer px-4 py-2 transition-all duration-200 rounded-lg ${
                pathname.startsWith('/admin/truevalue')
                  ? 'bg-blue-50 font-semibold text-blue-600'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
              onClick={() => setTruevalueOpen(!truevalueOpen)}
            >
              <GiCheckMark className='text-lg' />
              {!isCollapsed && (
                <>
                  <span className='flex-1'>True Value</span>
                  {truevalueOpen ? <FiChevronUp /> : <FiChevronDown />}
                </>
              )}
            </div>

            {/* Dropdown items */}
            {truevalueOpen && !isCollapsed && (
              <div className='flex flex-col pl-3 mt-1 ml-10 space-y-1 border-l border-gray-200'>
                <SidebarMenuItem
                  isCollapsed={isCollapsed}
                  text='Post a Vehicle'
                  to='/admin/truevalue/post-vehicle'
                  icon={GiCheckMark}
                  active={pathname === '/admin/truevalue/post-vehicle'}
                />
                <SidebarMenuItem
                  isCollapsed={isCollapsed}
                  text='Enquiries'
                  to='/admin/truevalue/enquiries'
                  icon={GiCheckMark}
                  active={pathname === '/admin/truevalue/enquiries'}
                />
              </div>
            )}
          </div>
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
