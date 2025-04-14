import React from 'react';
import './styles/layout.css';
import NavBar from './Components/navBar'; // Adjust the path if necessary
import TopBar from './Components/topBar'; // Adjust the path if necessary

const Page = () => {
  return (
    <>
    <div className="mainContainer">
      {/*<div className="container">*/}
        
        <div className="navBarContainer">
          <NavBar/>
        </div>

        <div className="mainContent">
            <div className="topBarContainer">
              <TopBar/>
            </div>

            <div className="pageContainer">
              <div className="contentContainer">
                <h1>Page Content</h1>
              </div>
            </div>
        </div>
        
    </div>
    </>
    
  );
};

export default Page;