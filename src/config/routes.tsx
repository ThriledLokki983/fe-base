import { type RouteObject } from 'react-router-dom';
import { LayoutDashboard, Zap, FileInput } from 'lucide-react';
import { PATH_HOME, PATH_COMPONENTS, PATH_FORM_DEMO, PATH_NOT_FOUND } from './paths';

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
    element: <Layout />,
    children: [
      {
        path: PATH_HOME,
        element: <Pages.Home />,
        index: true,
        // These custom properties help with navigation and SEO
        ...{
          label: 'Home',
          isNav: true,
          isEnd: true,
          title: 'Home',
          icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
        },
      } as CustomRouteObject,
      {
        path: PATH_COMPONENTS,
        element: <Pages.Components />,
        ...{
          label: 'Components',
          isNav: true,
          isEnd: true,
          title: 'Components',
          icon: <Zap size={20} strokeWidth={1.5} />,
        },
      } as CustomRouteObject,
      {
        path: PATH_FORM_DEMO,
        element: <Pages.FormDemo />,
        ...{
          label: 'Form Demo',
          isNav: true,
          isEnd: true,
          title: 'Form Demo',
          icon: <FileInput size={20} strokeWidth={1.5} />,
        },
      } as CustomRouteObject,
      {
        path: PATH_NOT_FOUND,
        element: <Pages.NotFound />,
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
      {
        path: '*',
        element: <Pages.NotFound />,
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
    ],
  },
];

export default ROUTES_ALL;
