import React, { useLayoutEffect, useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import type { AlertBarProps } from './AlertBar.interface';

import styles from './AlertBar.module.scss';

const ICON_MAP = {
  notice: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const AlertBar = ({ hidden = false, variation = 'notice', children, ...props }: AlertBarProps) => {
  const [isHiding, setIsHiding] = useState(hidden);
  const [isHidden, setIsHidden] = useState(hidden);

  /**
   * Reset state if there's a unique `id` provided and it changes.
   */
  useLayoutEffect(() => {
    setIsHiding(hidden);
    setIsHidden(hidden);
  }, [hidden, props.id]);

  /**
   * Handle close/remove clicks.
   */
  const removeHandler = () => {
    setIsHiding(true);
    window.setTimeout(() => setIsHidden(true), 500);
  };

  return isHidden ? null : (
    <div
      role="alert"
      className={styles.root}
      data-hiding={isHiding}
      data-variation={variation}
      alert-bar=""
      {...props}
    >
      {React.createElement(ICON_MAP[variation], {
        size: 20,
        strokeWidth: 2,
        className: styles.icon,
      })}
      <div className={styles.root__content}>{children}</div>
      <button
        className={styles.root__remove}
        type="button"
        onClick={removeHandler}
        aria-label={`Close ${variation}`}
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  );
};

export default AlertBar;
