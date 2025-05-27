import { type RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import { LayoutDashboard, Zap, FileInput } from 'lucide-react';
import { PATH_HOME, PATH_COMPONENTS, PATH_FORM_DEMO, PATH_NOT_FOUND } from './paths';

import type { CustomRouteObject } from '@config/interfaces/routes.interface';
import Layout from '@components/layout/MainLayout';
import LazyWrapper from '@components/common/LazyWrapper';

// Lazy load page components for better performance
const Home = lazy(() => import('@pages/Home/Home'));
const Components = lazy(() => import('@pages/Components'));
const FormDemo = lazy(() => import('@pages/FormDemo'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

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
        element: (
          <LazyWrapper>
            <Home />
          </LazyWrapper>
        ),
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
        element: (
          <LazyWrapper>
            <Components />
          </LazyWrapper>
        ),
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
        element: (
          <LazyWrapper>
            <FormDemo />
          </LazyWrapper>
        ),
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
        element: (
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        ),
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
      {
        path: '*',
        element: (
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        ),
        ...{
          title: 'Not found',
          isNav: false,
        },
      } as CustomRouteObject,
    ],
  },
];

export default ROUTES_ALL;
