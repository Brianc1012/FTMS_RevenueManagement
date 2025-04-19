"use client";

import React, { useState } from "react";
import "../styles/revenue.css";
import PaginationComponent from "../Components/pagination";
import AddRevenueModal from "../Components/addRevenue";
import Swal from 'sweetalert2';

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
  const [pageSize, setPageSize] = useState(5); // Use the new page size state

  const recordsPerPage = pageSize; // Dynamically set records per page

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

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Handle modal state
  const [showModal, setShowModal] = useState(false);


  // Handle delete action
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the record permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13CE66',
      cancelButtonColor: '#961C1E',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: 'white',
    });
  
    if (result.isConfirmed) {
      setData((prev) => prev.filter((item) => item.id !== id));
  
      await Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The record has been deleted.',
        confirmButtonColor: '#961C1E',
        background: 'white',
      });
    }
  };
  

  return (
    <div className="revenuePage">
      {/* Import and Export */}
      <div className="importExport">
          <button onClick={handleExport}>Export CSV</button>
          <label className="importLabel">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImport} hidden />
          </label>
      </div>

      {/* Filter Section */}
      <div className="settings">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
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
            id="categoryFilter"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Boundary">Boundary</option>
            <option value="Percentage">Percentage</option>
            <option value="Other">Other</option>
          </select>

          <button onClick={() => setShowModal(true)} id='addRevenue'>Add Revenue</button>
          {showModal && <AddRevenueModal onClose={() => setShowModal(false)} />}
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
            {currentRecords.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.source}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td className="actionButtons">
                  <button className="editBtn">Edit</button>
                  <button className="deleteBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentRecords.length === 0 && <p>No records found.</p>}
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

    </div>
  );
};

export default revenuePage;