import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

function Layout() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.logo}>
        <Link to="/">LOGO</Link>
      </h1>
      <Outlet />
    </div>
  );
}

export default Layout;
