import React from 'react'
import '../styles/addRevenue.css';

const addRevenue = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modalOverlay">
        <div className="addRevenueModal">
            {/* Header Title */}
            <div className="modalHeader">
                <h2>Add Revenue</h2>
                <div className="timeDate">
                    <div className="currTime">Time</div>
                    <div className="currDate">Date</div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="formFields">
                <div className="formField">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" required>
                        <option value="">Select Category</option>
                        <option value="Boundary">Boundary</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="formField">
                    <label htmlFor="source">Source</label>
                    <input type="text" id="source" name="source" placeholder='Insert revenue source here' required />
                </div>
                <div className="formField">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" placeholder='Insert amount here' required />
                </div>
            </div>

                
            {/* Buttons */}
            <div className="modalButtons">
                <div className="buttonContainer">
                    <button type="button" className="cancelButton">Cancel</button>
                    <button type="submit" className="addButton">Add</button>
                </div>
            </div>

        </div>
    </div>

  )
}

export default addRevenue