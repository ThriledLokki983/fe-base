export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'link' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  url?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
