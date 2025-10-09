'use client';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function AdminTable({
  fetchUrl,           // API endpoint
  columns,            // Array of { key: string, label: string } for table headers
  rowsPerPage = 10,   // Rows per page
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchUrl);
        const json = await res.json();
        const arr = Array.isArray(json) ? json : json.data || [];
        setData(arr);
        setFilteredData(arr);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setFilteredData([]);
      }
    };
    fetchData();
  }, [fetchUrl]);

  // Filter logic
  useEffect(() => {
    let result = Array.isArray(data) ? [...data] : [];

    if (startDate) result = result.filter((row) => new Date(row.createdAt) >= new Date(startDate));
    if (endDate) result = result.filter((row) => new Date(row.createdAt) <= new Date(endDate));
    if (search.trim()) {
      result = result.filter((row) =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [search, startDate, endDate, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 shadow-xl rounded-xl sm:p-6">
      {/* Filters & Actions */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-between sm:items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Date Filters */}
        <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto">
          <input
            type="date"
            className="flex-1 px-3 py-2 border-2 border-gray-300 sm:flex-none rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="flex-1 px-3 py-2 border-2 border-gray-300 sm:flex-none rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto">
          <button
            onClick={() => {
              setSearch('');
              setStartDate('');
              setEndDate('');
              setFilteredData(data);
            }}
            className="w-full px-4 py-2 font-semibold text-white transition bg-blue-400 sm:w-auto hover:bg-blue-500 rounded-xl"
          >
            Refresh 🔄
          </button>
          <button
            onClick={exportToExcel}
            className="w-full px-4 py-2 font-semibold text-white transition bg-green-400 sm:w-auto hover:bg-green-500 rounded-xl"
          >
            Export 📥
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-2 border-pink-400 rounded-xl">
        <table className="w-full text-sm sm:text-base">
          <thead className="text-gray-700 bg-pink-100 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 border-b">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className="text-center transition hover:bg-yellow-100 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 border-b">{startIndex + idx + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 border-b">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-700 dark:text-gray-400">
                  No data found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className="flex flex-col items-center justify-center gap-3 mt-4 sm:flex-row sm:justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-full px-3 py-1 text-gray-800 bg-pink-300 dark:bg-gray-700 dark:text-white rounded-xl disabled:opacity-50 sm:w-auto"
          >
            Previous ◀️
          </button>
          <span className="font-medium text-gray-800 dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-full px-3 py-1 text-gray-800 bg-pink-300 dark:bg-gray-700 dark:text-white rounded-xl disabled:opacity-50 sm:w-auto"
          >
            Next ▶️
          </button>
        </div>
      )}
    </div>
  );
}
