'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartBar,
  FaUsers,
  FaCar,
  FaTools,
  FaClock,
  FaCalendarDay,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Mock fallback if API not ready
  const monthlyData = stats?.monthlyData || [
    { month: 'Jan', leads: 120 },
    { month: 'Feb', leads: 150 },
    { month: 'Mar', leads: 200 },
    { month: 'Apr', leads: 180 },
    { month: 'May', leads: 250 },
    { month: 'Jun', leads: 230 },
  ];

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen text-lg font-medium text-gray-500'>
        Loading Dashboard...
      </div>
    );

  return (
    <div className='min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50'>
      <h1 className='mb-6 text-2xl font-bold text-gray-800'>
        Dashboard Overview
      </h1>

      {/* ======= Main Stats ======= */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          icon={<FaUsers />}
          title='Total Leads'
          value={stats?.total || 0}
          color='bg-blue-600'
        />
        <StatCard
          icon={<FaCalendarDay />}
          title="Today's Leads"
          value={stats?.today || 0}
          color='bg-green-500'
        />
        <StatCard
          icon={<FaClock />}
          title="Yesterday's Leads"
          value={stats?.yesterday || 0}
          color='bg-purple-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Growth Rate'
          value={`${stats?.growthRate || 0}%`}
          color='bg-pink-500'
        />
      </div>

      {/* ======= Category Breakdown ======= */}
      <h2 className='mt-10 mb-4 text-lg font-semibold text-gray-700'>
        Leads by Category
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <StatCard
          icon={<FaCar />}
          title='Vehicle Leads'
          value={stats?.vehicle || 0}
          color='bg-indigo-500'
        />
        <StatCard
          icon={<FaTools />}
          title='Service Leads'
          value={stats?.service || 0}
          color='bg-teal-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Finance Leads'
          value={stats?.finance || 0}
          color='bg-orange-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Accessories Leads'
          value={stats?.accessories || 0}
          color='bg-cyan-600'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Insurance Leads'
          value={stats?.insurance || 0}
          color='bg-rose-600'
        />
        <StatCard
          icon={<FaChartBar />}
          title='True Value Leads'
          value={stats?.truevalue || 0}
          color='bg-violet-600'
        />
      </div>

      {/* ======= Monthly Chart ======= */}
      <div className='p-6 mt-10 bg-white shadow-lg rounded-2xl'>
        <h2 className='mb-4 text-lg font-semibold text-gray-700'>
          Monthly Lead Growth
        </h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <Tooltip />
            <Bar dataKey='leads' fill='#3b82f6' radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ======= Reusable Card Component =======
function StatCard({ icon, title, value, color }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='flex items-center p-5 transition-all bg-white shadow-md rounded-2xl hover:shadow-lg'
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl text-white ${color}`}
      >
        {icon}
      </div>
      <div className='ml-4'>
        <p className='text-sm text-gray-500'>{title}</p>
        <h3 className='text-xl font-semibold'>{value}</h3>
      </div>
    </motion.div>
  );
}
