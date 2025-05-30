import type { CustomRouteObject } from '@config/interfaces/routes.interface';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

/**
 * Extracts navigation items from routes configuration
 * Filters routes that have isNav: true and required navigation properties
 */
export function extractNavigationItems(routes: CustomRouteObject[]): NavigationItem[] {
  const navItems: NavigationItem[] = [];

  function processRoute(route: CustomRouteObject, basePath = '') {
    // Build full path
    const fullPath = route.path ? `${basePath}${route.path}` : basePath;

    // Check if this route should be in navigation
    if (route.isNav && route.label && route.path) {
      navItems.push({
        id: route.path.replace('/', '') || 'home', // Use path as ID, handle root path
        label: route.label,
        path: fullPath,
        icon: route.icon,
      });
    }

    // Process child routes recursively
    if (route.children) {
      route.children.forEach((child) => {
        processRoute(child as CustomRouteObject, fullPath);
      });
    }
  }

  routes.forEach((route) => processRoute(route));

  return navItems;
}
