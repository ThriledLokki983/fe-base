import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { useAppStateContext } from '@contexts/index';
import type { ToastProps, URLLocation } from './Toast.interface';
import { Button } from '@components/common/index';
import styles from './Toast.module.scss';

const iconMap = {
  info: <Info size={20} />,
  success: <CheckCircle2 size={20} />,
  warning: <AlertCircle size={20} />,
  error: <XCircle size={20} />,
};

const ERROR_TIMEOUT = 7500;
const MESSAGE_TIMEOUT = 2000;

let TIMEOUT: number | null = null;

const Toast: React.FC<ToastProps> = ({ type, title, message, active, onClose }) => {
  const { toast, hideToast } = useAppStateContext();

  const hide = () => hideToast();

  useEffect(() => {
    if (toast.active && !toast.persistent) {
      const delay = toast.type === 'message' ? MESSAGE_TIMEOUT : ERROR_TIMEOUT;
      TIMEOUT = window.setTimeout(hideToast, delay);
    }
    return () => window.clearTimeout(TIMEOUT as number);
  }, [toast, hideToast]);

  /**
   * Handle close button click.
   */
  const clickHandler = () => {
    if (toast.button?.url) {
      window.location = toast.button.url as URLLocation;
    } else if (toast.reload) {
      window.location.reload();
    } else {
      hide();
    }
  };

  return (
    <div
      className={styles.toast}
      data-type={type}
      role="alert"
      aria-live="polite"
      aria-hidden={!toast.active}
      onAnimationEnd={clickHandler}
    >
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>{toast.title || `Request failed`}</h3>
          <Button
            type="button"
            // className={styles.closeButton}
            url={toast.button?.url}
            onClick={onClose}
            aria-label="Close notification"
            data-has-label={toast.reload || !!toast.button?.label}
          >
            {toast.reload ? 'Reload' : toast.button?.label ? toast.button.label : <X size={18} />}
          </Button>
        </header>
        <p className={styles.message}>{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
