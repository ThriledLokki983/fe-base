import React from 'react';

export interface BasicAlertBarProps {
  hidden?: boolean;
  variation: keyof IconMapProps;
  children: React.ReactNode;
}

export interface AlertBarProps extends BasicAlertBarProps {
  [key: string]: unknown;
}

export interface IconMapProps {
  notice: string;
  warning: string;
  error: string;
  success: string;
}
