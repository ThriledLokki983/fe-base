import type { RouteObject } from 'react-router-dom';
import type { ReactNode } from 'react';

export type CustomRouteObject = RouteObject & {
  label?: string;
  isNav?: boolean;
  isEnd?: boolean;
  isIndex?: boolean;
  title: string;
  icon?: ReactNode;
};
