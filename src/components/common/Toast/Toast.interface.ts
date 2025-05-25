export interface ToastProps {
  /**
   * Type of the toast message, affects the styling
   */
  type?: 'info' | 'success' | 'warning' | 'error';

  /**
   * The title text displayed at the top of the toast
   */
  title?: string;

  /**
   * The main message content of the toast
   */
  message: string;

  /**
   * Whether the toast is currently visible
   */
  active?: boolean;

  /**
   * Callback function when the close button is clicked
   */
  onClose?: () => void;
}

export type URLLocation = string & Location;
