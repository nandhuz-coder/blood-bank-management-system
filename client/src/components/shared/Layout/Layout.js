import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <div className="header fixed-top shadow-sm bg-light">
        <Header />
      </div>

      {/* Sidebar + Main Content */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="content col-md-9">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
