'use client';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-50">
      {/* Header spacer if navbar exists */}
      <div className="w-full h-12" />

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex items-center justify-center w-24 h-24 mb-6 bg-green-100 rounded-full"
      >
        <CheckCircle className="text-green-600 w-14 h-14" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-serif text-4xl font-bold text-gray-800"
      >
        Thank You!
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-2xl mt-4 text-lg leading-relaxed text-center text-gray-700"
      >
        Your enquiry has been received successfully. Our executive will get in
        touch with you shortly.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block px-8 py-3 mt-8 text-base font-medium text-white transition-colors duration-300 bg-blue-700 hover:bg-blue-800"
        >
          ← Back to Home
        </Link>
      </motion.div>

      {/* Footer */}
      <p className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Nivya Automobiles. All Rights Reserved.
      </p>
    </div>
  );
}
