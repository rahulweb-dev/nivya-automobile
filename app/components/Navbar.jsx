'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaCaretRight } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from 'react-icons/md';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // vehicles, services, truevalue, more
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState({
    vehicles: false,
    services: false,
    truevalue: false,
    more: false,
  });

  const hoverTimeout = useRef({});

  // --- Hover Dropdown Handlers ---
  const handleMouseEnter = (menu) => {
    clearTimeout(hoverTimeout.current[menu]);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = (menu) => {
    hoverTimeout.current[menu] = setTimeout(() => {
      if (openDropdown === menu) setOpenDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileDropdown({
      vehicles: false,
      services: false,
      truevalue: false,
      more: false,
    });
  };

  // --- Data ---

  const models = [
    {
      subName: 'VICTORIS',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/victoris.png',
      link: '/vehicles/victoris',
    },
    {
      subName: 'ALTO K10',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/altoK10.webp',
      link: '/vehicles/alto-k10',
    },
    {
      subName: 'SWIFT',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/swift02.webp',
      link: '/vehicles/swift',
    },
    {
      subName: 'BREZZA',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/brezza-page.webp',
      link: '/vehicles/brezza',
    },
    {
      subName: 'DZIRE',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/bluishblack.png',
      link: '/vehicles/dzire',
    },
    {
      subName: 'S-PRESSO',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/spresso.webp',
      link: '/vehicles/spresso',
    },
    {
      subName: 'WAGONR',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/wagnor.webp',
      link: '/vehicles/wagonr',
    },
    {
      subName: 'ERTIGA',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/ertiga.webp',
      link: '/vehicles/ertiga',
    },
    {
      subName: 'CELERIO',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/celerio.webp',
      link: '/vehicles/celerio',
    },
    {
      subName: 'EECO',
      thumbnail: 'https://www.skyautomobiles.in/thumbnail/Eeco.webp',
      link: '/vehicles/eeco',
    },
  ];

  const navLinks = [
    { name: 'Vehicles', key: 'vehicles', hasMegaMenu: true },
    { name: 'TrueValue (Used-cars)', key: 'truevalue', hasDropdown: true },
    { name: 'Services', key: 'services', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'More', key: 'more', hasDropdown: true },
  ];

  return (
    <header className='fixed top-0 z-50 w-full text-black bg-white border-b backdrop-blur-xl border-white/10 font-nunito'>
      <nav className='flex items-center justify-between h-20 px-6 mx-auto max-w-7xl'>
        {/* LOGO */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/nivya_logo.png'
            alt='nivya Logo'
            width={140}
            height={70}
            className='transition-transform duration-500 ease-in-out hover:scale-105'
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className='items-center hidden space-x-10 lg:flex'>
          {navLinks.map((link) => (
            <li
              key={link.name}
              className='relative group'
              onMouseEnter={() => link.key && handleMouseEnter(link.key)}
              onMouseLeave={() => link.key && handleMouseLeave(link.key)}
            >
              <Link
                href={link.href || '#'}
                className='flex items-center gap-1 text-[15px] uppercase font-semibold tracking-wide transition-all duration-300 hover:text-blue-300'
              >
                {link.name}
                {(link.hasDropdown || link.hasMegaMenu) && (
                  <MdOutlineArrowDropDown className='ml-1 text-lg' />
                )}
              </Link>
              <span className='absolute bottom-0 left-0 w-0 transition-all duration-300 bg-blue-400 h-0.5 group-hover:w-full'></span>

              {/* --- DROPDOWNS --- */}
              {link.key === 'services' && openDropdown === 'services' && (
                <DropdownMenu>
                  <DropdownItem href='/book-a-service' onClick={closeAllMenus}>
                    Book a Service
                  </DropdownItem>
                </DropdownMenu>
              )}

              {link.key === 'truevalue' && openDropdown === 'truevalue' && (
                <DropdownMenu>
                  <DropdownItem
                    href='/truevalue/buy-a-car'
                    onClick={closeAllMenus}
                  >
                    Buy a Car
                  </DropdownItem>
                  <DropdownItem
                    href='/truevalue/sell-a-car'
                    onClick={closeAllMenus}
                  >
                    Sell a Car
                  </DropdownItem>
                </DropdownMenu>
              )}

              {link.key === 'more' && openDropdown === 'more' && (
                <DropdownMenu>
                  <DropdownItem href='/finance' onClick={closeAllMenus}>
                    Finance
                  </DropdownItem>
                  <DropdownItem href='/insurance' onClick={closeAllMenus}>
                    Insurance
                  </DropdownItem>
                  <DropdownItem href='/accessories' onClick={closeAllMenus}>
                    Accessories
                  </DropdownItem>
                  <DropdownItem href='/career' onClick={closeAllMenus}>
                    Career
                  </DropdownItem>
                  <DropdownItem href='/compare-cars' onClick={closeAllMenus}>
                    Compare-cars
                  </DropdownItem>
                </DropdownMenu>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          className='text-3xl text-black lg:hidden focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* --- DESKTOP VEHICLES MEGA MENU --- */}
      {openDropdown === 'vehicles' && (
        <div
          className='absolute left-0 w-full text-black bg-white border-t border-gray-100 shadow-2xl animate-slideDown'
          onMouseEnter={() => handleMouseEnter('vehicles')}
          onMouseLeave={() => handleMouseLeave('vehicles')}
        >
          <div className='grid gap-6 p-8 mx-auto max-w-7xl xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <button
                onClick={() => setSelectedTab(0)}
                className={`w-full text-left px-5 py-3 rounded-full font-semibold transition-all flex items-center justify-between ${
                  selectedTab === 0
                    ? 'bg-[#0E1224] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Arena <FaCaretRight />
              </button>
            </div>

            <div className='grid col-span-4 gap-6 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
              {models.map((m) => (
                <Link
                  key={m.subName}
                  href={m.link}
                  onClick={closeAllMenus}
                  className='group'
                >
                  <div className='flex flex-col items-center p-4 bg-gray-50 hover:bg-[#666B70] hover:text-white rounded-xl transition-all duration-300 shadow hover:shadow-xl'>
                    <Image
                      src={m.thumbnail}
                      alt={m.subName}
                      width={160}
                      height={100}
                      className='object-contain mb-3 transition-transform duration-500 group-hover:scale-110'
                    />
                    <h5 className='text-sm font-semibold text-center uppercase'>
                      {m.subName}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU --- */}
      {menuOpen && (
        <div className='bg-white border-t border-gray-700 shadow-xl lg:hidden backdrop-blur-md animate-slideDown'>
          <ul className='flex flex-col p-6 space-y-4 text-black'>
            {navLinks.map((link) => (
              <li key={link.name}>
                {/* VEHICLES */}
                {link.key === 'vehicles' ? (
                  <MobileDropdown
                    title='Vehicles'
                    open={mobileDropdown.vehicles}
                    toggle={() => toggleMobileDropdown('vehicles')}
                  >
                    <h4 className='mb-2 text-sm font-semibold text-blue-300 uppercase'>
                      Arena Models
                    </h4>
                    <div className='flex gap-4 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
                      {models.map((m) => (
                        <Link
                          key={m.subName}
                          href={m.link}
                          onClick={closeAllMenus}
                          className='snap-center'
                        >
                          <div className='p-3 min-w-[150px] text-center rounded-lg bg-white/10 hover:bg-white/20 flex-shrink-0'>
                            <Image
                              src={m.thumbnail}
                              alt={m.subName}
                              width={100}
                              height={60}
                              className='object-contain mx-auto mb-2'
                            />
                            <p className='text-xs uppercase'>{m.subName}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </MobileDropdown>
                ) : link.key === 'services' ? (
                  <MobileDropdown
                    title='Services'
                    open={mobileDropdown.services}
                    toggle={() => toggleMobileDropdown('services')}
                  >
                    <DropdownItemMobile href='/finance'>
                      Finance
                    </DropdownItemMobile>
                    <DropdownItemMobile href='/book-a-service'>
                      Book a Service
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : link.key === 'truevalue' ? (
                  <MobileDropdown
                    title='TrueValue (Used-cars)'
                    open={mobileDropdown.truevalue}
                    toggle={() => toggleMobileDropdown('truevalue')}
                  >
                    <DropdownItemMobile href='/truevalue/buy-a-car'>
                      Buy a Car
                    </DropdownItemMobile>
                    <DropdownItemMobile href='/truevalue/sell-a-car'>
                      Sell a Car
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : link.key === 'more' ? (
                  <MobileDropdown
                    title='More'
                    open={mobileDropdown.more}
                    toggle={() => toggleMobileDropdown('more')}
                  >
                    <DropdownItemMobile href='/insurance'>
                      Insurance
                    </DropdownItemMobile>
                    <DropdownItemMobile href='/accessories'>
                      Accessories
                    </DropdownItemMobile>
                    <DropdownItemMobile href='/career'>
                      Career
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : (
                  <Link
                    href={link.href || '#'}
                    onClick={closeAllMenus}
                    className='block text-lg font-medium hover:text-blue-300'
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* --- SMALL REUSABLE COMPONENTS --- */
function DropdownMenu({ children }) {
  return (
    <div className='absolute left-0 mt-3 bg-white/90 backdrop-blur-xl text-black rounded-xl shadow-2xl min-w-[220px] py-3 border border-gray-100 animate-fadeIn'>
      <ul className='space-y-1'>{children}</ul>
    </div>
  );
}

function DropdownItem({ href, children, onClick }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className='block px-5 py-2 text-sm font-medium hover:bg-gray-500 hover:text-[#dee2ec]  transition-all'
      >
        {children}
      </Link>
    </li>
  );
}

function MobileDropdown({ title, open, toggle, children }) {
  return (
    <>
      <button
        onClick={toggle}
        className='flex items-center justify-between w-full text-lg font-medium transition-all hover:text-blue-300 '
      >
        {title}
        <span>{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className='pl-4 mt-3 ml-4 space-y-2 text-black border-l border-white/10'>
          {children}
        </div>
      )}
    </>
  );
}

function DropdownItemMobile({ href, children }) {
  return (
    <Link
      href={href}
      className='block text-base text-gray-200 transition-all hover:text-white'
    >
      {children}
    </Link>
  );
}
