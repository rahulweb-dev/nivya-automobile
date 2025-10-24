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
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    '#6366F1',
    '#14B8A6',
    '#F97316',
    '#06B6D4',
    '#F43F5E',
    '#A855F7',
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads'); // API must return an array of leads or aggregated counts
        const data = await res.json();

        // If API returns aggregated counts
        const total = data.total || (data.leads ? data.leads.length : 0);
        const today = data.today || 0;
        const yesterday = data.yesterday || 0;
        const growthRate = data.growthRate ?? 0;

        // Pie chart data
        const pieData = [
          { name: 'Vehicle', value: data.vehicle || 0 },
          { name: 'Service', value: data.service || 0 },
          { name: 'Finance', value: data.finance || 0 },
          { name: 'Accessories', value: data.accessories || 0 },
          { name: 'Insurance', value: data.insurance || 0 },
          { name: 'True Value', value: data.truevalue || 0 },
        ];

        // Monthly chart data (last 6 months)
        const todayDate = new Date();
        const monthNames = [];
        const monthlyCounts = {};
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(todayDate.getMonth() - i);
          const month = d.toLocaleString('default', { month: 'short' });
          const year = d.getFullYear();
          const key = `${month} ${year}`;
          monthNames.push(key);
          monthlyCounts[key] = 0;
        }

        // If API returns leads array with createdAt
        if (data.leads && data.leads.length > 0) {
          data.leads.forEach((lead) => {
            const d = new Date(lead.createdAt);
            const key = `${d.toLocaleString('default', {
              month: 'short',
            })} ${d.getFullYear()}`;
            if (monthlyCounts[key] !== undefined) monthlyCounts[key] += 1;
          });
        }

        const monthlyData = monthNames.map((month) => ({
          month,
          leads: monthlyCounts[month] || 0,
        }));

        setStats({
          total,
          today,
          yesterday,
          growthRate,
          vehicle: data.vehicle || 0,
          service: data.service || 0,
          finance: data.finance || 0,
          accessories: data.accessories || 0,
          insurance: data.insurance || 0,
          truevalue: data.truevalue || 0,
          monthlyData,
          pieData,
        });
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

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

      {/* Main Stats */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          icon={<FaUsers />}
          title='Total Leads'
          value={stats.total}
          color='bg-blue-600'
        />
        <StatCard
          icon={<FaCalendarDay />}
          title="Today's Leads"
          value={stats.today}
          color='bg-green-500'
        />
        <StatCard
          icon={<FaClock />}
          title="Yesterday's Leads"
          value={stats.yesterday}
          color='bg-purple-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Growth Rate'
          value={`${stats.growthRate}%`}
          color={stats.growthRate >= 0 ? 'bg-green-500' : 'bg-red-500'}
        />
      </div>

      {/* Category Breakdown */}
      <h2 className='mt-10 mb-4 text-lg font-semibold text-gray-700'>
        Leads by Category
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <StatCard
          icon={<FaCar />}
          title='Vehicle Leads'
          value={stats.vehicle}
          color='bg-indigo-500'
        />
        <StatCard
          icon={<FaTools />}
          title='Service Leads'
          value={stats.service}
          color='bg-teal-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Finance Leads'
          value={stats.finance}
          color='bg-orange-500'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Accessories Leads'
          value={stats.accessories}
          color='bg-cyan-600'
        />
        <StatCard
          icon={<FaChartBar />}
          title='Insurance Leads'
          value={stats.insurance}
          color='bg-rose-600'
        />
        <StatCard
          icon={<FaChartBar />}
          title='True Value Leads'
          value={stats.truevalue}
          color='bg-violet-600'
        />
      </div>

      {/* Monthly Chart */}
      <div className='grid grid-cols-2 space-x-3'>
        <div className='p-6 mt-10 bg-white shadow-lg rounded-2xl'>
          <h2 className='mb-4 text-lg font-semibold text-gray-700'>
            Monthly Lead Growth
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <Tooltip />
              <Bar dataKey='leads' fill='#3b82f6' radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='p-6 mt-10 bg-white shadow-lg rounded-2xl'>
          <h2 className='mb-4 text-lg font-semibold text-gray-700'>
            Leads Distribution
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={stats.pieData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
                fill='#8884d8'
                label
              >
                {stats.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign='bottom' height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
    </div>
  );
}

// Reusable Stat Card
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
