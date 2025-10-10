'use client';
import Link from 'next/link';
import React from 'react';

export default function SidebarMenuItem({ isCollapsed, text, to, active, icon: Icon }) {
  return (
    <Link
      href={to}
      className={`flex ${isCollapsed ? 'justify-center' : 'justify-center'} w-full items-center mb-4`}
    >
      <div
        title={isCollapsed ? text : ''}
        className={`${!isCollapsed && 'w-3/4'} 
          flex px-4 items-center rounded-lg hover:bg-primaryBlue overflow-hidden
          ${active ? 'bg-primaryBlue text-white' : 'text-black'}
          hover:text-white p-2 h-[50px]`}
      >
        {/* Render the passed icon */}
        {text !== 'Nexa' ? (
          <Icon
            className={`${isCollapsed ? 'mx-auto' : 'mr-4'} text-xl ${
              active && 'text-white'
            }`}
          />
        ) : (
          <p
            className={`${
              isCollapsed ? 'mx-auto' : 'mr-4'
            } font-serif font-bold text-xl ${active && 'text-white'}`}
          >
            N
          </p>
        )}
        {!isCollapsed && <span className="whitespace-nowrap">{text}</span>}
      </div>
    </Link>
  );
}
