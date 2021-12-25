import './layout.scss';
import React from 'react';
import Header from '../header/header';

const Layout = ({ children }:{children: JSX.Element}): JSX.Element => {
  return (
    <div className="body-container background-white">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};
export default Layout;