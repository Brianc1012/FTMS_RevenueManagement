import React from 'react';
import './styles/layout.css';
import NavBar from './Components/navBar'; // Adjust the path if necessary

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
              <h1>Top Bar</h1>
            </div>

            <div className="pageContainer">
              <div className="contentContainer">
                <h1>Page Content</h1>
              </div>
            </div>
        </div>

      {/*</div>*/}
    </div>
    </>
    
  );
};

export default Page;