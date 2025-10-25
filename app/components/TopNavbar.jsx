'use client';
import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar';

export default function TopNavbar() {
  return (
    <div className="w-full bg-linear-to-r from-[#0b1a3d] to-[#162c5b] text-gray-200 text-sm border-b border-gray-700">
      <div className="container flex flex-col items-center justify-between px-6 py-2 mx-auto md:flex-row">
        {/* Left Section */}
        <div className="flex flex-wrap items-center mb-2 space-x-6 md:mb-0">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-blue-400" />
            <a href="tel:+917069102222" className="transition-colors hover:text-white">
              +91 7069102222
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-blue-400" />
            <span>Nivya Automobiles House, Ahmedabad, Gujarat 380059</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-blue-400" />
            <span className="transition-colors cursor-pointer hover:text-white">
              Select Your City
            </span>
          </div>

          <span className="hidden text-gray-500 md:block">|</span>

          <a href="#login" className="transition-colors cursor-pointer hover:text-blue-400">
            Login
          </a>
          <a href="#register" className="transition-colors cursor-pointer hover:text-blue-400">
            Register
          </a>
        </div>
      </div>
      <Navbar/>
    </div>
  );
}
