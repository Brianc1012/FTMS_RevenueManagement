"use client";

import React, { useState, useEffect } from "react";
import "../styles/revenue.css";

type RevenueData = {
  id: number;
  date: string;
  category: string;
  source: string;
  amount: number;
};



const revenuePage = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Set how many records to display per page


  const handleExport = () => {
    const headers = "Date,Category,Source,Amount\n";
    const rows = data
      .map((item) => `${item.date},${item.category},${item.source},${item.amount}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").slice(1);
      const imported = lines
        .filter((line) => line.trim())
        .map((line, index) => {
          const [date, category, source, amount] = line.split(",");
          return {
            id: Date.now() + index,
            date,
            category,
            source,
            amount: parseFloat(amount),
          };
        });
      setData((prev) => [...prev, ...imported]);
    };
    reader.readAsText(file);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesDate =
      (!dateFrom || item.date >= dateFrom) && (!dateTo || item.date <= dateTo);
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Paginate filtered data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
const totalPages = Math.ceil(filteredData.length / recordsPerPage);
const paginatedData = filteredData.slice(
  (currentPage - 1) * recordsPerPage,
  currentPage * recordsPerPage
);


  return (
    <div className="revenuePage">
      {/* Filter Section */}
      <div className="settings">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Boundary">Boundary</option>
          <option value="Percentage">Percentage</option>
          <option value="Other">Other</option>
        </select>

        <button>Add Revenue</button>

        <div className="importExport">
          <button onClick={handleExport}>Export CSV</button>
          <label className="importLabel">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImport} hidden />
          </label>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Category</th>
              <th>Source</th>
              <th>Revenue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.source}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {currentRecords.length === 0 && <p>No records found.</p>}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    </div>
  );
};

export default revenuePage;
