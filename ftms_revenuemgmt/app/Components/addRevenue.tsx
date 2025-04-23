'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/addRevenue.css';

type AddRevenueProps = {
  onClose: () => void;
};

const AddRevenue: React.FC<AddRevenueProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    source: '',
    amount: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.source || !formData.amount) {
      Swal.fire({
        icon: 'warning',
        text: 'Please fill out all fields.',
        confirmButtonColor: '#961C1E',
        background: 'white',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Confirmation',
      html: `<p>Are you sure you want to <b>ADD</b> this record?</p>`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      background: 'white',
      confirmButtonColor: '#13CE66',
      cancelButtonColor: '#961C1E',
    });

    if (result.isConfirmed) {
      console.log('Revenue added:', formData);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Your revenue record has been added.',
        confirmButtonColor: '#961C1E',
        background: 'white',
      });

      onClose(); // Close modal after confirming
    }
  };

  return (
    <>
    <div className="modalOverlay">
      <div className="addRevenueModal">
        <div className="modalHeader">
          <h2>Add Revenue</h2>
          <div className="timeDate">
            <div className="currTime">Time</div>
            <div className="currDate">Date</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formFields">
            <div className="formField">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Boundary">Boundary</option>
                <option value="Percentage">Percentage</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="formField">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="Insert revenue source here"
                required
              />
            </div>
            <div className="formField">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Insert amount here"
                required
              />
            </div>
          </div>

          <div className="modalButtons">
            <div className="buttonContainer">
              <button type="button" className="cancelButton" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="addButton">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddRevenue;
