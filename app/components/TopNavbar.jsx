'use client';
import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar';

export default function TopNavbar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0b1a3d] to-[#162c5b] text-gray-200 text-sm border-b border-gray-700">
      <div className="container mx-auto px-6 py-2 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-wrap items-center space-x-6 mb-2 md:mb-0">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-blue-400" />
            <a href="tel:+917069102222" className="hover:text-white transition-colors">
              +91 7069102222
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-blue-400" />
            <span>Landmark House, Ahmedabad, Gujarat 380059</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-blue-400" />
            <span className="hover:text-white transition-colors cursor-pointer">
              Select Your City
            </span>
          </div>

          <span className="hidden md:block text-gray-500">|</span>

          <a href="#login" className="hover:text-blue-400 transition-colors cursor-pointer">
            Login
          </a>
          <a href="#register" className="hover:text-blue-400 transition-colors cursor-pointer">
            Register
          </a>
        </div>
      </div>
      <Navbar/>
    </div>
  );
}
