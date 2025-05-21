import EnvironmentInfo from './components/common/EnvironmentInfo';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>React Base Application</h1>
            <p className={styles.subtitle}>A modern, sophisticated starting point</p>
          </div>
        </header>
        
        <main>
          <div className="card elevated">
            <EnvironmentInfo />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
