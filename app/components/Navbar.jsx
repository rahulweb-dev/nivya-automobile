'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaCaretRight } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from 'react-icons/md';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVehicle, setIsVehicle] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileVehicleOpen, setMobileVehicleOpen] = useState(false);

  const vehicleTimeout = useRef(null);
  const servicesTimeout = useRef(null);

  // Hover Handlers
  const handleVehicleMouseEnter = () => {
    clearTimeout(vehicleTimeout.current);
    setIsVehicle(true);
  };
  const handleVehicleMouseLeave = () => {
    vehicleTimeout.current = setTimeout(() => setIsVehicle(false), 200);
  };
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 200);
  };

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
    { name: 'Vehicles', hasMegaMenu: true },
    {
      name: 'TrueValue (Used-cars)',
      href: '/truevalue',
      hasDropdown: true,
    },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  // Function to close all menus
  const closeMenus = () => {
    setMenuOpen(false);
    setMobileVehicleOpen(false);
    setIsVehicle(false);
    setServicesOpen(false);
  };

  return (
    <header className='fixed top-0 z-50 w-full bg-[#0E1224]/90 backdrop-blur-xl border-b border-white/10 text-white font-nunito'>
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
          {navLinks.map((link, index) => (
            <li
              key={index}
              className='relative group'
              onMouseEnter={() =>
                link.hasMegaMenu
                  ? handleVehicleMouseEnter()
                  : link.name === 'Services' && handleServicesMouseEnter()
              }
              onMouseLeave={() =>
                link.hasMegaMenu
                  ? handleVehicleMouseLeave()
                  : link.name === 'Services' && handleServicesMouseLeave()
              }
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

              <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full'></span>

              {/* SERVICES DROPDOWN */}
              {link.name === 'Services' && servicesOpen && (
                <div className='absolute left-0 mt-3 bg-white/90 backdrop-blur-xl text-gray-900 rounded-xl shadow-2xl min-w-[220px] py-3 border border-gray-100 animate-fadeIn'>
                  <ul className='space-y-1'>
                    <li>
                      <Link
                        href='/finance'
                        className='block px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#0b1a3d] rounded-md transition-all'
                        onClick={closeMenus}
                      >
                        Finance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/book-a-service'
                        className='block px-5 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#0b1a3d] rounded-md transition-all'
                        onClick={closeMenus}
                      >
                        Book a service
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          className='text-3xl text-white lg:hidden focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* DESKTOP VEHICLES MEGA MENU */}
      {isVehicle && (
        <div
          className='absolute left-0 w-full text-black bg-white border-t border-gray-100 shadow-2xl animate-slideDown'
          onMouseEnter={handleVehicleMouseEnter}
          onMouseLeave={handleVehicleMouseLeave}
        >
          <div className='container grid gap-6 p-8 mx-auto xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 max-w-7xl'>
            {/* Tabs */}
            <div className='flex flex-col gap-4'>
              {['Arena'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTab(index)}
                  className={`w-full text-left px-5 py-3 rounded-full font-semibold transition-all flex items-center justify-between ${
                    selectedTab === index
                      ? 'bg-[#0E1224] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {tab} <FaCaretRight />
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className='grid col-span-4 gap-6 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
              {selectedTab === 0 ? (
                models.map((model, index) => (
                  <Link
                    key={index}
                    href={model.link}
                    className='group'
                    onClick={closeMenus}
                  >
                    <div className='flex flex-col items-center p-4 transition-all duration-300 bg-gray-50 hover:bg-[#666B70] rounded-xl hover:text-white shadow hover:shadow-xl'>
                      <Image
                        src={model.thumbnail}
                        alt={model.subName}
                        width={160}
                        height={100}
                        className='object-contain mb-3 transition-transform duration-500 group-hover:scale-110'
                      />
                      <h5 className='text-sm font-semibold text-center uppercase'>
                        {model.subName}
                      </h5>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <Link href='/true-value/buy-car' onClick={closeMenus}>
                    <div className='flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-[#0E1224] hover:text-white rounded-xl shadow hover:shadow-xl transition-all duration-300'>
                      <Image
                        src='/logo.png'
                        alt='Buy a Car'
                        width={80}
                        height={80}
                        className='object-contain mb-3 transition-transform group-hover:scale-110'
                      />
                      <h5 className='text-base font-semibold uppercase'>
                        Buy a Car
                      </h5>
                      <p className='mt-2 text-sm text-center opacity-80'>
                        Explore certified pre-owned cars with trust and
                        transparency.
                      </p>
                    </div>
                  </Link>
                  <Link href='/true-value/sell-car' onClick={closeMenus}>
                    <div className='flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-[#0E1224] hover:text-white rounded-xl shadow hover:shadow-xl transition-all duration-300'>
                      <Image
                        src='/logo.png'
                        alt='Sell a Car'
                        width={80}
                        height={80}
                        className='object-contain mb-3 transition-transform group-hover:scale-110'
                      />
                      <h5 className='text-base font-semibold uppercase'>
                        Sell a Car
                      </h5>
                      <p className='mt-2 text-sm text-center opacity-80'>
                        Get the best value for your car with easy evaluation &
                        process.
                      </p>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className='lg:hidden bg-[#0b1a3d]/95 backdrop-blur-md border-t border-gray-700 shadow-xl animate-slideDown'>
          <ul className='flex flex-col p-6 space-y-4 text-white'>
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.hasMegaMenu ? (
                  <>
                    <button
                      onClick={() => setMobileVehicleOpen(!mobileVehicleOpen)}
                      className='flex items-center justify-between w-full text-lg font-medium transition-all hover:text-blue-300'
                    >
                      {link.name}
                      <span>{mobileVehicleOpen ? '▴' : '▾'}</span>
                    </button>

                    {mobileVehicleOpen && (
                      <div className='mt-3 space-y-5'>
                        {/* Arena Models */}
                        <h4 className='mb-2 text-sm font-semibold text-blue-300 uppercase'>
                          Arena Models
                        </h4>
                        <div className='flex gap-4 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
                          {models.map((m, i) => (
                            <Link
                              key={i}
                              href={m.link}
                              onClick={closeMenus}
                              className='snap-center'
                            >
                              <div className='p-3 min-w-[150px] text-center transition rounded-lg bg-white/10 hover:bg-white/20 flex-shrink-0'>
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
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href || '#'}
                    onClick={closeMenus}
                    className='block text-lg font-medium transition-all hover:text-blue-300'
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
