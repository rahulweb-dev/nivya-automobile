'use client';
import React, { useEffect, useState } from 'react';
import { createMRTColumnHelper } from 'material-react-table';
import toast from 'react-hot-toast';
import EnqTable from '../dashboard/EnqTable';

const Arena = () => {
  const [arenaData, setArenaData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState('allData'); // default to allData
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // show loading

        let url = `/api/service?channel=Arena`;

        if (rangeValue === 'Between' && dateRange.startDate && dateRange.endDate) {
          url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
        } else if (rangeValue !== 'Between' && rangeValue !== 'allData') {
          url += `&rangeValue=${rangeValue}`;
        }

        const response = await fetch(url);

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

        if (result.success) {
          // Map createdAt to date for EnqTable filtering
          const mappedData = result.data.map((item) => ({
            ...item,
            date: item.createdAt,
          }));

          setArenaData(mappedData);

          if (mappedData.length === 0) toast.error('No data found');
          else toast.success('Service Data fetched successfully');
        } else {
          toast.error('Failed to fetch data');
          setArenaData([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Something went wrong while fetching data');
        setArenaData([]);
      } finally {
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
      accessorFn: (row, index) => index + 1,
      cell: (info) =>
        info.row.index +
        1 +
        info.table.getState().pagination.pageIndex *
          info.table.getState().pagination.pageSize,
    },
    columnHelper.accessor('name', { header: 'Name', size: 120 }),
    columnHelper.accessor('number', { header: 'Phone Number', size: 120 }),
    columnHelper.accessor('service', { header: 'Service', size: 120 }),
    columnHelper.accessor('message', { header: 'Message', size: 100 }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 120,
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toISOString().split('T')[0];
      },
    }),
  ];

  return (
    <div className='bg-white min-h-[calc(100vh-25px)] p-2 rounded-lg mr-2 mt-1'>
      <div className='px-4 min-h-40'>
        <h5 className='my-4 text-xl uppercase text-primaryBlue'>
          Service Enquiries
        </h5>
        <EnqTable
          data={arenaData}
          columns={columns}
          fileName='Service Enquiries'
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
