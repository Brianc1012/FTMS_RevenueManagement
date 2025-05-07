// AddExpenseModal.tsx
'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/addExpense.css';
import {
  showEmptyFieldWarning,
  showAddConfirmation,
  showAddSuccess,
  showInvalidCategoryAlert,
  showInvalidSourceAlert,
  showInvalidAmountAlert,
} from '../utility/addRevenueAlerts';
import {
  isValidCategory,
  isValidSource,
  isValidAmount,
} from '../utility/validation';

type AddExpenseModalProps = {
  onClose: () => void;
};

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    expense: '',
    amount: '',
  });

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
      console.log('Expense added:', formData);
      await showAddSuccess();
      onClose();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="addExpenseModal">
        <div className="modalHeader">
          <h2>Add Expense</h2>
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
                <option value="Other">Other Expenses</option>
              </select>
            </div>

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

export default AddExpenseModal;
