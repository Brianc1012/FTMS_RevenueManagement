// AddExpenseModal.tsx
'use client';

//---------------------IMPORTS HERE----------------------//
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/addExpense.css';
import {
  showEmptyFieldWarning,
  showAddConfirmation,
  showAddSuccess,
  showInvalidCategoryAlert,
  showInvalidSourceAlert,
  showInvalidAmountAlert,
  showError, 
  showSuccess} from '../utility/Alerts';
import {
  isValidCategory,
  isValidSource,
  isValidAmount,
} from '../utility/validation';

import ItemList from '../Components/addExpense_itemList'



//---------------------DECLARATIONS HERE----------------------//

type ExpenseData = {
  id: number;
  date: string;
  department: string;
  description: string;
  amount: number;
};

type AddExpenseModalProps = {
  onClose: () => void;
  onAddSuccess: (newRecord: ExpenseData) => void;
};

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose, onAddSuccess }) => {
  //set form data
  const [formData, setFormData] = useState({
    category: '',
    expense: '',
    amount: '',
  });


  //----------------set the current date and time----------------//
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  //Get the current date and time
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



//-------------------EVENT HANDLER------------------//
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      try {
          const newRecord: ExpenseData = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            department: "Operations", // or dynamically if needed
            description: expense,
            amount: parseFloat(amount),
          }
        console.log('Expense added:', formData);

        await showSuccess("Expense added successfully.");
        onAddSuccess(newRecord);
        onClose();
      }
      catch (err){
        showError ("Failed to add expense.")
      }
      
    }
  };

  //-----------------SWAL FOR ADD EXPENSE---------------//
    /*const addExpenseAlerts = ({onClose, onAddSuccess}) => {
      const handleAddExpense = () => {
        try {
          // simulate add logic
          onAddSuccess({
            id: Date.now(),
            date: "2025-05-08",
            department: "Operations",
            description: "New Equipment",
            amount: 5000,
          });
          showSuccess("Expense added successfully!");
          onClose();
        } catch (err) {
          showError("Failed to add expense.");
        }
      }
    }
*/

  //---------------------BODY HERE----------------------//
  return (
    <div className="modalOverlay">
      <div className="addExpenseModal">
        <div className="modalHeader">
          <h2>Add Expense</h2>
          <div className="timeDate">
            <div className="currTime">{currentTime}</div>
            <div className="currDate">{currentDate}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className='row'>
            <div className="formFields">
              {/*CATEGORY*/}
              <div className="formField">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required disabled
                >
                  <option value="Other">Other Expenses</option>
                </select>
              </div>

              {/*EXPENSE TITLE*/}
              <div className="formField">
                <label htmlFor="expense">Expense</label>
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
            </div>
          </div>

          {/*Item List table Here*/}
          <div className="itemList">
            <ItemList/>
          </div>

          {/*BUTTONS*/}
          <div className='buttonRow'>
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
  );
};

export default AddExpenseModal;
