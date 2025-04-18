import React, { useState } from 'react';
import '../styles/pagination.css'; // Import the CSS file

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const [jumpToPage, setJumpToPage] = useState<number | string>(''); // State for "Go to" input

  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const maxVisiblePages = 3; // Limit the number of visible page numbers
    const pages = [];

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handleJumpToPage = () => {
    const page = Number(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setJumpToPage(''); // Clear the input after jumping
  };

  return (
    <div
      className="demo-pagination-block"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      {/* Page Size Dropdown */}
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} items per page
          </option>
        ))}
      </select>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* First Page */}
      <button
        className={currentPage === 1 ? 'active' : ''}
        onClick={() => onPageChange(1)}
      >
        1
      </button>

      {/* Ellipsis Before Visible Pages */}
      {pageNumbers[0] > 2 && <span>...</span>}

      {/* Visible Page Numbers */}
      {pageNumbers.map((page) =>
        page !== 1 && page !== totalPages ? (
          <button
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : null
      )}

      {/* Ellipsis After Visible Pages */}
      {totalPages > pageNumbers[pageNumbers.length - 1] + 1 && <span>...</span>}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          className={currentPage === totalPages ? 'active' : ''}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      {/* Go To Input */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        Go to:
        <input
          type="number"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          placeholder="Page #"
          style={{ width: '60px' }}
        />
      </label>
      <button onClick={handleJumpToPage}>Go</button>
    </div>
  );
};

export default PaginationComponent;