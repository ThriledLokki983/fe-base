import { useState } from 'react';
import { Button, Toast, AlertBar, FetchLoader } from '@components/common';
import styles from './Components.module.scss';

type AlertTypes = 'notice' | 'success' | 'warning' | 'error';

const Components = () => {
  const [toastType, setToastType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [showToast, setShowToast] = useState(false);
  const [showFetchLoader, setShowFetchLoader] = useState(false);
  const [showAlerts, setShowAlerts] = useState<Record<AlertTypes, boolean>>({
    notice: true,
    success: true,
    warning: true,
    error: true,
  });

  const handleShowToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    setToastType(type);
    setShowToast(true);
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

        {showToast && (
          <Toast
            type={toastType}
            title={
              toastType === 'info'
                ? 'Just so you know'
                : toastType === 'success'
                  ? "You're all set"
                  : toastType === 'warning'
                    ? 'Take a quick look'
                    : 'Something went wrong'
            }
            message={
              toastType === 'info'
                ? 'This is a general update with useful info.'
                : toastType === 'success'
                  ? 'Everything went through successfully.'
                  : toastType === 'warning'
                    ? 'Something might need your attention.'
                    : 'Please try again in a moment.'
            }
            active={showToast}
            onClose={() => setShowToast(false)}
          />
        )}
      </section>

      {/* Primary and Secondary Buttons */}
      <div className={styles.sectionGrid}>
        <section className={`${styles.section} ${styles.half}`}>
          <h2 className={styles.sectionTitle}>Primary Buttons</h2>
          <p className={styles.description}>
            Primary buttons are used for primary actions and call-to-actions. They use the brand's
            primary color and stand out visually.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="primary" size="small">
              Small Primary
            </Button>
            <Button variant="primary" size="medium">
              Medium Primary
            </Button>
            <Button variant="primary" size="large">
              Large Primary
            </Button>
          </div>
        </section>

        <section className={`${styles.section} ${styles.half}`}>
          <h2 className={styles.sectionTitle}>Secondary Buttons</h2>
          <p className={styles.description}>
            Secondary buttons are used for secondary actions using the brand's secondary color for
            visual hierarchy and emphasis.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="secondary" size="small">
              Small Secondary
            </Button>
            <Button variant="secondary" size="medium">
              Medium Secondary
            </Button>
            <Button variant="secondary" size="large">
              Large Secondary
            </Button>
          </div>
        </section>
      </div>

      {/* Text and Link Buttons */}
      <div className={styles.sectionGrid}>
        <section className={`${styles.section} ${styles.half}`}>
          <h2 className={styles.sectionTitle}>Text Buttons</h2>
          <p className={styles.description}>
            Text buttons are used for auxiliary actions. They have no background and are the most
            subtle button variant.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="text" size="small">
              Small Text
            </Button>
            <Button variant="text" size="medium">
              Medium Text
            </Button>
            <Button variant="text" size="large">
              Large Text
            </Button>
          </div>
        </section>

        <section className={`${styles.section} ${styles.half}`}>
          <h2 className={styles.sectionTitle}>Link Buttons</h2>
          <p className={styles.description}>
            Link buttons are used to navigate to other pages or external links. They appear as
            traditional hyperlinks but maintain button behaviors.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="link" size="small">
              Small Link
            </Button>
            <Button variant="link" size="medium">
              Medium Link
            </Button>
            <Button variant="link" size="large">
              Large Link
            </Button>
          </div>
        </section>
      </div>

      {/* Outline Buttons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Outline Buttons</h2>
        <p className={styles.description}>
          Outline buttons are used for secondary actions that require less visual emphasis. They
          maintain brand colors while being more subtle.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="outline" size="small">
            Small Outline
          </Button>
          <Button variant="outline" size="medium">
            Medium Outline
          </Button>
          <Button variant="outline" size="large">
            Large Outline
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button States</h2>
        <p className={styles.description}>
          All button variants support different states including disabled, hover, focus, and active
          states. Here are examples of disabled states.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="text" disabled>
            Disabled Text
          </Button>
          <Button variant="link" disabled>
            Disabled Link
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Components;
