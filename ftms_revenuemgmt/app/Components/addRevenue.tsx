'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/addRevenue.css';
import {
  showEmptyFieldWarning,
  showAddConfirmation,
  showAddSuccess,
  showInvalidCategoryAlert,
  showInvalidSourceAlert,
  showInvalidAmountAlert
} from '../utility/addRevenueAlerts';
import { isValidCategory, isValidSource, isValidAmount } from '../utility/validation';

type AddRevenueProps = {
  onClose: () => void;
};

// Bus numbers for the dropdowns
const busNumbers = ['Bus No. 21', 'Bus No. 42', 'Bus No. 69'];

// Renters list for the Bus Rental category
const renters = ['Renter A', 'Renter B', 'Renter C'];

const AddRevenue: React.FC<AddRevenueProps> = ({ onClose }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Enhanced form data with additional fields for percentage breakdown
  const [formData, setFormData] = useState({
    category: 'Percentage',
    source: 'Bus No. 21',
    totalAmount: '40000',
    otherSource: '',
    companyPercentage: 50,
    employeePercentage: 50,
    companyAmount: '20000',
    employeeAmount: '20000'
  });

  // Set the current time and date when component mounts
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format time as HH:MM am/pm
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      // Format date as MM/DD/YYYY
      setCurrentDate(now.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' }));
    };
    
    updateDateTime();
    // Update every minute
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate percentage breakdown when total amount changes
  useEffect(() => {
    if (formData.category === 'Percentage' && formData.totalAmount) {
      const total = parseFloat(formData.totalAmount);
      const companyAmount = total * (formData.companyPercentage / 100);
      const employeeAmount = total * (formData.employeePercentage / 100);
      
      setFormData(prev => ({
        ...prev,
        companyAmount: companyAmount.toString(),
        employeeAmount: employeeAmount.toString()
      }));
    }
  }, [formData.totalAmount, formData.companyPercentage, formData.employeePercentage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If category changes, reset source-related fields
    if (name === 'category') {
      let updatedData = {
        ...formData,
        [name]: value,
      };
      
      // Set default source values based on category
      if (value === 'Boundary') {
        updatedData.source = busNumbers[0];
      } else if (value === 'Percentage') {
        updatedData.source = busNumbers[0];
      } else if (value === 'Bus Rental') {
        updatedData.source = renters[0];
      } else if (value === 'Others') {
        updatedData.source = '';
        updatedData.otherSource = '';
      }
      
      setFormData(updatedData);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { category, source, totalAmount } = formData;
    let sourceValue = category === 'Others' ? formData.otherSource : source;
  
    if (!category || !sourceValue || !totalAmount) {
      await showEmptyFieldWarning();
      return;
    }
  
    // Validation checks
    if (!isValidCategory(category)) {
      await showInvalidCategoryAlert();
      return;
    }
  
    if (category !== 'Others' && !isValidSource(sourceValue)) {
      await showInvalidSourceAlert();
      return;
    }
  
    if (!isValidAmount(totalAmount)) {
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

  // Render source field based on category
  const renderSourceField = () => {
    switch (formData.category) {
      case 'Boundary':
      case 'Percentage':
        return (
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            required
            className="formSelect"
          >
            {busNumbers.map((bus, index) => (
              <option key={index} value={bus}>{bus}</option>
            ))}
          </select>
        );
      
      case 'Bus Rental':
        return (
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            required
            className="formSelect"
          >
            {renters.map((renter, index) => (
              <option key={index} value={renter}>{renter}</option>
            ))}
          </select>
        );
      
      case 'Others':
        return (
          <input
            type="text"
            id="otherSource"
            name="otherSource"
            value={formData.otherSource}
            onChange={handleInputChange}
            placeholder="Enter source name"
            required
            className="formInput"
          />
        );
      
      default:
        return null;
    }
  };

  // Render amount field or percentage breakdown
  const renderAmountField = () => {
    if (formData.category === 'Percentage') {
      return (
        <>
          <div className="formField">
            <select
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              required
              className="formSelect"
            >
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
            </select>
          </div>
          <div className="percentageBreakdown">
            <div className="percentageHeader">Percentage</div>
            <div className="percentageRow">
              <div className="percentageLabel">Company:</div>
              <div className="percentageValue">{formData.companyPercentage}%</div>
              <div className="percentageAmount">{parseInt(formData.companyAmount).toLocaleString()}</div>
            </div>
            <div className="percentageRow">
              <div className="percentageLabel">Employee:</div>
              <div className="percentageValue">{formData.employeePercentage}%</div>
              <div className="percentageAmount">{parseInt(formData.employeeAmount).toLocaleString()}</div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <select
          id="totalAmount"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleInputChange}
          required
          className="formSelect"
        >
          <option value="10000">10,000</option>
          <option value="20000">20,000</option>
          <option value="30000">30,000</option>
          <option value="40000">40,000</option>
          <option value="50000">50,000</option>
        </select>
      );
    }
  };

  return (
    <div className="modalOverlay">
      <div className="addRevenueModal">
        <div className="modalHeader">
          <h2>Add Revenue</h2>
          <div className="timeDate">
            <div className="currTime">{currentTime}</div>
            <div className="currDate">{currentDate}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formFieldsHorizontal">
            {/* Left side - Labels */}
            <div className="formLabels">
              <div className="formLabel">Category</div>
              <div className="formLabel">Source</div>
              <div className="formLabel">{formData.category === 'Percentage' ? 'Total Amount' : 'Amount'}</div>
            </div>
            
            {/* Right side - Inputs */}
            <div className="formInputs">
              {/* CATEGORY */}
              <div className="formField">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="formSelect"
                >
                  <option value="Boundary">Boundary</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Bus Rental">Bus Rental</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* SOURCE - Dynamic based on category */}
              <div className="formField">
                {renderSourceField()}
              </div>

              {/* AMOUNT - Dynamic based on category */}
              {renderAmountField()}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="modalButtons">
            <button type="button" className="cancelButton" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="addButton">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRevenue;
