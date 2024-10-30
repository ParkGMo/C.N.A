import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Footer from './footer/Footer';

function Layout() {
  return (
    <>
      <div className={styles.wrap}>
        <h1 className={styles.logo}>
          <Link to="/">Trip Search</Link>
        </h1>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
