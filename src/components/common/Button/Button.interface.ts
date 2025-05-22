export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  url?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
