import type { ReactNode, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './MainLayout.module.scss';

interface LayoutProps {
  children?: ReactNode | ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Outlet />
          {children}
        </main>
      </div>
    </section>
  );
};

export default Layout;
