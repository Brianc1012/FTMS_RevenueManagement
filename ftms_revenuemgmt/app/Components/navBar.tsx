import React from 'react';
import '../styles/navbar.css'; // Corrected path to the styles folder

const navBar = () => {
  return (
    <>
      <div className='navBar'>

        <div className='Logo'>
          <div className='LogoImage'>
            <img src="/agilaLogo.png" alt="Logo" className='logoImage' />
          </div>
        </div>


        {/* Navigation Items */}
        <div className="navContainer">
            <div className="navBarItems">
                <div className="navBarItem">
                    <i className="ri-dashboard-line icon"/> Dashboard
                </div>
                <div className="navBarItem active">
                    <i className="fa-duotone fa-regular fa-dollar-sign icon"/> Revenue Management
                </div>
                <div className="navBarItem">
                    <i className="ri-money-dollar-circle-line icon"/> Expense Management
                </div>
                <div className="navBarItem">
                    <i className="ri-receipt-line icon"/> Receipt Management
                </div>
                <div className="navBarItem">
                    <i className="ri-group-line icon"/> Employee Financial Management
                </div>
                <div className="navBarItem">
                    <i className="ri-service-bell-line icon"/> Financial Requests
                </div>
                <div className="navBarItem">
                    <i className="ri-file-chart-line"/> Financial Reports
                </div>
                <div className="navBarItem">
                    <i className="ri-booklet-line"/> Audit Logs
                </div>
            </div>

            {/* Logout Section */}
            <div className="logout">
                <i className="ri-logout-box-line"/> Logout
            </div>
        </div>
      </div>
    </>
  );
};

export default navBar;