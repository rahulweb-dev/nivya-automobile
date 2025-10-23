'use client';
import Link from 'next/link';
import React from 'react';

export default function SidebarMenuItem({ isCollapsed, text, to, active, icon: Icon }) {
  return (
    <Link href={to} className="w-full mb-2">
      <div
        title={isCollapsed ? text : ''}
        className={`flex items-center px-4 h-[50px] rounded-lg transition-all duration-200
          ${isCollapsed ? 'justify-center' : 'justify-start'}
          ${active ? 'bg-blue-950 text-white' : 'text-black'}
          hover:bg-blue-950 hover:text-white overflow-hidden
        `}
      >
        {/* Render Icon or Nexa placeholder */}
        {text !== 'Nexa' ? (
          <Icon
            className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'} ${
              active && 'text-white'
            }`}
          />
        ) : (
          <p
            className={`text-xl font-serif font-bold ${isCollapsed ? 'mx-auto' : 'mr-4'} ${
              active && 'text-white'
            }`}
          >
            N
          </p>
        )}

        {/* Text label */}
        {!isCollapsed && <span className="whitespace-nowrap">{text}</span>}
      </div>
    </Link>
  );
}
