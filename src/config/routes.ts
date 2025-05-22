import { type RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { PATH_HOME, PATH_NOT_FOUND } from './paths';

import type { CustomRouteObject } from '@config/interfaces/routes.interface';
import Layout from '@components/layout/MainLayout';
import * as Pages from '@pages/index';

/**
 * Core routes configuration following React Router best practices.
 * Each route is nested under the main layout which provides the app shell.
 * The layout handles rendering child routes through the Outlet component.
 */
const ROUTES_ALL: RouteObject[] = [
  {
    element: createElement(Layout),
    children: [
      {
        path: PATH_HOME,
        element: createElement(Pages.Home),
        index: true,
        // These custom properties help with navigation and SEO
        ...{
          label: 'Home',
          isNav: true,
          isEnd: true,
          title: 'Home',
        },
      } as CustomRouteObject,
      {
        path: PATH_NOT_FOUND,
        element: createElement(Pages.NotFound),
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
      {
        path: '*',
        element: createElement(Pages.NotFound),
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
    ],
  },
];

export default ROUTES_ALL;
