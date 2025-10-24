'use client';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';
import ContactForm from './forms/ContactForm';
import ResponsiveBanner from './ResponsiveBanner';

export default function Contact() {
  return (
    <>
      <div className=''>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>
      <div className='bg-[#0E1224] text-white '>
        {/* Header */}
        {/* <div className="text-center py-16 bg-[url('/bg-pattern.svg')] bg-cover bg-center">
          <h2 className='font-semibold tracking-wide text-[#e1951a] uppercase'>
            Contact Us
          </h2>
          <h1 className='mt-4 text-4xl font-bold md:text-5xl'>Get In Touch</h1>
        </div> */}

        {/* Contact Info Section */}
        <section className='bg-[#E9F0FF] py-16'>
          <div className='grid grid-cols-1 gap-6 px-6 mx-auto text-center max-w-7xl sm:grid-cols-2 lg:grid-cols-4'>
            <div className='py-8 bg-white shadow-md rounded-2xl'>
              <FaMapMarkerAlt className='mx-auto mb-3 text-3xl text-[#b97200]' />
              <h3 className='font-semibold text-gray-800'>Location</h3>
              <p className='mt-2 text-gray-500'>
                Sunshine Business Park
                <br />
                Sector 01, Poland
              </p>
            </div>
            <div className='py-8 bg-white shadow-md rounded-2xl'>
              <FaPhoneAlt className='mx-auto mb-3 text-3xl text-[#b97200]' />
              <h3 className='font-semibold text-gray-800'>Contact</h3>
              <p className='mt-2 text-gray-500'>
                +4890 356 555
                <br />
                +4890 356 666
              </p>
            </div>
            <div className='py-8 bg-white shadow-md rounded-2xl'>
              <FaEnvelope className='mx-auto mb-3 text-3xl text-[#b97200]' />
              <h3 className='font-semibold text-gray-800'>Email</h3>
              <p className='mt-2 text-gray-500'>
                Techbiz@example.com
                <br />
                gmail@example.com
              </p>
            </div>
            <div className='py-8 bg-white shadow-md rounded-2xl'>
              <FaClock className='mx-auto mb-3 text-3xl text-[#b97200]' />
              <h3 className='font-semibold text-gray-800'>Visit Between</h3>
              <p className='mt-2 text-gray-500'>
                Mon–Sat: 9:00–5:00
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className='bg-[#E9F0FF] py-20'>
          <div className='grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl lg:grid-cols-2'>
            <ContactForm />

            <div className='overflow-hidden shadow-md rounded-2xl'>
              <iframe
                title='Google Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.847345213495!2d-74.00601548459348!3d40.71277597933033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjIuMCJX!5e0!3m2!1sen!2sus!4v1625154561780!5m2!1sen!2sus'
                width='100%'
                height='450'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
