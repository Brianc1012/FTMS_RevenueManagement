import React from 'react';
import '../styles/confirmationModal.css';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

const AddRevenueConfirmationModal: React.FC<Props> = ({ onCancel, onConfirm }) => {
  return (
    <div className='modalOverlay'>
      <div className="confirmationModal">
        <div className="modalHeader">
          <h2>Confirmation</h2>
        </div>

        <div className="confirmationMessage">
          <p>Are you sure you want to <b>ADD</b> this record?</p>
        </div>

        <div className="modalButtons">
          <div className="buttonContainer">
            <button type="button" className="cancelButton" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="confirmButton" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRevenueConfirmationModal;
