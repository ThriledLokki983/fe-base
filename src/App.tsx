import MainLayout from './components/layout/MainLayout';
import EnvironmentInfo from './components/common/EnvironmentInfo';
import styles from './App.module.scss';

function App() {
  return (
    <MainLayout>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's your overview.</p>
        </header>
        
        <main className={styles.content}>
          <div className={styles.card}>
            <EnvironmentInfo />
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

export default App;
