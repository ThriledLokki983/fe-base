import { forwardRef, useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TextAreaProps } from './TextArea.interface';
import styles from './TextArea.module.scss';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      error,
      className,
      required,
      disabled,
      placeholder,
      helperText,
      value,
      onChange,
      rows = 4,
      maxLength,
      showCount = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;
    const charCount = value?.toString().length || 0;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
    };

    return (
      <div
        className={`${styles.wrapper} ${className || ''}`}
        data-has-value={hasValue}
        data-has-error={!!error}
        data-is-focused={isFocused}
        data-is-disabled={disabled}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.textareaContainer}>
          <textarea
            ref={ref}
            id={id}
            name={name}
            className={styles.textarea}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            maxLength={maxLength}
            {...props}
          />
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className={styles.focusRing}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className={styles.bottom}>
          <AnimatePresence>
            {error && (
              <motion.p
                className={styles.error}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
          {showCount && maxLength && (
            <p className={styles.charCount}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
