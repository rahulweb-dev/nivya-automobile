'use client';
import React, { useEffect, useState } from 'react';
import { createMRTColumnHelper } from 'material-react-table';
import toast from 'react-hot-toast';
import EnqTable from '../dashboard/EnqTable';

const Finance = () => {
  const [financeData, setFinanceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState('allData'); // default allData
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = `/api/finance?channel=Arena`;

        if (rangeValue === 'Between' && dateRange.startDate && dateRange.endDate) {
          url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
        } else if (rangeValue !== 'Between' && rangeValue !== 'allData') {
          url += `&rangeValue=${rangeValue}`;
        }

        const response = await fetch(url);

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

        if (result.success) {
          // map createdAt to date for EnqTable
          const mappedData = result.data.map((item) => ({
            ...item,
            date: item.createdAt,
          }));

          setFinanceData(mappedData);

          if (mappedData.length === 0) toast.error('No data found');
          else toast.success('Finance Data fetched successfully');
        } else {
          toast.error('Failed to fetch data');
          setFinanceData([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Something went wrong while fetching data');
        setFinanceData([]);
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
    columnHelper.accessor('mobile', { header: 'Phone Number', size: 120 }),
    columnHelper.accessor('email', { header: 'Email', size: 120 }),
    columnHelper.accessor('city', { header: 'City', size: 120 }),
    columnHelper.accessor('model', { header: 'Model', size: 120 }),
    columnHelper.accessor('purchaseTime', { header: 'Purchase Time', size: 120 }),
    columnHelper.accessor('loanAmount', { header: 'Loan Amount', size: 120 }),
    columnHelper.accessor('duration', { header: 'Duration', size: 120 }),
    columnHelper.accessor('comments', { header: 'Message', size: 100 }),
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
          Finance Enquiries
        </h5>
        <EnqTable
          data={financeData}
          columns={columns}
          fileName='Finance Enquiries'
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

export default Finance;
