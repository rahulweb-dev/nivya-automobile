'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[#f2e9e0] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Contact us</h2>
          <p className="text-gray-600 mb-10">
            We’d love to hear from you. Please fill out this form, and we’ll reply soon.
          </p>

          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>Contact by email, and we will respond shortly.</p>
              <a href="mailto:hey@bizus.com" className="text-black font-medium">
                hey@bizus.com
              </a>
            </div>

            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>Call on weekdays from 9 AM to 5 PM.</p>
              <p className="font-medium">+1 (222) 333 444</p>
            </div>

            <div>
              <h4 className="font-semibold">Mobile</h4>
              <p>Call on weekends from 9 AM to 5 PM.</p>
              <p className="font-medium">+1 (222) 333 444</p>
            </div>

            <div>
              <h4 className="font-semibold">Office</h4>
              <p>
                Visit one of our headquarters.
                <br />
                8749 Green Station, Euless,
                <br />
                ON 29PM, Canada
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#f8f4ef] p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Write us a message</h3>
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 bg-white placeholder-gray-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 bg-white placeholder-gray-500"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300 bg-white placeholder-gray-500"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Leave us a message..."
              value={formData.message}
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300 bg-white placeholder-gray-500"
            />

            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 accent-black" /> I agree to the Privacy Policy.
            </label>

            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
