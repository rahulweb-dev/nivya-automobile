'use client';
import React, { useEffect, useState } from 'react';
import { createMRTColumnHelper } from 'material-react-table';
import toast from 'react-hot-toast';
import EnqTable from '../dashboard/EnqTable';

const Accessories = () => {
  const [arenaData, setArenaData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/accessories`);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        if (result.success) {
          setArenaData(result.data);
          setLoading(false);
          if (result.data.length === 0) toast.error('No data found');
          else toast.success('Accessories Data fetched successfully');
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
  }, [refreshing]);

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
    columnHelper.accessor('customerName', { header: 'Name', size: 120 }),
    columnHelper.accessor('customerPhone', { header: 'Phone Number', size: 120 }),
    columnHelper.accessor('itemCode', { header: 'ItemCode ', size: 120 }),
    columnHelper.accessor('itemName', { header: 'ItemName', size: 300 }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 120,
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
      },
    }),
  ];

  return (
    <div className='bg-white min-h-[calc(100vh-25px)] p-2 rounded-lg mr-2 mt-1'>
      <div className='px-4 min-h-40'>
        <h5 className='my-4 text-xl uppercase text-primaryBlue'>
          Accessories Enquiries
        </h5>
        <EnqTable
          data={arenaData}
          columns={columns}
          fileName='Accessories Enquiries'
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          loading={loading}
          setDateRange={() => {}} // pass empty function
        />
      </div>
    </div>
  );
};

export default Accessories;
