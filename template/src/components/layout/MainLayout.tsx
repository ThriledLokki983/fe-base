import type { ReactNode, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './MainLayout.module.scss';
import { SkipLinks, Toast } from '@components/common/index';
import { FocusManager } from '@hooks/useFocusManagement';

interface LayoutProps {
  children?: ReactNode | ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <FocusManager>
      <div className={styles.layout}>
        <SkipLinks />
        <Sidebar />
        <div className={styles.content}>
          <Header />
          <main
            id="main-content"
            className={styles.main}
            role="main"
            aria-label="Main content"
            tabIndex={-1}
          >
            <Outlet />
            {children}
          </main>
        </div>
        <Toast />
      </div>
    </FocusManager>
  );
};

export default Layout;
