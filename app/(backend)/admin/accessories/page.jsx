'use client';
import React, { useEffect, useState } from 'react';
import { createMRTColumnHelper } from 'material-react-table';
import toast from 'react-hot-toast';
import EnqTable from '../dashboard/EnqTable';

const Accessories = () => {
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState('allData'); // default allData
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' }); // unused, but required by EnqTable

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/accessories`);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

        if (result.success) {
          const mappedData = result.data.map((item) => ({
            ...item,
            date: item.createdAt,
          }));

          setAccessoriesData(mappedData);

          if (mappedData.length === 0) toast.error('No data found');
          else toast.success('Accessories Data fetched successfully');
        } else {
          toast.error('Failed to fetch data');
          setAccessoriesData([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Something went wrong while fetching data');
        setAccessoriesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing]);

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
    columnHelper.accessor('customerName', { header: 'Name', size: 120 }),
    columnHelper.accessor('customerPhone', { header: 'Phone Number', size: 120 }),
    columnHelper.accessor('itemCode', { header: 'Item Code', size: 120 }),
    columnHelper.accessor('itemName', { header: 'Item Name', size: 300 }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 120,
      cell: (info) => new Date(info.getValue()).toISOString().split('T')[0],
    }),
  ];

  return (
    <div className='bg-white min-h-[calc(100vh-25px)] p-2 rounded-lg mr-2 mt-1'>
      <div className='px-4 min-h-40'>
        <h5 className='my-4 text-xl uppercase text-primaryBlue'>
          Accessories Enquiries
        </h5>
        <EnqTable
          data={accessoriesData}
          columns={columns}
          fileName='Accessories Enquiries'
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          loading={loading}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
    </div>
  );
};

export default Accessories;
