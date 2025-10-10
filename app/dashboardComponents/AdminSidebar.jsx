'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { LayoutDashboard, MessageSquare, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // optional: clear tokens or sessionStorage here
    // localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Popup', href: '/dashboard/popup', icon: <MessageSquare size={18} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed z-50 p-2 transition rounded-full shadow-md bg-gradient-to-r from-gray-800 to-gray-900 lg:hidden top-4 left-4 hover:opacity-90'
      >
        {isOpen ? (
          <HiX className='w-6 h-6 text-white' />
        ) : (
          <HiMenuAlt3 className='w-6 h-6 text-white' />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl border-r border-gray-700 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand/Header */}
        <div className='flex items-center justify-center h-20 text-2xl font-semibold tracking-wider border-b border-gray-700'>
          <span className='text-yellow-400'>Admin</span>
          <span className='ml-1 text-gray-200'>Panel</span>
        </div>

        {/* Menu */}
        <div className='px-5 py-6 overflow-y-auto h-[calc(100%-140px)] flex flex-col justify-between'>
          <ul className='space-y-2'>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className='flex items-center gap-3 p-3 transition-all duration-200 rounded-lg hover:bg-gray-700/50 hover:translate-x-1 group'
                  onClick={() => setIsOpen(false)}
                >
                  <span className='text-yellow-400 transition-transform duration-150 group-hover:scale-110'>
                    {item.icon}
                  </span>
                  <span className='font-medium tracking-wide text-gray-200 group-hover:text-white'>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 p-3 mt-6 text-left transition-all duration-200 rounded-lg hover:bg-red-500/10 hover:translate-x-1 group'
          >
            <span className='text-red-400 transition-transform duration-150 group-hover:scale-110'>
              <LogOut size={18} />
            </span>
            <span className='font-medium tracking-wide text-gray-200 group-hover:text-red-400'>
              Log Out
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className='absolute left-0 w-full pt-4 text-sm text-center text-gray-400 border-t border-gray-700 bottom-4'>
          © {new Date().getFullYear()} <span className='font-semibold text-yellow-400'>Nivya Admin</span>
        </div>
      </aside>
    </>
  );
}
