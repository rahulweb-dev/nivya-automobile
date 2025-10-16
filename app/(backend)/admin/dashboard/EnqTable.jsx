"use client";

import dynamic from "next/dynamic";
import { Box, Button, Select } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { FiRefreshCcw, FiSearch } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import React, { useEffect } from "react";

// Dynamically import MaterialReactTable to disable SSR
const MaterialReactTable = dynamic(
  () => import("material-react-table").then((mod) => mod.MaterialReactTable),
  { ssr: false }
);

const EnqTable = ({
  data,
  columns,
  rangeValue,
  setRangeValue,
  dateRange,
  setDateRange,
  refreshing,
  setRefreshing,
  loading,
}) => {
  // Handle form submit (Between Dates)
  const handleSubmit = (e) => {
    e.preventDefault();
    setRefreshing(!refreshing);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleRefreshData = () => setRefreshing(!refreshing);

  // Reset dateRange when selecting anything other than "Between"
  useEffect(() => {
    if (rangeValue !== "Between") {
      setDateRange({ startDate: "", endDate: "" });
      // Force refresh when selecting "All Data"
      if (rangeValue === "allData") {
        setRefreshing(!refreshing);
      }
    }
  }, [rangeValue]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        boxShadow: "none",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      {loading && (
        <div className="flex justify-center items-center h-[calc(100%-34px)] gap-3 absolute top-0 left-0 bg-secondaryGray2 w-full z-10 bg-opacity-10 text-primaryBlue rounded-lg">
          <ImSpinner className="text-3xl animate-spin" />
          <span className="text-xl">Loading...</span>
        </div>
      )}

      {/* Only render MRT on client */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableBottomToolbar
        enableStickyHeader
        enableStickyFooter
        enablePagination
        initialState={{
          density: "compact",
          pagination: { pageIndex: 0, pageSize: 15 },
        }}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap", mt: 1, mb: 1 }}>
            <Select
              native
              value={rangeValue}
              onChange={(e) => setRangeValue(e.target.value)}
              className="p-1 border-none h-9 focus:outline-none"
              style={{ color: "#303a9b", borderColor: "#303a9b" }}
            >
              <option value="allData">All Data</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last3Months">Last 3 Months</option>
              <option value="last6Months">Last 6 Months</option>
              <option value="last12Months">Last 12 Months</option>
              <option value="Between">Between Dates</option>
            </Select>

            {rangeValue === "Between" && (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  max={dateRange.endDate || new Date().toISOString().split("T")[0]}
                  required
                  onChange={handleDateChange}
                  className="border rounded-md px-4 py-1.5"
                />
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  min={dateRange.startDate || ""}
                  required
                  onChange={handleDateChange}
                  className="border rounded-md px-4 py-1.5"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-1 ml-2 mr-10 text-white border rounded-lg bg-primaryBlue"
                >
                  <FiSearch /> Search
                </button>
              </form>
            )}

            <Button
              onClick={handleRefreshData}
              startIcon={<FiRefreshCcw />}
              variant="outlined"
              style={{ borderColor: "#303a9b", color: "#303a9b", height: "35px" }}
            >
              Refresh
            </Button>

            <Button
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
              style={{ backgroundColor: "#303a9b", color: "white", height: "35px" }}
            >
              Export
            </Button>
          </Box>
        )}
      />
    </Box>
  );
};

export default EnqTable;
