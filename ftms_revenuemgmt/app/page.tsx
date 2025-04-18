import React from 'react';
import './styles/layout.css';
import NavBar from './Components/navBar';
import TopBar from './Components/topBar';
import RevenuePage from './PageContent/revenuePage';

const Page = () => {
  return (
    <>
    <div className="mainContainer">
        
        <div className="navBarContainer">
          <NavBar/>
        </div>

        <div className="mainContent">
            <div className="topBarContainer">
              <TopBar/>
            </div>

            <div className="pageContainer">
              <div className="contentContainer">
                <RevenuePage/>
              </div>
            </div>
        </div>
        
    </div>
    </>
    
  );
};

export default Page;