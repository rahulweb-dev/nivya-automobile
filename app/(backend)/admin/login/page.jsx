'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaLock,
  FaUserAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TravelLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/admin/login',
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success('✅ Login successful!');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#b4620f] via-[#002b63] to-[#bf6804]">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-700/30 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 blur-[140px] rounded-full" />
      </div>

      {/* Left Section */}
      <div className="relative items-center justify-center hidden w-1/2 md:flex">
        <Image
          src="/side.avif"
          alt="Travel background"
          width={800}
          height={800}
          className="object-cover w-full h-full opacity-80 rounded-r-[6rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 rounded-r-[6rem]" />
   
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2 md:p-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-10 text-white border shadow-2xl bg-white/10 border-white/20 rounded-3xl backdrop-blur-2xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-300 to-white bg-clip-text drop-shadow-lg">
             Nivya Admin Portal
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <FaUserAlt className="absolute left-4 top-3.5 text-blue-300" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 pl-12 pr-4 text-white placeholder-blue-200 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-blue-300" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 pl-12 pr-4 text-white placeholder-blue-200 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 flex items-center justify-center gap-3 rounded-full text-lg font-semibold shadow-lg shadow-blue-900/40 transition-all duration-300 ${
                loading
                  ? 'opacity-70 cursor-not-allowed bg-blue-600/40'
                  : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
              }`}
            >
              <FaSignInAlt className="text-white" />
              {loading ? 'Logging in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 text-xs text-center text-blue-200">
            © {new Date().getFullYear()} Saboo Travel Admin Portal
          </div>
        </motion.div>
      </div>
    </div>
  );
}
