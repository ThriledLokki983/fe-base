import { forwardRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { SelectProps } from './Select.interface';
import styles from './Select.module.scss';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      error,
      icon: Icon,
      className,
      required,
      disabled,
      placeholder,
      helperText,
      options = [],
      value,
      onChange,
      size = 'medium',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;

    return (
      <div
        className={`${styles.wrapper} ${className || ''}`}
        data-has-value={hasValue}
        data-has-error={!!error}
        data-is-focused={isFocused}
        data-is-disabled={disabled}
        data-size={size}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.selectContainer}>
          {Icon && (
            <span className={styles.icon}>
              <Icon size={18} strokeWidth={1.5} />
            </span>
          )}
          <select
            ref={ref}
            id={id}
            name={name}
            className={styles.select}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron}>
            <ChevronDown size={18} strokeWidth={1.5} />
          </span>
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
        </div>
      </div>
    );
  }
);
