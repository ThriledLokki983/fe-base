import { useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.shortcuts}>
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} title="Create new">
          <span className={styles.icon}>＋</span>
          <span>Create campaigns</span>
        </button>

        <div className={styles.divider} />

        <button className={styles.iconButton} title="Notifications">
          <span className={styles.icon}>🔔</span>
        </button>

        <button className={styles.userButton}>
          <img 
            src="https://via.placeholder.com/32" 
            alt="User avatar" 
            className={styles.avatar}
          />
          <span className={styles.userName}>James Passaquindici</span>
          <span className={styles.userMeta}>ID: 4527682</span>
          <span className={styles.icon}>▼</span>
        </button>
      </div>
    </header>
  );
}
