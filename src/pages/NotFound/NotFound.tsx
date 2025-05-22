import { useEffect } from 'react';
import { PATH_HOME } from '@config/paths';
import { Button } from '@components/common';
import { useAppStateContext } from '@contexts/index';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const { stateDispatch, stateActions } = useAppStateContext();

  useEffect(() => {
    stateDispatch(stateActions.updatePageTitle('Page not found'));
  }, [stateActions, stateDispatch]);

  return (
    <article className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <div className={styles.message}>
          <p>Sorry, we couldn't find the page you're looking for</p>
          <span className={styles.statusCode}>Error 404 | Page Not Found</span>
        </div>
        <div className={styles.homeButton}>
          <Button url={PATH_HOME} variant="primary" size="large">
            Return to Homepage
          </Button>
        </div>
      </div>
    </article>
  );
};

export default NotFound;
