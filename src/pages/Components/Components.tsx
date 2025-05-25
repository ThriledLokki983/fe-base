import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AlertBar, FetchLoader } from '@components/common';
import { useAppStateContext } from '@contexts/index';
import { PATH_FORM_DEMO } from '@config/paths';
import styles from './Components.module.scss';

type AlertTypes = 'notice' | 'success' | 'warning' | 'error';

const Components = () => {
  const { showToast } = useAppStateContext();
  const navigate = useNavigate();
  const [showFetchLoader, setShowFetchLoader] = useState(false);
  const [showAlerts, setShowAlerts] = useState<Record<AlertTypes, boolean>>({
    notice: true,
    success: true,
    warning: true,
    error: true,
  });

  const handleShowToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    showToast({
      type,
      title:
        type === 'info'
          ? 'Just so you know'
          : type === 'success'
            ? "You're all set"
            : type === 'warning'
              ? 'Take a quick look'
              : 'Something went wrong',
      message:
        type === 'info'
          ? 'This is a general update with useful info.'
          : type === 'success'
            ? 'Everything went through successfully.'
            : type === 'warning'
              ? 'Something might need your attention.'
              : 'Please try again in a moment.',
      active: true,
    });
  };

  const handleHideAlert = (type: AlertTypes) => {
    setShowAlerts((prev) => ({ ...prev, [type]: false }));
  };

  const simulateFetch = () => {
    setShowFetchLoader(true);
    setTimeout(() => {
      setShowFetchLoader(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Components</h1>

      {/* Fetch Loader */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fetch Loader</h2>
        <p className={styles.description}>
          The Fetch Loader provides visual feedback during data loading operations. It appears as a
          subtle progress bar at the top of the viewport, similar to popular web applications.
        </p>
        <FetchLoader active={showFetchLoader} />
        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={simulateFetch}>
            Simulate Loading
          </Button>
        </div>
      </section>

      {/* Alert Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Alert Bars</h2>
        <p className={styles.description}>
          Alert bars provide important information, feedback, or status updates to users. They can
          be used to show informational messages, success states, warnings, or errors.
        </p>

        {showAlerts.notice && (
          <AlertBar variation="notice" onClose={() => handleHideAlert('notice')}>
            A new version of the application is available. Please refresh your browser.
          </AlertBar>
        )}

        {showAlerts.success && (
          <AlertBar variation="success" onClose={() => handleHideAlert('success')}>
            Your changes have been successfully saved and deployed.
          </AlertBar>
        )}

        {showAlerts.warning && (
          <AlertBar variation="warning" onClose={() => handleHideAlert('warning')}>
            Your session will expire in 5 minutes. Please save your work.
          </AlertBar>
        )}

        {showAlerts.error && (
          <AlertBar variation="error" onClose={() => handleHideAlert('error')}>
            Unable to connect to the server. Please check your internet connection.
          </AlertBar>
        )}

        <div className={styles.buttonGroup}>
          <Button
            variant="primary"
            onClick={() =>
              setShowAlerts({
                notice: true,
                success: true,
                warning: true,
                error: true,
              })
            }
          >
            Reset Alerts
          </Button>
        </div>
      </section>

      {/* Toast Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Toast Notifications</h2>
        <p className={styles.description}>
          Toasts are used to show feedback messages to users. They come in different purposes: info
          for general updates, success for completed actions, warning for potential issues, and
          error for problems.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={() => handleShowToast('info')}>
            Show Info Toast
          </Button>
          <Button variant="success" onClick={() => handleShowToast('success')}>
            Show Success Toast
          </Button>
          <Button variant="warning" onClick={() => handleShowToast('warning')}>
            Show Warning Toast
          </Button>
          <Button variant="error" onClick={() => handleShowToast('error')}>
            Show Error Toast
          </Button>
        </div>
      </section>

      {/* Form Elements & Button Components Reference */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Form Elements & Button Components</h2>
        <p className={styles.description}>
          Looking for form elements like inputs, text areas, selects, checkboxes, and toggles? Or
          need to see comprehensive button examples with all variants, sizes, and states? Visit the
          dedicated <strong>Form Demo</strong> page to see all form components and button
          integration patterns with React Aria.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={() => navigate(PATH_FORM_DEMO)}>
            View Form Demo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Components;
