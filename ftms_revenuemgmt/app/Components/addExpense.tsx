'use client'

import React, {useState} from 'react'
import Swal from 'sweetalert2';
//import '../styles/addExpense.css';
import '../styles/addRevenue.css';
import {showEmptyFieldWarning, showAddConfirmation, showAddSuccess, showInvalidCategoryAlert, showInvalidSourceAlert, showInvalidAmountAlert} from '../utility/addRevenueAlerts';
import { isValidCategory, isValidSource, isValidAmount } from '../utility/validation';

const addExpense = () => {
    type AddRevenueProps = {
      onClose: () => void;
    };
    
    const AddRevenue: React.FC<AddRevenueProps> = ({ onClose }) => {
      const [formData, setFormData] = useState({
        category: '',
        expense: '',
        amount: '',
      });

      //--------------------SWEET ALERTS ---------------------------//
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        };
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
        
          const { category, expense, amount } = formData;
        
          if (!category || !expense || !amount) {
            await showEmptyFieldWarning();
            return;
          }
        
          if (!isValidCategory(category)) {
            await showInvalidCategoryAlert();
            return;
          }
        
          if (!isValidSource(expense)) {
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
                  <option value="Other">Other Expenses</option>
                </select>
              </div>
            </div>

            {/* SOURCE */}
            <div className="formField">
              <label htmlFor="expense">Expenses</label>
              <input
                type="text"
                id="expense"
                name="expense"
                value={formData.expense}
                onChange={handleInputChange}
                placeholder="Expense Title"
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
  )
}
}

export default addExpense