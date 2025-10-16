'use client';
import Head from 'next/head';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function LoginScreen() {
  return (
    <div className="flex min-h-screen">
      <Head>
        <title>Login</title>
      </Head>

      {/* Left Image Section */}
      <div className="hidden w-1/2 bg-center bg-cover md:flex" style={{ backgroundImage: "url('/side.avif')" }}>
        {/* Optional overlay */}
        <div className="flex items-center justify-center w-full h-full bg-black/30">
          <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-full bg-gray-200 md:w-1/2">
        <div className="flex flex-col w-full max-w-md p-12 bg-gray-200 rounded-3xl shadow-neu">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-700">Sign In</h2>

          {/* Username */}
          <label className="mb-1 text-gray-500">Username</label>
          <input
            type="text"
            placeholder="admin@CSSScript.com"
            className="w-full px-4 py-3 mb-4 transition bg-gray-200 rounded-full shadow-inner focus:outline-none focus:shadow-inner"
          />

          {/* Password */}
          <label className="mb-1 text-gray-500">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 mb-4 transition bg-gray-200 rounded-full shadow-inner focus:outline-none focus:shadow-inner"
          />

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-gray-400" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full py-3 mb-6 text-white transition bg-gray-400 rounded-full shadow-neu-btn hover:shadow-neu-btn-hover">
            Sign In
          </button>

          <p className="mb-4 text-center text-gray-500">or sign in with</p>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <SocialIcon Icon={FaFacebookF} />
            <SocialIcon Icon={FaGoogle} />
            <SocialIcon Icon={FaLinkedinIn} />
            <SocialIcon Icon={FaTwitter} />
          </div>
        </div>
      </div>

      {/* Tailwind Custom Shadows */}
      <style jsx>{`
        .shadow-neu {
          box-shadow: 8px 8px 15px #d1d9e6, -8px -8px 15px #ffffff;
        }
        .shadow-inner {
          box-shadow: inset 6px 6px 10px #d1d9e6, inset -6px -6px 10px #ffffff;
        }
        .shadow-neu-btn {
          box-shadow: 6px 6px 10px #b8c1cc, -6px -6px 10px #ffffff;
        }
        .shadow-neu-btn-hover {
          box-shadow: inset 6px 6px 10px #b8c1cc, inset -6px -6px 10px #ffffff;
        }
      `}</style>
    </div>
  );
}

// Social Icon Component
const SocialIcon = ({ Icon }) => (
  <button className="flex items-center justify-center w-10 h-10 text-gray-600 transition bg-gray-200 rounded-full shadow-neu hover:shadow-neu-btn-hover">
    <Icon className="w-4 h-4" />
  </button>
);
