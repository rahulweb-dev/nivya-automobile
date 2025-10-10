'use client';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Search, RefreshCcw, FileSpreadsheet, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminTable({ fetchUrl, columns, rowsPerPage = 10 }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(fetchUrl);
      const json = await res.json();
      const arr = Array.isArray(json) ? json : json.data || [];
      setData(arr);
      setFilteredData(arr);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  // Filtering Logic
  useEffect(() => {
    let result = [...data];
    if (startDate) result = result.filter((row) => new Date(row.createdAt) >= new Date(startDate));
    if (endDate) result = result.filter((row) => new Date(row.createdAt) <= new Date(endDate));
    if (search.trim()) {
      result = result.filter((row) =>
        Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(result);
    setCurrentPage(1);
  }, [search, startDate, endDate, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Export
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'admin_data.xlsx');
  };

  return (
    <div className="p-6 transition-all bg-white border border-gray-200 shadow-2xl rounded-2xl dark:bg-gray-900 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Data Table
        </h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 pl-10 pr-4 text-gray-800 border border-gray-300 outline-none rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Date Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="py-2 pl-10 pr-4 text-gray-800 border border-gray-300 outline-none rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-400">to</span>
            <div className="relative">
              <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="py-2 pl-10 pr-4 text-gray-800 border border-gray-300 outline-none rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            {/* ✅ Corrected Refresh */}
            <button
              onClick={() => {
                setSearch('');
                setStartDate('');
                setEndDate('');
                fetchData(); // Re-fetch fresh data
              }}
              disabled={loading}
              className={`flex items-center gap-1 px-4 py-2 font-semibold text-white rounded-xl transition ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>

            <button
              onClick={exportToExcel}
              className="flex items-center gap-1 px-4 py-2 font-semibold text-white transition bg-green-500 rounded-xl hover:bg-green-600"
            >
              <FileSpreadsheet size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl dark:border-gray-700">
        <table className="w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="text-sm font-semibold text-gray-700 uppercase bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="px-4 py-3 border-b dark:border-gray-700">#</th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left border-b dark:border-gray-700">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className={`hover:bg-pink-50 dark:hover:bg-gray-800 ${
                    idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/60' : 'bg-white dark:bg-gray-800/80'
                  }`}
                >
                  <td className="px-4 py-3 text-center border-b dark:border-gray-700">
                    {startIndex + idx + 1}
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 border-b dark:border-gray-700">
                      {row[col.key] || '--'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No records found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:flex-row sm:justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-xl hover:bg-gray-300 dark:bg-gray-800 dark:text-white disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-xl hover:bg-gray-300 dark:bg-gray-800 dark:text-white disabled:opacity-50"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
