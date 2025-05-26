import type { RouteObject } from 'react-router-dom';

type CustomRouteObject = RouteObject & {
  label?: string;
  isNav?: boolean;
  isEnd?: boolean;
  isIndex?: boolean;
  title: string;
};

export type { CustomRouteObject };
