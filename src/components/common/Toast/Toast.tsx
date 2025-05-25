import { useEffect, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStateContext } from '@contexts/index';
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

const Toast = () => {
  const { toast, hideToast } = useAppStateContext();
  const [isVisible, setIsVisible] = useState(false);

  // Handle visibility based on toast.active
  useEffect(() => {
    if (toast.active) {
      setIsVisible(true);
    }
  }, [toast.active]);

  /**
   * Handle close button click and exit animation
   */
  const handleClose = useCallback(() => {
    setIsVisible(false);
    hideToast();
  }, [hideToast]);

  // Auto-hide functionality
  useEffect(() => {
    if (toast.active && !toast.persistent) {
      const delay = toast.type === 'message' ? MESSAGE_TIMEOUT : ERROR_TIMEOUT;
      TIMEOUT = window.setTimeout(() => {
        handleClose();
      }, delay);
    }
    return () => {
      if (TIMEOUT) {
        window.clearTimeout(TIMEOUT);
        TIMEOUT = null;
      }
    };
  }, [toast.active, toast.persistent, toast.type, handleClose]);

  /**
   * Handle close button click.
   */
  const handleCloseClick = useCallback(() => {
    if (toast.button?.url) {
      window.location.href = toast.button.url as string;
    } else if (toast.reload) {
      window.location.reload();
    } else {
      handleClose();
    }
  }, [toast.button?.url, toast.reload, handleClose]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {toast.active && (
        <motion.div
          className={styles.toast}
          data-type={toast.type}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            },
          }}
          exit={{
            opacity: 0,
            x: 400,
            scale: 0.8,
            transition: {
              duration: 0.3,
              ease: 'easeIn',
            },
          }}
        >
          <div className={styles.icon}>{iconMap[toast.type as keyof typeof iconMap]}</div>
          <div className={styles.content}>
            <header className={styles.header}>
              <h3 className={styles.title}>{toast.title || `Request failed`}</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleCloseClick}
                aria-label="Close notification"
                data-has-label={toast.reload || !!toast.button?.label}
              >
                {toast.reload ? (
                  'Reload'
                ) : toast.button?.label ? (
                  toast.button.label
                ) : (
                  <X size={18} />
                )}
              </button>
            </header>
            <p className={styles.message}>{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
