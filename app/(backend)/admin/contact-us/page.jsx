'use client';
import React, { useEffect, useState } from 'react';
import { createMRTColumnHelper } from 'material-react-table';
import toast from 'react-hot-toast';
import EnqTable from '../dashboard/EnqTable';

const Arena = () => {
  const [arenaData, setArenaData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (rangeValue === '') {
          response = await fetch(
            `/api/contact?rangeValue=allData&channel=Arena`
          );
        } else if (
          rangeValue === 'Between' &&
          dateRange.startDate &&
          dateRange.endDate
        ) {
          response = await fetch(
            `/api/contact?rangeValue=${rangeValue}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&channel=Arena`
          );
        } else if (rangeValue !== 'Between') {
          response = await fetch(
            `/api/contact?rangeValue=${rangeValue}&channel=Arena`
          );
        }

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        if (result.success) {
          setArenaData(result.data);
          setLoading(false);
          if (result.data.length === 0) toast.error('No data found');
          else toast.success('contact-us Data fetched successfully');
        } else {
          toast.error('Failed to fetch data');
          setArenaData([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Something went wrong while fetching data');
        setArenaData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing, rangeValue, dateRange.startDate, dateRange.endDate]);

  const columnHelper = createMRTColumnHelper();

  const columns = [
    {
      header: 'S.No',
      size: 80,
      accessorFn: (row, index) => index + 1, // generate S.No dynamically
      cell: (info) =>
        info.row.index +
        1 +
        info.table.getState().pagination.pageIndex *
          info.table.getState().pagination.pageSize,
    },
    columnHelper.accessor('name', { header: 'Name', size: 120 }),
    columnHelper.accessor('number', { header: 'Phone Number', size: 120 }),
    columnHelper.accessor('email', { header: 'Email', size: 120 }),
    columnHelper.accessor('message', { header: 'Message', size: 120 }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 120,
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      },
    }),
  ];

  return (
    <div className='bg-white min-h-[calc(100vh-25px)] p-2 rounded-lg mr-2 mt-1'>
      <div className='px-4 min-h-40'>
        <h5 className='my-4 text-xl uppercase text-primaryBlue'>
          Contact Enquiries
        </h5>
        <EnqTable
          data={arenaData}
          columns={columns}
          fileName='Arena Enquiries'
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          dateRange={dateRange}
          setDateRange={setDateRange}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Arena;
