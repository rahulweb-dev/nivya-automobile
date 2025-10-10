'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { LogOut, User, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-gray-800/70 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/nivya_logo.png"
            width={140}
            height={60}
            className="rounded-full drop-shadow-md"
            alt="Logo"
          />
          <h1 className="hidden text-xl font-semibold tracking-wide text-white sm:block">
            <span className="text-yellow-400">Nivya</span> Admin
          </h1>
        </div>

        {/* Desktop User Section */}
        <div className="relative items-center hidden lg:flex" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-2 py-1 transition-all duration-300 border border-gray-700 rounded-full shadow-inner bg-gray-800/70 hover:bg-gray-700/70 hover:scale-105"
          >
            <Image
              className="w-10 h-10 border border-gray-600 rounded-full"
              src="/nivya_logo.png"
              alt="User Avatar"
              width={40}
              height={40}
            />
            <span className="pr-2 text-sm font-medium text-gray-200">Admin</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 z-50 w-56 mt-3 border border-gray-700 shadow-2xl rounded-xl bg-gradient-to-b from-gray-900 to-gray-800/95 backdrop-blur-lg animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-white">Nivya Admin</p>
                <p className="text-xs text-gray-400">admin@nivya.com</p>
              </div>
              <ul className="py-2 text-sm text-gray-300">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 transition hover:bg-gray-700/60 hover:text-yellow-400"
                  >
                    <User size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 transition hover:bg-gray-700/60 hover:text-yellow-400"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-left transition hover:bg-red-600/20 hover:text-red-400"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 transition-all rounded-full shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-500 lg:hidden hover:scale-105"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="px-4 py-3 border-t border-gray-800 shadow-lg bg-gradient-to-b from-gray-900 to-gray-800 lg:hidden animate-fadeIn">
          <ul className="space-y-2">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 font-medium text-gray-200 transition rounded-lg hover:bg-gray-700/60 hover:text-yellow-400"
              >
                <User size={16} /> Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 font-medium text-gray-200 transition rounded-lg hover:bg-gray-700/60 hover:text-yellow-400"
              >
                <Settings size={16} /> Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-2 px-4 py-2 font-medium text-gray-200 transition rounded-lg hover:bg-red-600/20 hover:text-red-400"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
