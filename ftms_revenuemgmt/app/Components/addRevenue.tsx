'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/addRevenue.css';
import {showEmptyFieldWarning, showAddConfirmation, showAddSuccess, showInvalidCategoryAlert, showInvalidSourceAlert, showInvalidAmountAlert} from '../utility/addRevenueAlerts';
import { isValidCategory, isValidSource, isValidAmount } from '../utility/validation';


//============================SWEET ALERT 2=========================
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
  
    const { category, source, amount } = formData;
  
    if (!category || !source || !amount) {
      await showEmptyFieldWarning();
      return;
    }
  
    if (!isValidCategory(category)) {
      await showInvalidCategoryAlert();
      return;
    }
  
    if (!isValidSource(source)) {
      await showInvalidSourceAlert();
      return;
    }
  
    if (!isValidAmount(amount)) {
      await showInvalidAmountAlert();
      return;
    }
  
    const result = await showAddConfirmation();
  
    if (result.isConfirmed) {
      console.log('Revenue added:', formData);
      await showAddSuccess();
      onClose();
    }
  };
  

  //============================END OF SWEET ALERT 2=========================

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
            {/* CATEGORY */}
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
            </div>

            {/* SOURCE */}
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

            {/* AMOUNT */}
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

            {/* SUBMIT BUTTON */}
            <div className="modalButtons">
              <div className="buttonContainer">
                <button type="button" className="cancelButton" onClick={onClose}> Cancel </button>
                <button type="submit" className="addButton"> Add </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddRevenue;