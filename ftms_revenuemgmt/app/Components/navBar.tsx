"use client";

import React, { useState } from 'react';
import '../styles/navbar.css'; // Corrected path to the styles folder

const navBar = () => {
  const [activeModule, setActiveModule] = useState('Revenue Management'); // State to track the active module
  const [activeSubModule, setActiveSubModule] = useState(''); // State to track the active submodule

  const handleModuleClick = (moduleName: string) => {
    setActiveModule(moduleName);
    setActiveSubModule(''); // Reset submodule when switching modules
  };

  const handleSubModuleClick = (subModuleName: string) => {
    setActiveSubModule(subModuleName);
  };

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
            {/* Module for Dashboard */}
            <div
              className={`navBarItem ${activeModule === 'Dashboard' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Dashboard')}
            >
              <i className="ri-dashboard-line icon" /> Dashboard
            </div>

            {/* Module for Revenue Management */}
            <div
              className={`navBarItem ${activeModule === 'Revenue Management' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Revenue Management')}
            >
              <i className="fa-duotone fa-regular fa-dollar-sign icon" /> Revenue Management
            </div>

            {/* Module for Expense Management */}
            <div
              className={`navBarItem ${activeModule === 'Expense Management' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Expense Management')}
            >
              <i className="ri-money-dollar-circle-line icon" /> Expense Management
            </div>

            {/* Module for Receipt Management */}
            <div
              className={`navBarItem ${activeModule === 'Receipt Management' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Receipt Management')}
            >
              <i className="ri-receipt-line icon" /> Receipt Management
            </div>
              
              {/* Submodules for Receipt Management */}
              {activeModule === 'Receipt Management' && (
                  <div className="subModules">
                    <div
                      className={`subModuleItem ${activeSubModule === 'Receipt Processing' ? 'active' : ''}`}
                      onClick={() => handleSubModuleClick('Receipt Processing')}
                    >
                      Receipt Processing
                    </div>
                    <div
                      className={`subModuleItem ${activeSubModule === 'Receipt Archive' ? 'active' : ''}`}
                      onClick={() => handleSubModuleClick('Receipt Archive')}
                    >
                      Receipt Archive
                    </div>
                  </div>
                )}

            {/* Module for Employee Financial Management */}
            <div
              className={`navBarItem ${activeModule === 'Employee Financial Management' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Employee Financial Management')}
            >
              <i className="ri-group-line icon" /> Employee Financial Management
            </div>

                {/* Submodules for Employee Financial Management */}
                {activeModule === 'Employee Financial Management' && (
                  <div className="subModules">
                    <div
                      className={`subModuleItem ${activeSubModule === 'Balance & Payment' ? 'active' : ''}`}
                      onClick={() => handleSubModuleClick('Balance & Payment')}
                    >
                      Balance & Payment
                    </div>
                    <div
                      className={`subModuleItem ${activeSubModule === 'Payroll' ? 'active' : ''}`}
                      onClick={() => handleSubModuleClick('Payroll')}
                    >
                      Payroll
                    </div>
                  </div>
                )}
              
              
            {/* Module for Financial Requests */}
            <div
              className={`navBarItem ${activeModule === 'Financial Requests' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Financial Requests')}
            >
              <i className="ri-service-bell-line icon" /> Financial Requests
            </div>
              
              
            {/* Module for Financial Reports */}
            <div
              className={`navBarItem ${activeModule === 'Financial Reports' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Financial Reports')}
            >
              <i className="ri-file-chart-line" /> Financial Reports
            </div>
                
                
            {/* Module for Audit Logs */}
            <div
              className={`navBarItem ${activeModule === 'Audit Logs' ? 'active' : ''}`}
              onClick={() => handleModuleClick('Audit Logs')}
            >
              <i className="ri-booklet-line" /> Audit Logs
            </div>
          </div>

          {/* Logout Section */}
          <div className="logout">
            <i className="ri-logout-box-line" /> Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default navBar;