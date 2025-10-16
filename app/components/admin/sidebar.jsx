'use client';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { BiWindows } from 'react-icons/bi';
import { FaWpforms } from 'react-icons/fa';
import Image from 'next/image';
import { SiSuzuki } from 'react-icons/si';
import { GiCheckMark } from 'react-icons/gi';
import { FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SidebarMenuItem from './sidebarmenu';

export default function Sidebar({ isCollapsed, toggleSidebar, pathname }) {
  const router = useRouter();
  const [truevalueOpen, setTruevalueOpen] = useState(false);

  const handleLogout = () => {
    toast.success('Logout Successfully');
    router.push('/admin/login');
  };

  return (
    <div
      className={`fixed min-h-[95vh] h-[calc(100vh-24px)] ${
        isCollapsed ? 'w-[80px]' : 'w-[250px]'
      } bg-white flex flex-col transition-all duration-300 rounded-xl my-3 mx-3 justify-between`}
    >
      {/* Top Section */}
      <section>
        <div
          className={`flex ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } items-center pt-10`}
        >
          <div className={`px-4 w-3/4 ${isCollapsed && 'hidden'}`}>
            <Image
              src='/nivya_logo.png'
              alt='logo'
              width={300}
              height={300}
              className='w-auto h-12 mb-1 duration-500 bg-black rounded-lg md:h-14'
            />
          </div>

          <div
            className={`px-4 cursor-pointer ${
              isCollapsed ? 'w-full flex justify-center' : 'w-1/4'
            } flex items-center`}
            onClick={toggleSidebar}
          >
            <HiMenu className='text-3xl text-black' />
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex flex-col mt-7'>
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Arena'
            to='/admin/arena'
            icon={SiSuzuki}
            active={pathname === '/admin/arena'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Nexa'
            to='/admin/nexa'
            icon={SiSuzuki}
            active={pathname === '/admin/nexa'}
          />

          {/* Truevalue with dropdown */}
          <div className='relative'>
            <div
              className={`flex items-center gap-3 cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                pathname.startsWith('/admin/truevalue') ? 'bg-gray-100 font-semibold' : ''
              }`}
              onClick={() => setTruevalueOpen(!truevalueOpen)}
            >
              <GiCheckMark className='text-lg' />
              {!isCollapsed && (
                <>
                  <span className='flex-1'>Truevalue</span>
                  {truevalueOpen ? <FiChevronUp /> : <FiChevronDown />}
                </>
              )}
            </div>

            {/* Dropdown items */}
            {truevalueOpen && !isCollapsed && (
              <div className='flex flex-col pl-12'>
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

          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Services'
            to='/admin/services'
            icon={FaWpforms}
            active={pathname === '/admin/services'}
          />
          <SidebarMenuItem
            isCollapsed={isCollapsed}
            text='Other'
            to='/admin/others'
            icon={BiWindows}
            active={pathname === '/admin/others'}
          />
        </div>
      </section>

      {/* Logout Button */}
      <div
        className={`w-full text-black flex items-center mb-6 cursor-pointer overflow-hidden ${
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
