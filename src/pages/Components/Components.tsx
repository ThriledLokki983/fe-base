import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AlertBar, Loader, LoadingSpinner } from '@components/common';
import { useToastStore } from '@stores/toastStore';
import { PATH_FORM_DEMO } from '@config/paths';
import styles from './Components.module.scss';

const Components: React.FC = () => {
  const { showError, showSuccess, showWarning, showInfo } = useToastStore();
  const navigate = useNavigate();
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [showLoader, setShowLoader] = useState(false);

  const handleShowToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    const message =
      type === 'info'
        ? 'This is a general update with useful info.'
        : type === 'success'
          ? 'Everything went through successfully.'
          : type === 'warning'
            ? 'Something might need your attention.'
            : 'Please try again in a moment.';

    // Use the simplified store methods
    switch (type) {
      case 'info':
        showInfo(message);
        break;
      case 'success':
        showSuccess(message);
        break;
      case 'warning':
        showWarning(message);
        break;
      case 'error':
        showError(message);
        break;
    }
  };

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set(prev).add(alertId));
  };

  const resetAlerts = () => {
    setDismissedAlerts(new Set());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Components</h1>

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

      {/* AlertBar Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Alert Bars</h2>
        <p className={styles.description}>
          Alert bars provide contextual feedback messages to users. They support different variants
          for various message types, optional dismissible functionality, and are fully accessible
          with proper ARIA attributes.
        </p>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}
        >
          {!dismissedAlerts.has('info') && (
            <AlertBar variant="info" dismissible onDismiss={() => handleDismissAlert('info')}>
              This is an informational message. It provides helpful context or updates about the
              current state.
            </AlertBar>
          )}

          {!dismissedAlerts.has('success') && (
            <AlertBar variant="success" dismissible onDismiss={() => handleDismissAlert('success')}>
              Great! Your action was completed successfully. Everything is working as expected.
            </AlertBar>
          )}

          {!dismissedAlerts.has('warning') && (
            <AlertBar variant="warning" dismissible onDismiss={() => handleDismissAlert('warning')}>
              Please be aware that this action may have consequences. Review before proceeding.
            </AlertBar>
          )}

          {!dismissedAlerts.has('error') && (
            <AlertBar variant="error" dismissible onDismiss={() => handleDismissAlert('error')}>
              Something went wrong. Please check your input and try again, or contact support if the
              issue persists.
            </AlertBar>
          )}

          {!dismissedAlerts.has('notice') && (
            <AlertBar variant="notice" dismissible onDismiss={() => handleDismissAlert('notice')}>
              This is an important notice that requires your attention. Please read carefully.
            </AlertBar>
          )}

          {/* Non-dismissible examples */}
          <AlertBar variant="info">This is a non-dismissible info alert without a title.</AlertBar>

          <AlertBar variant="success">All systems are operational and running smoothly.</AlertBar>
        </div>

        <div className={styles.buttonGroup}>
          <Button variant="secondary" onClick={resetAlerts}>
            Reset Dismissed Alerts
          </Button>
        </div>
      </section>

      {/* Loader Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Loading Indicators</h2>
        <p className={styles.description}>
          Loading indicators provide visual feedback when content is being loaded or processed. We
          offer two types of loading indicators: a full-screen Loader for major operations and a
          lightweight LoadingSpinner for inline or smaller loading states.
        </p>

        {/* Full-screen Loader */}
        <h3 className={styles.subsectionTitle}>Full-screen Loader</h3>
        <p className={styles.description}>
          The Loader component is designed for full-screen or major section loading states,
          featuring a sophisticated animation and support for custom messages.
        </p>
        <div
          className={styles.loaderDemo}
          style={{
            position: 'relative',
            height: '200px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          {showLoader && <Loader message="Loading content..." />}
        </div>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <p className={styles.smallText}>
            The loader above is contained within a demo container. In actual usage, the loader
            typically covers the full screen or a specific content area.
          </p>
          <div className={styles.buttonGroup} style={{ marginTop: 'var(--space-sm)' }}>
            <Button variant="secondary" onClick={() => setShowLoader((prev) => !prev)}>
              {showLoader ? 'Hide' : 'Show'} Loader
            </Button>
          </div>
        </div>

        {/* Loading Spinner */}
        <h3 className={styles.subsectionTitle} style={{ marginTop: 'var(--space-xl)' }}>
          Loading Spinner
        </h3>
        <p className={styles.description}>
          The LoadingSpinner is a lightweight component perfect for inline loading states or smaller
          UI elements. It comes in three sizes and supports optional loading messages.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            padding: 'var(--space-lg)',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 var(--space-xs) 0' }}>Small</h4>
              <LoadingSpinner size="small" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 var(--space-xs) 0' }}>Medium</h4>
              <LoadingSpinner size="medium" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 var(--space-xs) 0' }}>Large</h4>
              <LoadingSpinner size="large" />
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 var(--space-xs) 0' }}>With Message</h4>
            <LoadingSpinner size="medium" message="Loading data..." />
          </div>
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
