import { forwardRef, useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import type { InputProps } from './Input.interface';
import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = 'text',
      label,
      error,
      icon: Icon,
      className,
      required,
      disabled,
      placeholder,
      helperText,
      value,
      onChange,
      size = 'medium',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value && value.toString().length > 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const iconSize = size === 'large' ? 20 : size === 'small' ? 16 : 18;

    return (
      <div
        className={`${styles.inputWrapper} ${className || ''}`}
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
        <div className={styles.inputContainer}>
          {Icon && (
            <span className={styles.icon}>
              <Icon size={iconSize} strokeWidth={1.5} />
            </span>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            className={styles.input}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={iconSize} strokeWidth={1.5} />
              ) : (
                <Eye size={iconSize} strokeWidth={1.5} />
              )}
            </button>
          )}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className={styles.focusRing}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </div>
        {(error || helperText) && (
          <div className={styles.bottom}>
            <AnimatePresence>
              {error && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {error}
                </motion.p>
              )}
              {!error && helperText && (
                <motion.p
                  className={styles.helperText}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {helperText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
